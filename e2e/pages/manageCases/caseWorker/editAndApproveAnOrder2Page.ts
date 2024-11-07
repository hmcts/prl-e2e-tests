import { Page } from "@playwright/test";
import { JudgeOrderAction, OrderType } from "../../../common/types";
import AccessibilityTestHelper from "../../../common/accessibilityTestHelper";
import { Selectors } from "../../../common/selectors";
import { EditAndApproveAnOrder2Content } from "../../../fixtures/manageCases/caseWorker/editAndApproveAnOrder2Content";
import { Helpers } from "../../../common/helpers";
import { orderTypesMap } from "../../../journeys/manageCases/caseWorker/draftAnOrder/draftAnOrder";
import { CommonStaticText } from "../../../common/commonStaticText";

enum UniqueSelectors {
  sendToAdminToServeRadio = "#whatToDoWithOrderSolicitor-sendToAdminToServe",
  giveAdminFurtherDirectionsThenServeRadio = "#whatToDoWithOrderSolicitor-giveAdminFurtherDirectionsAndServe",
  askTheLegalRepresentativeToMakeChangesRadio = "#whatToDoWithOrderSolicitor-askLegalRepToMakeChanges",
  giveInstructionsToTheLegalRepresentativeTextbox = "#instructionsToLegalRepresentative",
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
    // TODO: do we need to check the PDFs are still correct?
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
        `${Selectors.headingH3}:text-is("${orderTypesMap.get(orderType)?.journeyName}")`,
        1,
      ),
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
        `${Selectors.a}:text-is("${anchorStrings?.welshPdfAnchor}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.a}:text-is("${anchorStrings?.englishPdfAnchor}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        5,
        EditAndApproveAnOrder2Content,
        `formLabel`,
        `${Selectors.GovukFormLabel}`,
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
    // TODO: what paths need to be followed at this stage? can we just send to admin and serve every time?
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
    await this.continue(page);
  }

  private static async continue(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${CommonStaticText.continue}")`,
    );
  }
}
