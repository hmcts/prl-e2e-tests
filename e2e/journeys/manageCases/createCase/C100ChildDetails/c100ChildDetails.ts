import {
  C100ChildGender,
  ChildDetailsRevised1Page,
} from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised1Page";
import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import {
  ChildDetailsRevised2Page,
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
} from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsRevised2Page";
import { C100ChildDetailsSubmitPage } from "../../../../pages/manageCases/createCase/C100/childDetails/childDetailsSubmitPage";
import { C100TasksTabPage } from "../../../../pages/manageCases/caseTabs/c100TasksTabPage";

interface c100ChildDetailsOptions {
  page: Page;
  accessibilityTest: boolean;
  c100ChildGender: C100ChildGender;
  yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions: yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions;
}

export class C100ChildDetails {
  public static async c100ChildDetails({
    page: page,
    accessibilityTest: accessibilityTest,
    c100ChildGender: c100ChildGender,
    yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
  }: c100ChildDetailsOptions): Promise<void> {
    await Helpers.handleEventBasedOnEnvironment(page, "Child details");
    await ChildDetailsRevised1Page.childDetailsRevised1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
    });
    await ChildDetailsRevised2Page.childDetailsRevised2Page({
      page: page,
      accessibilityTest: accessibilityTest,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    });
    await C100ChildDetailsSubmitPage.c100ChildDetailsSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      c100ChildGender: c100ChildGender,
      yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions:
        yesNoDontKnowC100ChildDetailsRevisedAdditionalQuestions,
    });
    await C100TasksTabPage.c100TasksTabPage(page, accessibilityTest);
  }
}
