FROM node:24-alpine AS builder-client
WORKDIR /app/coup-client
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY coup-client/package.json coup-client/pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY coup-client/ ./
RUN pnpm build

FROM node:24-alpine AS server-builder
WORKDIR /app/server
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY server/package.json server/pnpm-lock.yaml* ./ 
RUN pnpm install --frozen-lockfile
COPY server/ ./

FROM node:24-alpine
RUN apk add --no-cache nginx
RUN mkdir -p /usr/share/nginx/html/client
WORKDIR /app/server
COPY --from=server-builder /app/server /app/server
COPY --from=builder-client /app/coup-client/build /usr/share/nginx/html/client
EXPOSE 80
COPY nginx.conf /etc/nginx/nginx.conf
COPY start.sh /start.sh
RUN chmod +x /start.sh
CMD ["/start.sh"]
