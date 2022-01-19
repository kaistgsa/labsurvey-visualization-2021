FROM node:16-slim as builder

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

FROM caddy:2
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app /app
