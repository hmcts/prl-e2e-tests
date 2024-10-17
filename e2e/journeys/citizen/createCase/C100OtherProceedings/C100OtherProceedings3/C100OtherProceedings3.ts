import { Page } from "@playwright/test";
import {
  ChildAbductionOrderDetailsPage
} from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings3/childAbduction/childAbductionOrderDetailsPage";
import {
  ChildAbductionDocumentUploadPage
} from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings3/childAbduction/childAbductionDocumentUploadPage";
import {
  ContactOrderForDivorceOrderDetailsPage
} from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings3/contactOrderForDivorce/contactOrderForDivorceOrderDetailsPage";
import {
  ContactOrderForDivorceDocumentUploadPage
} from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings3/contactOrderForDivorce/contactOrderForDivorceDocumentUploadPage";
import {
  ContactOrderForAdoptionOrderDetailsPage
} from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings3/contactOrderForChildAbduction/contactOrderForChildAbductionOrderDetailsPage";
import {
  ContactOrderForAdoptionDocumentUploadPage
} from "../../../../../pages/citizen/createCase/C100/otherProceedings/otherProceedings3/contactOrderForChildAbduction/contactOrderForChildAbductionDocumentUploadPage";

interface C100OtherProceedings3Options {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoChildAbductionOrderDetails: boolean;
  yesNoContactOrderForAdoptionOrderDetails: boolean;
  yesNoContactOrderForDivorceOrderDetails: boolean;
}


export class C100OtherProceedings3 {
  public static async c100OtherProceedings3({
                                              page,
                                              accessibilityTest,
                                              errorMessaging,
                                              yesNoChildAbductionOrderDetails,
                                              yesNoContactOrderForAdoptionOrderDetails,
                                              yesNoContactOrderForDivorceOrderDetails
                                            }: C100OtherProceedings3Options): Promise<void> {
    await ChildAbductionOrderDetailsPage.childAbductionOrderDetailsPage({
      page,
      accessibilityTest,
      errorMessaging,
      yesNoChildAbductionOrderDetails,
    });
    await ChildAbductionDocumentUploadPage.childAbductionDocumentUploadPageOptions({
      page,
      accessibilityTest,
      errorMessaging,
    });
    await ContactOrderForDivorceOrderDetailsPage.contactOrderForDivorceOrderDetailsPageOptions({
      page,
      accessibilityTest,
      errorMessaging,
      yesNoContactOrderForDivorceOrderDetails,
    });
    await ContactOrderForDivorceDocumentUploadPage.contactOrderForDivorceDocumentUploadPage({
      page,
      accessibilityTest,
      errorMessaging,
    });
    await ContactOrderForAdoptionOrderDetailsPage.contactOrderForAdoptionOrderDetailsPageOptions({
      page,
      accessibilityTest,
      errorMessaging,
      yesNoContactOrderForAdoptionOrderDetails,
    });
    await ContactOrderForAdoptionDocumentUploadPage.contactOrderForAdoptionDocumentUploadPage({
      page,
      accessibilityTest,
      errorMessaging,
    });
  }
}