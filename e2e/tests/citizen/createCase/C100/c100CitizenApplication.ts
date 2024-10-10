// import { test } from "@playwright/test";
// import { C100 } from "../../../../journeys/citizen/C100";
// import Config from "../../../../config";
//
// test.use({ storageState: Config.sessionStoragePath + "citizen.json" });
//
// test.describe("C100 Citizen Application tests. @citizen", (): void => {
//   test(`Test the C100 of the citizen journey with the following options:
//   Not Accessibility Testing,
//   Not Error Messaging,
//   Yes Screening and Written Review`, async ({ page }): Promise<void> => {
//     await C100.c100({
//       page: page,
//       accessibilityTest: false,
//       errorMessaging: false,
//       c100ScreeningWrittenAgreementReview: true,
//     });
//   });
//
//   test(`Test the C100 of the citizen journey with the following options:
//   Not Accessibility Testing,
//   Not Error Messaging,
//   No Screening and Written Review`, async ({ page }): Promise<void> => {
//     await C100.c100({
//       page: page,
//       accessibilityTest: false,
//       errorMessaging: false,
//       c100ScreeningWrittenAgreementReview: false,
//     });
//   });
//
//   test(`Test the C100 of the citizen journey with the following options:
//   Not Accessibility Testing,
//   Yes Error Messaging,
//   No Screening and Written Review`, async ({ page }): Promise<void> => {
//     await C100.c100({
//       page: page,
//       accessibilityTest: false,
//       errorMessaging: true,
//       c100ScreeningWrittenAgreementReview: false,
//     });
//   });
// });
//
// test(`Test the accessibility of the C100 Screening Sections`, async ({
//   page,
// }): Promise<void> => {
//   await C100.c100({
//     page: page,
//     accessibilityTest: true,
//     errorMessaging: false,
//     c100ScreeningWrittenAgreementReview: false,
//   });
// });
