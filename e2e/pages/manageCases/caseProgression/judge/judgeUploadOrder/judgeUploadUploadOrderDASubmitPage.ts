import { Page } from "@playwright/test";
import { uploadOrderFL401Options } from "../../../../../common/types";
import { ManageOrders1DAContent } from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders1DAContent";
import { Selectors } from "../../../../../common/selectors";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";
import { CommonStaticText } from "../../../../../common/commonStaticText";
import {
  ManageOrders3DAContent
} from "../../../../../fixtures/manageCases/caseWorker/createAnOrder/OrderDA/manageOrders3DAContent";

interface JudgeDACaseProgressionJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  uploadOrderFL401Options: uploadOrderFL401Options;
}

export class judgeCreateUOManageOrderSubmitPage {
  public static async judgeUOManageOrderSubmitPage({
                                                     page,
                                                     accessibilityTest,
                                                     uploadOrderFL401Options,
                                                   }: JudgeDACaseProgressionJourneyParams): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
      uploadOrderFL401Options,
    });
    await this.fillInFields({ page });
  }

  private static async checkPageLoads({
                                        page,
                                        accessibilityTest,
                                        uploadOrderFL401Options,
                                      }: JudgeDACaseProgressionJourneyParams): Promise<void> {
    if (!page) {
      throw new Error("Page is not defined");
    }
    const pageTitle = page.locator(
      `${Selectors.h1}:text-is("${ManageOrders1DAContent.pageTitle}")`,
    );
    await pageTitle.waitFor();
    switch (uploadOrderFL401Options) {
      case "non-molestation":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.nonMolestation}")`,
          1
        );
        break;
      case "occupation order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.occupationOrder}")`,
          1
        );
        break;
      case "power of arrest":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.powerOfArrest}")`,
          1
        );
        break;
      case "amend discharge varied order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.amendDischargeVariedOrder}")`,
          1
        );
        break;
      case "blank order (FL404B)":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.blankOrderFL404B}")`,
          1
        );
        break;
      case "general form of undertaking":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.generalFormOfUndertaking}")`,
          1
        );
        break;
      case "warrant of arrest":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.warrantOfArrest}")`,
          1
        );
        break;
      case "remand order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.remandOrder}")`,
          1
        );
        break;
      case "form for taking recognizance":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.formForTakingRecognizance}")`,
          1
        );
        break;
      case "form for taking surety":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.formForTakingSurety}")`,
          1
        );
        break;
      case "bail notice":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.bailNotice}")`,
          1
        );
        break;
      case "hospital order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.hospitalOrder}")`,
          1
        );
        break;
      case "guardianship order":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.guardianshipOrder}")`,
          1
        );
        break;
      case "statement of service":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.statementOfService}")`,
          1
        );
        break;
      case "blank order (FL514)":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.blankOrderFL514}")`,
          1
        );
        break;
      case "Notice landlord mortgage":
        await Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukText16}:text-is("${ManageOrders3DAContent.noticeToLandlordOrMortgageCompany}")`,
          1
        );
        break;
      default:
        throw new Error("Invalid option");
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
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.submit}")`,
    );
  }
}
