FROM node:20-alpine AS base

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY .env ./.env

RUN npm install

# Build Step
FROM base AS builder 
WORKDIR /app

COPY . .
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env

RUN npm run build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./.env

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["node", "server.js"]

