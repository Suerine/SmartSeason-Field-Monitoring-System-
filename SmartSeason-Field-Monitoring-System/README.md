# SmartSeason Field Monitoring System 🚜🌾

SmartSeason is a high-performance, role-based field monitoring platform designed to bridge the gap between high-level data insights and granular field operations. Built with a premium aesthetic and focused on operational efficiency, it empowers agricultural organizations to manage crops, fields, and agents with surgical precision.

---

## Comprehensive Features

### Administrator Command Center
The Admin suite provides a 360-degree view of the entire agricultural operation, designed for high-stakes decision-making.

- **Advanced Insights Dashboard**:
  - **KPI Analytics**: Real-time tracking of field volume, project velocity, and crop risk levels.
  - **Status Distribution**: Visual breakdowns of fields across various lifecycle stages.
  - **Workload Balancing**: Heatmaps showing agent assignment density to prevent operational bottlenecks.
- **Agent Orchestration Center**:
  - **Global Pulse Feed**: A live, filterable stream of every update logged across the entire organization.
  - **Smart Assignment Engine**: Dedicated panel to identify unassigned fields with one-click "Quick-Bind" agent assignment.
  - **Agent Performance Monitoring**: Tracking activity levels and field success rates.
- **Master Crop Library**:
  - Centralized management of "Crop Archetypes" including optimal temperature, humidity, and soil requirements.
  - **Lifecycle Definition**: Full CRUD management of growth stages, categories, and duration-based care protocols.
- **Field Inventory Management**:
  - Multi-parameter filtering (Status, Location, Agent).
  - High-precision search and audit trail access for every field in the system.

### Field Agent Command Center
Optimized for the field, the Agent dashboard is a task-oriented "Mission Control" designed for speed and clarity.

- **Priority Notification Bar**:
  - **Dynamic Task Routing**: Automatically flags fields that are overdue for stage transitions or ready for harvest.
  - **Inactivity Detection**: Highlights fields that haven't received updates in 72+ hours.
  - **Instant Navigation**: Clickable alerts that jump the agent directly to the field requiring intervention.
- **Growth Map Orchestration**:
  - **Interactive Lifecycle Map**: A horizontal visualization of the crop's journey from "Planted" to "Harvested".
  - **Stage Stepper**: Pulsing visual indicators of current progress vs. remaining milestones.
- **Protocol & Care Panel**: 
  - Direct access to "Stage-Specific Care Instructions" defined by agronomists in the crop library.
- **Field Activity Logging**:
  - Rapid stage updates with structured observation notes.
  - Historical audit stream for individual field contexts.

---

## Technical Architecture

### Frontend (Modern Web Core)
- **React 19 / Vite**: High-speed HMR and optimized bundle delivery.
- **Tailwind CSS**: Custom "Smart Earth" design system with glassmorphism and premium gradients.
- **Recharts**: Dynamic SVG charts for administrative analytics.
- **Lucide React**: Specialized agricultural iconography.
- **State Management**: Context API for secure, session-persistent authentication.

### Backend (Scalable Service Layer)
- **Node.js / Express**: Modular route architecture (Auth, Users, Fields, Crops).
- **MongoDB / Mongoose**: Schema-driven data persistence with deep population for complex relations.
- **JWT Security**: Role-based access control (RBAC) ensuring data silos between admins and agents.
- **Automated Logging**: Timestamped audit trails for all field interventions.

---

## Installation & Execution

### 1. Database Initialization
1.  Navigate to the `backend` directory.
2.  Configure your `.env` with `MONGO_URI`, `PORT`, and `JWT_SECRET`.
3.  **Run the Professional Seed Engine**:
    ```bash
    npm run dev # Ensure server is configured
    node seed.js
    ```
    *This populates the system with professional-grade crop data, pre-assigned agents, and historical field updates for immediate testing.*

### 2. Launching the Platform
- **Backend**: `cd backend && npm run dev` (Runs on Port 5000)
- **Frontend**: `cd frontend && npm run dev` (Runs on Port 5173)

---

## Testing Scenarios

### Scenario A: Admin Oversight
1.  Log in as **Admin** (`admin@smartseason.com`).
2.  Navigate to **Agents** and check the **Global Pulse Feed** for recent activity.
3.  Locate an **Unassigned Field** in the pending panel and bind it to "Samuel Kiprop".
4.  Navigate to the **Crops Library** and adjust the "Flowering" duration for Maize.

### Scenario B: Agent Field Work
1.  Log in as **Agent** (`jane@smartseason.com`).
2.  Observe the **Notification Bar** — click a "Stage Overdue" alert.
3.  On the field details, review the **Care Protocol**.
4.  Log a new update: Move the stage to "Flowering" and add notes about "Increased irrigation due to dry spell".
5.  Verify the **Lifecycle Map** updates immediately.

---

## 📄 Licensing
SmartSeason is released under the ISC License. Designed and developed for the modern digital farm.
