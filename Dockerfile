FROM node:8.11.4

WORKDIR /srv
ADD . .
RUN npm install

EXPOSE 80
CMD ["node", "index.js"]
