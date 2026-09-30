# Mobile Asset Manager — Backend

Node.js + Express + MongoDB (Mongoose) backend.

## Setup

1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill values (MongoDB URI, JWT secret)
4. `npm run dev` (requires nodemon) or `npm start`

## Structure

```
backend/
  src/
    config/db.js          → MongoDB connection
    models/                → Mongoose schemas (User, Asset)
    controllers/           → Route logic
    routes/                → Express routers
    middleware/             → Auth + error handling
    app.js                 → Express app setup
    server.js               → Entry point
  package.json
  .env.example
```

## API Endpoints

### Auth
- `POST /api/auth/register` — { name, email, password }
- `POST /api/auth/login` — { email, password }
- `GET /api/auth/me` — (auth required) get profile
- `PUT /api/auth/me` — (auth required) update profile

### Assets
All require `Authorization: Bearer <token>` header.
- `GET /api/assets` — list assets
- `POST /api/assets` — create asset { name, category, description, status, value }
- `GET /api/assets/:id` — get single asset
- `PUT /api/assets/:id` — update asset
- `DELETE /api/assets/:id` — delete asset

### Health
- `GET /api/health`
