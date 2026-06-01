# syntax=docker/dockerfile:1
FROM node:24-alpine AS build
WORKDIR /app

ARG BASE_URL
ARG PIPEDRIVE_API_URL
ENV BASE_URL=$BASE_URL
ENV PIPEDRIVE_API_URL=$PIPEDRIVE_API_URL

COPY package*.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund --no-update-notifier
COPY src/ ./src/
COPY server/ ./server/
COPY public/ ./public/
COPY nuxt.config.ts ./

RUN --mount=type=secret,id=DATOCMS_API_READ_TOKEN,env=DATOCMS_API_READ_TOKEN \
  --mount=type=secret,id=POSTMARK_API_TOKEN,env=POSTMARK_API_TOKEN \
  --mount=type=secret,id=PREVIEW_SECRET,env=PREVIEW_SECRET \
  --mount=type=secret,id=PIPEDRIVE_API_TOKEN,env=PIPEDRIVE_API_TOKEN \
  --mount=type=secret,id=AKISMET_API_TOKEN,env=AKISMET_API_TOKEN \
  npm run build

FROM node:24-alpine AS runtime
WORKDIR /app

COPY --from=build /app/.output ./

ENV PORT=80
EXPOSE 80

CMD ["node", "server/index.mjs"]
