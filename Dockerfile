FROM mcr.microsoft.com/playwright:v1.55.0-noble

WORKDIR /prl-e2e-tests/

COPY package.json ./

RUN corepack enable
RUN yarn install

COPY . .

ENTRYPOINT [ "/bin/bash", "-l", "-c" ]