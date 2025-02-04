import { Page } from "@playwright/test";
import { Selectors } from "../../../../../common/selectors";
import { Helpers } from "../../../../../common/helpers";
import config from "../../../../../config";
import { OtherPeopleInTheCase1Content } from "../../../../../fixtures/manageCases/createCase/C100/otherPeopleInTheCaseRevised/otherPeopleInTheCaseRevised1Content.";

enum UniqueSelectors {
  uploadC8FormLabel = "label[for='otherPartyInTheCaseRevised_0_refugeConfidentialityC8Form'] .form-label",
  uploadC8FormHint = "label[for='otherPartyInTheCaseRevised_0_refugeConfidentialityC8Form'] + .form-hint",
  c8RefugeFormUploadFileInput = "#otherPartyInTheCaseRevised_0_refugeConfidentialityC8Form",
  otherPersonLivesInRefugeYes = "#otherPartyInTheCaseRevised_0_liveInRefuge_Yes",
  otherPersonLivesInRefugeNo = "#otherPartyInTheCaseRevised_0_liveInRefuge_No",
  otherPersonPostCodeInput = "#otherPartyInTheCaseRevised_0_address_address_postcodeInput",
  otherPersonAddressDropdown = "#otherPartyInTheCaseRevised_0_address_address_addressList",
  addressConfidentialYes = "#otherPartyInTheCaseRevised_0_isAddressConfidential_Yes",
  addressConfidentialNo = "#otherPartyInTheCaseRevised_0_isAddressConfidential",
}

enum PageLoadFields {
  otherPersonCurrentAddressYes = "#otherPartyInTheCaseRevised_0_isCurrentAddressKnown_Yes",
  otherPersonCurrentAddressNo = "#otherPartyInTheCaseRevised_0_isCurrentAddressKnown_No",
}

export class DummyC100OtherPersonDetailsPage {
  public static async dummyOtherPersonDetailsPage(
    page: Page,
    otherPersonLivesInRefuge: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${OtherPeopleInTheCase1Content.pageTitle}")`,
    );
    if (otherPersonLivesInRefuge) {
      await page.click(`${PageLoadFields.otherPersonCurrentAddressYes}`);
      await page.click(`${UniqueSelectors.otherPersonLivesInRefugeYes}`);
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.uploadC8FormLabel}:text-is("${OtherPeopleInTheCase1Content.formLabelC8FormUpload}")`,
        1,
      );
      await Helpers.checkVisibleAndPresent(
        page,
        `${UniqueSelectors.uploadC8FormHint}:text-is("${OtherPeopleInTheCase1Content.c8FormUploadHint}")`,
        1,
      );
      const fileInput = page.locator(
        `${UniqueSelectors.c8RefugeFormUploadFileInput}`,
      );
      await fileInput.setInputFiles(config.testPdfFile);
      await page.waitForSelector(
        `${Selectors.GovukErrorMessage}:text-is("${OtherPeopleInTheCase1Content.uploadingFile}")`,
        { state: "hidden" },
      );
      await page.fill(
        `${UniqueSelectors.otherPersonPostCodeInput}`,
        OtherPeopleInTheCase1Content.postcode,
      );
      await page
        .locator(
          `${Selectors.button}:text-is("${OtherPeopleInTheCase1Content.findAddressButton}")`,
        )
        .first()
        .click();
      await page.selectOption(
        `${UniqueSelectors.otherPersonAddressDropdown}`,
        OtherPeopleInTheCase1Content.address,
      );
      // await page.click(`${UniqueSelectors.addressConfidentialYes}`);
    } else {
      await page.click(`${PageLoadFields.otherPersonCurrentAddressNo}`);
    }
  }
}
