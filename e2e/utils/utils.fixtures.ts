import { Config } from "./config.utils.ts";
import {
  IdamUtils,
  SessionUtils,
  ServiceAuthUtils,
} from "@hmcts/playwright-common";
import { TokenUtils } from "./token.utils.ts";
import { CitizenCACaseUtils } from "./citizenCACase.utils.ts";
import { CourtNavUtils } from "./courtNav.utils.ts";
import { AccessCodeHelper } from "./accessCode.utils.ts";
import { CreateUserUtil } from "./createUser.utils.ts";
import { IdamLoginHelper } from "./idamLoginHelper.utils.ts";

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
}

export const utilsFixtures = {
  config: async ({}, use) => {
    await use(Config);
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
};
