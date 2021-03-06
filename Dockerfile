FROM node:10.15.3-alpine
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

ARG NODE_ENV='qa'
ENV NODE_ENV=$NODE_ENV

RUN npm run build:prod

EXPOSE 3000

CMD [ "npm", "run", "start" ]