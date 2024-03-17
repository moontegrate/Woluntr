# Используем официальный образ Node в качестве базового образа
FROM node:alpine as build

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY front/package*.json ./app

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы из текущей директории в рабочую директорию
COPY . .

# Экспонируем порт 3000
EXPOSE 3000

# Команда для запуска сервера Nginx внутри контейнера
CMD ["npm", "start"]