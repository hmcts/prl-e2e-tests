import { Page } from "@playwright/test";
import { CcdCaseHeaderComponent } from "../../../components/exui/ccdCaseHeader.component.js";
import { Base } from "../../base.po.js";
import { AlertBannerComponent } from "../../../components/exui/alertBanner.component.js";

export abstract class CaseAccessViewPage extends Base {
  readonly caseHeader: CcdCaseHeaderComponent = new CcdCaseHeaderComponent(
    this.page,
  );
  readonly alertBanner: AlertBannerComponent = new AlertBannerComponent(
    this.page,
  );

  protected constructor(page: Page) {
    super(page);
  }
}
