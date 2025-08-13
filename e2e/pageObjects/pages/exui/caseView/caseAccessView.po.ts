import { Page } from "@playwright/test";
import { CcdCaseHeaderComponent } from "../../../components/exui/ccdCaseHeader.component.js";
import { Base } from "../../base.po.js";
import { AlertBannerComponent } from "../../../components/exui/alertBanner.component.js";

export class CaseAccessViewPage extends Base {
  readonly caseHeader: CcdCaseHeaderComponent;
  readonly alertBanner: AlertBannerComponent;

  constructor(page: Page) {
    super(page);
    this.caseHeader = new CcdCaseHeaderComponent(page);
    this.alertBanner = new AlertBannerComponent(page);
  }
}
