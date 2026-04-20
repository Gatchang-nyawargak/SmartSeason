# 🌱 SmartSeason — Field Monitoring System

A full-stack web application for tracking crop progress across multiple fields during a growing season. Built for agricultural coordinators and field agents to manage, monitor, and update field statuses in real time.

---

## 📸 Screenshots

| Admin Dashboard | Agent Dashboard | Field Details |
|---|---|---|
| Overview of all fields, status breakdown, agent updates | Assigned fields with stage badges and risk indicators | Update growth stage, log observations, view history |

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| Fonts/Icons | Manrope, Public Sans, Material Symbols Outlined |

---

## 🗂️ Project Structure

```
smartseason/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   ├── pool.js          # PostgreSQL connection pool
│   │   │   ├── schema.sql       # Database schema
│   │   │   └── status.js        # Field status logic
│   │   ├── middleware/
│   │   │   └── auth.js          # JWT authentication middleware
│   │   ├── routes/
│   │   │   ├── auth.js          # Login / register endpoints
│   │   │   ├── fields.js        # Field CRUD + updates
│   │   │   └── users.js         # User management
│   │   └── index.js             # Express app entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TopBar.tsx        # Fixed top navigation bar
    │   │   ├── SideNav.tsx       # Desktop sidebar navigation
    │   │   └── BottomNav.tsx     # Mobile bottom navigation
    │   ├── pages/
    │   │   ├── AdminDashboard.tsx   # Coordinator overview
    │   │   ├── AgentDashboard.tsx   # Field agent view
    │   │   ├── CreateField.tsx      # New field registration form
    │   │   └── FieldDetails.tsx     # Field update & history
    │   ├── App.tsx               # React Router setup
    │   ├── main.tsx
    │   └── index.css             # Tailwind + design system tokens
    ├── index.html
    └── package.json
```

---

## 👥 User Roles

| Role | Capabilities |
|---|---|
| **Admin (Coordinator)** | View all fields, monitor all agent updates, register new fields, see status breakdown |
| **Field Agent** | View assigned fields, update growth stages, add observation notes |

---

## 🌾 Field Stages & Status

**Growth Stages:** `Planted → Growing → Ready → Harvested`

**Field Status:**
- 🟢 **Active** — Field is in a growth phase
- 🔴 **At Risk** — Pest alerts or moisture drops detected
- ✅ **Completed** — Harvest cycle finished

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

Run the database schema:
```bash
psql -U postgres -d smartseason -f src/db/schema.sql
```

Start the server:
```bash
npm run dev       # development (nodemon)
npm start         # production
```

The API runs on `http://localhost:5000` by default.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/api/fields` | List all fields | ✅ |
| `POST` | `/api/fields` | Create a new field | ✅ Admin |
| `GET` | `/api/fields/:id` | Get field details | ✅ |
| `PUT` | `/api/fields/:id` | Update field stage/status | ✅ |
| `GET` | `/api/users` | List all users/agents | ✅ Admin |

---

## 🎨 Design System

The UI follows a custom agricultural Material Design 3 theme:

- **Primary:** `#164212` (deep forest green)
- **Secondary:** `#5d604b` (earth tone)
- **Tertiary:** `#003c63` (deep blue)
- **Error/At Risk:** `#ba1a1a`
- **Background:** `#f8faf6` (off-white)
- **Fonts:** Manrope (headlines) + Public Sans (body)
- **Icons:** Google Material Symbols Outlined

---

## 📄 License

MIT
