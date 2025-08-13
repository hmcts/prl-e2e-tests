import { Page } from "@playwright/test";
import { CcdCaseHeaderComponent } from "../../components/exui/ccdCaseHeader.component.js";
import { Base } from "../base.po.js";
import { ExuiTasksContainerComponent } from "../../components/exui/exuiTasksContainer.component.js";
import { AlertBannerComponent } from "../../components/exui/alertBanner.component.js";

export class CaseAccessView extends Base {
  readonly caseHeader: CcdCaseHeaderComponent;
  readonly exuiTasksContainer: ExuiTasksContainerComponent;
  readonly alertBanner: AlertBannerComponent;

  constructor(page: Page) {
    super(page);
    this.caseHeader = new CcdCaseHeaderComponent(page);
    this.exuiTasksContainer = new ExuiTasksContainerComponent(page);
    this.alertBanner = new AlertBannerComponent(page);
  }
}
