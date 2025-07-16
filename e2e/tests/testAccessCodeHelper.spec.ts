import { test } from "./fixtures.ts";

// these tests are a POC - remove these tests once this has been implemented in a real scenario
test("Get applicant access code", async ({ accessCodeHelper }) => {
  await accessCodeHelper.getApplicantAccessCode("1733309023574046");
});

test("Get respondent access code", async ({ accessCodeHelper }) => {
  await accessCodeHelper.getRespondentAccessCode("1733309023574046");
});
