import { Page } from "@playwright/test";
import { otherProceedingsRadios } from "../../../../common/types";
import {
  OtherProceedings1Page
} from "../../../../pages/manageCases/createCase/C100/otherProceedings/otherProceedings1Page";
import { SolicitorCreateInitial } from "../solicitorCreateInitial";
import { Helpers } from "../../../../common/helpers";

interface C100OtherProceedingsOptions {
  page: Page;
  accessibilityTest: boolean;
  c100OtherProceedings: otherProceedingsRadios;
  subJourney: boolean
}

export class C100OtherProceedings {
  public static async c100OtherProceedings({
    page,
    accessibilityTest,
    c100OtherProceedings,
    subJourney
  }: C100OtherProceedingsOptions): Promise<void> {
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
      'Other Proceedings'
    );
    await OtherProceedings1Page.c100OtherProceedinsg1Page({
      page: page,
      accessibilityTest: accessibilityTest,
      c100OtherProceedings: c100OtherProceedings
    });
  }
}