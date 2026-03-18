import config from "../../../../../../utils/config.utils.ts";
import { Helpers } from "../../../../../../common/helpers.js";
import { test } from "../../../../../fixtures.ts";
import { expect } from "@playwright/test";

test.describe("Create a CA custom order", (): void => {
  let caseRef: string;

  test.beforeEach(async ({ browser, caseEventUtils }) => {
    // Setup: create ca case as solicitor and issue to local court as court admin stoke
    caseRef =
      await caseEventUtils.createCACaseIssueAndSendToLocalCourt(browser);
    console.log(caseRef);
  });

  test("Create a custom C43 order as a caseworker @regression", async ({
    caseWorker,
  }): Promise<void> => {
    const { customOrders, manageOrders } = caseWorker;
    const page5 = customOrders.manageOrder5Page;

    await Helpers.goToCase(
      caseWorker.page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );

    await Helpers.chooseEventFromDropdown(caseWorker.page, "Manage orders");
    await manageOrders.manageOrder1Page.selectOrderOption(
      "create custom order",
    );
    await manageOrders.manageOrder1Page.clickContinue();

    await customOrders.manageOrder102Page.selectApprovedAtHearing("No");
    await customOrders.manageOrder102Page.clickContinue();

    // --- Page 5 Logic (Caseworker fills everything) ---
    await page5.orderOptionsComponent.selectOrderType(
      "Child arrangements, specific issue or prohibited steps order (C43)",
    );
    await expect(page5.c43OrderDetailsHeading).toBeVisible();

    await page5.selectC43OrderDetails("Child Arrangements Order");
    await page5.selectTypeOfChildArrangementsOrder(
      "Both live with and spend time with order",
    );
    await page5.uploadCustomOrderTemplate(config.testWordFile);

    // Fill Judge details manually as Caseworker
    await page5.orderDetailsComponent.isOrderByConsent(true);
    await page5.orderDetailsComponent.selectJudgeOrMagistrateTitle(
      "Her Honour Judge",
    );
    await page5.orderDetailsComponent.inputJudgeFullName("Jane Doe");
    await page5.selectOrderAboutAllChildren(true);

    await page5.clickContinue();
    // ---------------------------------------------------

    await manageOrders.manageOrder19Page.clickContinue();
    const snapshotPath = ["caseProgression", "orders", "customOrder"];

    await manageOrders.manageOrder20Page.checkCustomOrderHeader(
      caseRef,
      snapshotPath,
    );
    await manageOrders.manageOrder20Page.clickContinue();

    await manageOrders.manageOrder24Page.selectNoChecksRequired();
    await manageOrders.manageOrder24Page.clickContinue();

    await manageOrders.manageOrder26Page.completeSimpleOrderFlow("1: interim");

    const todaysOrderLabel = Helpers.todayDate(false, false) as string;
    await manageOrders.manageOrder27Page.verifyAndSelectOrder(todaysOrderLabel);
    await manageOrders.manageOrder27Page.clickContinue();

    await manageOrders.manageOrder28Page.submitServiceDetails({
      personallyServed: "Yes",
      responsibility: "Applicant's legal representative",
      serveCafcass: "No",
    });

    await manageOrders.manageOrderSubmitPage.assertPageContents(
      snapshotPath,
      "custom-order-cya-table",
    );
    await manageOrders.manageOrderSubmitPage.clickSubmit();
  });

  test("Create a custom C21 order as a judge @regression @debug", async ({
    judge,
  }): Promise<void> => {
    const { customOrders, manageOrders } = judge;

    await Helpers.goToCase(
      judge.page,
      config.manageCasesBaseURLCase,
      caseRef,
      "tasks",
    );
    await Helpers.chooseEventFromDropdown(judge.page, "Manage orders");

    await manageOrders.manageOrder1Page.selectOrderOption(
      "create custom order",
    );
    await manageOrders.manageOrder1Page.clickContinue();

    await customOrders.manageOrder102Page.selectApprovedAtHearing("No");
    await customOrders.manageOrder102Page.clickContinue();

    await customOrders.manageOrder5Page.orderOptionsComponent.selectOrderType(
      "Blank order or directions (C21)",
    );
    await expect(customOrders.manageOrder5Page.c21OrderDetailsHeading).toBeVisible();

    const districtJudgeRadio = judge.page.getByRole("radio", {
      name: "Circuit Judge",
      exact: true,
    });
    await expect(districtJudgeRadio).toBeChecked();
    await expect(customOrders.manageOrder5Page.orderDetailsComponent.judgeFullNameTextBox).toHaveValue(
      config.userCredentials.judge.name,
    );
    await customOrders.manageOrder5Page.selectC21OrderDetails(
      "Blank order or directions (C21): no order made",
    );
    await customOrders.manageOrder5Page.uploadCustomOrderTemplate(config.testWordFile);
    await customOrders.manageOrder5Page.orderDetailsComponent.isOrderByConsent(true);
    await customOrders.manageOrder5Page.selectOrderAboutAllChildren(false);
    const childrenToSelect = [
      "Joe Doe (Child 1)",
      "Simon Anderson (Child 2)",
      "Lilly Anderson (Child 3)",
    ];
    for (const child of childrenToSelect) {
      await judge.page.getByLabel(child, { exact: true }).check();
    }

    await customOrders.manageOrder5Page.clickContinue();
  });
});
