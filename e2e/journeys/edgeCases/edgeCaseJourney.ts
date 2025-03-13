import { StartPage } from "../../pages/edgeCases/startPage.ts";
import { TypeOfApplicationPage } from "../../pages/edgeCases/typeOfApplicationPage.ts";
import { Page } from "@playwright/test";
import { EdgeCaseApplicationType } from "../../common/types.ts";
import IdamLoginHelper from "../../common/userHelpers/idamLoginHelper.ts";
import { UserRolePage } from "../../pages/edgeCases/userRolePage.ts";
import {DateOfBirthPage} from "../../pages/edgeCases/dateOfBirthPage.ts";

interface InitialCreateEdgeCaseJourneyParams {
  page: Page;
  accessibilityTest: boolean;
  typeOfApplication: EdgeCaseApplicationType;
  applyMyself: boolean;
  under18: boolean;
}

export class EdgeCase {
  public static async createEdgeCase({
    page,
    accessibilityTest,
    typeOfApplication,
    applyMyself,
      under18,
  }: InitialCreateEdgeCaseJourneyParams): Promise<void> {
    await StartPage.startPage({ page, accessibilityTest });
    const currentUrl: string = page.url();
    await IdamLoginHelper.signInCitizenUser(page, currentUrl);
    await TypeOfApplicationPage.typeOfApplication({
      page,
      accessibilityTest,
      typeOfApplication,
    });
    if (typeOfApplication === "FGM" || typeOfApplication === "FMPO") {
      await UserRolePage.userRole({page, accessibilityTest, applyMyself});
    }
    await DateOfBirthPage.dateOfBirth({page, accessibilityTest, under18});
  }
}
