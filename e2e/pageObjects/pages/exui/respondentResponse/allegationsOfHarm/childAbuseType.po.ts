import { expect, Locator, Page } from "@playwright/test";
import {
  AllegationsOfHarmEventPage,
  RespondentNamePrefix,
} from "./allegationsOfHarmEventPage.po.js";
import { AbuseType, SoughtHelp } from "./abuseTypes.js";

export interface ChildAbuseDetails extends SoughtHelp {
  type: AbuseType;
  childrenAtRisk?: string[];
  description: string;
  startAndDuration: string;
}

const CHILD_ABUSE_PAGES: Record<
  AbuseType,
  { pageId: string; namePrefix: RespondentNamePrefix }
> = {
  [AbuseType.physical]: {
    pageId: "A5",
    namePrefix: RespondentNamePrefix.respondent,
  },
  [AbuseType.psychological]: {
    pageId: "A6",
    namePrefix: RespondentNamePrefix.respondent,
  },
  [AbuseType.sexual]: {
    pageId: "A7",
    namePrefix: RespondentNamePrefix.activeRespondent,
  },
  [AbuseType.emotional]: {
    pageId: "A8",
    namePrefix: RespondentNamePrefix.activeRespondent,
  },
  [AbuseType.financial]: {
    pageId: "A9",
    namePrefix: RespondentNamePrefix.activeRespondent,
  },
};

export class ChildAbuseTypePage extends AllegationsOfHarmEventPage {
  private readonly labels: string[] = [
    // "Give short description" (no "a") is the service's own wording on these pages
    "Give short description of what happened and any relevant information so the court can decide what needs to be done.",
  ];
  private readonly allChildrenAtRisk: Locator = this.question(
    "Are all the children in the application at risk from this behaviour? (Optional)",
  );
  private readonly whichChildrenAtRisk: Locator = this.question(
    "Which children are at risk? (Optional)",
  );
  private readonly description: Locator = this.page.getByRole("textbox", {
    name: "Describe the nature of the behaviour, what happened and who was involved. (Optional)",
    exact: true,
  });
  private readonly startAndDuration: Locator = this.page.getByRole("textbox", {
    name: /^When did the behaviour start and how long did it continue\?/,
  });
  private readonly soughtHelp: Locator = this.question(
    "Did the respondent seek help? (Optional)",
  );
  private readonly whoFrom: Locator = this.page.getByRole("textbox", {
    name: "Who did they seek help from, and what they did to help? (Optional)",
    exact: true,
  });

  constructor(page: Page) {
    super(page);
  }

  async assertPageContents(
    type: AbuseType,
    respondentName: string,
  ): Promise<void> {
    const { pageId, namePrefix } = CHILD_ABUSE_PAGES[type];
    await this.assertCommonContents(pageId, respondentName, namePrefix);
    await expect(
      this.page.getByRole("heading", {
        level: 2,
        name: `Child abuse - ${type}`,
        exact: true,
      }),
    ).toBeVisible();
    await this.pageUtils.assertStrings(this.labels);
    await expect(this.allChildrenAtRisk).toBeVisible();
    await expect(this.description).toBeVisible();
    await expect(this.startAndDuration).toBeVisible();
    await expect(this.soughtHelp).toBeVisible();
    await expect(this.previousButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async fillInFields(details: ChildAbuseDetails): Promise<void> {
    const children: string[] = details.childrenAtRisk ?? [];
    await this.checkUntilChecked(
      this.allChildrenAtRisk.getByRole("radio", {
        name: children.length ? "No" : "Yes",
        exact: true,
      }),
    );
    // the children list is dynamic (ids are child UUIDs), so children are ticked by name
    for (const child of children) {
      await this.checkUntilChecked(
        this.whichChildrenAtRisk.getByRole("checkbox", {
          name: child,
          exact: true,
        }),
      );
    }
    await this.description.fill(details.description);
    await this.startAndDuration.fill(details.startAndDuration);
    await this.checkUntilChecked(
      this.soughtHelp.getByRole("radio", {
        name: details.soughtHelp ? "Yes" : "No",
        exact: true,
      }),
    );
    if (details.soughtHelp && details.whoFrom) {
      await this.whoFrom.fill(details.whoFrom);
    }
  }
}
