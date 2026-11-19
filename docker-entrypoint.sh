#!/usr/bin/env bash
set -euo pipefail

cd /var/www/backend

# Ensure .env exists for artisan commands
if [ ! -f .env ]; then
  cp .env.example .env
fi

# Generate APP_KEY if not supplied via environment variable
if [ -z "${APP_KEY:-}" ]; then
  php artisan key:generate --force
fi

# Ensure SQLite file exists when using sqlite driver
if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
  DB_FILE="${DB_DATABASE:-/var/www/backend/database/database.sqlite}"
  mkdir -p "$(dirname "$DB_FILE")"
  touch "$DB_FILE"
fi

# Run migrations and seed idempotently (DatabaseSeeder uses updateOrCreate & checks GalleryImage::count())
php artisan migrate --force
php artisan db:seed --force

# Cache routes & views for production speed
php artisan config:clear
php artisan route:cache
php artisan view:cache

echo "Starting SM English School (Laravel + React) on 0.0.0.0:${PORT:-8080}..."
exec php artisan serve --host=0.0.0.0 --port="${PORT:-8080}"
