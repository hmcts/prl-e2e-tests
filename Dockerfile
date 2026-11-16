FROM mcr.microsoft.com/playwright:v1.65.1-noble

WORKDIR /prl-e2e-tests/

COPY package.json ./

RUN npm uninstall -g yarn \
    && npm install -g corepack \
    && corepack enable
RUN yarn install
RUN yarn playwright install

COPY . .

ENTRYPOINT [ "/bin/bash", "-l", "-c" ]