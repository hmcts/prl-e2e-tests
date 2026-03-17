import { test as base, Browser } from "@playwright/test";
import { existsSync } from "fs";
import { NocSolicitorPagesGroup } from "../pageObjects/roleBasedGroupedPages/nocSolicitorPages.ts";
import { CaseWorkerPagesGroup } from "../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { SolicitorPagesGroup } from "../pageObjects/roleBasedGroupedPages/solicitorPages.ts";
import { CourtAdminStokePagesGroup } from "../pageObjects/roleBasedGroupedPages/courtAdminStokePages.ts";
import { CaseManagerPagesGroup } from "../pageObjects/roleBasedGroupedPages/caseManagerPages.ts";
import { JudgePagesGroup } from "../pageObjects/roleBasedGroupedPages/judgePages.ts";
import { LegalAdvisorPagesGroup } from "../pageObjects/roleBasedGroupedPages/legalAdvisorPages.js";
import { utilsFixtures, UtilsFixtures } from "../utils/utils.fixtures.ts";
import { UserRole } from "../common/types.ts";
import Config from "../utils/config.utils.ts";
import IdamLoginHelper from "../utils/idamLoginHelper.utils.ts";

type MyFixtures = UtilsFixtures & {
  nocSolicitor: NocSolicitorPagesGroup;
  caseWorker: CaseWorkerPagesGroup;
  solicitor: SolicitorPagesGroup;
  courtAdminStoke: CourtAdminStokePagesGroup;
  caseManager: CaseManagerPagesGroup;
  judge: JudgePagesGroup;
  legalAdvisor: LegalAdvisorPagesGroup;
};

async function createAuthenticatedPage(
  browser: Browser,
  idamLoginHelper: IdamLoginHelper,
  userType: string,
) {
  const sessionPath = `${Config.sessionStoragePath}${userType}.json`;
  const credentials = Config.getUserCredentials(userType as UserRole);

  const context = await browser.newContext({
    storageState: existsSync(sessionPath) ? sessionPath : undefined,
  });
  const page = await context.newPage();

  await idamLoginHelper.signIn(
    page,
    credentials.email,
    credentials.password,
    Config.manageCasesBaseURLCase,
    userType,
  );

  return { page, context };
}

export const test = base.extend<MyFixtures>({
  ...utilsFixtures,

  nocSolicitor: async ({ browser, idamLoginHelper }, use) => {
    const { page, context } = await createAuthenticatedPage(
      browser,
      idamLoginHelper,
      "nocSolicitor",
    );
    await use(new NocSolicitorPagesGroup(page));
    await context.close();
  },

  solicitor: async ({ browser, idamLoginHelper }, use) => {
    const { page, context } = await createAuthenticatedPage(
      browser,
      idamLoginHelper,
      "solicitor",
    );
    await use(new SolicitorPagesGroup(page));
    await context.close();
  },

  caseWorker: async ({ browser, idamLoginHelper }, use) => {
    const { page, context } = await createAuthenticatedPage(
      browser,
      idamLoginHelper,
      "caseWorker",
    );
    await use(new CaseWorkerPagesGroup(page));
    await context.close();
  },

  courtAdminStoke: async ({ browser, idamLoginHelper }, use) => {
    const { page, context } = await createAuthenticatedPage(
      browser,
      idamLoginHelper,
      "courtAdminStoke",
    );
    await use(new CourtAdminStokePagesGroup(page));
    await context.close();
  },

  caseManager: async ({ browser, idamLoginHelper }, use) => {
    const { page, context } = await createAuthenticatedPage(
      browser,
      idamLoginHelper,
      "caseManager",
    );
    await use(new CaseManagerPagesGroup(page));
    await context.close();
  },

  judge: async ({ browser, idamLoginHelper }, use) => {
    const { page, context } = await createAuthenticatedPage(
      browser,
      idamLoginHelper,
      "judge",
    );
    await use(new JudgePagesGroup(page));
    await context.close();
  },

  legalAdvisor: async ({ browser, idamLoginHelper }, use) => {
    const { page, context } = await createAuthenticatedPage(
      browser,
      idamLoginHelper,
      "legalAdvisor",
    );
    await use(new LegalAdvisorPagesGroup(page));
    await context.close();
  },
});

export { expect } from "@playwright/test";
