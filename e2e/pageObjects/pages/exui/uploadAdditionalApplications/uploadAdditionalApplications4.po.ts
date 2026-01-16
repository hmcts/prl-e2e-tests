import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";
import { Selectors } from "../../../../common/selectors.js";

export class UploadAdditionalApplications4Page extends EventPage {

  readonly nextStepH3: Locator = this.page.locator(Selectors.h2, {
    hasText: "Next step - Submit the application",
  });
  readonly nextStepP: Locator = this.page.locator(Selectors.p, {
    hasText: " After you have submitted your application, you will be asked to pay the application fee.",
  });
  readonly withNoticeFeeP: Locator = this.page.locator(Selectors.p, {
    hasText: "£190.00",
  });
  readonly withoutNoticeFeeP: Locator = this.page.locator(Selectors.p, {
    hasText: "£60.00",
  });
  readonly c100FeeP: Locator = this.page.locator(Selectors.p, {
    hasText: "£263.00",
  });

  readonly noHelpWithFeesRadio: Locator = this.page.locator(
    "#additionalApplicationsHelpWithFees_No",
  );

  readonly formLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    {
      hasText: "Has the applicant applied for Help with Fees?",
    },
  );
  readonly yesFormLabel = this.page.getByText("Yes", { exact: true }).first();
  readonly noFormLabel = this.page.getByText("No", { exact: true }).first();
  readonly formHint: Locator = this.page.locator(Selectors.GovukFormHint, {
    hasText: "You must select 'No' to continue with your application.",
  });

  readonly h3FormLabels: string[] = [
    "Help with Fees is not yet available in the Family Private Law digital service.",
    "If the applicant has applied for Help with Fees, you should email or post this application to the court instead.",
    "If you continue online, you will still have to pay the fee. You can apply for a refund by contacting the court and providing the applicant's Help with Fees reference.",
    "Application fee",
  ];

  constructor(page: Page) {
    super(page, "Upload additional applications");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(
    additionalApplicationType: string,
    withNotice: boolean,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.nextStepH3).toBeVisible();
    await expect(this.nextStepP).toBeVisible();
    await this.pageUtils.assertStrings(this.h3FormLabels);
    await expect(this.formLabel).toBeVisible();
    await expect(this.formHint).toBeVisible();
    await expect(this.yesFormLabel).toBeVisible();
    await expect(this.noFormLabel).toBeVisible();

    if (additionalApplicationType === "c2") {
      if (withNotice) {
        await expect(this.withNoticeFeeP).toBeVisible();
      } else {
        await expect(this.withoutNoticeFeeP).toBeVisible();
      }
    } else {
      await expect(this.c100FeeP).toBeVisible();
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectHWF() {
    await this.noHelpWithFeesRadio.check();
  }
}
