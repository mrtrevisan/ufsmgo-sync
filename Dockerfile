FROM node:18-alpine as installer
# Create app directory
WORKDIR /app
# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

FROM node:18-alpine
WORKDIR /app
RUN apk update && apk add --no-cache \
        python3 \
        py3-pip \
        less groff \
        jq \
    && pip3 install --upgrade pip \
    && pip3 install --no-cache-dir \
        awscli \
    && rm -rf /var/cache/apk/*

COPY --chown=node:node --from=installer /app/node_modules ./node_modules
# Bundle app source
COPY --chown=node:node . .
RUN chmod -R 755 /app/init_container \
    && chown node:node /app
USER node
ENTRYPOINT ["/app/init_container/startup.sh"]