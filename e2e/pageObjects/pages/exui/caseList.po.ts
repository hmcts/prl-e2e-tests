import { Base } from "../base.po.ts";
import { AlertBannerComponent } from "../../components/exui/alertBanner.component.ts";
import { Page } from "@playwright/test";

export class CaseListPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  readonly alertBanner: AlertBannerComponent = new AlertBannerComponent(
    this.page,
  );

  // TODO: maybe add more in this class or at least leave a comment that this could be updated when required
}
