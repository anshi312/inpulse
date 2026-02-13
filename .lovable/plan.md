# App name: InPulse — Event Networking App

Build a mobile-first, dark-mode web app with a Snapchat-inspired aesthetic (dark backgrounds, neon accent colors, rounded cards, playful typography) that gamifies networking at events.

The demo must run entirely on a mock backend with a fake edge API so the experience is fully reliable during presentation, while keeping the structure compatible with a future Supabase production backend.

**Pages and functionality:**

**Page 1 — Event Entry**

Create a full-screen dark landing page with the InPulse logo centered at the top.

Include two inputs:

	1.	Luma event URL

	2.	User handle or name

Add a primary neon “Enter Event” button.

Behavior in demo mode:

When the user submits, call a mock API route at /api/event that returns static event data including id, name, date, and location.

Store the returned event data and the user handle in local app state, then navigate to the Quest Dashboard.

Do not call any real external APIs.

**Page 2 — Quest Dashboard**

Display a header with the event name from the mock API and the user handle.

Show three vertically stacked quest cards with rounded dark styling.

Each quest card must include:

	•	A fun networking mission description

	•	A circular avatar placeholder

	•	A “Scan to Verify” button

When the button is tapped, mark the quest as completed in local in-memory state, animate the card into a success state, and update a progress indicator showing completed versus total quests.

Do not perform any database writes.

Add a fixed bottom mobile navigation bar with tabs for Dashboard, QR Exchange, and Leaderboard.

**Page 3 — Double QR Exchange**

Create a split vertical layout.

Top half:

Display a generated QR code based on the user handle combined with the mock event id.

Bottom half:

Provide a “Scan Their Code” button.

When pressed, simulate a successful QR exchange by creating a mock connection in local state, incrementing the user’s connection count, and triggering a neon success animation with optional confetti.

All logic must run locally with no backend dependency.

**Page 4 — Leaderboard**

Display the event title at the top.

Render a ranked list of attendees sorted by connections_count in descending order using local state only.

Each row must show rank, handle, connection count, and an avatar placeholder.

Highlight the current user’s row and auto-scroll it into view.

Include a pull-to-refresh interaction that simply re-sorts local data and shows a subtle loading animation without calling any backend.

**Mock backend requirements:**

Create a fake edge API route at /api/event that returns static JSON:

id: “evt_001”

name: “NYC AI Builders Meetup”

date: “February 2026”

location: “Manhattan”

This route simulates the Luma API and guarantees demo reliability.

Local in-memory data models:

Maintain frontend state representing attendees, connections, and quest_completions.

**Attendees fields:**

id, handle, connections_count, avatar_url

**Connections fields:**

id, event_id, user_a, user_b, created_at

**Quest completions fields:**

attendee_id, quest_id, completed

All data should be stored in React state or localStorage and resettable on refresh.

**Design system:**

Dark mode by default.

Neon accent color such as electric purple or neon yellow.

Rounded cards, soft shadows, and smooth micro-animations.

Mobile-first responsive layout with playful Snapchat-style typography.

Fixed bottom tab navigation across pages.

**Architecture note:**

Structure the code so it can later connect to Supabase Postgres, real edge functions for the Luma API, and persistent leaderboard queries, but ensure the demo runs fully using mock data only.

**One-sentence product description:**

InPulse gamifies real-world networking with QR-verified connections, social quests, and live leaderboards, demonstrated using a reliable mock backend and designed to scale on Supabase.