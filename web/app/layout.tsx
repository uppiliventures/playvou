import "./globals.css";
import SolanaWalletProvider from "./providers/WalletProvider";

export const metadata = {
  title: "PlayVou Sandbox",
  description: "AI-Powered Telemetry Verification",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  );
}
