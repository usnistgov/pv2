FROM node:18.4.0 AS frontend-build

WORKDIR /usr/src/app

RUN corepack enable
RUN corepack prepare pnpm@7.5.0 --activate
RUN pnpm config set auto-install-peers true
RUN pnpm config set strict-peer-dependencies false
COPY frontend/package.json .
COPY frontend/e3-sdk-1.0.1.tgz .
RUN pnpm install
COPY frontend/ .
RUN pnpm run build

FROM node:18.4.0 AS backend-build

WORKDIR /root/backend

RUN corepack enable
RUN corepack prepare pnpm@7.5.0 --activate
RUN pnpm config set auto-install-peers true
RUN pnpm config set strict-peer-dependencies false
COPY --from=frontend-build /usr/src/app/dist ../frontend/build
COPY backend/package.json .
RUN pnpm install
COPY backend/server.js .

EXPOSE 80

CMD ["node", "./server.js"]