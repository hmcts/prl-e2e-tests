import fs from "fs";
import { request } from "@playwright/test";
import config from "./config.utils.ts";
import { CommonCaseEventUtils } from "./commonCaseEvent.utils.ts";

export class ManageOrgUtils {
  constructor(private commonCaseEventUtils: CommonCaseEventUtils) {}

  async assignCaseToUser(caseRef: string, userEmail: string): Promise<void> {
    // fetch user details so that we don't need to hard code anything other than the user's email address
    const userDetails =
      await this.commonCaseEventUtils.getUserDetails(userEmail);
    console.log(userDetails);

    // read storage state from local authority session json file
    const storageState = JSON.parse(
      fs.readFileSync(
        config.sessionStoragePath + "localAuthority.json",
        "utf8",
      ),
    );

    // extract the xsrf token from the session
    const xsrfToken = storageState.cookies.find(
      (c) =>
        c.name === "XSRF-TOKEN" &&
        c.domain === "manage-org.aat.platform.hmcts.net",
    )?.value;

    // create a new request context with the same storage state as the session
    const reqContext = await request.newContext({
      storageState: storageState,
    });

    // call request with decoded xsrf token
    const response = await reqContext.post(
      `${config.manageOrgBaseURL}/api/caseshare/case-assignments`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Origin: config.manageOrgBaseURL,
          "X-XSRF-TOKEN": decodeURIComponent(xsrfToken ?? ""),
        },
        data: {
          sharedCases: [
            {
              caseId: caseRef,
              caseTitle: caseRef,
              caseTypeId: "PRLAPPS",
              pendingShares: [
                {
                  email: userEmail,
                  firstName: userDetails.forename,
                  idamId: userDetails.id,
                  lastName: userDetails.surname,
                },
              ],
              pendingUnshares: [],
            },
          ],
        },
      },
    );
    if (!response.ok()) {
      throw new Error(
        `Failed to assign case: ${response.status()} - ${response.statusText()}`,
      );
    }
  }
}
