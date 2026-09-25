import { EventPage } from "../../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { PageUtils } from "../../../../../utils/page.utils.js";
import { Selectors } from "../../../../../common/selectors.js";
import { OrderTypes } from "../../../../../common/types.js";

export interface ManageOrder6Params {
  childArrangementOrderType: string;
  allC43OrdersSubType?: string[];
}

export class ManageOrder6Page extends EventPage {
  readonly rtfLabel: Locator = this.page.locator(Selectors.p, {
      hasText: "These boxes use Rich Text Formatting (RTF). You can apply styles and formatting like bold, italic, underlined and lists. You cannot change the font itself.",
  });
    readonly penalNotice: Locator = this.page.locator(Selectors.h3, {
        hasText: "Penal notice",
    });
    readonly penalNoticeText: Locator = this.page.locator(Selectors.Span, {
        hasText: "Check the box if you need to include a penal notice. If you do not require one leave it blank (Optional)",
    });
    readonly penalNoticeHintText: Locator = this.page.locator(Selectors.Span, {
        hasText: "If the penal notice applies only to specific paragraphs, state which ones",
    });
    readonly toolbarRTF: Locator = this.page.getByRole('toolbar', { name: 'penalNoticeRtf formatting options' });

    readonly penalNoticeTextbox: Locator = this.page.locator(Selectors.strong, {
        hasText: "IMPORTANT WARNING TO [NAME] If you [NAME] of [ADDRESS] disobey [this order] / [paragraph[s] [insert paragraph number(s)] of this order] you may be held to be in contempt of court and may be imprisoned, fined or have your assets seized.",
    });
    readonly penalNotice: Locator = this.page.locator(Selectors.h3, {
        hasText: "Penal notice",
    });
    readonly penalNotice: Locator = this.page.locator(Selectors.h3, {
        hasText: "Penal notice",
    });
    readonly penalNotice: Locator = this.page.locator(Selectors.h3, {
        hasText: "Penal notice",
    });
//for the 4 order types?! to double-check if the code needs to be in this file or the orderDetailsComponenet

  constructor(page: Page) {
    super(page, "Manage orders");
  }

  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  async assertPageContents(
    isUploadAnOrder: boolean,
    orderType: OrderTypes,
  ): Promise<void> {
    await this.assertPageHeadings();
    if (!isUploadAnOrder) {
      await expect(this.page.getByText(orderType).first()).toBeVisible();
    }
    await expect(this.rtfLabel).toBeVisible();
      await expect(this.penalNotice).toBeVisible();
      await expect(this.penalNoticeText).toBeVisible();
      //selecting Penal Notice to expand the new textbox
      await this.page.getByRole('checkbox', { name: "Include a penal notice" }).check();
      await expect(this.toolbarRTF).toBeVisible();

      



    await expect(this.continueButton).toBeVisible();
    await expect(this.previousButton).toBeVisible();
  }

  async selectC43OrderDetails({
    childArrangementOrderType,
    allC43OrdersSubType,
  }: ManageOrder6Params): Promise<void> {
    for (const orderLabelText of allC43OrdersSubType) {
      await this.page.getByLabel(orderLabelText, { exact: true }).check();
    }

    await this.pageUtils.assertStrings(this.hiddenC43orderOptionsFormLabels);
    await this.page
      .getByLabel(childArrangementOrderType, { exact: true })
      .check();
  }
}
