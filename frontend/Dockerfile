# Этап сборки
FROM node:22-alpine AS builder

# Установка рабочего каталога
WORKDIR /app

# Установка зависимостей
COPY package*.json ./
COPY vite.config.* ./
RUN npm install

# Копирование остального кода
COPY . .

# Сборка проекта
RUN npm run build

# Этап продакшен-сервера
FROM nginx:stable-alpine as production

# Удалим дефолтный конфиг nginx
RUN rm /etc/nginx/conf.d/default.conf

# Копируем свой конфиг
COPY nginx.conf /etc/nginx/conf.d

# Копируем собранные файлы с предыдущего этапа
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Старт nginx
CMD ["nginx", "-g", "daemon off;"]