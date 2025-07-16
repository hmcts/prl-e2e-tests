import { test as baseTest } from "@playwright/test";
import { utilsFixtures, UtilsFixtures } from "../utils/utils.fixtures.ts";

// Gather all fixture types into a common type
export type CustomFixtures = UtilsFixtures;

export const test = baseTest.extend<CustomFixtures>({
  ...utilsFixtures,
});

export const expect = test.expect;
