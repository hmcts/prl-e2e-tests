import { test as baseTest } from "@playwright/test";
import { utilsFixtures, UtilsFixtures } from "./utils.fixtures";

// Gather all fixture types into a common type
export type CustomFixtures = UtilsFixtures;

// Extend 'test' object using custom fixtures
// Test scoped fixtures are the first template parameter
// Worker scoped fixtures are the second template
export const test = baseTest.extend<CustomFixtures>({
  ...utilsFixtures,
});

// If you were extending assertions, you would also import the "expect" property from this file
export const expect = test.expect;
