# ---------- Build stage ----------
FROM node:22 AS build

# Instala pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copia apenas arquivos de dependência primeiro (melhora cache)
COPY ./package.json ./
COPY ./tsconfig.json ./

# Instala dependências
RUN pnpm install --frozen-lockfile

# Copia código
COPY src ./src

# Build do TypeScript
RUN pnpm build


# ---------- Runtime stage ----------
FROM gcr.io/distroless/nodejs24-debian13

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3030

CMD ["dist/server.js"]