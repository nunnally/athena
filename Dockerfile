FROM node:10
WORKDIR /docker/athena
COPY package.json /docker/athena
RUN npm install
COPY . /docker/athena
CMD node index.js
EXPOSE 8081