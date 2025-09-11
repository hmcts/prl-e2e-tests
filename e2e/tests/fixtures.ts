import { test as baseTest } from "@playwright/test";
import { utilsFixtures, UtilsFixtures } from "../utils/utils.fixtures.ts";
import { pageFixtures, PageFixtures } from "../pageObjects/page.fixtures.js";
import { componentFixtures, ComponentFixtures } from "../pageObjects/component.fixtures.ts";

// Gather all fixture types into a common type
export type CustomFixtures = UtilsFixtures & PageFixtures & ComponentFixtures;

export const test = baseTest.extend<CustomFixtures>({
  ...utilsFixtures,
  ...pageFixtures,
  ...componentFixtures,
});

export const expect = test.expect;
