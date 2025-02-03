FROM node:20

WORKDIR /app

COPY . .

# Prepare the app
RUN npm ci

# Generate prisma client
RUN npm run build:db

# Populate DB
RUN npx prisma db seed

CMD [ "npm", "run", "start:dev" ]