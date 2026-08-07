import { test } from "./fixtures.ts";

test.describe("Test case assignment API", (): void => {
  test("assign a case to a user", async ({ manageOrgUtils }) => {
    const caseRef: string = "1784210156379641"; // need to actually setup the case by creating and adding local authority instead of using a static case number
    const userEmail: string = process.env.LOCAL_AUTHORITY_USERNAME;

    await manageOrgUtils.assignCaseToUser(caseRef, userEmail);
  });
});
