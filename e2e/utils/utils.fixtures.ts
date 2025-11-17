import { Config } from "./config.utils.ts";
import {
  IdamUtils,
  ServiceAuthUtils,
  AxeUtils,
} from "@hmcts/playwright-common";
import { TokenUtils } from "./token.utils.ts";
import { CitizenCACaseUtils } from "./citizenCACase.utils.ts";
import { CourtNavUtils } from "./courtNav.utils.ts";
import { AccessCodeHelper } from "./accessCode.utils.ts";
import { CreateUserUtil } from "./createUser.utils.ts";
import { IdamLoginHelper } from "./idamLoginHelper.utils.ts";
import { CaseEventUtils } from "./caseEvent.utils.js";
import { DateHelperUtils } from "./dateHelpers.utils.js";
import { NavigationUtils } from "./navigation.utils.js";
import { PageUtils } from "./page.utils.js";

export interface UtilsFixtures {
  config: Config;
  idamUtils: IdamUtils;
  tokenUtils: TokenUtils;
  citizenCACaseUtils: CitizenCACaseUtils;
  courtNavUtils: CourtNavUtils;
  accessCodeHelper: AccessCodeHelper;
  createUserUtil: CreateUserUtil;
  idamLoginHelper: IdamLoginHelper;
  serviceAuthUtils: ServiceAuthUtils;

  caseEventUtils: CaseEventUtils;
  axeUtils: AxeUtils;
  dateHelperUtils: DateHelperUtils;
  navigationUtils: NavigationUtils;
  pageUtils: PageUtils;
}

export const utilsFixtures = {
  config: async ({}, use) => {
    await use(Config);
  },
  axeUtils: async ({ page }, use) => {
    await use(new AxeUtils(page));
  },
  idamUtils: async ({}, use) => {
    await use(new IdamUtils());
  },
  serviceAuthUtils: async ({}, use) => {
    await use(new ServiceAuthUtils());
  },
  tokenUtils: async ({ idamUtils }, use) => {
    await use(new TokenUtils(idamUtils));
  },
  citizenCACaseUtils: async ({ serviceAuthUtils, idamUtils }, use) => {
    await use(new CitizenCACaseUtils(serviceAuthUtils, idamUtils));
  },
  courtNavUtils: async ({}, use) => {
    await use(new CourtNavUtils());
  },
  accessCodeHelper: async ({ serviceAuthUtils, tokenUtils }, use) => {
    await use(new AccessCodeHelper(serviceAuthUtils, tokenUtils));
  },
  createUserUtil: async ({}, use) => {
    await use(new CreateUserUtil());
  },
  idamLoginHelper: async ({}, use) => {
    await use(new IdamLoginHelper());
  },
  caseEventUtils: async ({}, use) => {
    await use(new CaseEventUtils());
  },
  dateHelperUtils: async ({}, use) => {
    await use(new DateHelperUtils());
  },
  navigationUtils: async ({ page }, use) => {
    await use(new NavigationUtils(page));
  },
  pageUtils: async ({ page }, use) => {
    await use(new PageUtils(page));
  },
};
