# Dispatch Optimizer POC

An intelligent load assignment and dispatch optimization system for logistics companies.

## Overview

This is a proof-of-concept application that demonstrates automated dispatch optimization using heuristic algorithms, constraint satisfaction, and AI-powered recommendations for driver-load assignments.

## Features

### Dispatcher Console
- **Unassigned Loads View**: Browse and filter loads by priority, customer, and location
- **AI Recommendations**: Get top 5 driver-vehicle recommendations for each load with detailed explanations
- **Auto-Optimization**: Batch optimize all unassigned loads with one click
- **Interactive Map**: Visualize fleet and load positions in real-time
- **Activity Feed**: Track all dispatch operations and system events
- **Manual Assignment**: Override AI recommendations when needed

### Manager Dashboard
- **Real-time KPIs**: Track on-time delivery rate, fleet utilization, cost per mile, and more
- **Performance Trends**: Historical charts showing key metrics over time
- **Driver Leaderboard**: Identify top performers based on ratings and on-time delivery
- **Fleet Utilization**: Visualize capacity usage throughout the day
- **SLA Monitoring**: Track service level agreement compliance

### Core Engine
- **Optimization Algorithm**: Greedy initialization + local search improvement
- **Constraint Management**: Hard and soft constraints (capacity, HOS, time windows, equipment)
- **Scoring System**: Multi-factor compatibility scoring with explainability
- **ETA Calculation**: Distance-based ETA with traffic estimation
- **Cost Optimization**: Minimize total cost, deadhead miles, and SLA penalties

## Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express
- **Data**: In-memory storage with mock data generators
- **Algorithm**: JavaScript-based heuristic optimizer

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install Backend Dependencies**
```bash
cd backend
npm install
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

### Running the Application

1. **Start Backend Server** (Terminal 1)
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:3001`

2. **Start Frontend Development Server** (Terminal 2)
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

3. **Open in Browser**
Navigate to `http://localhost:3000`

## Usage Guide

### Dispatching Loads

1. **View Unassigned Loads**: On the Dispatcher Console, browse loads in the left panel
2. **Select a Load**: Click on any load to see AI recommendations
3. **Review Recommendations**: Examine top driver-vehicle matches with explanations
4. **Assign Load**: Click "Assign" button on a recommendation
5. **Auto-Optimize**: Click "Auto-Optimize" to batch assign all loads

### Monitoring Performance

1. **Switch to Dashboard**: Click "Manager Dashboard" in the top navigation
2. **View KPIs**: Monitor real-time metrics in the overview cards
3. **Analyze Trends**: Review performance charts for historical insights
4. **Check Drivers**: See top performers in the leaderboard

## API Endpoints

### Loads
- `GET /api/loads` - Get all loads
- `GET /api/loads/unassigned` - Get unassigned loads
- `GET /api/loads/:id` - Get load by ID
- `POST /api/loads` - Create new load
- `PUT /api/loads/:id` - Update load

### Drivers
- `GET /api/drivers` - Get all drivers
- `GET /api/drivers/available` - Get available drivers
- `PUT /api/drivers/:id` - Update driver

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/available` - Get available vehicles

### Optimization
- `POST /api/optimize` - Run optimization algorithm
- `POST /api/optimize/apply` - Apply optimization results
- `POST /api/recommend` - Get recommendations for a load

### Analytics
- `GET /api/kpis/current` - Get current KPIs
- `GET /api/kpis/historical` - Get historical KPIs
- `GET /api/audit-log` - Get audit log entries

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
├──────────────┬──────────────┬─────────────┬─────────────┤
│ Dispatcher   │  Manager     │  Data       │ Simulation  │
│ Console      │  Dashboard   │  Management │ Engine      │
└──────────────┴──────────────┴─────────────┴─────────────┘
                         │
                    REST API
                         │
┌─────────────────────────────────────────────────────────┐
│                   Node.js Backend                        │
├──────────────┬──────────────┬─────────────┬─────────────┤
│ Optimization │ Constraint   │ ETA         │ Scoring     │
│ Engine       │ Validator    │ Calculator  │ Engine      │
└──────────────┴──────────────┴─────────────┴─────────────┘
```

## Optimization Algorithm

### Phase 1: Greedy Assignment
1. Sort loads by priority (urgent → high → medium → low)
2. For each load, find best available driver-vehicle pair
3. Score each combination using multi-factor scoring
4. Assign if score meets minimum threshold (40+)

### Phase 2: Local Search
1. Try swap moves (exchange drivers between assignments)
2. Try relocate moves (reassign to better driver-vehicle)
3. Accept improvements that reduce total cost
4. Iterate until no more improvements found

### Scoring Factors
- **Proximity** (30%): Distance from driver to pickup location
- **Capacity** (15%): Load weight/volume vs vehicle capacity
- **Time Window** (25%): Ability to meet pickup/delivery windows
- **HOS** (15%): Driver hours of service availability
- **Historical** (15%): Driver rating and on-time performance

## Mock Data

The POC includes realistic mock data:
- **75 Loads**: Varied priorities, US cities, time windows
- **18 Drivers**: Different skills, HOS, locations, ratings
- **18 Vehicles**: Multiple types with capacity variations
- **Constraints**: 6 default rules (4 hard, 2 soft)
- **Historical Data**: 30 days of KPI trends

## Future Enhancements

- Real TMS/ERP integration
- Production-grade solver (OR-Tools, Gurobi)
- Mobile driver app
- Real GPS tracking
- Machine learning for demand forecasting
- Multi-depot optimization
- Carbon footprint tracking
- Dynamic pricing

## License

Proprietary - For POC demonstration purposes only

## Support

For questions or issues, contact the development team.

