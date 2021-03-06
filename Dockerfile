FROM node:16.3.0

WORKDIR /usr/src/app

RUN npm install -g serve
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

EXPOSE 5000

CMD ["serve", "-s", "build"]