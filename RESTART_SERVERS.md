# 🔄 How to Restart Servers

## Issue
The recommendations might be showing duplicates because the backend needs to restart with the new code changes.

## Solution: Restart Both Servers

### Step 1: Stop Both Servers
Press `Ctrl+C` in both terminal windows to stop the servers.

### Step 2: Restart Backend
In Terminal 1:
```bash
cd backend
npm run dev
```

Wait for: "🚀 Dispatch Optimizer API running on http://localhost:3001"

### Step 3: Restart Frontend  
In Terminal 2:
```bash
cd frontend
npm run dev
```

Wait for Vite message with local URL.

### Step 4: Refresh Browser
- Hard refresh: `Ctrl + Shift + R` or `F5`
- Open DevTools Console (`F12`) to see logs

## What to Look For

### In Backend Terminal (Terminal 1):
When you click a load, you should see:
```
=== Generating recommendations for load <id> ===
Available drivers: 18, vehicles: 18
Load: San Francisco, CA → Las Vegas, NV
Generated 5 recommendations
  1. David Johnson (score: 85) - Freightliner Model 642
  2. Maria Garcia (score: 78) - Kenworth Model 834
  3. Sarah Williams (score: 72) - Peterbilt Model 591
  ...
```

### In Browser Console (F12):
```
Fetching recommendations for load: <id>
Received recommendations: 5 items
```

## Expected Result
✅ 5 DIFFERENT driver names
✅ Different scores for each
✅ Varied locations and attributes

If you still see duplicate names after restart, let me know and I'll investigate further!

