# AstroConnect

AstroConnect is a full-stack web application that calculates compatibility between two individuals based on their birth details. The application uses a simplified Ashtakoota matching system and provides a compatibility score, verdict, and match history.

> **Note:** The astrological calculation logic is intentionally simplified for this project. 
---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Logout

## Match Compatibility

- Create a compatibility match
- Individual Koot score breakdown
- Total compatibility score (Out of 36)
- Compatibility verdict
- Match history
- Match detail view

---

# Tech Stack

## Backend

- Python
- Django
- Django REST Framework
- JWT Authentication
- MySQL

## Frontend

- React.js
- Redux Toolkit (React Redux)
- Axios
- React Router

## Tools

- Docker
- Postman
- Git & GitHub

---

# Project Structure

```
AstroConnect
│
├── backend
│   ├── accounts
│   ├── matching
│   ├── config
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── requirements.txt
│   └── manage.py
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Backend Setup

## Clone Repository

```bash
git clone <repository-url>
```

```bash
cd AstroConnect/backend
```

## Create Virtual Environment

```bash
python -m venv astrovenv
```

## Activate Virtual Environment

Windows

```bash
astrovenv\Scripts\activate
```

## Install Dependencies

```bash
pip install -r requirements.txt
```

## Create .env

Example

```env
SECRET_KEY=your_secret_key

DEBUG=True

ALLOWED_HOSTS=127.0.0.1,localhost

CORS_ALLOWED_ORIGINS=http://localhost:5173

ACCESS_TOKEN_MINUTES=30
REFRESH_TOKEN_DAYS=7

COOKIE_SECURE=False
COOKIE_SAMESITE=Lax

DB_NAME=astroconnect
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=3306
```

## Run Migrations

```bash
python manage.py migrate
```

## Start Backend

```bash
python manage.py runserver
```

Backend URL

```
http://127.0.0.1:8000/
```

---

# Frontend Setup

Go to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# Docker (Backend)

The Django backend is Dockerized.

Build Docker image

```bash
docker compose build
```

Run container

```bash
docker compose up
```

> **Note:** Only the Django backend is Dockerized. The application connects to a locally running MySQL database using the database configuration provided in the `.env` file.

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register/` | Register User |
| POST | `/api/login/` | Login |
| POST | `/api/refresh/` | Refresh Access Token |
| POST | `/api/logout/` | Logout |

---

## Matching

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/match/` | Create Match |
| GET | `/api/history/` | Match History |
| GET | `/api/history/<id>/` | Match Details |

---

# Testing

Run unit tests

```bash
python manage.py test
```

Current tests include:

- User creation test
- Match creation test
- Match API response test

---



# Assumptions

- Real astrological calculations are not implemented.
- Koot scores are generated using simplified logic.
- Maximum compatibility score is 36.
- Verdict is determined from the total score.

---

# Future Improvements

- Accurate Ashtakoota calculations
- Birth chart generation
- OAuth Login
- Email Verification
- Password Reset
- Dockerize frontend
- Dockerize database
- Deployment using Gunicorn and Nginx

---

# Author

**AGHOSH PR**