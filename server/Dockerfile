FROM node:slim

LABEL srengin <susan.engin@gmail.com>

WORKDIR /app

COPY package.json .
RUN npm install

COPY . ./

CMD ["node", "index.js"]
