import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import {
  yesNoDontKnow,
  documentSubmittedBy,
} from "../../../../common/types.js";

function documentLinkFor(submittedBy: documentSubmittedBy): string {
  return submittedBy === "CourtNav" ? "testPdf.pdf" : "mockFile.pdf";
}

const restrictAnswerText: Record<yesNoDontKnow, string> = {
  yes: CommonStaticText.yes,
  no: CommonStaticText.no,
  dontKnow: "I am not sure",
};

export class ReviewDocumentsSubmitPage extends CheckYourAnswersPage {
  readonly selectDocumentText: Locator = this.page.locator(
    Selectors.GovukText16,
    { hasText: "Select document" },
  );
  readonly restrictAccessQuestionText: Locator = this.page.locator(
    Selectors.GovukText16,
    { hasText: "Do you want to restrict access to this document?" },
  );

  constructor(page: Page) {
    super(page, "Review documents", CommonStaticText.submit);
  }

  async assertDocumentAndAnswers(
    yesNoNotSureRestrictDocs: yesNoDontKnow,
    documentSubmittedBy: documentSubmittedBy,
  ): Promise<void> {
    await this.assertPageContents();
    await Promise.all([
      expect(this.selectDocumentText).toBeVisible(),
      expect(this.restrictAccessQuestionText).toBeVisible(),
      expect(
        this.page.getByText(restrictAnswerText[yesNoNotSureRestrictDocs], {
          exact: true,
        }),
      ).toBeVisible(),
      expect(
        this.page.locator("ccd-read-dynamic-list-field span", {
          hasText: documentLinkFor(documentSubmittedBy),
        }),
      ).toBeVisible(),
    ]);
  }
}
