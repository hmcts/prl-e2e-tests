import { Page, expect } from "@playwright/test";
import AccessibilityTestHelper from "../../../../../common/accessibilityTestHelper";
import { Helpers } from "../../../../../common/helpers";
import { Selectors } from "../../../../../common/selectors";
import { Fl401Home1Content } from "../../../../../fixtures/manageCases/createCase/FL401/theHome/fl401Home1Content";

enum uniqueSelectors {
  intendedHomeDiv = "div#home_intendToLiveAtTheAddress > fieldset > div > ",
  homeChildrenDiv = "div#home_children > div ",
  homeAddressLookupDiv = "div#home_address_address ",
  homePeopleLiveAtAddress = "div#home_peopleLivingAtThisAddress > fieldset > div > ",
  homeEverLivedAtAddress = "div#home_everLivedAtTheAddress > fieldset > div > ",
  topLevelSelectors = "div#home_home.form-group > fieldset > ccd-field-write > div:visible ",
  homeMortgageLookupDiv = "div#home_mortgages_mortgages ",
  homeLandlordLookupDiv = "div#home_landlords_landlords ",
  homeTextAreaSibling = "label[for='home_textAreaSomethingElse'] + ",
}

enum checkboxIDs {
  applicantHome = "#home_peopleLivingAtThisAddress-applicant",
  respondentHome = "#home_peopleLivingAtThisAddress-respondent",
  childrenHome = "#home_peopleLivingAtThisAddress-applicantChildren",
  someoneElseHome = "#home_peopleLivingAtThisAddress-someoneElse",
  applicantWantsToStayHome = "#home_livingSituation-ableToStayInHome",
  applicantWantsToReturnHome = "#home_livingSituation-ableToReturnHome",
  applicantsWantsEntryRestriction = "#home_livingSituation-restrictFromEnteringHome",
  awayFromHome = "#home_livingSituation-awayFromHome",
  limitRespondentInHome = "#home_livingSituation-limitRespondentInHome",
  payForRepairs = "#home_familyHome-payForRepairs",
  payRent = "#home_familyHome-payOrContributeRent",
  needsContents = "#home_familyHome-useHouseholdContents",
}

enum secondLevelCheckboxIDs {
  applicantMortgage = "#home_mortgages_mortgageNamedAfter-applicant",
  respondentMortgage = "#home_mortgages_mortgageNamedAfter-respondent",
  someoneElseMortgage = "#home_mortgages_mortgageNamedAfter-someoneElse",
  applicantLandlord = "#home_landlords_mortgageNamedAfterList-applicant",
  respondentLandlord = "#home_landlords_mortgageNamedAfterList-respondent",
  someoneElseLandlord = "#home_landlords_mortgageNamedAfterList-someoneElse",
}

