// import { test } from "@playwright/test";
// import Config from "../../../config";
// import { CitizenCreateInitial } from "../../../journeys/citizen/citizenCreateInitial";
//
// test.use({ storageState: Config.sessionStoragePath + "citizen.json" });
//
// test.describe("Manage citizen cases case dashboard tests. @citizen", (): void => {
//   test("Check the case dashboard is visible to the user.", async ({
//     page,
//   }): Promise<void> => {
//     await CitizenCreateInitial.citizenCreateInitial({
//       page: page,
//       accessibilityTest: false,
//       childArrangementsJourney: "C100",
//     });
//   });
// });
//
// test("Check the case dashboard is accessible @accessibilityCitizen", async ({
//   page,
// }): Promise<void> => {
//   await CitizenCreateInitial.citizenCreateInitial({
//     page: page,
//     accessibilityTest: true,
//     childArrangementsJourney: "C100",
//   });
// });
