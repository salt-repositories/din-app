FROM node AS build
WORKDIR /opt
COPY package.json yarn.lock ./
RUN yarn
COPY . .
ENV NODE_ENV=production
RUN yarn build

FROM node:alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /opt/package.json .
COPY --from=build /opt/yarn.lock .
COPY --from=build /opt/.next ./.next
COPY --from=build /opt/public ./public
RUN yarn
ENTRYPOINT ["yarn", "start"]
