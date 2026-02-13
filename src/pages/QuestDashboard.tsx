import { useApp } from "@/context/AppContext";
import { QUESTS } from "@/lib/mock-api";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, ScanLine } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const QuestDashboard = () => {
  const { event, userHandle, questCompletions, completeQuest } = useApp();
  const completedCount = questCompletions.filter((q) => q.attendee_id === userHandle && q.completed).length;
  const progress = (completedCount / QUESTS.length) * 100;

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {/* Header */}
      <header className="px-5 pt-6 pb-4">
        <p className="text-xs font-medium uppercase tracking-wider text-primary">{event?.name ?? "Event"}</p>
        <h1 className="mt-1 font-display text-2xl font-bold">Your Quests</h1>
        <p className="text-sm text-muted-foreground">@{userHandle}</p>

        <div className="mt-4 flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1 bg-secondary [&>div]:bg-primary [&>div]:neon-glow" />
          <span className="text-xs font-semibold text-primary">
            {completedCount}/{QUESTS.length}
          </span>
        </div>
      </header>

      {/* Quest Cards */}
      <div className="flex flex-col gap-4 px-5">
        {QUESTS.map((quest, i) => {
          const done = questCompletions.some(
            (q) => q.quest_id === quest.id && q.attendee_id === userHandle && q.completed
          );
          return (
            <div
              key={quest.id}
              className={`glass-card p-5 transition-all duration-300 animate-slide-up ${
                done ? "border-neon-green/40 neon-glow" : ""
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12 border-2 border-border">
                  <AvatarFallback className="bg-secondary text-xs font-bold text-muted-foreground">
                    {quest.targetName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">
                    {quest.targetName}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug">{quest.mission}</p>
                </div>
              </div>

              <Button
                onClick={() => completeQuest(quest.id)}
                disabled={done}
                className={`mt-4 w-full rounded-xl transition-all duration-300 ${
                  done
                    ? "bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green/20 animate-success-pop"
                    : "neon-glow"
                }`}
                variant={done ? "outline" : "default"}
              >
                {done ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Verified!
                  </>
                ) : (
                  <>
                    <ScanLine className="mr-2 h-4 w-4" /> Scan to Verify
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};

export default QuestDashboard;
