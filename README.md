# DevPulse API

## Live URL

https://devpulse-backend-sandy.vercel.app/

## GitHub Repository

https://github.com/nazmulhossenshanto/devpulse

---

## Features

- User Registration
- User Login with JWT Authentication
- Create Issue
- Get All Issues
- Get Single Issue
- Update Issue
- Delete Issue
- Role-based Authorization (Contributor & Maintainer)
- Issue Filtering & Sorting

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL (NeonDB)
- Raw SQL (pg)
- JWT
- bcrypt

---

## Setup

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file and add:

```env
PORT=5000
DATABASE_URL=YOUR_DATABASE_URL
JWT_ACCESS_SECRET=YOUR_SECRET
JWT_ACCESS_EXPIRES_IN=1d
SALT_ROUNDS=8
```

### Run the Project

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

---

## API Endpoints

### Authentication

- POST `/api/auth/signup`
- POST `/api/auth/login`

### Issues

- POST `/api/issues`
- GET `/api/issues`
- GET `/api/issues/:id`
- PATCH `/api/issues/:id`
- DELETE `/api/issues/:id`

---

## Database Schema

### users

- id
- name
- email
- password
- role
- created_at
- updated_at

### issues

- id
- title
- description
- type
- status
- reporter_id
- created_at
- updated_at