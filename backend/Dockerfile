FROM node:20

WORKDIR /app

COPY . .

# Prepare the app
RUN npm ci

CMD [ "npm", "run", "start:dev" ]