FROM node:alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i

COPY ./src ./src
COPY ./public ./public
COPY ./dataprocessing ./dataprocessing

EXPOSE 3000
CMD ["npm", "start"]