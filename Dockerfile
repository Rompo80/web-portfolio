
FROM node:latest

RUN mkdir -p /photorp

WORKDIR /photorp

COPY package.json package-lock.json next.config.js jsconfig.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
