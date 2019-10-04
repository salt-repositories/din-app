FROM node:alpine AS build
WORKDIR /opt
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM node:alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /opt/package.json .
COPY --from=build /opt/yarn.lock .
COPY --from=build /opt/.next ./.next
COPY --from=build /opt/src ./src
COPY --from=build /opt/pages ./pages
COPY --from=build /opt/static ./static
RUN yarn
ENTRYPOINT ["yarn", "start"]
