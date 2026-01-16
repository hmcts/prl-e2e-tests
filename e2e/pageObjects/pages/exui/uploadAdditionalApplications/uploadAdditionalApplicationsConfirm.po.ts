import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";
import { Selectors } from "../../../../common/selectors.js";

export class UploadAdditionalApplicationsConfirmPage extends EventPage {
  private readonly confirmationHeader: Locator = this.page.locator(
    "#confirmation-body h3",
    { hasText: "What happens next" },
  );
  readonly c100H1: Locator = this.page.locator(Selectors.h1, {
    hasText: "Continue to payment",
  });
  readonly fl401H1: Locator = this.page.locator(Selectors.h1, {
    hasText: "Application submitted",
  });
  readonly c100Anchor: Locator = this.page.locator(Selectors.a, {
    hasText: "Service request",
  });

  readonly c100P: string[] = [
    "This application has been submitted and you will now need to pay the application fee.",
    "Go to the",
    "section to make a payment. Once the fee has been paid, the court will process the application.",
  ];

  readonly fl401P: string[] = [
    "You will get updates from the court about the progress of your application.",
    "The court will review your documents and will be in touch to let you know what happens next.",
  ];

  constructor(page: Page) {
    super(page, "Upload additional applications");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(caseType: string): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.confirmationHeader).toBeVisible();

    if (caseType === "C100") {
      await expect(this.c100H1).toBeVisible();
      await this.pageUtils.assertStrings(this.c100P);
      await expect(this.c100Anchor).toBeVisible();
    } else {
      await expect(this.fl401H1).toBeVisible();
      await this.pageUtils.assertStrings(this.fl401P);
    }

    await expect(this.closeAndReturnToCaseDetailsButton).toBeVisible();
  }
}
