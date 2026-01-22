import { expect, Locator, Page } from "@playwright/test";
import { readFileSync } from "fs";
import { test } from "../../fixtures.js";
import config from "../../../utils/config.utils.ts";
//import { NavigationUtils } from "../../../utils/navigation.utils.js";

/*interface Docs {
  caseNumber: string;
  courtnavDocCount: number;
  exuiDocCount: number;
  doesCountMatch: boolean;
}*/

const username: string = "familyprivatelaw@gmail.com";
const password: string = "U0Uan95KD/£1"; // add this when required

test.describe("Tests create Courtnav cases with lots of docs", (): void => {
  test.slow();
  test("the test", async ({
    page,
    //caseWorker,
    //navigationUtils,
  }): Promise<void> => {
    await page.goto("https://uat-courtnav.studiorepublic.com/");
    await page.getByRole("button", { name: "Continue to CourtNav" }).click();
    const numberOfCases: number = 1;
    //const docComparisonList: Docs[] = [];

    for (let i = 0; i < numberOfCases; i++) {
      //const { caseNumber, courtnavDocCount } =
        await completeCourtnavApplication(page);
      /*const exuiDocCount = await getDocCountInExUI(
        caseWorker.page,
        caseNumber,
        navigationUtils,
      );
      docComparisonList.push({
        caseNumber: caseNumber,
        courtnavDocCount,
        exuiDocCount,
        doesCountMatch: courtnavDocCount === exuiDocCount,
      });*/
    }

    // print results in nice format
    //console.table(docComparisonList);
  });
});

async function completeCourtnavApplication(
  page: Page,
): Promise<{ caseNumber: string; courtnavDocCount: number }> {
  // COURTNAV LOCATORS
  const fakerLink: Locator = page.locator("a", { hasText: "Faker" });
  const createFormButton: Locator = page.getByRole("button", {
    name: "Create form",
  });
  const caseSummaryHeading: Locator = page.getByRole("heading", {
    name: "Case Summary",
  });
  const mostRecentIncidentLink: Locator = page.locator("a", {
    hasText: "Most recent incident",
  });
  const mostRecentIncidentEvidenceYes: Locator = page
    .locator(
      '[id="most-recent-incident_most-recent-incident-evidence.container"]',
    )
    .getByText("Yes");
  const caseSummaryLink: Locator = page.getByRole("link", {
    name: "Case summary",
  });
  const firstIncidentLink: Locator = page.locator("a", {
    hasText: "First incident",
  });
  const firstIncidentEvidenceYes: Locator = page
    .locator('[id="first-incident_first-incident-evidence.container"]')
    .getByText("Yes");
  const yourCourtLink: Locator = page.locator("a", { hasText: "Your court" });
  const courtDropdown: Locator = page.getByLabel(
    "What is your local family court?",
  );
  const submitApplicationButton: Locator = page.locator(".u-margin-top-full", {
    hasText: "Submit",
  });
  const statementOfTruthCheckbox: Locator = page.locator("#statement_of_truth");
  const statementOfTruthContinueButton: Locator = page.getByRole("button", {
    name: "Continue to next page",
  });
  const continueWithoutLegalAdviceButton: Locator = page.getByRole("button", {
    name: "Continue without legal advice",
  });
  const infoIsAccurateCheckbox: Locator = page.getByText(
    "The information I have entered is true and accurate to the best of my knowledge.",
  );
  const submitButton: Locator = page.getByRole("button", { name: "Submit" });
  const submissionPendingHeading: Locator = page.getByRole("heading", {
    name: "Submission pending",
  });
  const caseSubmittedHeading: Locator = page.getByRole("heading", {
    name: "Case submitted",
  });
  const docTable: Locator = page.locator(".list-table");
  const docTableRow: Locator = page.locator(".list-table tr");
  const logoutButton: Locator = page.getByRole("button", { name: "Log out" });
  //////////////////////////////////////////////////////////////////////////////

  // login to courtnav
  await courtnavLogin(page);

  // initiate form
  await fakerLink.click();
  await createFormButton.click();
  await expect(caseSummaryHeading).toBeVisible();

  // upload docs for most recent incident
  await mostRecentIncidentLink.click();
  await mostRecentIncidentEvidenceYes.click();
  await uploadFiles(page);
  await caseSummaryLink.click();

  // upload docs for first incident
  await firstIncidentLink.click();
  await firstIncidentEvidenceYes.click();
  await uploadFiles(page);
  await caseSummaryLink.click();

  // set court to Swansea
  await yourCourtLink.click();
  await courtDropdown.selectOption("Swansea Civil Justice Centre");
  await caseSummaryLink.click();

  // submit form
  await submitApplicationButton.click();

  // statement of truth
  await statementOfTruthCheckbox.check();
  await statementOfTruthContinueButton.click();

  // continue without legal advice
  await continueWithoutLegalAdviceButton.click();
  // click modal popup continue without legal advice button
  await continueWithoutLegalAdviceButton.click();

  // submit
  await infoIsAccurateCheckbox.click();
  await page.waitForTimeout(3000);
  await submitButton.click();
  await expect(submissionPendingHeading).toBeVisible();

  // wait for submission to be complete
  await expect
    .poll(
      async () => {
        await page.reload();
        return await caseSubmittedHeading.isVisible();
      },
      {
        timeout: 300000, // give 5 minutes to submit case
        intervals: [10000], // 10 second intervals
      },
    )
    .toBeTruthy();

  const caseNumber = await extractCaseNumber(page);
  await expect(docTable).toHaveScreenshot([
    "courtnavTesting",
    `${caseNumber}`,
    `${caseNumber}-courtnav-docs-table.png`,
  ]);

  // count doc rows
  const rows = await docTableRow.count();
  const uploadedDocRows = rows - 2; // -2 because don't include top two rows of table

  // log out
  await logoutButton.click();
  return { caseNumber: caseNumber, courtnavDocCount: uploadedDocRows };
}

