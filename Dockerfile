FROM mcr.microsoft.com/playwright:v1.58.2-noble

WORKDIR /prl-e2e-tests/

COPY package.json yarn.lock* ./

RUN corepack enable && yarn install --frozen-lockfile

COPY . .

ENTRYPOINT [ "/bin/bash", "-l", "-c" ]