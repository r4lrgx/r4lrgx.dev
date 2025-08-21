ARG APP_PKG_NAME=r4lrgx.dev

FROM node:23-alpine

WORKDIR /app

RUN apk add vips vips-tools curl
RUN apk info -L vips
RUN vips --version

ENV NODE_ENV=production
ENV npm_config_sharp_libvips=system

RUN corepack enable \
  && corepack prepare pnpm@latest --activate

COPY . .

RUN pnpm install --recursive

CMD ["pnpm", "run", "start"]
