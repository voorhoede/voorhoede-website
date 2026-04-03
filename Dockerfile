FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund --no-update-notifier
COPY . .
RUN npm run build

FROM node:24-alpine AS runtime
WORKDIR /app
COPY --from=build /app/.output ./

ENV PORT=80
EXPOSE 80

CMD ["node", "server/index.mjs"]
