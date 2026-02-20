import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { Helpers } from "../../../../common/helpers";
import { AxeUtils } from "@hmcts/playwright-common";
import { CommonStaticText } from "../../../../common/commonStaticText";
import { applicationSubmittedBy } from "../../../../common/types";
import { C100ServiceOfApplication2Content } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/C100ServiceOfApplication2Content.js";
import { C100ServiceOfApplicationSubmitContent } from "../../../../fixtures/manageCases/caseProgression/serviceOfApplication/C100ServiceOfApplicationSubmitContent.js";

interface C100ServiceOfApplicationSubmitOptions {
  page: Page;
  yesNoServiceOfApplication4: boolean;
  accessibilityTest: boolean;
  applicationSubmittedBy: applicationSubmittedBy;
}

export class C100ServiceOfApplicationSubmitPage {
  public static async c100ServiceOfApplicationSubmitPage({
    page,
    yesNoServiceOfApplication4,
    accessibilityTest,
    applicationSubmittedBy,
  }: C100ServiceOfApplicationSubmitOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      yesNoServiceOfApplication4,
      accessibilityTest,
      applicationSubmittedBy,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
    page,
    yesNoServiceOfApplication4,
    accessibilityTest,
    applicationSubmittedBy,
  }: Partial<C100ServiceOfApplicationSubmitOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${C100ServiceOfApplication2Content.pageTitle}")`,
    );
    await pageTitle.waitFor();
    // need to had looking for order (switch case) - same for page 2
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${C100ServiceOfApplicationSubmitContent.h3}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        C100ServiceOfApplicationSubmitContent,
        "h2",
        Selectors.h2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${C100ServiceOfApplicationSubmitContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovLink}:text-is("${C100ServiceOfApplicationSubmitContent.link}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        C100ServiceOfApplicationSubmitContent,
        "text16",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${C100ServiceOfApplicationSubmitContent.text16Change}"):visible`,
        6,
      ),
    ]);
    //need to be updated if selected yes for C100
    if (yesNoServiceOfApplication4) {
      await Helpers.checkGroup(
        page,
        2,
        C100ServiceOfApplicationSubmitContent,
        "servedByBailiffText16",
        Selectors.GovukText16,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${C100ServiceOfApplicationSubmitContent.recipientsText16}")`,
        1,
      );
      await Helpers.checkGroup(
        page,
        6,
        C100ServiceOfApplicationSubmitContent,
        applicationSubmittedBy == "Solicitor"
          ? "solicitorApplicationRecipientsP"
          : "recipientsP",
        Selectors.p,
      );
    }
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields({
    page,
  }: Partial<C100ServiceOfApplicationSubmitOptions>): Promise<void> {
    if (!page) {
      throw new Error("No page found");
    }
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.saveAndContinue}")`,
    );
  }
}
