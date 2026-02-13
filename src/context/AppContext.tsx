import React, { createContext, useContext, useState, useCallback } from "react";
import type { EventData, Attendee, Connection, QuestCompletion } from "@/lib/mock-api";
import { SEED_ATTENDEES } from "@/lib/mock-api";

interface AppState {
  event: EventData | null;
  userHandle: string;
  attendees: Attendee[];
  connections: Connection[];
  questCompletions: QuestCompletion[];
  setEvent: (e: EventData) => void;
  setUserHandle: (h: string) => void;
  completeQuest: (questId: string) => void;
  addConnection: (targetHandle: string) => void;
  currentUser: Attendee | null;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [event, setEvent] = useState<EventData | null>(null);
  const [userHandle, setUserHandle] = useState("");
  const [attendees, setAttendees] = useState<Attendee[]>(SEED_ATTENDEES);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [questCompletions, setQuestCompletions] = useState<QuestCompletion[]>([]);

  // Ensure the current user exists in attendees
  const currentUser = attendees.find((a) => a.handle === userHandle) ?? null;

  const handleSetUserHandle = useCallback((h: string) => {
    setUserHandle(h);
    setAttendees((prev) => {
      if (prev.find((a) => a.handle === h)) return prev;
      return [...prev, { id: `user_${Date.now()}`, handle: h, connections_count: 0, avatar_url: "" }];
    });
  }, []);

  const completeQuest = useCallback(
    (questId: string) => {
      setQuestCompletions((prev) => {
        if (prev.find((q) => q.quest_id === questId && q.attendee_id === userHandle)) return prev;
        return [...prev, { attendee_id: userHandle, quest_id: questId, completed: true }];
      });
    },
    [userHandle]
  );

  const addConnection = useCallback(
    (targetHandle: string) => {
      if (!event) return;
      const conn: Connection = {
        id: `conn_${Date.now()}`,
        event_id: event.id,
        user_a: userHandle,
        user_b: targetHandle,
        created_at: new Date().toISOString(),
      };
      setConnections((prev) => [...prev, conn]);
      setAttendees((prev) =>
        prev.map((a) => (a.handle === userHandle ? { ...a, connections_count: a.connections_count + 1 } : a))
      );
    },
    [event, userHandle]
  );

  return (
    <AppContext.Provider
      value={{
        event,
        userHandle,
        attendees,
        connections,
        questCompletions,
        setEvent,
        setUserHandle: handleSetUserHandle,
        completeQuest,
        addConnection,
        currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
