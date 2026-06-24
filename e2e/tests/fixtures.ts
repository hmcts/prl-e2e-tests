import { test as base } from "@playwright/test";
import { NocSolicitorPagesGroup } from "../pageObjects/roleBasedGroupedPages/nocSolicitorPages.ts";
import { CaseWorkerPagesGroup } from "../pageObjects/roleBasedGroupedPages/caseWorkerPages.ts";
import { SolicitorPagesGroup } from "../pageObjects/roleBasedGroupedPages/solicitorPages.ts";
import { CourtAdminStokePagesGroup } from "../pageObjects/roleBasedGroupedPages/courtAdminStokePages.ts";
import { CaseManagerPagesGroup } from "../pageObjects/roleBasedGroupedPages/caseManagerPages.ts";
import { JudgePagesGroup } from "../pageObjects/roleBasedGroupedPages/judgePages.ts";
import { utilsFixtures, UtilsFixtures } from "../utils/utils.fixtures.ts";
import Config from "../utils/config.utils.ts";
import { LegalAdvisorPagesGroup } from "../pageObjects/roleBasedGroupedPages/legalAdvisorPages.js";
import { BarristerPagesGroup } from "../pageObjects/roleBasedGroupedPages/barristerPages.ts";

type MyFixtures = UtilsFixtures & {
  nocSolicitor: NocSolicitorPagesGroup;
  caseWorker: CaseWorkerPagesGroup;
  solicitor: SolicitorPagesGroup;
  courtAdminStoke: CourtAdminStokePagesGroup;
  caseManager: CaseManagerPagesGroup;
  judge: JudgePagesGroup;
  legalAdvisor: LegalAdvisorPagesGroup;
  barrister: BarristerPagesGroup;
};

export const test = base.extend<MyFixtures>({
  ...utilsFixtures,

  nocSolicitor: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Config.sessionStoragePath + "nocSolicitor.json",
    });
    const page = await context.newPage();
    await use(new NocSolicitorPagesGroup(page));
    await context.close();
  },

  solicitor: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Config.sessionStoragePath + "solicitor.json",
    });
    const page = await context.newPage();
    await use(new SolicitorPagesGroup(page));
    await context.close();
  },

  caseWorker: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Config.sessionStoragePath + "caseWorker.json",
    });
    const page = await context.newPage();
    await use(new CaseWorkerPagesGroup(page));
    await context.close();
  },

  courtAdminStoke: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Config.sessionStoragePath + "courtAdminStoke.json",
    });
    const page = await context.newPage();
    await use(new CourtAdminStokePagesGroup(page));
    await context.close();
  },

  caseManager: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Config.sessionStoragePath + "caseManager.json",
    });
    const page = await context.newPage();
    await use(new CaseManagerPagesGroup(page));
    await context.close();
  },

  judge: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Config.sessionStoragePath + "judge.json",
    });
    const page = await context.newPage();
    await use(new JudgePagesGroup(page));
    await context.close();
  },

  legalAdvisor: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Config.sessionStoragePath + "legalAdvisor.json",
    });
    const page = await context.newPage();
    await use(new LegalAdvisorPagesGroup(page));
    await context.close();
  },

  barrister: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: Config.sessionStoragePath + "barrister.json",
    });
    const page = await context.newPage();
    await use(new BarristerPagesGroup(page));
    await context.close();
  },
});

export { expect } from "@playwright/test";
