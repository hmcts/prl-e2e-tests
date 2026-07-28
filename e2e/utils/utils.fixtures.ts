import { Config } from "./config.utils.ts";
import {
  IdamUtils,
  ServiceAuthUtils,
  AxeUtils,
  createLogger,
} from "@hmcts/playwright-common";
import { TokenUtils } from "./token.utils.ts";
import { CourtNavUtils } from "./courtNav.utils.ts";
import { AccessCodeHelper } from "./accessCode.utils.ts";
import { CreateUserUtil } from "./createUser.utils.ts";
import { IdamLoginHelper } from "./idamLoginHelper.utils.ts";
import { DateHelperUtils } from "./dateHelpers.utils.ts";
import { NavigationUtils } from "./navigation.utils.ts";
import { PageUtils } from "./page.utils.ts";
import { CitizenC100CaseUtils } from "./citizenC100Case.utils.ts";
import { CommonCaseEventUtils } from "./commonCaseEvent.utils.ts";
import { ManageCaseEventUtils } from "./manageCaseEvent.utils.ts";
import { ManageOrgUtils } from "./manageOrg.utils.ts";
import { CaseEventUtils } from "./caseEvent.utils.ts";

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
  manageOrgUtils: ManageOrgUtils;
  manageCasesEventUtils: ManageCaseEventUtils;

  caseEventUtils: CaseEventUtils;
  axeUtils: AxeUtils;
  dateHelperUtils: DateHelperUtils;
  navigationUtils: NavigationUtils;
  pageUtils: PageUtils;
}

// used to dictate the log level of the playwright-common utils
const logLevel = process.env.PWDEBUG ? "info" : "warn";

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
      new CitizenC100CaseUtils(
        new CommonCaseEventUtils(
          new ServiceAuthUtils({ logger: createLogger({ level: logLevel }) }),
          new IdamUtils({ logger: createLogger({ level: logLevel }) }),
        ),
      ),
    );
  },
  manageCasesEventUtils: async ({}, use) => {
    await use(
      new ManageCaseEventUtils(
        new CommonCaseEventUtils(
          new ServiceAuthUtils({ logger: createLogger({ level: logLevel }) }),
          new IdamUtils({ logger: createLogger({ level: logLevel }) }),
        ),
        new DateHelperUtils(),
      ),
    );
  },
  manageOrgUtils: async ({}, use) => {
    await use(
      new ManageOrgUtils(
        new CommonCaseEventUtils(
          new ServiceAuthUtils({ logger: createLogger({ level: logLevel }) }),
          new IdamUtils({ logger: createLogger({ level: logLevel }) }),
        ),
      ),
    );
  },
};
