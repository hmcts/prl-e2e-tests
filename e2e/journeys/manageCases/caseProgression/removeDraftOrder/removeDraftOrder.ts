import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers.ts";
import {
    RemoveDraftOrder1Page
} from "../../../../pages/manageCases/caseProgression/removeDraftOrder/removeDraftOrder1Page.ts";
import {
    RemoveDraftOrder2Page
} from "../../../../pages/manageCases/caseProgression/removeDraftOrder/removeDraftOrder2Page.ts";
import {
    RemoveDraftOrderSubmitPage
} from "../../../../pages/manageCases/caseProgression/removeDraftOrder/removeDraftOrderSubmitPage.ts";
import {submitEvent} from "../../../../common/solicitorCaseCreatorHelper.ts";
import config from "../../../../config.ts";

interface RemoveDraftOrderParams {
    page: Page;
    accessibilityTest: boolean;
    caseRef: string;
}

export class RemoveDraftOrder {
    public static async removeDraftOrder({
                                            page,
                                            accessibilityTest,
                                            caseRef,
                                        }: RemoveDraftOrderParams): Promise<void> {
        await submitEvent(page, caseRef, "fl401AddCaseNumber");
        await Helpers.goToCase(page, config.manageCasesBaseURL, caseRef, "tasks");
        await Helpers.chooseEventFromDropdown(page, "Remove draft order");
        await RemoveDraftOrder1Page.removeDraftOrder1Page({ page, accessibilityTest });
        await RemoveDraftOrder2Page.removeDraftOrder2Page({ page, accessibilityTest });
        await RemoveDraftOrderSubmitPage.removeDraftOrderSubmitPage({ page, accessibilityTest });
    }
}
