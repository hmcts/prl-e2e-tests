import { Config } from "./config.utils.ts";
import {
  AxeUtils,
  IdamUtils,
  SessionUtils,
  ServiceAuthUtils,
  TableUtils,
} from "@hmcts/playwright-common";
import { TokenUtils } from "./token.utils.ts";
import { CitizenCACaseUtils } from "./citizenCACase.utils.ts";
import { CourtNavUtils } from "./courtNav.utils.ts";
import { AccessCodeHelper } from "./accessCode.utils.ts";
import { CreateUserUtil } from "./createUser.utils.ts";
import { IdamLoginHelper } from "./idamLoginHelper.utils.ts";
import { CaseEventUtils } from "./caseEvent.utils.ts";
import { DateHelperUtils } from "./dateHelpers.utils.ts";

export interface UtilsFixtures {
  config: Config;
  idamUtils: IdamUtils;
  tokenUtils: TokenUtils;
  citizenCACaseUtils: CitizenCACaseUtils;
  courtNavUtils: CourtNavUtils;
  accessCodeHelper: AccessCodeHelper;
  createUserUtil: CreateUserUtil;
  idamLoginHelper: IdamLoginHelper;
  sessionUtils: SessionUtils;
  serviceAuthUtils: ServiceAuthUtils;
  caseEventUtils: CaseEventUtils;
  axeUtils: AxeUtils;
  tableUtils: TableUtils;
  dateHelperUtils: DateHelperUtils;
}

export const utilsFixtures = {
  axeUtils: async ({ page }, use) => {
    await use(new AxeUtils(page));
  },
  config: async ({}, use) => {
    await use(Config);
  },
  dateHelperUtils: async ({}, use) => {
    await use(new DateHelperUtils());
  },
  idamUtils: async ({}, use) => {
    await use(new IdamUtils());
  },
  serviceAuthUtils: async ({}, use) => {
    await use(new ServiceAuthUtils());
  },
  sessionUtils: async ({}, use) => {
    await use(new SessionUtils());
  },
  tableUtils: async ({}, use) => {
    await use(new TableUtils());
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
};
