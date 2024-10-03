import { Page } from "@playwright/test";
import { otherProceedingsRadios } from "../../../../common/types";
import {
  OtherProceedings1Page
} from "../../../../pages/manageCases/createCase/C100/otherProceedings/otherProceedings1Page";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";
import {
  OtherProceedingsSubmitPage
} from "../../../../pages/manageCases/createCase/C100/otherProceedings/otherProceedingsSubmitPage";

interface C100OtherProceedingsOptions {
  page: Page;
  accessibilityTest: boolean;
  errorMessaging: boolean;
  c100OtherProceedings: otherProceedingsRadios;
  c100OngoingProceedingsAndDocX?: boolean;
  subJourney: boolean
}

export class C100OtherProceedings {
  public static async c100OtherProceedings({
    page,
    accessibilityTest,
    errorMessaging,
    c100OtherProceedings,
    c100OngoingProceedingsAndDocX,
    subJourney
  }: C100OtherProceedingsOptions): Promise<void> {
    if (c100OtherProceedings === 'Yes' && typeof c100OngoingProceedingsAndDocX !== 'boolean') {
      throw new Error(
        'c100OngoingProceedingsAndDocX must be boolean if c100OtherProceedings is Yes'
      )
    }
    if (subJourney) {
      await SolicitorCreateInitial.createInitialCase({
        page: page,
        user: 'solicitor',
        solicitorCaseType: 'C100',
        accessibilityTest: false,
        errorMessaging: false
      });
    }
    await Helpers.selectSolicitorEvent(
      page,
      'Other proceedings'
    );
    await OtherProceedings1Page.otherProceedings1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      errorMessaging: errorMessaging,
      c100OtherProceedings: c100OtherProceedings,
      c100OngoingProceedingsAndDocX: c100OngoingProceedingsAndDocX
    });
    await OtherProceedingsSubmitPage.otherProceedingsSubmitPage({
      page: page,
      accessibilityTest: accessibilityTest,
      c100OtherProceedings: c100OtherProceedings,
      c100OngoingProceedingsAndDocX: c100OngoingProceedingsAndDocX
    });
  }
}