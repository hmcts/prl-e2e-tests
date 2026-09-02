import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { solicitorCaseCreateType } from "../../../../common/types.js";

export class ReturnApplication2Page extends EventPage {
  private readonly returnMessageHeading: Locator = this.page.getByRole(
    "heading",
    { name: "Return message", level: 3 },
  );
  private readonly returnMessageInstruction: Locator = this.page.getByText(
    "Return message will be this",
  );
  private readonly messageInput: Locator = this.page.getByRole("textbox", {
    name: "Return message will be this",
  });

  constructor(page: Page) {
    super(page, "Return application");
  }

  async assertPageContents(
    caseRef: string,
    caseName: string,
    rejectionReason: string,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    await this.assertPageHeadings();
    await expect(this.returnMessageHeading).toBeVisible();
    await expect(this.returnMessageInstruction).toBeVisible();
    await this.assertMessageContents(
      caseRef,
      caseName,
      rejectionReason,
      caseType,
    );
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  private async assertMessageContents(
    caseRef: string,
    caseName: string,
    rejectionReason: string,
    caseType: solicitorCaseCreateType,
  ): Promise<void> {
    if (caseType === "C100") {
      await expect(this.messageInput).toHaveValue(`Case name: ${caseName}
Reference code: ${caseRef}

Dear ${
        process.env.MANAGE_CASES_TEST_ENV === "demo"
          ? "PRL DEMO ORG1 Solicitor 2"
          : "AAT Solicitor"
      },

Thank you for your application. Your application has been reviewed and is being returned for the following reasons:

Application incorrect

Your application has been returned because the application has not been filled out correctly.

Next steps

Please check the application and ensure all relevant sections have been completed correctly.


Please resolve these issues and resubmit your application.

Kind regards,
${
  process.env.MANAGE_CASES_TEST_ENV === "demo"
    ? "Prl ctsc stoke"
    : "PRL Staff Admin"
}`);
    } else {
      await expect(this.messageInput).toHaveValue(
        `Case name: ${caseName}
Reference code: ${caseRef}

Dear Legal Solicitor,

Thank you for your application. Your application has been reviewed and is being returned for the following reasons:

${rejectionReason}

Your application has been returned because the application is not complete and does not contain the all required information.
You may need to request additional information to progress the case.

Next steps

Please check the application and ensure all relevant sections have been completed in full.


Please resolve these issues and resubmit your application.

Kind regards,
${
  process.env.MANAGE_CASES_TEST_ENV === "demo"
    ? "Prl ctsc stoke"
    : "PRL Staff Admin"
}`,
      );
    }
  }
}
