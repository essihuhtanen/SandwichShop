
FROM node:17.3.0

WORKDIR /server

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]