import { Config } from "./config.utils";

export interface UtilsFixtures {
  config: Config;
}

export const utilsFixtures = {
  // @ts-expect-error: Suppressing "use implicitly has an 'any' type" error
  config: async ({}, use) => {
    await use(Config);
  },
};
