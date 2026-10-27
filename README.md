# 🛡 Aegis Threat Manager

**A simple dashboard for logging security threats, rating how serious each one is, and tracking which are still active.**

Why it exists: a small practice project for building a REST API with Express and a plain JavaScript front end.

## How to run

1. `cd backend && npm install`
2. `node server.js`
3. Open `frontend/index.html` in your browser. Data is kept in memory, so it resets when the server restarts.

---

## Technical details

## Features
- Register, view, update and delete threats
- Severity and category classification
- Threat overview and active threat feed in the dashboard
- Express REST API with an in-memory store

## Tech stack
**Frontend:** HTML · CSS · Vanilla JavaScript
**Backend:** Node.js · Express 5 · CORS

## API
| Method | Endpoint | Description |
|---|---|---|
| GET | `/threats` | List all threats |
| POST | `/threats` | Register a threat (`threatName`, `severity`, `category`) |
| GET | `/threats/:id` | Get one threat |
| PUT | `/threats/:id` | Update a threat |
| DELETE | `/threats/:id` | Delete a threat |

