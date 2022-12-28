# Vamos a tomar la imagen de node versión 16 como base
FROM node:16.14.0

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

ENTRYPOINT npm run start:prod