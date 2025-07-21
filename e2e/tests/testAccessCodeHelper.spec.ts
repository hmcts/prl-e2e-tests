import { test } from "./fixtures.ts";

// these tests are a POC - remove these tests once this has been implemented in a real scenario
test("Get applicant access code", async ({ courtNavUtils, accessCodeHelper }) => {
  const ccdRef = await courtNavUtils.createCase(true, false);
  await accessCodeHelper.getApplicantAccessCode(ccdRef);
  await accessCodeHelper.getRespondentAccessCode(ccdRef);
});