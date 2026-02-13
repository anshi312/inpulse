import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import { fetchEvent } from "@/lib/mock-api";

const EventEntry = () => {
  const [lumaUrl, setLumaUrl] = useState("");
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const { setEvent, setUserHandle } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lumaUrl.trim() || !handle.trim()) return;
    setLoading(true);
    try {
      const eventData = await fetchEvent(lumaUrl);
      setEvent(eventData);
      setUserHandle(handle.trim());
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center gap-3 animate-slide-up">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl neon-glow overflow-hidden">
          <img src="/favicon.png" alt="InPulse logo" className="h-16 w-16 object-contain" />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight neon-text">
          InPulse Connect
        </h1>
        <p className="text-sm text-muted-foreground">Gamify your networking</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Luma Event URL
          </label>
          <Input
            value={lumaUrl}
            onChange={(e) => setLumaUrl(e.target.value)}
            placeholder="https://lu.ma/your-event"
            className="h-12 rounded-xl border-border/50 bg-card/70 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Your Handle
          </label>
          <Input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@yourname"
            className="h-12 rounded-xl border-border/50 bg-card/70 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !lumaUrl.trim() || !handle.trim()}
          className="h-12 w-full rounded-xl text-base font-semibold neon-glow transition-all duration-300 hover:scale-[1.02]"
        >
          {loading ? (
            <span className="animate-pulse-neon">Connecting...</span>
          ) : (
            <>
              Enter Event
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default EventEntry;
