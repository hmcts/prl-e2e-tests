FROM mcr.microsoft.com/playwright:v1.57.0-noble

WORKDIR /prl-e2e-tests/

COPY package.json ./

RUN corepack enable
RUN yarn install
RUN yarn playwright install

COPY . .

ENTRYPOINT [ "/bin/bash", "-l", "-c" ]