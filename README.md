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
- [Usage](#usage)  
- [Decisions & Trade-offs](#decisions--trade-offs)  
- [Demo](#demo)  

---

## Project Overview

The **AI-Powered CRM Dashboard** is a full-stack application for managing contacts, tracking activities, and generating AI-based summaries. The application supports role-based authentication and provides a clean, responsive interface for users to interact with their contacts efficiently.

**Core Objectives:**
- Build a real-world CRM application.
- Demonstrate full-stack development skills (React + Node.js + MongoDB).
- Implement clean architecture, state management, and user-friendly UI.
- Evaluate problem-solving and coding practices.

---

## Features

### Authentication
- JWT-based authentication
- Register & Login pages
- Role-based access: Admin / User
- Protected routes

### Contact Management
- CRUD operations: Create, Read, Update, Delete contacts
- Contact fields: Name, Email, Phone, Company, Tags, Notes, Created At
- Form validation
- Search & filter (by name, email, and tags)
- Debounced search (300ms)

### Dashboard
- Total contacts summary
- Contacts grouped by tags
- Last edited contact
- Activity tracking (create, update, delete actions)

### State Management
- Context API for global state
- Contacts, activities, and UI state (theme: light/dark)
- Actions: addContact, updateContact, deleteContact

### Hooks Usage
- useState, useEffect, useMemo, useCallback
- Custom hook: `useDebounce` (for search)

### UI/UX
- Tailwind CSS styling
- Fully responsive (mobile → desktop)
- Loading states (spinners/skeletons)
- Empty states for lists/forms

### AI Feature
- Generate summary of contact notes
- Loading state during processing

### Bonus Features (Optional)
- Theme toggle (light/dark) with persistence
- Bulk delete contacts
- Undo delete (toast notification with timer)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, React Router, Context API, Tailwind CSS |
| Backend | Node.js, Express, JWT, bcryptjs |
| Database | MongoDB Atlas |
| API | RESTful endpoints |
| Tools | Axios, React Icons, Nodemon, dotenv |

---

## Folder Structure

```plaintext
project-root/
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── models/
│   │   ├── User.js
│   │   └── Contact.js
│   ├── routes/
│   └── middleware/
│
├── frontend/
│   ├── public/
│   ├── src/                                // Folder Structure will be updated as the project get updated
│   │   └── App.jsx
│   └── tailwind.config.js
│
├── .env
├── .gitignore
└── README.md