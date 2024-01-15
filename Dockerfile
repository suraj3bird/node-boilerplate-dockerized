FROM node:18.19-slim
WORKDIR /usr/src/app
#mysql container looked for openssl
RUN apt-get update && apt-get -y install openssl

COPY package*.json ./

COPY yarn.lock ./
# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

COPY .env.prod .env

# Copy Prisma directory
COPY prisma/ prisma/

# Run the application
CMD ["yarn", "start"]