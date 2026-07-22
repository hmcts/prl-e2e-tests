import { test } from "./fixtures.ts";
import Config from "../utils/config.utils.ts";

test.use({ storageState: Config.sessionStoragePath + "solicitor.json" });

test.describe("Case creation examples", (): void => {
  test("create case", async ({ manageCasesEventUtils }): Promise<void> => {
    await manageCasesEventUtils.submitTSSolicitorCase("FL401");
  });

  test("create solicitor case - gatekeeping", async ({
    manageCasesEventUtils,
  }): Promise<void> => {
    const caseRef = (await manageCasesEventUtils.submitTSSolicitorCase("FL401"))
      .caseRef;
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
  });

  test("create courtnav case and send to gatekeeper example", async ({
    courtNavUtils,
    manageCasesEventUtils,
  }): Promise<void> => {
    const caseRef = await courtNavUtils.createCase(false, false);
    await manageCasesEventUtils.addFamilyManNumber(caseRef);
    await manageCasesEventUtils.sendToGatekeeper(caseRef, "FL401");
  });
});
