import { test } from "@playwright/test";
import createDaCitizenCourtNavCase from "../../common/createCaseHelper";

test("test court nav case", async ({ page }): Promise<void> => {
  await createDaCitizenCourtNavCase(true);
});
