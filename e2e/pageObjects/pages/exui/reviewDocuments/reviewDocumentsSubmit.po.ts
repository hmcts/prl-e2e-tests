import { CheckYourAnswersPage } from "../checkYourAnswers.po.js";
import { Page } from "@playwright/test";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import {
  yesNoDontKnow,
  documentSubmittedBy,
} from "../../../../common/types.js";

export class ReviewDocumentsSubmitPage extends CheckYourAnswersPage {
  constructor(page: Page) {
    super(page, "Review documents", CommonStaticText.submit);
  }

  /**
   * Verifies the Review documents check-your-answers page via screenshot comparison ) in one visual diff.
   */
  async assertDocumentAndAnswers(
    yesNoNotSureRestrictDocs: yesNoDontKnow,
    documentSubmittedBy: documentSubmittedBy,
  ): Promise<void> {
    await this.assertPageContents(
      ["manageCases", "courtnav"],
      `review-documents-${documentSubmittedBy}-${yesNoNotSureRestrictDocs}`,
    );
  }
}
