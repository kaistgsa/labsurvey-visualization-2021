FROM node:16-slim as builder
RUN npm install -g pnpm

RUN mkdir /app
WORKDIR /app

COPY . ./

FROM caddy:2
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app /app
