import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { TypeOfApplication2Content } from "../../../../../fixtures/manageCases/createCase/FL401/typeOfApplication/typeOfApplication2Content";

enum isLinkedSelectionIds {
  no = "#typeOfApplicationLinkToCA_linkToCaApplication_No",
  yes = "#typeOfApplicationLinkToCA_linkToCaApplication_Yes",
  applicationNumber = "#typeOfApplicationLinkToCA_caApplicationNumber",
}

export const dummyCaseNumber: string = "1111-2222-3333-4444";

export class TypeOfApplication2Page {
  public static async typeOfApplication2Page(
    page: Page,
    errorMessaging: boolean,
    accessibilityTest: boolean,
    isLinked: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, isLinked, accessibilityTest);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${TypeOfApplication2Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${TypeOfApplication2Content.p1}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        3,
        TypeOfApplication2Content,
        "formLabel",
        `${Selectors.GovukFormLabel}`,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(
      `${Selectors.GovukFormLabel}:text-is("${TypeOfApplication2Content.formLabel2}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${TypeOfApplication2Content.continue}")`,
    );
  }

  private static async fillInFields(
    page: Page,
    isLinked: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    if (!isLinked) {
      await page.click(isLinkedSelectionIds["no"]);
    } else {
      await page.click(isLinkedSelectionIds["yes"]);
      await this.checkLinkedCaseTextLoads(page, accessibilityTest);
      await page.fill(
        `${isLinkedSelectionIds["applicationNumber"]}`,
        dummyCaseNumber,
      );
    }
    await page.click(
      `${Selectors.button}:text-is("${TypeOfApplication2Content.continue}")`,
    );
  }

  private static async checkLinkedCaseTextLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${TypeOfApplication2Content.pLinkedC100}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${TypeOfApplication2Content.formLabelLinkedC100}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
    await page.click(
      `${Selectors.button}:text-is("${TypeOfApplication2Content.continue}")`,
    );
  }
}
