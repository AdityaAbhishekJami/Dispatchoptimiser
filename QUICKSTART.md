# Quick Start Guide

## Installation & Setup (Windows)

### Option 1: Automated Installation (Recommended)

1. **Run the installation script:**
   ```
   Double-click: install-all.bat
   ```
   This will install all dependencies for both backend and frontend.

2. **Start the Backend** (Terminal 1):
   ```
   Double-click: start-backend.bat
   ```
   Wait for message: "🚀 Dispatch Optimizer API running on http://localhost:3001"

3. **Start the Frontend** (Terminal 2):
   ```
   Double-click: start-frontend.bat
   ```
   Wait for message showing the local URL (usually http://localhost:3000)

4. **Open in Browser:**
   Navigate to: http://localhost:3000

### Option 2: Manual Installation

1. **Install Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Install Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Open in Browser:**
   Navigate to: http://localhost:3000

## First Time Usage

### Exploring the Dispatcher Console

1. **View Unassigned Loads**
   - Left panel shows all unassigned loads
   - Filter by priority: All, Urgent, High, Medium, Low
   - Search by customer or city name

2. **Get AI Recommendations**
   - Click on any load in the list
   - Right panel shows top 5 driver-vehicle recommendations
   - Each recommendation includes:
     - Compatibility score
     - Detailed breakdown (proximity, capacity, HOS, etc.)
     - Reasons for recommendation
     - Estimated cost and deadhead miles

3. **Assign a Load Manually**
   - Review the recommendations
   - Click "Assign to [Driver Name]" button
   - Load will be assigned and status updated

4. **Auto-Optimize All Loads**
   - Click "Auto-Optimize" button in the top-right
   - View optimization results modal
   - Review stats: assigned loads, cost, deadhead miles
   - Click "Apply Assignments" to execute

5. **View Map**
   - Center panel shows fleet overview
   - Green circles = Available drivers
   - Red circles = Unassigned loads
   - Hover over markers for details

6. **Check Activity Feed**
   - When no load is selected, right panel shows recent activity
   - See all system events and assignments

### Exploring the Manager Dashboard

1. **Switch to Dashboard**
   - Click "Manager Dashboard" in top navigation

2. **View KPIs**
   - On-Time Delivery Rate
   - Fleet Utilization Rate
   - Cost Per Mile
   - Total Loads Dispatched

3. **Analyze Trends**
   - Performance Trends chart (30 days)
   - Fleet Utilization by time of day
   - Driver leaderboard

4. **Monitor Drivers**
   - Top 10 performers table
   - Rankings by rating and on-time percentage
   - Current status and total miles

## Understanding the System

### Load Priority Levels
- **Urgent**: Red badge - Requires immediate attention
- **High**: Orange badge - Important deliveries
- **Medium**: Yellow badge - Standard priority
- **Low**: Green badge - Flexible timing

### Driver Status
- **Available**: Ready for assignment
- **Assigned**: Load assigned, not yet started
- **Driving**: Currently in transit
- **Resting**: Taking required break
- **Off Duty**: Not working

### Scoring System
The AI scoring engine evaluates driver-load matches on:
- **Proximity (30%)**: Distance from driver to pickup
- **Capacity (15%)**: Load vs vehicle capacity match
- **Time Window (25%)**: Ability to meet deadlines
- **HOS (15%)**: Hours of service availability
- **Historical (15%)**: Driver rating & on-time rate

Scores:
- 85-100: Excellent match (green)
- 70-84: Good match (blue)
- 50-69: Fair match (yellow)
- Below 50: Poor match (red, not recommended)

### Optimization Algorithm
1. **Greedy Phase**: Assign loads to best available resources
2. **Local Search**: Improve solution with swap/relocate moves
3. **Objective**: Minimize cost + deadhead + SLA penalties

## Demo Scenarios

### Scenario 1: Manual Assignment
1. Go to Dispatcher Console
2. Find an urgent load (red badge)
3. Click to view recommendations
4. Assign to top-recommended driver
5. Check Activity Feed for confirmation

### Scenario 2: Batch Optimization
1. Ensure multiple unassigned loads exist
2. Click "Auto-Optimize"
3. Review results (assignments, cost, utilization)
4. Click "Apply Assignments"
5. Switch to Dashboard to see impact on KPIs

### Scenario 3: Performance Analysis
1. Go to Manager Dashboard
2. Check current on-time delivery rate
3. View performance trends over last 30 days
4. Identify top-performing drivers
5. Review fleet utilization patterns

## Troubleshooting

### Backend won't start
- Check if port 3001 is already in use
- Ensure Node.js is installed (v18+)
- Run `npm install` in backend directory

### Frontend won't start
- Check if port 3000 is already in use
- Ensure dependencies installed: `npm install` in frontend directory
- Clear browser cache and try again

### No data showing
- Ensure backend is running first
- Check browser console for errors
- Refresh the page

### Optimization not working
- Ensure there are unassigned loads
- Check that drivers and vehicles are available
- Review browser console for API errors

## Data Reset

To reset all data back to initial state:
- The data resets automatically when you restart the backend server
- All assignments, loads, drivers, and vehicles return to mock state

## Support

For questions or issues:
1. Check the full README.md for detailed documentation
2. Review API endpoints at http://localhost:3001
3. Check browser console and terminal logs for errors

## Next Steps

After exploring the POC:
1. Review the optimization algorithm results
2. Compare manual vs auto-optimization outcomes
3. Analyze cost savings and efficiency gains
4. Identify features for production implementation
5. Plan integration with real TMS/ERP systems

Enjoy exploring the Dispatch Optimizer POC!

