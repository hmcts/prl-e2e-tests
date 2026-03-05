import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../utils/page.utils.js";

export class UploadAdditionalApplications1Page extends EventPage {
  readonly c2OrderRadio: Locator = this.page.locator(
    "#additionalApplicationsApplyingFor-c2Order",
  );
  readonly otherOrderRadio: Locator = this.page.locator(
    "#additionalApplicationsApplyingFor-otherOrder",
  );
  readonly c2WithNoticeRadio: Locator = this.page.locator(
    "#typeOfC2Application-applicationWithNotice",
  );
  readonly c2WithoutNoticeRadio: Locator = this.page.locator(
    "#typeOfC2Application-applicationWithoutNotice",
  );

  readonly uploadFormLabels: string[] = [
    "What are you applying for?",
    "Other specific orders",
    "C2 - to add or remove someone on a case, or for a specific request to the judge",
    "Select party(s)",
  ];

  readonly CAPartiesFormLabels: string[] = [
    "John Doe (Applicant 1)",
    "Jeremy Anderson (Applicant 2)",
    "Martina Graham (Applicant 3)",
    "Mary Richards (Respondent 1)",
    "Elise Lynn (Respondent 2)",
    "David Carman (Respondent 3)",
    "Sam Nolan",
  ];

  readonly DAPartiesFormLabels: string[] = [
    "John Smith(Applicant)",
    "Elise Lynn (Respondent)",
  ];

  readonly c2FormLabels: string[] = [
    "What type of C2 application?",
    "Application with notice. The other party will be notified about this application, even if there is no hearing",
    "Application by consent or without notice. No notice will be sent to the other party if the application is without notice, even if there is a hearing",
  ];

  constructor(page: Page) {
    super(page, "Upload additional applications");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(caseType: string): Promise<void> {
    await this.assertPageHeadings();
    await this.pageUtils.assertStrings(this.uploadFormLabels);
    if (caseType === "C100") {
      await this.pageUtils.assertStrings(this.CAPartiesFormLabels);
    } else {
      await this.pageUtils.assertStrings(this.DAPartiesFormLabels);
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectApplicationType(
    additionalApplicationType: string,
    withNotice: boolean,
  ): Promise<void> {
    if (additionalApplicationType === "c2") {
      await this.c2OrderRadio.check();
      await this.pageUtils.assertStrings(this.c2FormLabels);
      if (withNotice) {
        await this.c2WithNoticeRadio.check();
      } else {
        await this.c2WithoutNoticeRadio.check();
      }
    } else {
      await this.otherOrderRadio.check();
    }

    await this.selectApplicants();
  }

  async selectApplicants() {
    const checkboxes = await this.page
      .locator("#additionalApplicantsList")
      .getByRole("checkbox")
      .all();
    for (const checkbox of checkboxes) {
      await checkbox.check();
    }
  }
}