async function courtnavLogin(page: Page): Promise<void> {
  const loginButton: Locator = page.getByRole("button", { name: "Log in" });
  await page.locator("#email").fill(username);
  await page.locator("#password").fill(password);
  await loginButton.click();
}

async function extractCaseNumber(page: Page): Promise<string> {
  const submittedPara = await page
    .getByText("Thank you for using CourtNav")
    .textContent();
  // Use regex to capture the digits after "reference number"
  const match = submittedPara.match(/reference number (\d+)/);

  let caseNumber: string;
  if (match) {
    caseNumber = match[1]; // the captured group
  }

  return caseNumber;
}

async function uploadFiles(
  page: Page,
  numberOfSmallFiles: number = 2,
  numberOfLargeFiles: number = 1,
): Promise<void> {
  const smallFilePath = config.testPdfFile;
  const smallFileName = "mockFile.pdf";
  // will need to add this file if using this script fresh
  const largeFilePath = config.testBigTxtFile;
  const largeFileName = "mock10mbFile.pdf";

  for (let j = 0; j < numberOfSmallFiles; j++) {
    await dragAndDropFile(page, "#dropzone", smallFilePath, smallFileName);
    await page.waitForTimeout(500); // can upload docs too fast if not
  }
  for (let j = 0; j < numberOfLargeFiles; j++) {
    await dragAndDropFile(page, "#dropzone", largeFilePath, largeFileName);
    await page.waitForTimeout(10000); // can upload docs too fast if not
  }
}

async function dragAndDropFile(
  page: Page,
  selector: string,
  filePath: string,
  fileName: string,
  fileType = "",
): Promise<void> {
  const buffer = readFileSync(filePath).toString("base64");

  const dataTransfer = await page.evaluateHandle(
    async ({ bufferData, localFileName, localFileType }) => {
      const dt = new DataTransfer();

      const blobData = await fetch(bufferData).then((res) => res.blob());

      const file = new File([blobData], localFileName, { type: localFileType });
      dt.items.add(file);
      return dt;
    },
    {
      bufferData: `data:application/octet-stream;base64,${buffer}`,
      localFileName: fileName,
      localFileType: fileType,
    },
  );

  await page.dispatchEvent(selector, "drop", { dataTransfer });
}

/*async function getDocCountInExUI(
  page: Page,
  caseNumber: string,
  navigationUtils: NavigationUtils,
): Promise<number> {
  // EXUI LOCATORS
  const caseDocsTab: Locator = page.getByRole("tab", {
    name: "Case documents",
  });
  const fl401FinalDocLink: Locator = page.getByRole("button", {
    name: " FL401FinalDocument.pdf",
  });
  const fl401FinalDoc: Locator = page.locator(".documents");
  const docsToBeReviewedTab: Locator = page.getByRole("tab", {
    name: "Documents to be reviewed",
  });
  const docsToBeReviewedTable: Locator = page.locator(
    "#case-viewer-field-read--courtNavQuarantineDocumentList",
  );
  const IndividualDoctoBeReviewed: Locator = page.locator(
    ".collection-field-table ccd-read-complex-field",
  );
  //////////////////////////////////////////////////////////////////////////////

  await navigationUtils.goToCase(
    page,
    config.manageCasesBaseURLCase,
    caseNumber,
  );
  let reviewedDocCount: number = 0;
  // check case docs for final document existing
  await caseDocsTab.click();
  await expect(fl401FinalDocLink).toBeVisible();
  await expect(fl401FinalDoc).toHaveScreenshot([
    "courtnavTesting",
    `${caseNumber}`,
    `${caseNumber}-final-doc.png`,
  ]);
  reviewedDocCount++;

  // check documents to be reviewed for other docs count
  await docsToBeReviewedTab.click();
  await expect(docsToBeReviewedTable).toHaveScreenshot([
    "courtnavTesting",
    `${caseNumber}`,
    `${caseNumber}-docs-to-be-reviewed-table.png`,
  ]);
  reviewedDocCount += await IndividualDoctoBeReviewed.count();
  return reviewedDocCount;
}*/
