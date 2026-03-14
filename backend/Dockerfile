FROM node:25 AS build

RUN npm install -g pnpm

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./

COPY ./src ./src

RUN pnpm install
RUN pnpm build

FROM gcr.io/distroless/nodejs24-debian13

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3030

CMD ["dist/server.js"]