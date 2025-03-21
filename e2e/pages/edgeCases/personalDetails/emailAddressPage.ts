import { Page, expect } from "@playwright/test";
import { Selectors } from "../../../common/selectors.ts";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper.ts";
import { Helpers } from "../../../common/helpers.ts";
import { EmailAddressContent } from "../../../fixtures/edgeCases/personalDetails/emailAddressContent.ts";

interface UserInfo {
  email: string;
  name?: string; // Optional field
}

interface EmailAddressPageOptions {
  page: Page;
  accessibilityTest: boolean;
  userInfo: UserInfo;
}

enum UniqueSelectors {
  emailAddress = "#applicantEmailAddress",
}

export class EmailAddressPage {
  public static async emailAddressPage({
    page,
    accessibilityTest,
    userInfo,
  }: EmailAddressPageOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.fillInFields(page, userInfo);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukLabel}:text-is("${EmailAddressContent.h1}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        2,
        EmailAddressContent,
        "formHint",
        `${Selectors.GovukHint}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }
  private static async fillInFields(
    page: Page,
    userInfo: UserInfo,
  ): Promise<void> {
    const emailInput = page.locator(UniqueSelectors.emailAddress);
    await expect(emailInput).toHaveValue(userInfo.email);
  }
}
