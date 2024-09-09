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

enum incorrectCaseNumbers {
  tooShort = "12345678",
  nonNumeric = "123abc123abc123abc",
}

export const dummyCaseNumber: string = "0000000000000000";

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
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await page.click(isLinkedSelectionIds.yes);
    for (let caseNumberInput of Object.values(incorrectCaseNumbers)) {
      await page.fill(isLinkedSelectionIds.applicationNumber, "");
      await page.fill(isLinkedSelectionIds.applicationNumber, caseNumberInput);
      await page.click(
        `${Selectors.button}:text-is("${TypeOfApplication2Content.continue}")`,
      );
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.p}:text-is("${TypeOfApplication2Content.errorP}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.ErrorSummaryList}:text-is("${TypeOfApplication2Content.errorSummaryLi}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukErrorMessage}:text-is("${TypeOfApplication2Content.errorMessage}")`,
          1,
        ),
      ]);
    }
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
        '',
      );
      await page.fill(
        `${isLinkedSelectionIds["applicationNumber"]}`,
        dummyCaseNumber,
      );
    }
    await page.click(
      `${Selectors.button}:text-is("${TypeOfApplication2Content.continue}")`,
    );
  }
}
