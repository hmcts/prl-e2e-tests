import { test as baseTest } from "@playwright/test";
import { utilsFixtures, UtilsFixtures } from "../utils/utils.fixtures.ts";
import { pageFixtures, PageFixtures } from "../pageObjects/page.fixtures.js";

// Gather all fixture types into a common type
export type CustomFixtures = UtilsFixtures & PageFixtures;

export const test = baseTest.extend<CustomFixtures>({
  ...utilsFixtures,
  ...pageFixtures,
});

export const expect = test.expect;
