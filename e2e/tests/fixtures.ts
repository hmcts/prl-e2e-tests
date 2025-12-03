import { test as base } from "@playwright/test";
import { NocSolicitorPagesGroup } from "./fixtures/nocSolicitorPages.ts";
import { CaseWorkerPagesGroup } from "./fixtures/caseWorkerPages.ts";
import { SolicitorPagesGroup } from "./fixtures/solicitorPages.ts";
import { CourtAdminStokePagesGroup } from "./fixtures/courtAdminStokePages.ts";
import { utilsFixtures, UtilsFixtures } from "../utils/utils.fixtures.ts";
import Config from "../utils/config.utils.ts";

type MyFixtures = UtilsFixtures & {
  nocSolicitor: NocSolicitorPagesGroup;
  caseWorker: CaseWorkerPagesGroup;
  solicitor: SolicitorPagesGroup;
  courtAdminStoke: CourtAdminStokePagesGroup;
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
});

export { expect } from "@playwright/test";
