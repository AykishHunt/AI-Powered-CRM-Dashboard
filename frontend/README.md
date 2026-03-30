# AI-Powered CRM Dashboard
 
**Project by:** Ayesha Noor
**Duration:** 22 Hours
**Stack:** React, Node.js, Express, MongoDB Atlas, Tailwind CSS
 
---
 
## Table of Contents
 
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Decisions & Trade-offs](#decisions--trade-offs)
 
---
 
## Project Overview
 
The **AI-Powered CRM Dashboard** is a full-stack application for managing contacts, tracking activities, and generating AI-based summaries of contact notes. The application supports role-based authentication and provides a clean, responsive interface for both admins and regular users.
 
**Core Objectives:**
- Build a real-world CRM application
- Demonstrate full-stack development skills (React + Node.js + MongoDB)
- Implement clean architecture, state management, and user-friendly UI
- Evaluate problem-solving and coding practices
 
---
 
## Features
 
### Authentication
- JWT-based authentication with protected routes
- Register & Login pages
- Role-based access control: **Admin** and **User**
- Redirect after login/logout
 
### Contact Management
- Full CRUD: Create, Read, Update, Delete contacts
- Contact fields: Name, Email, Phone, Company, Tags, Notes, Created At
- Soft delete with undo functionality
- Form validation on all fields
- Admin can assign contacts to specific users
 
### Search & Filters
- Search by name or email (partial + case-insensitive)
- Filter by tag (Client, Lead, VIP)
- Debounced search with 300ms delay
- Search query and filters stored in URL (`/contacts?search=ahmed&tag=Client`)
 
### Dashboard
- Total contacts count
- Contacts grouped by tags (Client, Lead, VIP)
- Last edited contact with timestamp
- Recent activity log (scoped by role)
 
### Activity Tracking
- Automatic logging on create, update, delete
- Stores action type, user, contact name, and timestamp
- Admin sees all users' activity, user sees only their own
- Displayed as a live feed on both dashboards
 
### State Management
- Context API for global state (no prop drilling)
- `ContactContext` — contacts, CRUD actions
- `ActivityContext` — activity log
- `ThemeContext` — light/dark mode with persistence
 
### Hooks Usage
- `useState`, `useEffect`, `useMemo`, `useCallback`
- Custom hook: `useDebounce` for search input
 
### UI/UX
- Tailwind CSS with gradient blue design system
- Fully responsive across mobile, tablet, and desktop
- Loading spinners during data fetching
- Empty states for lists and forms
- Framer Motion animations throughout
 
### AI Feature
- "Generate Summary" button on contact detail page
- Summarizes contact notes using Google Gemini API
- Loading state during generation
- Graceful error handling (empty notes, API failures)
 
### Bonus Features
- Theme toggle (light/dark) with localStorage persistence
- Undo delete via toast notification with 5-second timer
- Bulk delete with select mode toggle (clean UI, no persistent checkboxes)
 
---
 
## Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Context API, Tailwind CSS |
| Backend | Node.js, Express.js, JWT, bcryptjs |
| Database | MongoDB Atlas, Mongoose |
| AI | Google Gemini API |
| HTTP Client | Axios |
| Animations | Framer Motion |
| Notifications | React Hot Toast |
| Dev Tools | Nodemon, dotenv, ESLint |
 
---
 
## Folder Structure
 
TEST/
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   │   ├── DashboardLayout.js
│       │   │   ├── ProtectedRoute.js
│       │   │   └── Sidebar.js
│       │   │
│       │   ├── ActivityLogs.js
│       │   ├── ConfirmModal.js
│       │   ├── ContactModel.js
│       │   ├── ContactTable.js
│       │   ├── CTA.js
│       │   ├── FeatureCard.js
│       │   ├── Features.js
│       │   ├── Footer.js
│       │   ├── Hero.js
│       │   ├── Navbar.js
│       │   ├── Pricing.js
│       │   ├── Stats.js
│       │   ├── Teams.js
│       │   └── Testimonials.js
│       │
│       ├── context/
│       │   ├── ActivityContext.js
│       │   ├── AuthContext.js
│       │   ├── contactContext.js
│       │   └── ThemeContext.js
│       │
│       ├── hooks/
│       │   └── useDebounce.js
│       │
│       ├── pages/
│       │   ├── admin/
│       │   │   ├── AdminContacts.js
│       │   │   └── AdminDashboard.js
│       │   │
│       │   ├── user/
│       │   │   ├── UserContacts.js
│       │   │   └── UserDashboard.js
│       │   │
│       │   ├── Contact.js
│       │   ├── ContactDetails.js
│       │   ├── Dashboard.js
│       │   ├── Home.js
│       │   ├── Login.js
│       │   └── Signup.js
│       │
│       ├── services/
│       │   ├── activityService.js
│       │   ├── authService.js
│       │   ├── contactService.js
│       │   ├── dashboardService.js
│       │   └── userService.js
│       │
│       └── utils/
│           └── api.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── activityController.js
│   │   ├── authController.js
│   │   └── contactController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── Activity.js
│   │   ├── Contact.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── activityRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   ├── activityHelper.js
│   │   └── generateToken.js
│   │
│   ├── .env
│   ├── app.js
│   ├── package.json
│   └── server.js
 
---
 
## Setup Instructions
 
### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com))
 
### Backend Setup
 
```bash
cd backend
npm install
```
 
Create a `.env` file in the `backend/` folder (see [Environment Variables](#environment-variables)), then:
 
```bash
npm run dev
```
 
Backend runs on `http://localhost:5000`
 
### Frontend Setup
 
```bash
cd frontend
npm install
```
 
Create a `.env` file in the `frontend/` folder (see [Environment Variables](#environment-variables)), then:
 
```bash
npm start
```
 
Frontend runs on `http://localhost:3000`
 
---
 
## Environment Variables
 
### Backend `/backend/.env`
 
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```
 
### Frontend `/frontend/.env`
 
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
```
 
---
 
## API Endpoints
 
### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
 
### Contacts
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/contacts` | Protected |
| POST | `/api/contacts` | Protected |
| GET | `/api/contacts/stats` | Protected |
| GET | `/api/contacts/:id` | Protected |
| PUT | `/api/contacts/:id` | Protected |
| DELETE | `/api/contacts/:id` | Protected |
| PUT | `/api/contacts/restore/:id` | Protected |
 
### Activities
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/activities` | Protected |
 
---
 
## Decisions & Trade-offs
 
**Soft Delete over Hard Delete**
Contacts are never permanently removed from the database — a `deleted: true` flag is set instead. This enables the undo delete feature and preserves data integrity for activity logs.
 
**Frontend-side Search & Filter**
Search and filtering happen on the frontend against already-fetched contacts rather than making a new API call on every keystroke. This is faster for small to medium datasets and reduces server load. For very large datasets a backend search would be more appropriate.
 
**Context API over Redux**
Given the scope of this project, Context API with `useReducer`-style patterns was sufficient. Redux would add unnecessary boilerplate for this scale.
 
**Activity Logging via Helper Utility**
Rather than bloating the contact controller with activity logic, a separate `activityHelper.js` utility is called in one line per action. This keeps the controller clean and makes activity logging easy to extend or disable.
 
**Gemini API on Frontend**
The AI summary feature calls the Gemini API directly from the browser. This is acceptable for a demo/project context. In production this call should be proxied through the backend to keep the API key secure.
 
