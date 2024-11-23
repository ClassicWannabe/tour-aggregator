FROM node:20

WORKDIR /app

COPY . .

# Prepare the app
RUN npm install
RUN npm run build:db

CMD [ "npm", "run", "start:dev" ]