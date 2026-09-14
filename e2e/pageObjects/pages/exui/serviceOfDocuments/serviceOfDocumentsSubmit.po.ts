import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { PageUtils } from "../../../../utils/page.utils.js";
import { yesNoNA } from "../../../../common/types.js";

export interface ServiceOfDocumentsAnswers {
  withCaseDoc: boolean;
  additionalDoc: boolean;
  additionalRecipient: boolean;
  personallyServed: yesNoNA;
  servedByPost: boolean;
  checkDocuments: boolean;
}

export class ServiceOfDocumentsSubmitPage extends CheckYourAnswersPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);
  private readonly answerText: Locator = this.page.locator(
    Selectors.GovukText16,
  );

  private readonly staticFields: string[] = [
    "Documents",
    "Does this document need to be personally served on the respondent?",
    "Documents 1",
    "Applications -> Applicant documents -> Applicant application -> FL401FinalDocumentWelsh.pdf",
    "Does someone need to check the documents?",
  ];

  constructor(page: Page) {
    super(page, "Service of documents", CommonStaticText.saveAndContinue);
  }

  async assertAnswers({
    withCaseDoc,
    additionalDoc,
    additionalRecipient,
    personallyServed,
    servedByPost,
    checkDocuments,
  }: ServiceOfDocumentsAnswers): Promise<void> {
    await this.assertPageHeadings();
    await expect(
      this.page.getByText("Check the information below carefully."),
    ).toBeVisible();
    await this.pageUtils.assertStrings(this.staticFields, this.answerText);
    await this.assertCaseDocument(withCaseDoc);
    await this.assertAdditionalDocument(additionalDoc);
    await this.assertAdditionalRecipient(additionalRecipient, servedByPost);
    await this.assertPersonalService(personallyServed);
    await this.assertDocumentVerification(checkDocuments);
  }

  private async assertCaseDocument(withCaseDoc: boolean): Promise<void> {
    if (!withCaseDoc) return;
    await this.pageUtils.assertStrings(
      [
        "Documents 2",
        "Preliminary Documents -> Position statements -> mockFile.pdf",
      ],
      this.answerText,
    );
  }

  private async assertAdditionalDocument(
    additionalDoc: boolean,
  ): Promise<void> {
    if (!additionalDoc) return;
    await this.pageUtils.assertStrings(
      ["Upload additional documents"],
      this.answerText,
    );
  }

  private async assertAdditionalRecipient(
    additionalRecipient: boolean,
    servedByPost: boolean,
  ): Promise<void> {
    if (!additionalRecipient) return;
    await this.pageUtils.assertStrings(
      ["Recipient", "Recipient 1", "Served by"],
      this.answerText,
    );
    await this.pageUtils.assertStrings(
      [servedByPost ? "Post" : "Email"],
      this.answerText,
    );
  }

  private async assertPersonalService(
    personallyServed: yesNoNA,
  ): Promise<void> {
    switch (personallyServed) {
      case "Yes":
        await this.pageUtils.assertStrings(
          [
            "Yes",
            "Applicant's legal representative",
            "Who is responsible for serving the respondent?",
            "Select additional recipients who needs to be served",
            "Additional recipients (optional)",
          ],
          this.answerText,
        );
        break;
      case "No":
        await this.pageUtils.assertStrings(
          ["No", "Confirm Recipients"],
          this.answerText,
        );
        await this.pageUtils.assertStrings(
          ["John Smith(Applicant)", "Elise Lynn (Respondent)"],
          this.page.locator(Selectors.p),
        );
        break;
      case "Not applicable":
        await this.pageUtils.assertStrings(["Not applicable"], this.answerText);
        break;
      default:
        throw new Error(
          `Unexpected value for personallyServed: ${personallyServed as string}`,
        );
    }
  }

  private async assertDocumentVerification(
    checkDocuments: boolean,
  ): Promise<void> {
    const expectedText: string = checkDocuments
      ? "A manager needs to check the documents"
      : "No checks are required";
    await this.pageUtils.assertStrings([expectedText], this.answerText);
  }
}
