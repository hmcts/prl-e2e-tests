import { Config } from "./config.utils.ts";
import {
  IdamUtils,
  ServiceAuthUtils,
  AxeUtils,
} from "@hmcts/playwright-common";
import { TokenUtils } from "./token.utils.ts";
import { CourtNavUtils } from "./courtNav.utils.ts";
import { AccessCodeHelper } from "./accessCode.utils.ts";
import { CreateUserUtil } from "./createUser.utils.ts";
import { IdamLoginHelper } from "./idamLoginHelper.utils.ts";
import { CaseEventUtils } from "./caseEvent.utils.ts";
import { DateHelperUtils } from "./dateHelpers.utils.ts";
import { NavigationUtils } from "./navigation.utils.ts";
import { PageUtils } from "./page.utils.ts";
import { CitizenC100CaseUtils } from "./citizenC100CaseUtils.ts";

export interface UtilsFixtures {
  config: Config;
  idamUtils: IdamUtils;
  tokenUtils: TokenUtils;
  courtNavUtils: CourtNavUtils;
  accessCodeHelper: AccessCodeHelper;
  createUserUtil: CreateUserUtil;
  idamLoginHelper: IdamLoginHelper;
  serviceAuthUtils: ServiceAuthUtils;
  citizenC100CaseUtils: CitizenC100CaseUtils;

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
  navigationUtils: async ({}, use) => {
    await use(new NavigationUtils());
  },
  pageUtils: async ({ page }, use) => {
    await use(new PageUtils(page));
  },
  citizenC100CaseUtils: async ({}, use) => {
    await use(
      new CitizenC100CaseUtils(new ServiceAuthUtils(), new IdamUtils()),
    );
  },
};
