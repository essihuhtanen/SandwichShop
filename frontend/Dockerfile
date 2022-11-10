
# Base image
FROM node:17-alpine
WORKDIR /app
COPY package.json .
# Install dependencies ignoring peer dependency issues
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 4000
CMD ["npm", "start"]