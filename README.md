# PDF Platform

## _Платформа для создания и просмотра PDF-отчетов с фронтендом на Vite и бекендом на NestJS с PostgreSQL, упакованная в Docker._

## **Используемые технологии**

Frontend: Vite, React, TailwindCSS
Backend: NestJS, PostgreSQL
Контейнеризация: Docker, Docker Compose

## **Быстрый старт**
1. Клонирование репозитория
   git clone git@github.com:missKriss1/pdf-platform.git
   cd pdf-platform
2. Настройка окружения
   Создайте .env файлы для backend и frontend с нужными переменными

## **Запуск проекта локально**

Backend — запуск локально

Установка зависимостей
cd backend
npm install

Запуск миграций базы данных
Миграции создают и обновляют структуру БД (PostgreSQL).
npm run migration:run

Запуск сервера разработки
npm run dev

Frontend — запуск локально
В новом терминале:
cd frontend
npm install
npm run dev
Откроется локальный сервер, обычно на http://localhost:5173.

## **Запуск проекта на удалённом сервере**
1. Подключение к серверу
   Подключитесь к серверу по SSH:ssh root@134.209.67.28
2. Обновление кода на сервере
   Перейдите в папку с проектом, если вы не в ней, например:cd pdf-platform 
3. Затем стяните последние изменения с GitHub:git pull origin main 
4. Запуск Docker-контейнеров на сервере
   Запустите сборку и запуск контейнеров:docker compose up --build -d

Если столкнулись с ошибкой, что порт 3000 уже занят, проверьте, какие процессы используют этот порт:lsof -i :3000

Завершите ненужные контейнеры или процессы, которые блокируют порт:docker rm -f <container_id>
Или:kill <pid>

После освобождения порта, снова запустите:docker compose up --build -d

Проверка состояния контейнеров
Чтобы просмотреть логи какого-либо контейнера:docker logs <container_name>

Основные полезные команды Docker
docker compose up --build -d	Собрать и запустить контейнеры в фоне
docker compose down --remove-orphans --volumes	Остановить и удалить контейнеры и тома
docker ps	Показать запущенные контейнеры
docker logs <container_name>	Просмотр логов контейнера
lsof -i :<port>	Проверить, что занимает порт
docker rm -f <container_id>	Удалить контейнер

Дополнительно
Убедитесь, что на сервере установлены Docker и Docker Compose.

Для удобства можно создать alias для подключения по SSH, например в ~/.ssh/config:nginx

Host pdf-server
HostName 134.209.67.28
User root
Тогда подключение упростится: ssh pdf-server

## Если все успешно запустилось сервер будет работать по этой ссылке http://134.209.67.28:3000/
Стили фронтенда на сервере пока не до конца готовы — они находятся в процессе доработки.

