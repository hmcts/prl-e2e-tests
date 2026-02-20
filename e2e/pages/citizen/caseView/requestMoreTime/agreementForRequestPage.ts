import { Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { AgreementForRequestContent } from "../../../../fixtures/citizen/caseView/requestMoreTime/agreementForRequestContent";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

enum UniqueSelectors {
  agreementForRequestYes = "#awp_agreementForRequest",
  agreementForRequestNo = "#awp_agreementForRequest-2",
}

export class AgreementForRequestPage {
  public static async agreementForRequestPage(
    page: Page,
    accessibilityTest: boolean,
    agreementForRequest: boolean,
  ): Promise<void> {
    // this part of the case is complete when the case is created through courtnav so only need to check the page
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, agreementForRequest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(Selectors.GovukCaptionL, {
        hasText: AgreementForRequestContent.GovukCaptionL,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AgreementForRequestContent.GovukHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFieldsetLegend}:text-is("${AgreementForRequestContent.GovukFieldsetLegend}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        AgreementForRequestContent,
        `GovukBodyM`,
        `${Selectors.GovukBodyM}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async fillInFields(
    page: Page,
    agreementForRequest: boolean,
  ): Promise<void> {
    if (agreementForRequest) {
      await page.check(`${UniqueSelectors.agreementForRequestYes}`);
    } else {
      await page.check(`${UniqueSelectors.agreementForRequestNo}`);
    }
    await page.click(
      `${Selectors.GovukButton}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
