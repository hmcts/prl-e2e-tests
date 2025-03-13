import {
  C100ChildrenAndApplicantsRelationship,
  ChildrenAndApplicants1Page,
} from "../../../../pages/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicants1Page";
import { Page } from "@playwright/test";
import { ChildrenAndApplicantsSubmitPage } from "../../../../pages/manageCases/createCase/C100/childrenAndApplicants/childrenAndApplicantsSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";
import { Helpers } from "../../../../common/helpers";

interface C100ChildrenAndApplicantsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  applicantChildRelationship: C100ChildrenAndApplicantsRelationship;
  childLiveWithApplicant: boolean;
}

export class C100ChildrenAndApplicants {
  public static async c100ChildrenAndApplicants({
    page: page,
    accessibilityTest: accessibilityTest,
    errorMessaging: errorMessaging,
    applicantChildRelationship: applicantChildRelationship,
    childLiveWithApplicant: childLiveWithApplicant,
  }: C100ChildrenAndApplicantsOptions): Promise<void> {
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
