import { Page } from "@playwright/test";
import { EventPage } from "../eventPage.po.ts";
import { CheckYourAnswersTable } from "../../../components/exui/checkYourAnswersTable.component.ts";
export class AmendApplicantDetailsSubmitPage extends EventPage {
  constructor(
    page: Page,
    private table: CheckYourAnswersTable,
  ) {
    super(page, "Amend applicant details");
  }

  async checkPageLoaded() {
    await this.checkHeading();
    await this.table.sectionHeading("Check your answers");
  }

  async checkApplicantName(first: string, last: string, previous?: string) {
    await this.table.checkAnswer("*First name(s)", first);
    await this.table.checkAnswer("*Last name", last);
    if (previous) {
      await this.table.checkAnswer("Previous name (if any)", previous);
    }
  }

  async checkDateOfBirth(day: string, month: string, year: string) {
    const shortMonth = new Date(0, parseInt(month) - 1).toLocaleString("en", {
      month: "short",
    });
    await this.table.checkAnswer(
      "*Date of birth",
      `${day} ${shortMonth} ${year}`,
    );
  }

  async checkGender(gender: string) {
    switch (gender) {
      case "male":
        await this.table.checkAnswer("*Gender", "Male");
        break;
      case "female":
        await this.table.checkAnswer("*Gender", "Female");
        break;
      case "other":
        await this.table.checkAnswer("*Gender", "They identify in another way");
        break;
    }
  }

  async checkRefugeAndUpload() {
    await this.table.checkAnswer(
      "*Does the applicant currently live in a refuge?",
      "Yes",
    );
    await this.table.checkAnswer(
      "*Upload a C8 form with the refuge address",
      "mockFile.pdf",
    );
  }

  async checkConfidentialDetails(email: string) {
    await Promise.all([
      this.table.checkYesNo("*Can you provide email address?", true),
      this.table.checkAnswer("*Email address", email),
      this.table.checkYesNo(
        "*Do you need to keep the address confidential?",
        true,
      ),
      this.table.checkYesNo(
        "*Do you need to keep the contact number confidential?",
        true,
      ),
      this.table.checkYesNo(
        "*Do you need to keep the email address confidential?",
        true,
      ),
    ]);
  }

  async checkSolicitorDetails(
    first: string,
    last: string,
    email: string,
    phone: string,
    reference: string,
  ) {
    await Promise.all([
      this.table.checkAnswer("*Representative's first name", first),
      this.table.checkAnswer("*Representative's last name", last),
      this.table.checkAnswer("*Email address", email),
      this.table.checkAnswer("*Telephone number", phone),
      this.table.checkAnswer("Solicitor reference", reference),
    ]);
  }
}
