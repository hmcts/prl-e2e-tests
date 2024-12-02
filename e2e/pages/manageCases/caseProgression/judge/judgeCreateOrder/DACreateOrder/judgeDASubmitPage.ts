import { Page } from "@playwright/test";
import {
  createOrderFL401Options,
} from "../../../../../../common/types";
import {
  ManageOrders1DAContent
} from "../../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Selectors } from "../../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../../common/accessibilityTestHelper";

interface JudgeDACaseProgressionJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  createOrderFL401Options: createOrderFL401Options;
}

export class JudgeDAManageOrderSubmitPage {
  public static async judgeDAManageOrderSubmitPage({
    page,
    accessibilityTest,
                          createOrderFL401Options,
  }: JudgeDACaseProgressionJourneyParams): Promise<void> {
    await this.checkPageLoads({ page, accessibilityTest, createOrderFL401Options });
    await this.fillInFields({ page });
  }


  private static async checkPageLoads({
    page,
    accessibilityTest,
                                        createOrderFL401Options
  }: JudgeDACaseProgressionJourneyParams): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    await Promise.all([

    ]);
    switch (createOrderFL401Options) {
      case "power of arrest":
        await Promise.all([

        ]);
        break;
      case "occupation order":
        await Promise.all([

        ]);
        break;
    }
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
  }: Partial<JudgeDACaseProgressionJourneyParams>): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
  }
}