enum inputIDs {
  homeAddressPostcodeInput = "#home_address_address_postcodeInput",
  homeAddressSelectAddress = "#home_address_address_addressList",
  homeAddressBuildingAndStreet = "#home_address__detailAddressLine1",
  homeAddressAddressLine2 = "#home_address__detailAddressLine2",
  homeAddressAddressLine3 = "#home_address__detailAddressLine3",
  homeAddressTownOrCity = "#home_address__detailPostTown",
  homeAddressAddressCounty = "#home_address__detailCounty",
  homeAddressPostalCode = "#home_address__detailPostCode",
  homeAddressAddressCountry = "#home_address__detailCountry",
  homeMortgagePostcodeInput = "#home_mortgages_address_address_postcodeInput",
  homeMortgageSelectAddress = "#home_mortgages_address_address_addressList",
  homeMortgageBuildingAndStreet = "#home_mortgages_address__detailAddressLine1",
  homeMortgageAddressLine2 = "#home_mortgages_address__detailAddressLine2",
  homeMortgageAddressLine3 = "#home_mortgages_address__detailAddressLine3",
  homeMortgageTownOrCity = "#home_mortgages_address__detailPostTown",
  homeMortgageAddressCounty = "#home_mortgages_address__detailCounty",
  homeMortgagePostalCode = "#home_mortgages_address__detailPostCode",
  homeMortgageAddressCountry = "#home_mortgages_address__detailCountry",
  homeLandlordPostcodeInput = "#home_landlords_address_address_postcodeInput",
  homeLandlordSelectAddress = "#home_landlords_address_address_addressList",
  homeLandlordBuildingAndStreet = "#home_landlords_address__detailAddressLine1",
  homeLandlordAddressLine2 = "#home_landlords_address__detailAddressLine2",
  homeLandlordAddressLine3 = "#home_landlords_address__detailAddressLine3",
  homeLandlordTownOrCity = "#home_landlords_address__detailPostTown",
  homeLandlordAddressCounty = "#home_landlords_address__detailCounty",
  homeLandlordPostalCode = "#home_landlords_address__detailPostCode",
  homeLandlordAddressCountry = "#home_landlords_address__detailCountry",
  secondLevelOccupantDetails = "home_textAreaSomethingElse",
  everLivedAtAddress = "#home_everLivedAtTheAddress-",
  intendToLiveAtAddress = "#home_intendToLiveAtTheAddress-",
  childrenAtAddressYes = "#home_doAnyChildrenLiveAtAddress_Yes",
  childrenAtAddressNo = "#home_doAnyChildrenLiveAtAddress_No",
  propertyAdaptedYes = "#home_isPropertyAdapted_Yes",
  propertyAdaptedNo = "#home_isPropertyAdapted_No",
  mortgagePropertyYes = "#home_isThereMortgageOnProperty_Yes",
  mortgagePropertyNo = "#home_isThereMortgageOnProperty_No",
  rentedPropertyYes = "#home_isPropertyRented_Yes",
  rentedPropertyNo = "#home_isPropertyRented_No",
  applicantHomeRightsYes = "#home_doesApplicantHaveHomeRights_Yes",
  applicantHomeRightsNo = "#home_doesApplicantHaveHomeRights_No",
  confidentialInfoYes = "#home_children_0_keepChildrenInfoConfidential_Yes",
  confidentialInfoNo = "#home_children_0_keepChildrenInfoConfidential_No",
  childFullName = "#home_children_0_childFullName",
  childAge = "#home_children_0_childsAge",
  respondentResponsibleForChildYes = "#home_children_0_isRespondentResponsibleForChild_Yes",
  respondentResponsibleForChildNo = "#home_children_0_isRespondentResponsibleForChild_No",
  textAreaHomeSomethingElse = "#home_textAreaSomethingElse",
  textAreaSpeciallyAdapted = "#home_howIsThePropertyAdapted",
  textAreaMortgageSomethingElse = "#home_mortgages_textAreaSomethingElse",
  textAreaLandlordSomethingElse = "#home_landlords_textAreaSomethingElse",
  textAreaFurtherInfo = "#home_furtherInformation",
  mortgageNumber = "#home_mortgages_mortgageNumber",
  mortgageLender = "#home_mortgages_mortgageLenderName",
  landlordName = "#home_landlords_landlordName",
  adaptedProperty = "#home_howIsThePropertyAdapted",
}

export type addressRadios =
  | "yesBothOfThem"
  | "yesApplicant"
  | "yesRespondent"
  | "No";

interface FL401TheHome1PageOptions {
  page: Page;
  accessibilityTest: boolean;
  applicantHasChildren: boolean;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

interface FillInFieldsOptions {
  page: Page;
  applicantHasChildren: boolean;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

interface CheckPageLoadsOptions {
  page: Page;
  accessibilityTest: boolean;
}

interface FillInBooleansOptions {
  page: Page;
  applicantHasChildren: boolean;
  fl401TheHomeYesNo: boolean;
}

interface AddNewChildOptions {
  page: Page;
  fl401TheHomeYesNo: boolean;
}

interface FillInAddressRadiosOptions {
  page: Page;
  applicantOrRespondentResponse: addressRadios;
  isTopLevel: boolean;
}

interface FillAllAddressRadiosOptions {
  page: Page;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

interface FillInAddressFieldsOptions {
  page: Page;
  fl401TheHomeYesNo: boolean;
  fl401EverLivedAtAddress: addressRadios;
  fl401IntendToLiveAtAddress?: addressRadios;
}

interface AddressLabelValidationOptions {
  page: Page;
  uniqueSelectorKey: keyof typeof uniqueSelectors;
}

interface AddressValueValidationOptions {
  page: Page;
  addressType: string;
}

interface FillRemainingInputsOptions {
  page: Page;
  fl401TheHomeYesNo: boolean;
}

export class Fl401TheHome1Page {
  public static async fl401TheHome1Page({
    page,
    accessibilityTest,
    applicantHasChildren,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress,
  }: FL401TheHome1PageOptions): Promise<void> {
    await this.checkPageLoads({
      page,
      accessibilityTest,
    });
    await this.fillInFields({
      page,
      applicantHasChildren,
      fl401TheHomeYesNo,
      fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress,
    });
  }

