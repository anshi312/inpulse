# InPulse — Event Networking Quest App

InPulse is a **mobile-first, dark-mode web app** that gamifies real-world networking at events.  
Inspired by Snapchat-style UI and social discovery mechanics, InPulse turns meeting new people into a **fun, quest-driven experience** with QR-verified connections and live leaderboards.

**Live demo:**  
https://inpulse.lovable.app

---

# ✨ Core Idea

Networking at events is often awkward and unstructured.

InPulse introduces:

- 🎯 **Social quests** that guide meaningful conversations  
- 📱 **QR-based connection exchange** for instant verification  
- 🏆 **Live leaderboards** that reward engagement  
- 🌙 **Dark, playful mobile UI** designed for real event use  

The current demo runs on a **mock backend for reliability**, while the architecture is designed to scale to **Supabase + real event integrations**.

---

# 🚀 Features

## Event Entry
- Enter a Luma event URL and your handle  
- Mock edge API fetches event metadata  
- Seamless navigation into the event experience  

## Quest Dashboard
- Three networking missions per event  
- Tap-to-verify completion flow  
- Animated progress tracking  
- Mobile bottom navigation  

## Double QR Exchange
- Personal QR generated from handle + event  
- Simulated scan to create mutual connection  
- Neon success animation and live connection count  

## Leaderboard
- Ranked attendees by verified connections  
- Highlighted current user  
- Pull-to-refresh interaction  
- Fully responsive mobile layout  

---

# 🧱 Architecture

## Demo Mode (Current)
To ensure **live demo reliability**, the app uses:

- Mock edge API route for event data  
- Local in-memory state for:
  - attendees  
  - connections  
  - quest completions  
- No external network dependency  

This guarantees:

- ⚡ instant loading  
- 🛡️ zero API failures  
- 🎤 smooth presentations  

## Production-Ready Path
The system is structured to evolve into:

- **Supabase Postgres** for persistence  
- **Edge functions** for real Luma API integration  
- **Realtime leaderboard queries**  
- Optional **AI-powered networking recommendations**  

---

# 🛠 Tech Stack

This project is built with:

- Vite  
- TypeScript  
- React  
- shadcn-ui  
- Tailwind CSS  

Generated and managed with **Lovable**.

---

# 🧪 Local Development

Clone and run locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Enter the project folder
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start dev server
npm run dev
