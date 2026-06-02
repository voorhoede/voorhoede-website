# syntax=docker/dockerfile:1
FROM node:24-alpine AS build
WORKDIR /app

ARG BASE_URL
ARG PIPEDRIVE_API_URL
ARG ORIGINAL_URL
ENV BASE_URL=$BASE_URL
ENV PIPEDRIVE_API_URL=$PIPEDRIVE_API_URL
ENV ORIGINAL_URL=$ORIGINAL_URL

COPY package*.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund --no-update-notifier
COPY src/ server/ public/ nuxt.config.ts ./

RUN --mount=type=secret,id=datocms_api_read_token,env=DATOCMS_API_READ_TOKEN \
  --mount=type=secret,id=postmark_api_token,env=POSTMARK_API_TOKEN \
  --mount=type=secret,id=preview_secret,env=PREVIEW_SECRET \
  --mount=type=secret,id=pipedrive_api_token,env=PIPEDRIVE_API_TOKEN \
  --mount=type=secret,id=akismet_api_token,env=AKISMET_API_TOKEN \
  npm run build

FROM node:24-alpine AS runtime
WORKDIR /app

COPY --from=build /app/.output ./

ENV PORT=80
EXPOSE 80

CMD ["node", "server/index.mjs"]
