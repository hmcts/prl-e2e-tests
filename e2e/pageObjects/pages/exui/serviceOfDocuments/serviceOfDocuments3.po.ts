import { EventPage } from "../eventPage.po.js";
import { Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { PageUtils } from "../../../../utils/page.utils.js";

export class ServiceOfDocuments3Page extends EventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  private readonly formLabelsContainer: Locator = this.page.locator(
    Selectors.GovukFormLabel,
  );
  private readonly formLabels: string[] = [
    "Does someone need to check the documents?",
    "A manager needs to check the documents",
    "No checks are required",
  ];

  private readonly managerCheckRadio: Locator = this.page.locator(
    "#sodDocumentsCheckOptions-managerCheck",
  );
  private readonly noCheckRadio: Locator = this.page.locator(
    "#sodDocumentsCheckOptions-noCheck",
  );

  constructor(page: Page) {
    super(page, "Service of documents");
  }

  async assertPageContents(): Promise<void> {
    await this.assertPageHeadings();
    await this.pageUtils.assertStrings(
      this.formLabels,
      this.formLabelsContainer,
    );
  }

  async selectDocumentCheckOption(checkDocuments: boolean): Promise<void> {
    if (checkDocuments) {
      await this.managerCheckRadio.click();
    } else {
      await this.noCheckRadio.click();
    }
  }
}
