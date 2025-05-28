import { Config } from "./config.utils";

export interface UtilsFixtures {
  config: Config;
}

export const utilsFixtures = {
  config: async ({}, use) => {
    await use(Config);
  },
};
