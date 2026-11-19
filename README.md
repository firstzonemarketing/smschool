# SM English School — Website & Laravel Admin Portal

Complete modern educational website and protected **Laravel + React** Admin Portal for **SM English School**, Hoodi, Bangalore (`SM Education Society`, Est. 1965).

## Architecture

- **Frontend (`/src`, `/public/assets`)**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React, React Router v7
- **Backend (`/backend`)**: Laravel 13 API, Laravel Sanctum token authentication, `EnsureAdmin` middleware, SQLite database (MySQL/PostgreSQL ready via `backend/.env`), and Laravel public disk file storage (`storage/app/public/gallery`).
- **Authentic Assets**: 71 curated, visually verified, deduplicated original photographs, school emblem, and decorative assets crawled from `https://smschool.co.in/` (documented in [`IMAGE_INVENTORY.md`](./IMAGE_INVENTORY.md)).

## Running Locally

1. **Start the Laravel API backend** (port `8088`):
   ```bash
   cd backend
   php artisan migrate --seed
   php artisan serve --host=127.0.0.1 --port=8088
   ```
2. **Start the React + Vite frontend** (port `5173`, proxies `/api` and `/storage` to Laravel):
   ```bash
   npm install
   npm run dev
   ```
3. **Open the Website & Admin Panel**:
   - Public Website: `http://127.0.0.1:5173/`
   - Admin Portal: `http://127.0.0.1:5173/admin`
   - Default Admin Login (change immediately in **Account Settings** or via `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `backend/.env`):
     - Email: `admin@smschool.co.in`
     - Password: `SmSchool@2026`
