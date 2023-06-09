# syntax=docker/dockerfile:1
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]