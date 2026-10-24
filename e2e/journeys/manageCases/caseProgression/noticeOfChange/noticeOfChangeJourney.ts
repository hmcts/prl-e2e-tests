import { NocSolicitorPagesGroup } from "../../../../pageObjects/roleBasedGroupedPages/nocSolicitorPages.js";

export interface NocClientName {
  firstname: string;
  surname: string;
}

export class NoticeOfChangeJourney {
  async performNoticeOfChange(
    nocSolicitor: NocSolicitorPagesGroup,
    caseRef: string,
    clientName: NocClientName,
    accessibilityTest: boolean = false,
  ): Promise<void> {
    const { summaryPage, noticeOfChange } = nocSolicitor;

    await summaryPage.exuiHeader.clickNoticeOfChange();

    await noticeOfChange.page1.assertPageContents();
    if (accessibilityTest) await noticeOfChange.page1.verifyAccessibility();
    await noticeOfChange.page1.fillInCaseNumber(caseRef);
    await noticeOfChange.page1.clickContinue();

    await noticeOfChange.page2.assertPageContents();
    if (accessibilityTest) await noticeOfChange.page2.verifyAccessibility();
    await noticeOfChange.page2.fillInPartyName(
      clientName.firstname,
      clientName.surname,
    );
    await noticeOfChange.page2.clickContinue();

    await noticeOfChange.submitPage.assertPageContents(clientName);
    if (accessibilityTest)
      await noticeOfChange.submitPage.verifyAccessibility();
    await noticeOfChange.submitPage.checkBoxes();
    await noticeOfChange.submitPage.clickSubmit();

    await noticeOfChange.confirmPage.assertPageContents();
    if (accessibilityTest)
      await noticeOfChange.confirmPage.verifyAccessibility();
    await noticeOfChange.confirmPage.clickViewThisCase();
  }
}
