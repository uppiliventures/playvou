use anchor_lang::prelude::*;

declare_id!("PlayVou111111111111111111111111111111111111");

#[program]
pub mod playvou_escrow {
    use super::*;

    pub fn initialize_vault(ctx: Context<InitializeVault>, amount: u64) -> Result<()> {
        let vault = &mut ctx.accounts.vault_account;
        vault.authority = ctx.accounts.authority.key();
        vault.total_rewards = amount;
        
        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &ctx.accounts.authority.key(),
            &ctx.accounts.vault_account.key(),
            amount,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[
                ctx.accounts.authority.to_account_info(),
                ctx.accounts.vault_account.to_account_info(),
            ],
        )?;
        
        Ok(())
    }

    pub fn release_payout(ctx: Context<ReleasePayout>, confidence_score: u8) -> Result<()> {
        require!(confidence_score >= 85, PlayVouError::BotDetected);

        let reward_amount = 50_000_000; // 0.05 SOL micro-payout

        **ctx.accounts.vault_account.to_account_info().try_borrow_mut_lamports()? -= reward_amount;
        **ctx.accounts.player.to_account_info().try_borrow_mut_lamports()? += reward_amount;

        emit!(RewardPaid {
            player: ctx.accounts.player.key(),
            score: confidence_score,
            amount: reward_amount,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeVault<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 8, seeds = [b"vault"], bump)]
    pub vault_account: Account<'info, VaultConfig>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ReleasePayout<'info> {
    #[account(mut, seeds = [b"vault"], bump)]
    pub vault_account: Account<'info, VaultConfig>,
    #[account(mut)]
    pub player: AccountInfo<'info>,
    pub verifier_node: Signer<'info>,
}

#[account]
pub struct VaultConfig {
    pub authority: Pubkey,
    pub total_rewards: u64,
}

#[event]
pub struct RewardPaid {
    pub player: Pubkey,
    pub score: u8,
    pub amount: u64,
}

#[error_code]
pub enum PlayVouError {
    #[msg("Telemetry Score below threshold. Payout denied.")]
    BotDetected,
}
