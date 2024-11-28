import { test } from "@playwright/test";
import createCaseSystemUser from "../../common/createCaseHelper";

test("try create case", async () => {
  await createCaseSystemUser();
});
