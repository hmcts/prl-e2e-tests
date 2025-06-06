import {
  C100ChildrenAndApplicantsRelationship,
  ChildrenAndApplicants1Page,
} from "../../../../pages/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicants1Page.ts";
import { Page } from "@playwright/test";
import { C100ChildDetails } from "../C100ChildDetails/c100ChildDetails.ts";
import { ChildrenAndApplicantsSubmitPage } from "../../../../pages/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicantsSubmitPage.ts";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage.ts";
import { Helpers } from "../../../../common/helpers.ts";

interface C100ChildrenAndApplicantsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  applicantChildRelationship: C100ChildrenAndApplicantsRelationship;
  childLiveWithApplicant: boolean;
  subJourney: boolean;
}

export class C100ChildrenAndApplicants {
  public static async c100ChildrenAndApplicants({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    applicantChildRelationship: applicantChildRelationship,
    childLiveWithApplicant: childLiveWithApplicant,
    subJourney: subJourney,
  }: C100ChildrenAndApplicantsOptions): Promise<void> {
    if (subJourney) {
      await C100ChildDetails.c100ChildDetails({
        page: page,
        user: "solicitor",
        accessibilityTest: false,
        c100ChildGender: "male",
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: "yes",
        subJourney: true,
      });
    }
    await Helpers.handleEventBasedOnEnvironment(
      page,
      `Children and applicants`,
    );
    await ChildrenAndApplicants1Page.childrenAndApplicants1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      applicantChildRelationship: applicantChildRelationship,
      childLiveWithApplicant: childLiveWithApplicant,
    });
    await ChildrenAndApplicantsSubmitPage.childrenAndApplicantsSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      applicantChildRelationship: applicantChildRelationship,
      childLiveWithApplicant: childLiveWithApplicant,
    });
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
