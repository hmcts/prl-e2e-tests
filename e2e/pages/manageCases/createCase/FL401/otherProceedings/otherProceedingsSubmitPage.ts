import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { SubmitContent } from "../../../../../fixtures/manageCases/createCase/FL401/otherProceedings/submitContent";
import { Helpers } from "../../../../../common/helpers";
import accessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { OtherProceedingsContent } from "../../../../../fixtures/manageCases/createCase/FL401/otherProceedings/otherProceedingsContent";
import { otherProceedingsRadios } from "../../../../../journeys/manageCases/createCase/FL401";

export class OtherProceedingsSubmitPage {
  public static async otherProceedingsSubmitPage(
    page: Page,
    accessibilityTest: boolean,
    otherProceedingsRadios: otherProceedingsRadios,
  ): Promise<void> {
    await this.checkPageContent(
      page,
      accessibilityTest,
      otherProceedingsRadios,
    );
    await this.fillInFields(page);
  }

  private static async checkPageContent(
    page: Page,
    accessibilityTest: boolean,
    otherProceedingsRadios: otherProceedingsRadios,
  ): Promise<void> {
    await Promise.all([
      this.checkPageLoads(page),
      this.checkFilledInData(page, otherProceedingsRadios),
    ]);
    if (accessibilityTest) {
      await accessibilityTestHelper.run(page);
    }
  }

  private static async checkPageLoads(page: Page): Promise<void> {}

  private static async checkFilledInData(
    page: Page,
    otherProceedingsRadios: otherProceedingsRadios,
  ): Promise<void> {}

  private static async fillInFields(page: Page): Promise<void> {}
}
