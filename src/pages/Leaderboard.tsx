import { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, RefreshCw } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const Leaderboard = () => {
  const { event, attendees, userHandle } = useApp();
  const [refreshing, setRefreshing] = useState(false);
  const userRowRef = useRef<HTMLDivElement>(null);

  const sorted = [...attendees].sort((a, b) => b.connections_count - a.connections_count);

  useEffect(() => {
    if (userRowRef.current) {
      userRowRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [userHandle]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="flex min-h-screen flex-col pb-20">
      <header className="flex items-center justify-between px-5 pt-6 pb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-primary">{event?.name ?? "Event"}</p>
          <h1 className="mt-1 font-display text-2xl font-bold">Leaderboard</h1>
        </div>
        <button
          onClick={handleRefresh}
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <RefreshCw className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`} />
        </button>
      </header>

      <div className="flex flex-col gap-2 px-5">
        {sorted.map((a, i) => {
          const isMe = a.handle === userHandle;
          const rank = i + 1;
          return (
            <div
              key={a.id}
              ref={isMe ? userRowRef : undefined}
              className={`flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 animate-slide-up ${
                isMe ? "glass-card neon-border" : "bg-card/40"
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Rank */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  rank === 1
                    ? "bg-accent text-accent-foreground"
                    : rank <= 3
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {rank === 1 ? <Trophy className="h-4 w-4" /> : rank}
              </div>

              <Avatar className="h-10 w-10 border border-border">
                <AvatarFallback className="bg-secondary text-xs font-bold text-muted-foreground">
                  {a.handle.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p className={`text-sm font-semibold ${isMe ? "text-primary" : ""}`}>
                  @{a.handle} {isMe && <span className="text-xs text-muted-foreground">(you)</span>}
                </p>
              </div>

              <span className="font-display text-lg font-bold text-foreground">{a.connections_count}</span>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default Leaderboard;
