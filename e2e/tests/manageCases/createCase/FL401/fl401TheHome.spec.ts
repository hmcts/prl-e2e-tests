import { test } from "@playwright/test";
import { FL401TheHome } from "../../../../journeys/manageCases/createCase/FL401TheHome/fl401TheHome";
import { addressRadios } from "../../../../pages/manageCases/createCase/FL401/theHome/fl401Home1Page";

test.describe("FL401 Create cases The Home tests @manageCases", (): void => {
  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        applicant has child
        yes to all other booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'No' do they ever intend to live at the address, @crossbrowserManagecases`, async ({
    page
  }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: true,
      fl401HomeYesNo: true,
      fl401EverLiveAtAddress: 'No',
      fl401IntendToLiveAtAddress: 'No',
      subJourney: true,
    })
  });

  test(`Complete the FL401 The Home Journey with the following options:
        Not accessibility testing, 
        Not Error Messaging (There isn't any), 
        Applicant doesn't have children
        No to all booleans, 
        'No' to has the applicant or respondent ever lived at the address, 
        'No' do they ever intend to live at the address, @crossbrowserManagecases`, async ({
           page
         }): Promise<void> => {
    await FL401TheHome.fl401TheHome({
      page: page,
      accessibilityTest: false,
      applicantHasChildren: false,
      fl401HomeYesNo: false,
      fl401EverLiveAtAddress: 'No',
      fl401IntendToLiveAtAddress: 'No',
      subJourney: true,
    })
  });
});