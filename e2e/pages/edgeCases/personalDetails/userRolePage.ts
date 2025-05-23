import { Page } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import { AxeUtils } from "@hmcts/playwright-common";
import { UserRoleContent } from "../../../fixtures/edgeCases/personalDetails/userRoleContent.ts";
import { Helpers } from "../../../common/helpers.ts";

interface UserRoleOptions {
  page: Page;
  accessibilityTest: boolean;
  applyMyself: boolean;
}

enum UniqueSelectors {
  applyMyself = "#whomYouAreApplying",
  applyForSomeoneElse = "#whomYouAreApplying-2",
}

export class UserRolePage {
  public static async userRole({
    page,
    accessibilityTest,
    applyMyself,
  }: UserRoleOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.selectOption(page, applyMyself);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${UserRoleContent.h1}")`,
    );
    await Helpers.checkGroup(
      page,
      2,
      UserRoleContent,
      "formLabel",
      `${Selectors.GovukLabel}`,
    );

    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async selectOption(
    page: Page,
    applyMyself: boolean,
  ): Promise<void> {
    await page.click(
      applyMyself
        ? UniqueSelectors.applyMyself
        : UniqueSelectors.applyForSomeoneElse,
    );
  }
}
