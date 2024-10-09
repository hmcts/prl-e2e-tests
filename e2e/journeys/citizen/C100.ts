import { Page } from "@playwright/test";
import { CitizenCreateInitial } from "./citizenCreateInitial";

interface C100Options {
  page: Page;
  accessibilityTest: boolean;
}

export class C100 {
  public static async c100({
    page,
    accessibilityTest,
  }: C100Options): Promise<void> {
    await CitizenCreateInitial.citizenCreateInitial({
      page: page,
      accessibilityTest: false,
      childArrangementsJourney: 'C100'
    });

  }
}