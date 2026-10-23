import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../common/types.js";
import { NavigationUtils } from "../../../../utils/navigation.utils.js";
import { PreviewOrdersComponent } from "../../../components/exui/orders/previewOrders.component.ts";

export class EditReturnedOrder13Page extends EventPage {
      private readonly previewOrderComponent: PreviewOrdersComponent =
        new PreviewOrdersComponent(this.page);
    private readonly previewOrderHeading: Locator = this.page.getByRole(
        "heading",
        { name: "Preview the order" },
    );
    private readonly paragraph: Locator = this.page.getByText(
        "If you want to make further changes, go back to the previous screen.",
    );
    private readonly navigationUtils: NavigationUtils = new NavigationUtils();
    private welshPdfLink: string;
    private englishPdfLink: string;

    constructor(page: Page) {
        super(page, "Create/upload draft order");
    }

    async assertPageContents(
        orderType: OrderTypes,
        caseNumber: string,
        snapshotName: string,
        snapshotsPath: string[],
    ): Promise<void> {
        await this.assertPageHeadings();
        await this.previewOrderComponent.assertOrdersPage20Contents(
            orderType,
            caseNumber,
            snapshotName,
            snapshotsPath,
        );
        await expect(this.continueButton).toBeVisible();
        await expect(this.previousButton).toBeVisible();
    }
}