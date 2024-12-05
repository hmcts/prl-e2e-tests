import { test } from "@playwright/test";
import Config from "../../../../config";
import { ServiceOfDocuments } from "../../../../journeys/manageCases/caseProgression/servceOfDocuments/serviceOfDocuments";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });
test.describe("Service of Document event for DA Citizen case tests as court admin.", () => {
  test(`Complete 'Service of Documents' with following options: 
  Additional documents added: no, 
  Witness statement (case doc) added to event: no, 
  Documents should be personally served: Yes, 
  Serve to an additional recipient: yes, 
  Additional recipients served by post or email: post, 
  Documents should be check by manager: yes, 
  Accessibility testing: Yes. @accessibility @nightly`, async ({
    page,
  }): Promise<void> => {
    await ServiceOfDocuments.serviceOfDocumentsE2E({
      page,
      accessibilityTest: true,
      withCaseDoc: false,
      additionalDoc: false,
      additionalRecipient: true,
      personallyServed: "Yes",
      servedByPost: true,
      checkDocuments: true,
    });
  });
  test(`Complete 'Service of Documents' with following options: 
  Additional documents added: yes
  Witness statement (case doc) added to event: yes
  Documents should be personally served: No, 
  Serve to an additional recipient: yes, 
  Additional recipients served by post or email: email, 
  Documents should be check by manager: no, 
  Accessibility testing: No. @regression @debug`, async ({
    page,
  }): Promise<void> => {
    await ServiceOfDocuments.serviceOfDocumentsE2E({
      page,
      accessibilityTest: false,
      withCaseDoc: true,
      additionalDoc: true,
      additionalRecipient: true,
      personallyServed: "No",
      servedByPost: false,
      checkDocuments: false,
    });
  });
  test(`Complete 'Service of Documents' with following options: 
  Additional documents added: yes
  Witness statement (case doc) added to event: no
  Documents should be personally served: Not applicable, 
  Serve to an additional recipient: no, 
  Documents should be check by manager: no, 
  Accessibility testing: No. @regression`, async ({ page }): Promise<void> => {
    await ServiceOfDocuments.serviceOfDocumentsE2E({
      page,
      accessibilityTest: false,
      withCaseDoc: false,
      additionalDoc: false,
      additionalRecipient: false,
      personallyServed: "Not applicable",
      servedByPost: false,
      checkDocuments: false,
    });
  });
});
