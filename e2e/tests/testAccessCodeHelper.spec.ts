import { test } from "@playwright/test";
import { AccessCodeHelper } from "../common/accessCodeHelper";

// these tests are a POC - remove these tests once this has been implemented in a real scenario
test("Get applicant access code", async () => {
  const accessCode: string =
    await AccessCodeHelper.getApplicantAccessCode("1733309023574046");
  console.log(accessCode);
});

test("Get respondent access code", async () => {
  const accessCode: string =
    await AccessCodeHelper.getRespondentAccessCode("1733309023574046");
  console.log(accessCode);
});
