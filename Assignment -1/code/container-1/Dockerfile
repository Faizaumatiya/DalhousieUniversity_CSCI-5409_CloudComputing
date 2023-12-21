FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "App"]

# Reference:
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/