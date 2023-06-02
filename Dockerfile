FROM node:20.2.0 AS frontend-build

WORKDIR /usr/src/app

RUN corepack enable
RUN corepack prepare pnpm@8.5.1 --activate
RUN pnpm config set auto-install-peers true
RUN pnpm config set strict-peer-dependencies false
COPY frontend/package.json .
COPY frontend/e3-sdk-1.0.10.tgz .
RUN pnpm install
COPY frontend/ .
RUN pnpm run build

FROM node:20.2.0 AS backend-build

WORKDIR /root/backend

RUN corepack enable
RUN corepack prepare pnpm@8.5.1 --activate
RUN pnpm config set auto-install-peers true
RUN pnpm config set strict-peer-dependencies false
COPY --from=frontend-build /usr/src/app/dist ../frontend/build
COPY backend/package.json .
RUN pnpm install
COPY backend/server.js .

EXPOSE 80

CMD ["node", "./server.js"]