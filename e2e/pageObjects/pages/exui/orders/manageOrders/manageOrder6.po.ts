import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { OrderTypes } from "../../../../../common/types.js";

const defaultPenalNoticeText =
  "IMPORTANT WARNING TO [NAME] If you [NAME] of [ADDRESS] disobey [this order] / [paragraph[s] [insert paragraph number(s)] of this order] you may be held to be in contempt of court and may be imprisoned, fined or have your assets seized.";

export interface ManageOrder6Params {
  orderType: OrderTypes;
  recitalsAndPreamble?: string;
  directions?: string;
  includePenalNotice?: boolean;
  penalNotice?: string;
}

export class ManageOrder6Page extends EventPage {
  readonly recitalsOrPreamblesLabel: Locator = this.page.getByRole("textbox", {
    name: "Add recitals or preamble (Optional)",
  });
  readonly directionsLabel: Locator = this.page.getByRole("textbox", {
    name: "Add directions (Optional)",
  });
  readonly recitalsOrPreambleRtfLabel: Locator = this.page.locator(
    "#recitalsOrPreambleRtf_label",
  );
  readonly orderDirectionsRtfLabel: Locator = this.page.locator(
    "#orderDirectionsRtf_label",
  );
  readonly rtfLabel: Locator = this.page.locator("#rtfLabel");
  readonly recitalsOrPreamble: Locator = this.page.getByRole("textbox", {
    name: "Add recitals or preamble (Optional)",
  });
  readonly orderDirections: Locator = this.page.getByRole("textbox", {
    name: "Add directions (Optional)",
  });
  readonly recitalsOrPreambleRtf: Locator = this.page.getByRole("textbox", {
    name: "Add recitals or preamble (Optional)",
  });
  readonly orderDirectionsRtf: Locator = this.page.getByRole("textbox", {
    name: "Add directions (Optional)",
  });
  readonly penalNoticeLabel: Locator = this.page.locator("#penalNoticeLabel");
  readonly includePenalNoticeCheckbox: Locator = this.page.getByRole(
    "checkbox",
    { name: "Include a penal notice" },
  );
  readonly penalNoticeRtf: Locator = this.page
    .getByRole("toolbar", { name: "penalNoticeRtf formatting options" })
    .locator("xpath=following::*[@role='textbox'][1]");

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  async assertPageContents(
    isUploadAnOrder: boolean,
    orderType: OrderTypes,
    headingText: string = this.headingText,
  ): Promise<void> {
    await expect(
      this.page.getByRole("heading", {
        name: headingText,
        exact: true,
        level: 1,
      }),
    ).toBeVisible();
    await expect(this.familyManHeading).toBeVisible();
    await expect(this.caseNumberHeading).toBeVisible();
    if (!isUploadAnOrder) {
      await expect(this.page.getByText(orderType).first()).toBeVisible();
    }
    if (this.usesRtf(orderType)) {
      await expect(this.rtfLabel).toBeVisible();
      await expect(this.recitalsOrPreambleRtfLabel).toBeVisible();
      await expect(this.orderDirectionsRtfLabel).toBeVisible();
      if (this.hasPenalNotice(orderType)) {
        await expect(this.penalNoticeLabel).toBeVisible();
        await expect(this.includePenalNoticeCheckbox).toBeVisible();
      }
    } else {
      await expect(this.recitalsOrPreamblesLabel).toBeVisible();
      await expect(this.directionsLabel).toBeVisible();
    }
    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async fillInFields({
    orderType,
    recitalsAndPreamble,
    directions,
    includePenalNotice,
    penalNotice,
  }: ManageOrder6Params): Promise<void> {
    if (includePenalNotice && this.hasPenalNotice(orderType)) {
      await this.includePenalNoticeCheckbox.check();
      await expect(this.penalNoticeRtf).toContainText(defaultPenalNoticeText);
      if (penalNotice) {
        await this.penalNoticeRtf.click();
        await this.penalNoticeRtf.fill(penalNotice);
      }
    }
    if (recitalsAndPreamble) {
      if (this.usesRtf(orderType)) {
        await this.recitalsOrPreambleRtf.click();
        await this.recitalsOrPreambleRtf.fill(recitalsAndPreamble);
      } else {
        await this.recitalsOrPreamble.fill(recitalsAndPreamble);
      }
    }
    if (directions) {
      if (this.usesRtf(orderType)) {
        await this.orderDirectionsRtf.click();
        await this.orderDirectionsRtf.fill(directions);
      } else {
        await this.orderDirections.fill(directions);
      }
    }
  }

  private usesRtf(orderType: OrderTypes): boolean {
    return (
      orderType === "Blank order or directions (C21)" ||
      orderType ===
        "Child arrangements, specific issue or prohibited steps order (C43)" ||
      orderType === "Occupation order (FL404)" ||
      orderType === "Non-molestation order (FL404A)"
    );
  }

  private hasPenalNotice(orderType: OrderTypes): boolean {
    return (
      orderType === "Blank order or directions (C21)" ||
      orderType ===
        "Child arrangements, specific issue or prohibited steps order (C43)"
    );
  }
}
