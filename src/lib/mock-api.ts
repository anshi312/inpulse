// Mock API layer — simulates edge functions for demo reliability.
// Replace these with real Supabase edge function calls in production.

export interface EventData {
  id: string;
  name: string;
  date: string;
  location: string;
}

export interface Attendee {
  id: string;
  handle: string;
  connections_count: number;
  avatar_url: string;
}

export interface Connection {
  id: string;
  event_id: string;
  user_a: string;
  user_b: string;
  created_at: string;
}

export interface QuestCompletion {
  attendee_id: string;
  quest_id: string;
  completed: boolean;
}

export interface Quest {
  id: string;
  mission: string;
  targetName: string;
}

// Mock event fetch — simulates /api/event
export async function fetchEvent(_lumaUrl: string): Promise<EventData> {
  await new Promise((r) => setTimeout(r, 600)); // simulate network
  return {
    id: "evt_001",
    name: "NYC AI Builders Meetup",
    date: "February 2026",
    location: "Manhattan",
  };
}

// Contextual quests reflecting real attendee patterns
export const QUESTS: Quest[] = [
  { id: "q1", mission: "Connect with someone who shared their Instagram.", targetName: "Social Star" },
  { id: "q2", mission: "Meet an attendee with no social links and learn what they're building.", targetName: "Stealth Builder" },
  { id: "q3", mission: "Talk to a founder or builder in the room.", targetName: "Founder" },
  { id: "q4", mission: "Find someone completely new to you at this event.", targetName: "New Face" },
  { id: "q5", mission: "Exchange QR codes with a first-time connection.", targetName: "First Link" },
  { id: "q6", mission: "Introduce two people who haven't met each other yet.", targetName: "Connector" },
];

// Seed leaderboard attendees
export const SEED_ATTENDEES: Attendee[] = [
  { id: "a1", handle: "alex_ai", connections_count: 7, avatar_url: "" },
  { id: "a2", handle: "sam_builds", connections_count: 5, avatar_url: "" },
  { id: "a3", handle: "jordan_dev", connections_count: 4, avatar_url: "" },
  { id: "a4", handle: "casey_ml", connections_count: 3, avatar_url: "" },
  { id: "a5", handle: "pat_design", connections_count: 2, avatar_url: "" },
  { id: "a6", handle: "morgan_ops", connections_count: 1, avatar_url: "" },
];
