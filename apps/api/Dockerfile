# 1. Prune unnecessary packages using turbo
FROM node:lts-alpine AS pruner

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker


# 2. Install only necessary dependencies with npm
FROM node:lts-alpine AS installer

WORKDIR /app
COPY --from=pruner /app/out/json .
COPY --from=pruner /app/out/package-lock.json ./package-lock.json
COPY --from=pruner /app/turbo.json ./turbo.json
RUN npm ci

# 3. Build the application
FROM node:lts-alpine AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full .
RUN npm run build

# 4. Create lightweight runner image
FROM node:lts-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/ .

CMD ["node", "apps/api/dist/main"]