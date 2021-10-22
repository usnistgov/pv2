FROM node:16.10.0 AS frontend-build

WORKDIR /usr/src/app

RUN npm install -g npm
COPY frontend/package.json .
RUN npm install --legacy-peer-deps
COPY frontend/ .
RUN npm run build

FROM node:16.10.0 AS backend-build

WORKDIR /root/backend
RUN npm install -g npm
COPY --from=frontend-build /usr/src/app/build ../frontend/build
COPY backend/package.json .
RUN npm install --legacy-peer-deps
COPY backend/server.js .

EXPOSE 80

CMD ["node", "./server.js"]