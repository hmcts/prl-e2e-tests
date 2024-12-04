import { test } from "@playwright/test";
import Config from "../../../../config";
import createDaCitizenCourtNavCase from "../../../../common/createCaseHelper";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../config";
import { ServiceOfDocuments } from "../../../journeys/manageCases/caseProgression/serviceOfDocuments";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });

test.describe("Welsh Language Requirements task for DA Citizen case tests as Judge.", () => {
  test.beforeEach(async ({ page }) => {
    const ccdRef: string = await createDaCitizenCourtNavCase(true, false);
    await Helpers.goToCase(page, config.manageCasesBaseURL, ccdRef, "tasks");
  });

  test(`Complete 'Service of Documents' with following options: 
  Documents should be personally served: Yes
  Does these 
  Accessibility testing: Yes. @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await ServiceOfDocuments.serviceOfDocyments({
      page: page,
      needDocumentsInWelsh: true,
      languageToCompleteApplication: "English",
      doesApplicationNeedTranslating: true,
      accessibilityTest: true,
    });
  });
});
