import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";
import { solicitorCaseCreateType } from "../../../../common/types.js";

export class ReturnApplication1Page extends EventPage {
  private readonly returningAnApplicationHeading: Locator = this.page.getByRole(
    "heading",
    {
      name: "Returning an application",
      level: 3,
    },
  );
  private readonly selectReasonInstruction: Locator = this.page.getByText(
    "Select the reason(s) for the return of the application, this will generate a letter with instructions.",
  );
  private readonly selectReasonHeading: Locator = this.page.getByRole(
    "heading",
    {
      name: "Select the reason for rejection",
      level: 3,
    },
  );
  private readonly fl401RejectionReasonOptions: string[] = [
    "Consent Order not provided",
    "Witness statement not provided",
    "Confidential detail listed",
    "Section 91(14) order in force",
    "Permission is needed to make application",
    "Parental responsibility",
    "Application incomplete",
    "Application incorrect",
    "Clarification needed",
    "Other",
  ];
  private readonly c100RejectionReasonOptions: string[] = [
    "Consent Order not provided",
    "MIAM certificate not provided",
    "Evidence of MIAM exemption incomplete",
    "Confidential detail listed",
    "Section 91(14) order in force",
    "Permission is needed to make application",
    "Parental responsibility",
    "Application incomplete",
    "Clarification needed",
    "Other",
  ];

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  constructor(page: Page) {
    super(page, "Return application");
  }

  async assertPageContents(caseType: solicitorCaseCreateType): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.returningAnApplicationHeading).toBeVisible();
    await expect(this.selectReasonInstruction).toBeVisible();
    await expect(this.selectReasonHeading).toBeVisible();
    if (caseType === "C100") {
      await this.pageUtils.assertStrings(
        this.c100RejectionReasonOptions,
        this.page.locator("#rejectReason"),
      );
    } else {
      await this.pageUtils.assertStrings(
        this.fl401RejectionReasonOptions,
        this.page.locator("#fl401RejectReason"),
      );
    }
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async selectRejectionReason(reason: string): Promise<void> {
    await this.page.getByRole("checkbox", { name: reason }).check();
  }
}
