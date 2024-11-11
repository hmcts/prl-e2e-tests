import { Page } from "@playwright/test";
import { JudgeOrderAction, OrderType } from "../../../../common/types";
import AccessibilityTestHelper from "../../../../common/accessibilityTestHelper";
import { Selectors } from "../../../../common/selectors";
import { EditAndApproveAnOrder2Content } from "../../../../fixtures/manageCases/caseWorker/eidtAndApproveAnOrder/editAndApproveAnOrder2Content";
import { Helpers } from "../../../../common/helpers";
import { CommonStaticText } from "../../../../common/commonStaticText";

enum UniqueSelectors {
  sendToAdminToServeRadio = "#whatToDoWithOrderSolicitor-sendToAdminToServe",
  giveAdminFurtherDirectionsThenServeRadio = "#whatToDoWithOrderSolicitor-giveAdminFurtherDirectionsAndServe",
  askTheLegalRepresentativeToMakeChangesRadio = "#whatToDoWithOrderSolicitor-askLegalRepToMakeChanges",
  giveInstructionsToTheLegalRepresentativeTextbox = "#instructionsToLegalRepresentative",
  welshPdfAnchor = "#caseEditForm > div:nth-child(12) > ccd-field-read > div > ccd-field-read-label > div > dl > dd > ccd-read-document-field > a",
  englishPdfAnchor = "#caseEditForm > div:nth-child(13) > ccd-field-read > div > ccd-field-read-label > div > dl > dd > ccd-read-document-field > a",
  whatToDoWithSolicitorOrder = "#whatToDoWithOrderSolicitor > fieldset > legend > label > span",
  sendOrderToAdminToServe = "#whatToDoWithOrderSolicitor > fieldset > div:nth-child(2) > label",
  giveAdminFurtherDirections = "#whatToDoWithOrderSolicitor > fieldset > div:nth-child(3) > label",
  editTheOrderMyselfAndSendToAdmin = "#whatToDoWithOrderSolicitor > fieldset > div:nth-child(4) > label",
  askLegalRepresentativeToMakeChanges = "#whatToDoWithOrderSolicitor > fieldset > div:nth-child(5) > label",
}

export class EditAndApproveAnOrder2Page {
  public static async editAndApproveAnOrder2Page(
    page: Page,
    orderType: OrderType,
    judgeOrderAction: JudgeOrderAction,
    errorMessaging: boolean,
    accessibilityTest: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, orderType, accessibilityTest);
    if (errorMessaging) {
      await this.checkErrorMessaging(page);
    }
    await this.fillInFields(page, judgeOrderAction);
    await this.continue(page);
  }

  private static async checkPageLoads(
    page: Page,
    orderType: OrderType,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page
      .locator(`${Selectors.GovukHeadingL}`, {
        hasText: `${EditAndApproveAnOrder2Content.govUkHeadingL}`,
      })
      .waitFor();
    const anchorStrings:
      | {
          welshPdfAnchor: string;
          englishPdfAnchor: string;
        }
      | undefined = this.getAnchorStringsFromOrderType(orderType);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${EditAndApproveAnOrder2Content.h2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${EditAndApproveAnOrder2Content.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.welshPdfAnchor}:text-is("${anchorStrings?.welshPdfAnchor}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.englishPdfAnchor}:text-is("${anchorStrings?.englishPdfAnchor}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.whatToDoWithSolicitorOrder}:text-is("${EditAndApproveAnOrder2Content.formLabel1}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.sendOrderToAdminToServe}:text-is("${EditAndApproveAnOrder2Content.formLabel2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.giveAdminFurtherDirections}:text-is("${EditAndApproveAnOrder2Content.formLabel3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.editTheOrderMyselfAndSendToAdmin}:text-is("${EditAndApproveAnOrder2Content.formLabel4}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.askLegalRepresentativeToMakeChanges}:text-is("${EditAndApproveAnOrder2Content.formLabel5}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.previous}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  public static getAnchorStringsFromOrderType(
    orderType: OrderType,
  ): { welshPdfAnchor: string; englishPdfAnchor: string } | undefined {
    switch (orderType) {
      case "nonMolestation":
        return {
          welshPdfAnchor: "welsh_non_molestation_order_fl404a_draft.pdf",
          englishPdfAnchor: "non_molestation_order_fl404a_draft.pdf",
        };
      default:
        console.error("An invalid order type was given");
        return undefined;
    }
  }

  private static async checkErrorMessaging(page: Page): Promise<void> {
    await this.continue(page);
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:has-text("${EditAndApproveAnOrder2Content.errorMessage}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:has-text("${EditAndApproveAnOrder2Content.errorMessage}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    judgeOrderAction: JudgeOrderAction,
  ): Promise<void> {
    switch (judgeOrderAction) {
      case "Send to admin to serve":
        await page.check(`${UniqueSelectors.sendToAdminToServeRadio}`);
        break;
      case "Give admin further directions then serve":
        await page.check(
          `${UniqueSelectors.giveAdminFurtherDirectionsThenServeRadio}`,
        );
        break;
      case "Ask the legal representative to make changes":
        await page.check(
          `${UniqueSelectors.askTheLegalRepresentativeToMakeChangesRadio}`,
        );
        await page
          .locator(`${Selectors.GovukFormLabel}`, {
            hasText: `${EditAndApproveAnOrder2Content.formLabelGiveInstructionsToTheLegalRepresentative}`,
          })
          .waitFor();
        await page.fill(
          `${UniqueSelectors.giveInstructionsToTheLegalRepresentativeTextbox}`,
          `${EditAndApproveAnOrder2Content.instructionsText}`,
        );
        break;
      default:
        console.error("An invalid judge order action was given");
        break;
    }
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