  private static async checkPageLoads({
    page,
    accessibilityTest,
  }: CheckPageLoadsOptions): Promise<void> {
    await page.waitForSelector(
      `${Selectors.GovukHeadingL}:text-is("${Fl401Home1Content.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(page, 2, Fl401Home1Content, "p", `${Selectors.p}`),
      Helpers.checkGroup(
        page,
        19,
        Fl401Home1Content,
        "topFormLabel",
        `${uniqueSelectors.topLevelSelectors}${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.topLevelSelectors}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelYes}")`,
        5,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.topLevelSelectors}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelNo}")`,
        6,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.homeAddressLookupDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.enterUKPostcode}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.homePeopleLiveAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.theApplicant}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.homePeopleLiveAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.theRespondent}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.homePeopleLiveAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.someoneElsePleaseSpecify}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.homeEverLivedAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesTheApplicant}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.homeEverLivedAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesTheRespondent}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.homeEverLivedAtAddress}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesBothOfThem}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await AccessibilityTestHelper.run(page);
    }
  }

  private static async fillInFields({
    page,
    applicantHasChildren,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress,
  }: FillInFieldsOptions): Promise<void> {
    await this.fillInBooleans({
      page,
      fl401TheHomeYesNo,
      applicantHasChildren,
    });
    await this.fillInAddressFields({
      page,
      fl401TheHomeYesNo,
      fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress,
    });
    if (applicantHasChildren) {
      await this.addNewChild({
        page,
        fl401TheHomeYesNo,
      });
    }
    if (fl401TheHomeYesNo) {
      await this.fillAndCheckSecondLevel(page);
    }
    await this.fillRemainingInputs({
      page,
      fl401TheHomeYesNo,
    });
    await page.click(
      `${Selectors.button}:text-is("${Fl401Home1Content.continue}")`,
    );
  }

  private static async fillRemainingInputs({
    page,
    fl401TheHomeYesNo,
  }: FillRemainingInputsOptions): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${uniqueSelectors.homeTextAreaSibling}${Selectors.GovukFormHint}:text-is("${Fl401Home1Content.provideTheDetailsInTheBoxBelow}")`,
      1,
    );
    if (fl401TheHomeYesNo) {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeMortgageLookupDiv}${Selectors.GovukFormHint}:text-is("${Fl401Home1Content.provideTheDetailsInTheBoxBelow}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.homeLandlordLookupDiv}${Selectors.GovukFormHint}:text-is("${Fl401Home1Content.provideTheDetailsInTheBoxBelow}")`,
          1,
        ),
      ]);
    }
    await page.fill(
      inputIDs.textAreaHomeSomethingElse,
      Fl401Home1Content.someoneElseInput,
    );
    await page.fill(
      inputIDs.textAreaFurtherInfo,
      Fl401Home1Content.textAreaFurtherInfo,
    );
    if (fl401TheHomeYesNo) {
      await page.fill(
        inputIDs.textAreaMortgageSomethingElse,
        Fl401Home1Content.textAreaMortgageSomethingElse,
      );
      await page.fill(
        inputIDs.textAreaLandlordSomethingElse,
        Fl401Home1Content.textAreaLandlordSomethingElse,
      );
    }
  }

  private static async fillAndCheckSecondLevel(page: Page): Promise<void> {
    await Promise.all([
      Helpers.checkGroup(
        page,
        5,
        Fl401Home1Content,
        "secondLevelFormLabel",
        `${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormHint}:text-is("${Fl401Home1Content.adaptedPropertyFormHint}")`,
        1,
      ),
    ]);
    for (const checkboxID of Object.values(secondLevelCheckboxIDs)) {
      await page.check(checkboxID);
    }
    const secondLevelInputs: string[] = [
      "mortgageNumber",
      "mortgageLender",
      "landlordName",
      "adaptedProperty",
    ];
    for (const key of secondLevelInputs) {
      const inputKey = key as keyof typeof inputIDs;
      const contentKey = key as keyof typeof Fl401Home1Content;
      await page.fill(inputIDs[inputKey], Fl401Home1Content[contentKey]);
    }
  }

  private static async fillInAddressFields({
    page,
    fl401TheHomeYesNo,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress,
  }: FillInAddressFieldsOptions): Promise<void> {
    await this.fillAllAddressRadios({
      page: page,
      fl401EverLivedAtAddress: fl401EverLivedAtAddress,
      fl401IntendToLiveAtAddress: fl401IntendToLiveAtAddress,
    });
    const addressTypeLoop = fl401TheHomeYesNo
      ? ["homeAddress", "homeMortgage", "homeLandlord"]
      : ["homeAddress"];
    for (const addressType of addressTypeLoop) {
      const postcodeInput =
        `${addressType}PostcodeInput` as keyof typeof inputIDs;
      await page.fill(
        `${inputIDs[postcodeInput]}`,
        `${Fl401Home1Content.bpPostalCode}`,
      );
      const uniqueSelectorKey =
        `${addressType}LookupDiv` as keyof typeof uniqueSelectors;
      await page.click(
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.button}:text-is("${Fl401Home1Content.findAddress}")`,
      );
      await page.waitForSelector(
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.selectAddress}")`,
      );
      const selectAddressInput =
        `${addressType}SelectAddress` as keyof typeof inputIDs;
      await page
        .locator(inputIDs[selectAddressInput])
        .selectOption({ index: 1 });
      await this.addressLabelValidation({
        page,
        uniqueSelectorKey,
      });
      await this.addressValueValidation({ page, addressType });
    }
  }

  private static async addNewChild({
    page,
    fl401TheHomeYesNo,
  }: AddNewChildOptions): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.h2}:text-is("${Fl401Home1Content.childHeading2}")`,
      1,
    );
    await page.click(
      `${Selectors.button}:text-is("${Fl401Home1Content.childAddNewButton}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        4,
        Fl401Home1Content,
        "childFormLabel",
        `${uniqueSelectors.homeChildrenDiv}${Selectors.GovukFormLabel}`,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.homeChildrenDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelYes}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors.homeChildrenDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelNo}")`,
        2,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${Fl401Home1Content.childHeading3}")`,
        1,
      ),
    ]);
    if (fl401TheHomeYesNo) {
      await page.click(inputIDs.confidentialInfoYes);
      await page.click(inputIDs.respondentResponsibleForChildYes);
    } else {
      await page.click(inputIDs.confidentialInfoNo);
      await page.click(inputIDs.respondentResponsibleForChildNo);
    }
    await page.fill(inputIDs.childFullName, Fl401Home1Content.childFullName);
    await page.fill(inputIDs.childAge, Fl401Home1Content.childAge);
  }

  private static async fillAllAddressRadios({
    page,
    fl401EverLivedAtAddress,
    fl401IntendToLiveAtAddress,
  }: FillAllAddressRadiosOptions): Promise<void> {
    await this.fillInAddressRadios({
      page: page,
      applicantOrRespondentResponse: fl401EverLivedAtAddress,
      isTopLevel: true,
    });
    if (fl401EverLivedAtAddress === "No") {
      await Promise.all([
        Helpers.checkVisibleAndPresent(
          page,
          `${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.intendedAddressLabel}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.intendedHomeDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.labelNo}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.intendedHomeDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesTheApplicant}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.intendedHomeDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesTheRespondent}")`,
          1,
        ),
        Helpers.checkVisibleAndPresent(
          page,
          `${uniqueSelectors.intendedHomeDiv}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.yesBothOfThem}")`,
          1,
        ),
      ]);
      if (fl401IntendToLiveAtAddress) {
        await this.fillInAddressRadios({
          page: page,
          applicantOrRespondentResponse: fl401IntendToLiveAtAddress,
          isTopLevel: false,
        });
      } else {
        if (process.env.PWDEBUG) {
          console.log(
              'fl401IntendToLiveAtAddress cannot be null if fl401EverLivedAtAddress is "No"',
          );
        }
      }
    }
  }

  private static async fillInAddressRadios({
    page,
    applicantOrRespondentResponse,
    isTopLevel,
  }: FillInAddressRadiosOptions): Promise<void> {
    const multipleChoiceID = isTopLevel
      ? inputIDs.everLivedAtAddress
      : inputIDs.intendToLiveAtAddress;
    await page.click(`${multipleChoiceID}${applicantOrRespondentResponse}`);
  }

  private static async fillInBooleans({
    page,
    applicantHasChildren,
    fl401TheHomeYesNo,
  }: FillInBooleansOptions): Promise<void> {
    for (const checkboxID of Object.values(checkboxIDs)) {
      await page.check(checkboxID);
    }
    const yesNoString = fl401TheHomeYesNo ? "Yes" : "No";
    const hasChildren = applicantHasChildren ? "Yes" : "No";
    const childrenAtAddressKey =
      `childrenAtAddress${hasChildren}` as keyof typeof inputIDs;
    await page.click(inputIDs[childrenAtAddressKey]);
    const propertyAdaptedKey =
      `propertyAdapted${yesNoString}` as keyof typeof inputIDs;
    await page.click(inputIDs[propertyAdaptedKey]);
    const mortgagePropertyKey =
      `mortgageProperty${yesNoString}` as keyof typeof inputIDs;
    await page.click(inputIDs[mortgagePropertyKey]);
    const rentedPropertyKey =
      `rentedProperty${yesNoString}` as keyof typeof inputIDs;
    await page.click(inputIDs[rentedPropertyKey]);
    const applicantHomeRightsKey =
      `applicantHomeRights${yesNoString}` as keyof typeof inputIDs;
    await page.click(inputIDs[applicantHomeRightsKey]);
  }

  private static async addressLabelValidation({
    page,
    uniqueSelectorKey,
  }: AddressLabelValidationOptions): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.buildingAndStreet}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.addressLine2}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.addressLine3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.townOrCity}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.addressCounty}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.postalCode}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${uniqueSelectors[uniqueSelectorKey]}${Selectors.GovukFormLabel}:text-is("${Fl401Home1Content.addressCountry}")`,
        1,
      ),
    ]);
  }

  private static async addressValueValidation({
    page,
    addressType,
  }: AddressValueValidationOptions): Promise<void> {
    const buildingKey =
      `${addressType}BuildingAndStreet` as keyof typeof inputIDs;
    const addressLine2Key =
      `${addressType}AddressLine2` as keyof typeof inputIDs;
    const addressLine3Key =
      `${addressType}AddressLine3` as keyof typeof inputIDs;
    const townOrCityKey = `${addressType}TownOrCity` as keyof typeof inputIDs;
    const addressCountyKey =
      `${addressType}AddressCounty` as keyof typeof inputIDs;
    const postalCodeKey = `${addressType}PostalCode` as keyof typeof inputIDs;
    const addressCountryKey =
      `${addressType}AddressCountry` as keyof typeof inputIDs;
    await Promise.all([
      expect(page.locator(inputIDs[buildingKey])).toHaveValue(
        Fl401Home1Content.bpBuildingAndStreet,
      ),
      expect(page.locator(inputIDs[addressLine2Key])).toHaveValue(
        Fl401Home1Content.bpAddressLine2,
      ),
      expect(page.locator(inputIDs[addressLine3Key])).toHaveValue(
        Fl401Home1Content.bpAddressLine3,
      ),
      expect(page.locator(inputIDs[townOrCityKey])).toHaveValue(
        Fl401Home1Content.bpCity,
      ),
      expect(page.locator(inputIDs[addressCountyKey])).toHaveValue(
        Fl401Home1Content.bpCounty,
      ),
      expect(page.locator(inputIDs[postalCodeKey])).toHaveValue(
        Fl401Home1Content.bpPostalCode,
      ),
      expect(page.locator(inputIDs[addressCountryKey])).toHaveValue(
        Fl401Home1Content.bpCountry,
      ),
    ]);
  }
}
