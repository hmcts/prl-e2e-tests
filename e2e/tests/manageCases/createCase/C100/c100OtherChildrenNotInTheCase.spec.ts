import { test } from "@playwright/test";
import Config from "../../../../utils/config.utils.ts";
import { C100OtherChildrenNotInTheCase } from "../../../../journeys/manageCases/createCase/C100OtherChildrenNotInTheCase/C100OtherChildrenNotInTheCase.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("C100 Create case Other children not in the case tests", (): void => {
  test(`Complete the C100 Other children not in the case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering yes to the other child being present,
  With a known DOB,
  Setting the child Gender to Female. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      otherChildPresent: true,
      otherChildGender: "Female",
      otherChildDOBKnown: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 Other children not in the case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering yes to the other child being present,
  With a unknown DOB,
  Setting the child Gender to Male. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      otherChildPresent: true,
      otherChildGender: "Male",
      otherChildDOBKnown: false,
      subJourney: true,
    });
  });

  test(`Complete the C100 Other children not in the case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering yes to the other child being present,
  With a known DOB,
  Setting the child Gender to other. @regression`, async ({
    page,
  }): Promise<void> => {
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      otherChildPresent: true,
      otherChildGender: "They identify in another way",
      otherChildDOBKnown: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 Other children not in the case event as a solicitor with the following options:
  Not Accessibility testing,
  Not Error message testing,
  Answering no to the other child being present @nightly @regression`, async ({
    page,
  }): Promise<void> => {
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: false,
      errorMessaging: false,
      otherChildPresent: false,
      otherChildGender: "They identify in another way",
      otherChildDOBKnown: true,
      subJourney: true,
    });
  });

  test(`Complete the C100 Other children not in the case event as a solicitor with the following options:
  Not Accessibility testing,
  Error message testing,
  Answering yes to the other child being present,
  With a unknown DOB,
  Setting the child Gender to female. @regression @errorMessage`, async ({
    page,
  }): Promise<void> => {
    await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
      page: page,
      accessibilityTest: false,
      errorMessaging: true,
      otherChildPresent: true,
      otherChildGender: "Female",
      otherChildDOBKnown: false,
      subJourney: true,
    });
  });
});

test(`C100 Other children not in the case event as a solicitor with the following options:
  Accessibility testing,
  Not Error message testing,
  Answering yes to the other child being present,
  With a unknown DOB,
  Setting the child Gender to female. @accessibility @nightly`, async ({
  page,
}): Promise<void> => {
  await C100OtherChildrenNotInTheCase.c100OtherChildrenNotInTheCase({
    page: page,
    accessibilityTest: true,
    errorMessaging: false,
    otherChildPresent: true,
    otherChildGender: "Female",
    otherChildDOBKnown: false,
    subJourney: true,
  });
});
