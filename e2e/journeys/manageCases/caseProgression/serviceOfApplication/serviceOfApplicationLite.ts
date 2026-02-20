import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import config from "../../../../utils/config.utils";
import { Selectors } from "../../../../common/selectors";
import { MiamPolicyUpgrade6Content } from "../../../../fixtures/manageCases/createCase/C100/miamPolicyUpgrade/miamPolicyUpgrade6Content";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { ServiceOfApplication4Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/serviceOfApplication4Content";

// complete service of application without all the checks of the actual journey - this should only be used in solicitorDACaseCreatorPOC.ts
export class ServiceOfApplicationLite {
  public static async serviceOfApplicationLite(page: Page): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, "Service of application");
    // page1
    const fileInput = page.locator("#noticeOfSafetySupportLetter");
    await fileInput.setInputFiles(config.testPdfFile);
    await page.waitForSelector(
      `${Selectors.GovukErrorMessage}:text-is("${MiamPolicyUpgrade6Content.uploadingFile}")`,
      { state: "hidden" },
    );
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    // page 2
    await page.click("#soaServeToRespondentOptions-Yes");
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ServiceOfApplication4Content.yesHiddenFormLabelResponsible}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ServiceOfApplication4Content.yesHiddenFormLabel1}"):visible`,
        1,
      ),
    ]);
    await page.click("#soaServingRespondentsOptions-courtBailiff");
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
    // page 3
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
    // page 4
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h1}:text-is("The application is ready to be personally served")`,
      1,
    );
  }
}
