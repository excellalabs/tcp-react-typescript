FROM node:14.5.0 as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM node:14.5.0 as prod
ENV NODE_ENV production
WORKDIR /app

COPY --from=builder /app/build/ build/
COPY server.js server.js
COPY package*.json ./

RUN npm install express
EXPOSE 3000

CMD ["node", "server.js"]
