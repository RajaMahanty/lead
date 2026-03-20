# Lead Management System (MERN)

This project is built for the **Internship Assignment - Full Stack Developer (MERN)**.

It is a simple CRM where an Admin can register/login and manage leads with status tracking, image upload, and email response support.

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** JWT
- **Validation:** Joi
- **File Upload:** Multer
- **Email:** Nodemailer (SMTP)

---

## Features

### 1) Authentication

- Admin Registration
- Admin Login
- JWT-based protected APIs

### 2) Lead Management

- Add lead (`name`, `email`, `phone`, `status`, optional `image`)
- Edit lead details
- Delete lead
- View all leads
- Update status (`new`, `contacted`, `converted`)

### 3) Response Handling

- Send email to lead from Admin panel
- On successful email send, lead status updates from `new` to `contacted`

### 4) Image Upload

- Image upload using Multer
- Uploaded files served from `/uploads`

### 5) Validation

- Joi request validation for auth, lead create/update/status, and email payload

---

## Project Structure

```
lead/
├── backend/
│   ├── server.js
│   ├── .env.example
│   └── src/
│       ├── app.js
│       ├── config/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── utils/
│       └── validations/
├── frontend/
│   ├── .env.example
│   └── src/
│       ├── api/
│       ├── components/
│       └── pages/
└── README.md
```

---

## Environment Variables

### Backend (`backend/.env`)

Copy from `backend/.env.example`:

```env
PORT=5000
JWT_SECRET=your_super_secret_key
MONGO_URI=your_mongodb_atlas_connection_string

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Lead CRM <your_email@gmail.com>"
```

### Frontend (`frontend/.env`)

Copy from `frontend/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## Setup & Run Instructions

### Prerequisites

- Node.js 18+ (recommended)
- npm
- MongoDB Atlas connection string

### 1) Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# update .env values
npm run dev
```

Backend runs on: `http://localhost:5000`

### 2) Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## API Overview

Base URL: `http://localhost:5000/api/v1`

### Auth

- `POST /auth/register` - register admin
- `POST /auth/login` - login admin

### Leads (JWT Protected)

- `GET /leads` - list leads
- `POST /leads` - create lead (multipart/form-data)
- `PUT /leads/:id` - update lead
- `PATCH /leads/:id/status` - update status
- `DELETE /leads/:id` - delete lead
- `POST /leads/:id/send-email` - send lead email (updates status to `contacted`)

---

## Notes

- Use a valid SMTP account/app password for email sending.
- Uploaded images are stored in `backend/uploads`.
- Protected routes require header:
  - `Authorization: Bearer <token>`
