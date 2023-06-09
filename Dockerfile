FROM node:lts-hydrogen as common

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN npm i -g pnpm

WORKDIR /home/node/app

FROM common as build

COPY . /home/node/app

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM common as app

COPY --from=build --chown=node:node /home/node/app/dist /home/node/app/dist
COPY --from=build --chown=node:node /home/node/app/public /home/node/app/public
COPY --from=build --chown=node:node /home/node/app/package.json /home/node/app/pnpm-lock.yaml /home/node/app/
COPY --from=build --chown=node:node /home/node/app/node_modules /home/node/app/node_modules

RUN mkdir /home/node/app/data

ENTRYPOINT [ "node", "." ]
