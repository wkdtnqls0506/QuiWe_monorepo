FROM node:21-alpine AS deps
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

RUN pnpm install 

FROM deps AS builder
WORKDIR /app
COPY . . 

COPY apps/client/package.json ./apps/client/package.json

RUN pnpm install
RUN pnpm run build 

FROM node:21-alpine AS runner
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/apps/client/public ./apps/client/public

COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/client/.next/static ./apps/client/.next/static

EXPOSE 3000

CMD ["node", "apps/client/server.js"]