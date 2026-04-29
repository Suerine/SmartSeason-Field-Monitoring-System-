# SmartSeason — Field Monitoring System

A web application for tracking crop progress across multiple fields during a growing season. Built for the SmartSeason technical assessment.

**Live demo:** [smart-season-field-monitoring-syste-one.vercel.app](https://smart-season-field-monitoring-syste-one.vercel.app)

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin (Coordinator) | admin@smartseason.com | admin123 |
| Field Agent | jane@smartseason.com | agent123 |
| Field Agent | brian@smartseason.com | agent123 |
| Field Agent | samuel@smartseason.com | agent123 |
| Field Agent | fatuma@smartseason.com | agent123 |

---

## What It Does

SmartSeason gives coordinators and field agents a shared view of what's happening across all active plots — without anyone having to chase updates over WhatsApp.

**Coordinators (Admin) can:**
- See all fields across all agents in one place
- Spot which fields are at risk before they become a problem
- Create new fields and assign them to agents
- Monitor which agents are active and which have gone quiet
- View a breakdown of field health across crops and agents
- Add new crops
- Add new agents

**Field Agents can:**
- See only the fields assigned to them
- Log observations and update the stage of each field
- Get notified when a field is approaching its next growth stage
- See care instructions specific to the current stage of each crop

---

## How Field Status Works

Every field has a computed status — it's never stored, always calculated fresh from the field's data. This means it's always accurate.

**Active** — the field has been updated recently and is progressing on schedule.

**At Risk** — triggered by either of two conditions:
1. The agent hasn't logged an update in more than 7 days
2. The field has been in its current growth stage longer than the crop's expected duration for that stage

**Completed** — the field's current stage is mapped to the "Harvested" category.

### Stage tracking -> Go to Fields section and click on a field to see full details.

Each crop in the system has detailed growth stages with expected durations (e.g. Maize: Germination → 7 days, Vegetative → 40 days, Flowering → 20 days). The system uses these durations to calculate:

- How far through the current stage a field is (shown as a progress bar)
- How many days until the next stage transition
- Whether a field is approaching a transition (alert within 3 days) or overdue

Agents get a suggestion banner when a stage transition is approaching. Only the assigned agent can advance the stage — admins see the same alert but cannot action it themselves.

### Why stages use a category system

Crop stages in the real world are more granular than four buckets. A Maize plant goes through Germination, Vegetative, Flowering, Grain Fill — but the system's core lifecycle is Planted → Growing → Ready → Harvested.

Each crop stage has both a `stageName` (the agronomist-level label) and a `category` (the system bucket it maps to). This means the system can track fine-grained progress while still producing consistent status calculations across different crops.

---

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, Recharts, React Router, Axios

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT

**Deployed on:** Vercel (frontend) + Render (backend) + MongoDB Atlas (database)

---

## Running Locally

### Prerequisites
- Node.js 18+
- A MongoDB Atlas account (free tier works fine)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start the server:

```bash
npm run dev
```

Seed the database with demo data:

```bash
node seed.js
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Project Structure

```
SmartSeason/
  backend/
    models/
      User.js          # Role-based user schema (admin / agent)
      Field.js         # Field schema with embedded update history
      Crop.js          # Crop schema with granular growth stages
    routes/
      authRoutes.js    # Login, register, /me
      fields.js        # Field CRUD + meta endpoints
      cropsRoutes.js   # Crop management
    middleware/
      authMiddleware.js  # JWT verification + role guard
    utils/
      fieldStatus.js   # Status engine — getFieldStatus, getStageInfo
    seed.js            # Demo data: 4 agents, 12 crops, 16 fields
    server.js
  frontend/
    src/
      pages/           # Login, AdminDashboard, AgentDashboard, FieldDetail, Fields
      components/
        dashboard/     # KPI cards, charts, urgent feed
        fields/        # Field cards, stage timeline, filters
      context/
        AuthContext.jsx
      api.js           # Axios instance with JWT interceptor
```

---

## Design Decisions

**Status is computed, not stored.** Storing status creates drift — the DB says Active but the field hasn't been touched in two weeks. Computing it on every read from raw data means it's always correct. The trade-off is a slightly heavier read, which is acceptable at this scale.

**Crop stages have a category mapping.** Rather than locking stages to four fixed names, each stage has a `stageName` (what agronomists actually call it) and a `category` (one of the four system buckets). This lets the system handle crops with very different lifecycle terminology — Rice goes through Transplanting and Panicle Initiation, Maize goes through Germination and Tasseling — while still producing consistent status logic.

**Agents can only advance their own fields.** The system suggests stage transitions based on expected durations, but only the assigned agent can confirm them. Admins see the same alerts but cannot act on them. This keeps accountability clear — if a stage advances, it's because the agent on the ground confirmed it.

**Update history is append-only.** Every stage change and observation note is stored as a timestamped entry. Nothing is ever edited or deleted. This gives a full audit trail of what happened on each field and when.

**JWT with 7-day expiry.** Agents are often in the field on mobile — forcing daily re-logins would be disruptive. Seven days balances security with usability for the expected use pattern.

---

## Assumptions Made

- Location is not a required field on fields. The assessment didn't specify it, so it's optional and defaults to a display value in the UI. A future version would add GPS coordinates.
- Email-based notifications (push alerts when a stage is approaching) are out of scope for this build. Alerts surface in the UI on next page load, which is appropriate for an assessment but would need a notification service in production.
- The system assumes one agent per field. Joint assignments are not supported.
- Crop durations in the seed data are realistic approximations, not agronomically certified figures.
