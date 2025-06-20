import { Page } from "@playwright/test";
import { Helpers } from "../../../../../common/helpers.ts";
import { Selectors } from "../../../../../common/selectors.ts";
import { ChildrenAndOtherPeople1Content } from "../../../../../fixtures/manageCases/createCase/C100/childrenAndOtherPeople/childrenAndOtherPeople1Content.ts";
import { AxeUtils } from "@hmcts/playwright-common";

enum UniqueSelectors {
  relationshipDropdown = "#buffChildAndOtherPeopleRelations_0_childAndOtherPeopleRelation",
  giveDetailsForOtherRelationshipInput = "#buffChildAndOtherPeopleRelations_0_childAndOtherPeopleRelationOtherDetails",
  childLiveWithThisPersonYes = "#buffChildAndOtherPeopleRelations_0_childLivesWith_Yes",
  childLiveWithThisPersonNo = "#buffChildAndOtherPeopleRelations_0_childLivesWith_No",
  identityConfidentialityYes = "#buffChildAndOtherPeopleRelations_0_isChildLivesWithPersonConfidential_Yes",
  identityConfidentialityNo = "#buffChildAndOtherPeopleRelations_0_isChildLivesWithPersonConfidential_No",
}

enum nameSelectors {
  childLivesWithYes = "label[for='buffChildAndOtherPeopleRelations_0_childLivesWith_Yes']",
  childLivesWithPersonConfidentialYes = "label[for='buffChildAndOtherPeopleRelations_0_isChildLivesWithPersonConfidential_Yes']",
  childLivesWithNo = "label[for='buffChildAndOtherPeopleRelations_0_childLivesWith_No']",
  childLivesWithPersonConfidentialNo = "label[for='buffChildAndOtherPeopleRelations_0_isChildLivesWithPersonConfidential_No']",
}

export class ChildrenAndOtherPeople1Page {
  public static async childrenAndOtherPeople1Page(
    page: Page,
    accessibilityTest: boolean,
    errorMessaging: boolean,
    yesNoChildrenAndOtherPeople: boolean,
  ): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    if (errorMessaging) {
      await this.triggerErrorMessages(page);
    }
    await this.fillInFields(page, yesNoChildrenAndOtherPeople);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h2}:text-is("${ChildrenAndOtherPeople1Content.h21}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukHeadingL}:text-is("${ChildrenAndOtherPeople1Content.pageTitle}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h2}:text-is("${ChildrenAndOtherPeople1Content.h22}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.h3}:text-is("${ChildrenAndOtherPeople1Content.h3}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.p}:text-is("${ChildrenAndOtherPeople1Content.p}")`,
        1,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildrenAndOtherPeople1Content,
        "formLabel",
        Selectors.GovukFormLabel,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildrenAndOtherPeople1Content,
        "textField",
        Selectors.GovukTextFieldLabel,
      ),
      Helpers.checkGroup(
        page,
        2,
        ChildrenAndOtherPeople1Content,
        "text16",
        Selectors.GovukText16,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${nameSelectors.childLivesWithYes}:text-is("${ChildrenAndOtherPeople1Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${nameSelectors.childLivesWithNo}:text-is("${ChildrenAndOtherPeople1Content.formLabelNo}")`,
        1,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }

  private static async triggerErrorMessages(page: Page): Promise<void> {
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndOtherPeople1Content.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndOtherPeople1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorSummaryTitle}:text-is("${ChildrenAndOtherPeople1Content.errorBanner}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndOtherPeople1Content.errorMessageRespondentsRelationship}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndOtherPeople1Content.errorMessageRespondentsRelationship}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndOtherPeople1Content.errorMessageDoesChildLiveWithPerson}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndOtherPeople1Content.errorMessageDoesChildLiveWithPerson}")`,
        1,
      ),
    ]);
    await page.selectOption(
      `${UniqueSelectors.relationshipDropdown}`,
      ChildrenAndOtherPeople1Content.selectionForOtherRelationship,
    );
    await page.click(`${UniqueSelectors.childLiveWithThisPersonYes}`);
    await page.waitForTimeout(1000);
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndOtherPeople1Content.continue}")`,
    );
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndOtherPeople1Content.continue}")`,
    );
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndOtherPeople1Content.errorMessageRelationshipOtherGiveDetails}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndOtherPeople1Content.errorMessageRelationshipOtherGiveDetails}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorValidation}:text-is("${ChildrenAndOtherPeople1Content.errorMessageIdentityOfOtherConfidential}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukErrorMessage}:text-is("${ChildrenAndOtherPeople1Content.errorMessageIdentityOfOtherConfidential}")`,
        1,
      ),
    ]);
  }

  private static async fillInFields(
    page: Page,
    yesNoChildrenAndOtherPeople: boolean,
  ): Promise<void> {
    if (yesNoChildrenAndOtherPeople) {
      await page.selectOption(
        `${UniqueSelectors.relationshipDropdown}`,
        ChildrenAndOtherPeople1Content.selectionForFatherRelationship,
      );
      await page.click(`${UniqueSelectors.childLiveWithThisPersonYes}`);
      await page.click(`${UniqueSelectors.identityConfidentialityYes}`);
      await this.identityConfidentialityFormLabel(page);
    } else {
      await page.selectOption(
        `${UniqueSelectors.relationshipDropdown}`,
        ChildrenAndOtherPeople1Content.selectionForOtherRelationship,
      );
      await this.giveDetailsOtherRelationshipStaticText(page);

      await page.fill(
        `${UniqueSelectors.giveDetailsForOtherRelationshipInput}`,
        ChildrenAndOtherPeople1Content.loremIpsum,
      );
      await page.click(`${UniqueSelectors.childLiveWithThisPersonNo}`);
    }
    await page.waitForTimeout(1000);
    await page
      .locator(
        `${Selectors.button}:text-is("${ChildrenAndOtherPeople1Content.continue}")`,
      )
      .waitFor({
        state: "visible",
      });
    await page.click(
      `${Selectors.button}:text-is("${ChildrenAndOtherPeople1Content.continue}")`,
    );
  }

  private static async giveDetailsOtherRelationshipStaticText(
    page: Page,
  ): Promise<void> {
    await Helpers.checkVisibleAndPresent(
      page,
      `${Selectors.GovukFormLabel}:text-is("${ChildrenAndOtherPeople1Content.formLabelOtherRelationship}")`,
      1,
    );
  }

  private static async identityConfidentialityFormLabel(
    page: Page,
  ): Promise<void> {
    await Promise.all([
      Helpers.checkVisibleAndPresent(
        page,
        `${Selectors.GovukFormLabel}:text-is("${ChildrenAndOtherPeople1Content.formLabelConfidentiality}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${nameSelectors.childLivesWithPersonConfidentialYes}:text-is("${ChildrenAndOtherPeople1Content.formLabelYes}")`,
        1,
      ),
      Helpers.checkVisibleAndPresent(
        page,
        `${nameSelectors.childLivesWithPersonConfidentialNo}:text-is("${ChildrenAndOtherPeople1Content.formLabelNo}")`,
        1,
      ),
    ]);
  }
}
