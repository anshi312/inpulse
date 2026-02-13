import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { ScanLine, Sparkles, Users } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const MOCK_SCANNED_HANDLES = ["nova_x", "byte_quinn", "signal_ray", "flux_ash"];

const QRExchange = () => {
  const { event, userHandle, currentUser, addConnection } = useApp();
  const [justConnected, setJustConnected] = useState(false);
  const [scanCount, setScanCount] = useState(0);

  const qrValue = `inpulse://${event?.id ?? "evt"}/${userHandle}`;

  const handleScan = () => {
    const target = MOCK_SCANNED_HANDLES[scanCount % MOCK_SCANNED_HANDLES.length];
    addConnection(target);
    setScanCount((c) => c + 1);
    setJustConnected(true);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#a855f7", "#facc15", "#22c55e"],
    });

    setTimeout(() => setJustConnected(false), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="px-5 pt-6 pb-2">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">{event?.name ?? "Event"}</p>
        <h1 className="mt-1 font-display text-2xl font-bold">QR Exchange</h1>
      </header>

      {/* My QR */}
      <div className="flex flex-1 flex-col items-center px-5">
        <div className="glass-card mt-4 flex flex-col items-center p-6 w-full max-w-xs">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Your Code</p>
          <div className="rounded-2xl bg-foreground p-4">
            <QRCodeSVG value={qrValue} size={160} bgColor="hsl(0,0%,95%)" fgColor="hsl(260,20%,6%)" />
          </div>
          <p className="mt-3 font-display text-sm font-semibold text-primary">@{userHandle}</p>
        </div>

        {/* Connection count */}
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            <span className="font-bold text-foreground">{currentUser?.connections_count ?? 0}</span> connections
          </span>
        </div>

        {/* Scan button */}
        <Button
          onClick={handleScan}
          className={`mt-6 h-14 w-full max-w-xs rounded-2xl text-base font-semibold transition-all duration-300 ${
            justConnected ? "bg-neon-green text-accent-foreground animate-success-pop" : "neon-glow hover:scale-[1.02]"
          }`}
        >
          {justConnected ? (
            <>
              <Sparkles className="mr-2 h-5 w-5" /> Connected!
            </>
          ) : (
            <>
              <ScanLine className="mr-2 h-5 w-5" /> Scan Their Code
            </>
          )}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default QRExchange;
