import { Page } from "@playwright/test";
import { AxeUtils } from "@hmcts/playwright-common";
import { Selectors } from "../../../../common/selectors";
import { AdminEditAndApproveAnOrderSubmitContent } from "../../../../fixtures/manageCases/caseWorker/serveApprovedOrder/adminEditAndApproveAnOrderSubmitContent";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

export class AdminEditAndApproveAnOrderSubmitPage {
  public static async adminEditAndApproveAnOrderSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    personallyServed: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest, personallyServed);
    await this.submit(page);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
    personallyServed: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.headingH2}`, {
        hasText: `${AdminEditAndApproveAnOrderSubmitContent.headingH2}`,
      })
      .waitFor();
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${AdminEditAndApproveAnOrderSubmitContent.govUkHeadingL}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AdminEditAndApproveAnOrderSubmitContent.h21}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${AdminEditAndApproveAnOrderSubmitContent.h22}"):visible`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AdminEditAndApproveAnOrderSubmitContent.p}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.headingH3}:text-is("${AdminEditAndApproveAnOrderSubmitContent.nonMolestationOrderFL404A}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${AdminEditAndApproveAnOrderSubmitContent.nonMolestation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${AdminEditAndApproveAnOrderSubmitContent.welshNonMolestation}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
        1,
      ),
    ]);
    if (personallyServed) {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.Yes}"):visible`,
        2,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.No}"):visible`,
        1,
      );
      await Helpers.checkGroup(
        page,
        10,
        AdminEditAndApproveAnOrderSubmitContent,
        `nonMolestationText16`,
        Selectors.GovukText16,
      );
    } else {
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.Yes}"):visible`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukText16}:text-is("${AdminEditAndApproveAnOrderSubmitContent.No}"):visible`,
        2,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AdminEditAndApproveAnOrderSubmitContent.pApplicant}"):visible`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${AdminEditAndApproveAnOrderSubmitContent.pRespondent}"):visible`,
        1,
      );
      await Helpers.checkGroup(
        page,
        9,
        AdminEditAndApproveAnOrderSubmitContent,
        `nonMolestationNoText16`,
        Selectors.GovukText16,
      );
      if (accessibilityTest) {
        await new AxeUtils(page).audit();
      }
    }
  }

  private static async submit(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
