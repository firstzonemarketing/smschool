# =============================================================================
# Stage 1: Build React + Vite Frontend
# =============================================================================
FROM node:22-alpine AS frontend-builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY src ./src
COPY public ./public

RUN npm run build

# =============================================================================
# Stage 2: Production PHP 8.4 + Laravel 13 Runtime
# =============================================================================
FROM php:8.4-cli-alpine AS runtime

RUN apk add --no-cache \
    bash \
    curl \
    git \
    unzip \
    sqlite \
    sqlite-dev \
    libzip-dev \
    oniguruma-dev \
    && docker-php-ext-install pdo pdo_sqlite pdo_mysql mbstring bcmath zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/backend

# Copy Laravel application
COPY backend/composer.json backend/composer.lock* ./
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-scripts

COPY backend/ ./
RUN composer dump-autoload --optimize

# Place built React SPA assets into Laravel public/ and index.html into resources/views/spa.html
COPY --from=frontend-builder /app/dist/index.html /var/www/backend/resources/views/spa.html
COPY --from=frontend-builder /app/dist/assets /var/www/backend/public/assets
COPY --from=frontend-builder /app/dist/robots.txt /var/www/backend/public/robots.txt
COPY --from=frontend-builder /app/dist/sitemap.xml /var/www/backend/public/sitemap.xml

# Prepare writable storage, cache, and database directories
RUN mkdir -p storage/framework/sessions \
    storage/framework/views \
    storage/framework/cache/data \
    storage/logs \
    storage/app/public/gallery \
    bootstrap/cache \
    database \
    && chmod -R 775 storage bootstrap/cache database

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
