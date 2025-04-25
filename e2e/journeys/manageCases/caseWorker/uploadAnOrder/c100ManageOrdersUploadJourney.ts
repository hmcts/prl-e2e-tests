import { Page } from "@playwright/test";
import { Helpers } from "../../../../common/helpers";
import {
  uploadOrderC100Options,
} from "../../../../common/types.ts";
import { ManageOrders1PageUpload } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders1PageUpload";
import { ManageOrders3PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders3PageCA";
import {
  ManageOrders5PageCA
} from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders5PageCA";
import { ManageOrders24PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders24PageCA";
import { ManageOrders26PageCA } from "../../../../pages/manageCases/caseWorker/uploadAnOrder/manageOrders26PageCA.ts";
import { SubmitPage } from "../../../../pages/manageCases/caseWorker/createAnOrder/orderCA/submitPage";

interface C100ManageOrdersOptions {
  page: Page;
  accessibilityTest: boolean;
  yesNoManageOrders: boolean;
  uploadOrderC100Options: uploadOrderC100Options;
}

export class C100ManageOrdersUploadJourney {
  public static async c100ManageOrdersUploadJourney({
                                         page,
                                         accessibilityTest,
                                                      yesNoManageOrders,
                                                      uploadOrderC100Options,
                                       }: C100ManageOrdersOptions): Promise<void> {
    await Helpers.chooseEventFromDropdown(page, `Manage orders`);
    await ManageOrders1PageUpload.manageOrders1PageUpload({
      page,
      accessibilityTest,
    });
    await ManageOrders3PageCA.manageOrders3PageCA({
      page,
      accessibilityTest,
      yesNoManageOrders,
      uploadOrderC100Options,
    });
    await ManageOrders5PageCA.manageOrders5PageCA({
      page,
      accessibilityTest,
    });
    await ManageOrders24PageCA.manageOrders24PageCA({
      page,
      accessibilityTest,
    });
    await ManageOrders26PageCA.manageOrders26PageCA({
      page,
      //accessibilityTest,
    });
    await SubmitPage.submitPage({
      page,
      accessibilityTest,
    });
  }
}
