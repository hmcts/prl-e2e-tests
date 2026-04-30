import { EventPage } from "../eventPage.po.ts";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { OrderType } from "../../../../common/types.ts";

enum UniqueSelectors {
    sendToAdminToServeRadio = "#whatToDoWithOrderSolicitor-sendToAdminToServe",
    giveAdminFurtherDirectionsThenServeRadio = "#whatToDoWithOrderSolicitor-giveAdminFurtherDirectionsAndServe",
    askTheLegalRepresentativeToMakeChangesRadio = "#whatToDoWithOrderSolicitor-askLegalRepToMakeChanges",
    giveInstructionsToTheLegalRepresentativeTextbox = "#instructionsToLegalRepresentative",
    welshPdfAnchor = "#caseEditForm > div:nth-child(12) > ccd-field-read > div > ccd-field-read-label > div > dl > dd > ccd-read-document-field > .govuk-js-link",
    englishPdfAnchor = "#caseEditForm > div:nth-child(13) > ccd-field-read > div > ccd-field-read-label > div > dl > dd > ccd-read-document-field > .govuk-js-link",
    whatToDoWithSolicitorOrder = "#whatToDoWithOrderSolicitor > fieldset > legend > label > span",
    sendOrderToAdminToServe = "#whatToDoWithOrderSolicitor > fieldset > div:nth-child(2) > label",
    giveAdminFurtherDirections = "#whatToDoWithOrderSolicitor > fieldset > div:nth-child(3) > label",
    editTheOrderMyselfAndSendToAdmin = "#whatToDoWithOrderSolicitor > fieldset > div:nth-child(4) > label",
    askLegalRepresentativeToMakeChanges = "#whatToDoWithOrderSolicitor > fieldset > div:nth-child(5) > label",
}

export class EditAndApproveAnOrder2Page extends EventPage {
    private readonly h2: Locator = this.page.locator(
        Selectors.h2,
        {
            hasText:
                "Check the order",
        },
    );
    private readonly h3: Locator = this.page.locator(
        Selectors.h3,
        {
            hasText:
                "Open the order and review the content",
        },
    );
    private readonly formLabel1: Locator = this.page.locator(
        UniqueSelectors.whatToDoWithSolicitorOrder,
        {
            hasText:
                "What do you want to do with this order?",
        },
    );
    private readonly formLabel2: Locator = this.page.locator(
        UniqueSelectors.sendOrderToAdminToServe,
        {
            hasText:
                "Send to admin to serve",
        },
    );
    private readonly formLabel3: Locator = this.page.locator(
        UniqueSelectors.giveAdminFurtherDirections,
        {
            hasText:
                "Give admin further directions then serve",
        },
    );
    private readonly formLabel4: Locator = this.page.locator(
        UniqueSelectors.editTheOrderMyselfAndSendToAdmin,
        {
            hasText:
                "Edit the order myself and send to admin to serve",
        },
    );
    private readonly formLabel5: Locator = this.page.locator(
        UniqueSelectors.askLegalRepresentativeToMakeChanges,
        {
            hasText:
                "Ask the legal representative to make changes",
        },
    );
    private readonly formLabelGiveInstructionsToTheLegalRepresentative: Locator = this.page.locator(
        UniqueSelectors.askLegalRepresentativeToMakeChanges,
        {
            hasText:
                "Give instructions to the legal representative",
        },
    );

  private readonly govUKDetails: Locator = this.page.locator(
    Selectors.GovukDetailsText,
    {
      hasText:
        " If you know that the solicitor is already registered with MyHMCTS, check that you have entered their details correctly. Remember that organisations can only register one office address. This means that the details could be slightly different from what you're expecting. Contact the solicitor directly if you have any concerns. ",
    },
  );

  constructor(page: Page) {
      super(page, "Edit and approve a draft order");
  }

    async assertPageContents(
        orderType: OrderType,
  ): Promise<void> {
    await this.assertPageHeadings();
    const anchorStrings:
        | {
            welshPdfAnchor: string;
            englishPdfAnchor: string;
        }
        | undefined = EditAndApproveAnOrder2Page.getAnchorStringsFromOrderType(orderType);
    await expect(this.page.locator(`${UniqueSelectors.welshPdfAnchor}:text-is("${anchorStrings?.welshPdfAnchor}")`)).toBeVisible();
    await expect(this.page.locator(`${UniqueSelectors.englishPdfAnchor}:text-is("${anchorStrings?.englishPdfAnchor}")`)).toBeVisible(); 
    await expect(this.h2).toBeVisible();
    await expect(this.h3).toBeVisible();
    await expect(this.formLabel1).toBeVisible();
    await expect(this.formLabel2).toBeVisible();
    await expect(this.formLabel3).toBeVisible();
    await expect(this.formLabel4).toBeVisible();
    await expect(this.formLabel5).toBeVisible();
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
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
        case "parentalResponsibility":
            return {
                welshPdfAnchor: "Welsh_Parental_Responsibility_Order_C45A_draft.pdf",
                englishPdfAnchor: "Parental_Responsibility_Order_C45A_draft.pdf",
            };
        default:
            console.error("An invalid order type was given");
            return undefined;
    }
}

  async selectOrderAction(): Promise<void> {
      await this.page.check(UniqueSelectors.askTheLegalRepresentativeToMakeChangesRadio);
      await expect(this.formLabelGiveInstructionsToTheLegalRepresentative).toBeVisible(); //this appears after radio button selection
      await this.page.fill(UniqueSelectors.giveInstructionsToTheLegalRepresentativeTextbox, "Test instructions");
  }
}
