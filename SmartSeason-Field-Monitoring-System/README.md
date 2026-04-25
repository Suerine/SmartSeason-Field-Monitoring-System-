# SmartSeason Field Monitoring System 🚜🌾

SmartSeason is a high-performance, role-based field monitoring platform designed to bridge the gap between data insights and field operations. Built with a premium aesthetic and a focus on efficiency, it empowers Administrators with high-level insights and Field Agents with actionable task management.

---

## Key Features

### Administrator Dashboard
- **KPI Overview**: Real-time tracking of total fields, active projects, and at-risk crops.
*   **Urgent Attention Feed**: Automatically flags fields that require immediate intervention based on status updates or agent silence.
- **Crop Health Analysis**: Visual breakdown of field health distributed across different crop types.
- **Agent Workload Tracking**: Monitor the number of fields assigned to each agent to ensure balanced operations.

### Field Agent Dashboard
- **Priority Notification Bar**: A dynamic alert system that highlights overdue stages, harvest readiness, and inactivity directly at the top of the screen.
- **Interactive Growth Map**: A horizontal lifecycle visualization that tracks crops from Planting to Harvest, inspired by professional agricultural mapping.
- **Detailed Field Panels**: Access stage-specific care instructions (Protocols) and log field observations with ease.
- **Activity Stream**: A vertical audit log of all updates made to a field, ensuring a clear history of interventions.

---

## Tech Stack

### Frontend
- **React 19** with **Vite** for lightning-fast development and optimized builds.
- **Tailwind CSS** for a bespoke, premium design system.
- **Lucide React** for consistent, modern iconography.
- **Recharts** for interactive data visualizations.
- **Axios** for robust API communication.

### Backend
- **Node.js & Express** providing a scalable RESTful API.
- **MongoDB & Mongoose** for flexible, document-based data modeling.
- **JWT (JSON Web Tokens)** for secure, role-based authentication.
- **Bcrypt.js** for industry-standard password hashing.

---

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance

### 1. Clone the Repository
```bash
git clone https://github.com/Suerine/SmartSeason-Field-Monitoring-System-.git
cd SmartSeason-Field-Monitoring-System
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_super_secret_key
```
**Seed the Database**:
```bash
node seed.js
```
*Note: This will clear existing data and populate the database with professional-grade crop data, agents, and fields.*

**Start the Server**:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

**Start the Frontend**:
```bash
npm run dev
```

---

## Testing the Application

### 1. Authentication
- **Admin Access**: Log in using `admin@smartseason.com` / `admin123`.
- **Agent Access**: Log in using `jane@smartseason.com` / `agent123`.

### 2. Monitoring Workflow
1. **As Admin**: Navigate to "Admin Insights" to view the global health of the fields.
2. **As Agent**: 
   - Open the "Agent Dashboard".
   - Check the **Notification Bar** for fields requiring attention.
   - Click a notification to jump directly to that field.
   - Use the **Update Form** to transition a crop to its next growth stage (e.g., from "Vegetative" to "Flowering").
   - Observe the **Growth Map** updating in real-time.

