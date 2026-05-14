# Full Stack Laravel + React Project

## Features
- Authentication (Sanctum)
- Role-based Access (Admin/User)
- User Management (CRUD)
- Profile Update System
- Notifications System
- Admin Dashboard
- React Frontend

---
###Test Credentials
Admin

Email: admin@example.com

Password: password

---

## Installation

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
