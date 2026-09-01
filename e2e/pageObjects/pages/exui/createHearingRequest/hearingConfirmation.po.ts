import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.ts";
import { Base } from "../../base.po.ts";

export class HearingConfirmationPage extends Base {
  readonly panelTitle: Locator = this.page.locator(Selectors.GovukPanelTitle, {
    hasText: "Hearing request submitted",
  });
  readonly panelBody: Locator = this.page.locator(Selectors.GovukPanelBody, {
    hasText: "Your hearing request will now be processed",
  });
  readonly nextStepsHeading: Locator = this.page.locator(
    Selectors.GovukHeadingM,
    { hasText: "What happens next" },
  );
  readonly manualProcessingInformation: Locator = this.page.locator(
    Selectors.GovukBody,
    {
      hasText:
        "If the hearing cannot be listed automatically, it will be sent to a member of staff to be processed.",
    },
  );
  readonly hearingNoticeInformation: Locator = this.page.locator(
    Selectors.GovukBody,
    {
      hasText:
        "A notice of hearing will be issued once the hearing is listed, you will not be notified of the listing.",
    },
  );
  readonly viewHearingStatusLink: Locator = this.page.getByRole("link", {
    name: "view the status of this hearing in the hearings tab",
    exact: true,
  });

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(): Promise<void> {
    await Promise.all([
      expect(this.panelTitle).toBeVisible(),
      expect(this.panelBody).toBeVisible(),
      expect(this.nextStepsHeading).toBeVisible(),
      expect(this.manualProcessingInformation).toBeVisible(),
      expect(this.hearingNoticeInformation).toBeVisible(),
      expect(this.viewHearingStatusLink).toBeVisible(),
    ]);
  }

  async viewHearingStatus(): Promise<void> {
    await this.viewHearingStatusLink.click();
  }
}
