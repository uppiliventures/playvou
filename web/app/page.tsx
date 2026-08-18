import GameCanvas from "./components/GameCanvas";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-emerald-400">PlayVou Protocol</h1>
        <p className="text-sm text-slate-400">AI-Powered Telemetry Verification Sandbox</p>
      </header>
      <GameCanvas />
    </main>
  );
}
