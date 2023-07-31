FROM node:18-slim

WORKDIR /app

COPY package.json yarn.lock prisma/ ./

RUN yarn install --frozen-lockfile --include=dev

RUN npx prisma generate client

COPY tsconfig.json nodemon.json /app/

COPY src /app/src

ARG BACKEND_PORT

EXPOSE ${BACKEND_PORT}

CMD [ "yarn", "dev" ]
