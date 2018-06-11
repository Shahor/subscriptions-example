FROM node:8.11.0

# Install packages in a tmp folder
WORKDIR /tmp
COPY package.json yarn.lock ./

ENV NODE_ENV production
RUN yarn install || \
	((if [ -f /app/yarn-error.log ]; then \
	cat /app/yarn-error.log; \
	fi) && false)


# Move to the production env and link node_modules
WORKDIR /app
COPY ./index.js /app/index.js
COPY ./package.json /app/package.json
RUN ln -s /tmp/node_modules

CMD yarn start
