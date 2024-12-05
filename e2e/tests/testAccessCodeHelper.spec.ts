import { test } from "@playwright/test";
import { AccessCodeHelper } from "../common/accessCodeHelper";


test("Get applicant access code", async () => {
  const accessCode: string = await AccessCodeHelper.getApplicantAccessCode("1733309023574046");
  console.log(accessCode);
});

test("Get respondent access code", async () => {
  const accessCode: string = await AccessCodeHelper.getRespondentAccessCode("1733309023574046");
  console.log(accessCode);
});