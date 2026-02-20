import { TypeOfApplicationContent } from "../../fixtures/edgeCases/typeOfApplicationContent";
import { Page } from "@playwright/test";
import { Selectors } from "../../common/selectors";
import { AxeUtils } from "@hmcts/playwright-common";
import { Helpers } from "../../common/helpers";
import { EdgeCaseApplicationType } from "../../common/types";

interface TypeOfApplicationOptions {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
}

const TypeOfApplicationSelectors: Record<EdgeCaseApplicationType, string> = {
  FGM: "#edgeCaseTypeOfApplication",
  FMPO: "#edgeCaseTypeOfApplication-2",
  SpecialGuardianship: "#edgeCaseTypeOfApplication-3",
  DeclarationOfParentage: "#edgeCaseTypeOfApplication-4",
  ParentalOrder: "#edgeCaseTypeOfApplication-5",
  ParentalResponsibility: "#edgeCaseTypeOfApplication-6",
  ParentalResponsibility_secondFemaleParent: "#edgeCaseTypeOfApplication-7",
  AppointingChildGuardian: "#edgeCaseTypeOfApplication-8",
  ChangeOfChildSurname: "#edgeCaseTypeOfApplication-9",
};

export class TypeOfApplicationPage {
  public static async typeOfApplication({
    page,
    accessibilityTest,
    typeOfApplication,
  }: TypeOfApplicationOptions): Promise<void> {
    await this.checkPageLoads(page, accessibilityTest);
    await this.selectOption(page, typeOfApplication);
    await page.click(Selectors.edgeCaseContinue);
  }

  private static async checkPageLoads(
    page: Page,
    accessibilityTest?: boolean,
  ): Promise<void> {
    await page.waitForSelector(
      `${Selectors.h1}:text-is("${TypeOfApplicationContent.pageTitle}")`,
    );
    await Promise.all([
      Helpers.checkGroup(
        page,
        9,
        TypeOfApplicationContent,
        "formLabel",
        `${Selectors.GovukLabel}`,
      ),
      Helpers.checkGroup(
        page,
        2,
        TypeOfApplicationContent,
        "formHint",
        `${Selectors.GovukHint}`,
      ),
    ]);
    if (accessibilityTest) {
      await new AxeUtils(page).audit();
    }
  }
  private static async selectOption(
    page: Page,
    typeOfApplication: EdgeCaseApplicationType,
  ): Promise<void> {
    const selector = TypeOfApplicationSelectors[typeOfApplication];
    if (!selector) {
      throw new Error(`Invalid type of application: ${typeOfApplication}`);
    }
    await page.click(selector);
  }
}
