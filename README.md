# Full Stack Laravel + React Project

This project uses Laravel Sanctum for authentication and ReactJS for frontend UI with role-based access control and notification system.

## Features
- Authentication (Sanctum)
- Role-based Access (Admin/User)
- User Management (CRUD)
- Profile Update System
- Notifications System
- Admin Dashboard
- React Frontend

---
### Test Credentials
Admin

Email: admin@example.com

Password: password

---

## Installation

git clone https://github.com/Navid906/Laravel-react-project.git
cd Laravel-react-project

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```
Frontend
```bash
cd frontend
npm install
npm run dev
```

