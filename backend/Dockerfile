FROM node:20

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build:db

#RUN npm run migrate:db

CMD [ "npm", "run", "start:dev" ]