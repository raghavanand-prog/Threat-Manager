# 🛡 Aegis Threat Manager

A lightweight threat-tracking dashboard: register security threats with a severity and category, view details, and manage an active threat feed through a REST API.

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

## Getting started
```bash
cd backend
npm install
node server.js
```
Then open `frontend/index.html` in your browser.

> Data is stored in memory, so it resets when the server restarts.
