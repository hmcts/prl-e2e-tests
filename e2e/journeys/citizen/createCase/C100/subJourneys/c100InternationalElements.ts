import { Page } from "@playwright/test";
import { InternationalElementsStartPage } from "../../../../../pages/citizen/createCase/C100/internationalElement/internationalElementsStartPage";
import { InternationalElementsParentsPage } from "../../../../../pages/citizen/createCase/C100/internationalElement/internationalElementsParentsPage";
import { InternationalElementsJurisdictionPage } from "../../../../../pages/citizen/createCase/C100/internationalElement/internationalElementsJurisdictionPage";
import { InternationalElementsRequestPage } from "../../../../../pages/citizen/createCase/C100/internationalElement/internationalElementsRequestPage";

interface C100InternationalElementsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  yesNoInternationalElements: boolean;
}

export class C100InternationalElements {
  public static async c100InternationalElements({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    yesNoInternationalElements: yesNoInternationalElements,
  }: C100InternationalElementsOptions): Promise<void> {
    await InternationalElementsStartPage.internationalElementsStartPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoInternationalElements: yesNoInternationalElements,
    });
    await InternationalElementsParentsPage.internationalElementsParentsPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoInternationalElements: yesNoInternationalElements,
    });
    await InternationalElementsJurisdictionPage.internationalElementsJurisdictionPage(
      {
        page: page,
        accessibilityTest: accessibilityTest,
        errorMessaging: errorMessaging,
        yesNoInternationalElements: yesNoInternationalElements,
      },
    );
    await InternationalElementsRequestPage.internationalElementsRequestPage({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      yesNoInternationalElements: yesNoInternationalElements,
    });
  }
}
