FROM node:slim

LABEL srengin <susan.engin@gmail.com>

WORKDIR /app

COPY index.js /app/index.js
COPY package.json /app/package.json
COPY dal.js /app/dal.js
COPY admin.js /app/admin.js
COPY serviceaccount.js /app/serviceaccount.js


RUN npm install
