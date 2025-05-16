import { AxeUtils } from "@hmcts/playwright-common";
import { Config } from "./config.utils";
import { page, use } from '@playwright/test'
export interface UtilsFixtures {
  config: Config;
  axeUtils: AxeUtils;
}

export const utilsFixtures = {
  config: async ({}, use) => {
    await use(Config);
  },
  axeUtils: async ({ page }, use) => {
    await use(new AxeUtils(page));
  },
};
