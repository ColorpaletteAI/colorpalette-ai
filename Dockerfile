ARG NODE_VERSION=node:18

FROM $NODE_VERSION AS dependency-base

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# copy the app, note .dockerignore
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY prisma/schema.prisma prisma/schema.prisma
RUN yarn prisma generate

FROM dependency-base AS production-base

# build will also take care of building
# if necessary
COPY . .
RUN yarn build

FROM $NODE_VERSION AS production

COPY --from=production-base /app/.output /app/.output

# Service hostname
ENV NUXT_HOST=0.0.0.0

# Service version
ARG NUXT_APP_VERSION
ENV NUXT_APP_VERSION=${NUXT_APP_VERSION}

# Run in production mode
ENV NODE_ENV=production

# start the app
CMD [ "node", "/app/.output/server/index.mjs" ]
