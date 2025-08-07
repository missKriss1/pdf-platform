# Этап сборки
FROM node:22-alpine AS builder

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Сборка TypeScript
RUN npm run build

# Этап запуска
FROM node:22-alpine AS production

WORKDIR /app

# Копируем только собранный dist-код и нужные файлы
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

# Указываем переменные окружения
ENV NODE_ENV=production

# Запускаем продакшн сервер
CMD ["node", "dist/main.js"]
