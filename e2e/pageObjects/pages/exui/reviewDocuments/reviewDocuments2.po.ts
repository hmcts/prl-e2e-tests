import { EventPage } from "../eventPage.po.js";
import { expect, Locator, Page } from "@playwright/test";
import { Selectors } from "../../../../common/selectors.js";
import { CommonStaticText } from "../../../../common/commonStaticText.js";
import { PageUtils } from "../../../../utils/page.utils.js";
import {
  yesNoDontKnow,
  documentSubmittedBy,
  documentCategory,
} from "../../../../common/types.js";

function documentLinkFor(submittedBy: documentSubmittedBy): string {
  return submittedBy === "CourtNav" ? "testPdf.pdf" : "mockFile.pdf";
}

export class ReviewDocuments2Page extends EventPage {
  private readonly pageUtils: PageUtils = new PageUtils(this.page);

  private readonly radioIds: Record<yesNoDontKnow, string> = {
    yes: "#reviewDecisionYesOrNo-yes",
    no: "#reviewDecisionYesOrNo-no",
    dontKnow: "#reviewDecisionYesOrNo-notSure",
  };

  readonly headings: string[] = [
    "Review documents for sensitive or confidential information",
    "Submitted by",
    "Confidential information included",
    "Document",
  ];
  readonly documentCategoryLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Document Category" },
  );
  readonly govHint: Locator = this.page.locator(Selectors.GovukHint, {
    hasText: "The document will open in a new tab.",
  });
  readonly formHint: Locator = this.page.locator(Selectors.GovukFormHint, {
    hasText:
      "Restricted documents can only be seen by court staff and the judiciary. They can be found in case file view and the confidential details tab.",
  });
  readonly restrictAccessLabel: Locator = this.page.locator(
    Selectors.GovukFormLabel,
    { hasText: "Do you want to restrict access to this document?" },
  );
  readonly bodyText: Locator = this.page.locator(Selectors.p, {
    hasText:
      "Check for sensitive or confidential information. The document will be visible to all parties if you do not restrict access.",
  });

  constructor(page: Page) {
    super(page, "Review documents");
  }

  async assertPageContents(
    documentSubmittedBy: documentSubmittedBy,
    documentCategory: documentCategory,
  ): Promise<void> {
    await this.assertPageHeadings();
    await Promise.all([
      this.pageUtils.assertStrings(
        this.headings,
        this.page.locator(Selectors.h3),
      ),
      expect(this.documentCategoryLabel).toBeVisible(),
      expect(
        this.page.locator(Selectors.li, { hasText: documentSubmittedBy }),
      ).toBeVisible(),
      expect(
        this.page.locator(Selectors.li, {
          hasText: new RegExp(`^${CommonStaticText.yes}$`),
        }),
      ).toHaveCount(documentCategory === "Position statements" ? 2 : 1),
      expect(this.govHint).toBeVisible(),
      expect(this.formHint).toBeVisible(),
      expect(this.restrictAccessLabel).toBeVisible(),
      expect(
        this.page.locator(Selectors.GovLink, {
          hasText: documentLinkFor(documentSubmittedBy),
        }),
      ).toBeVisible(),
      expect(this.bodyText).toBeVisible(),
    ]);
  }

  async selectRestrictAccessAnswer(
    yesNoNotSureRestrictDocs: yesNoDontKnow,
  ): Promise<void> {
    await this.page.locator(this.radioIds[yesNoNotSureRestrictDocs]).click();
  }
}
