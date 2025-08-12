import { test as setup } from "./fixtures.ts";
import dotenv from "dotenv";

dotenv.config();

setup.describe("Setup users and retrieve tokens", () => {
  setup(
    "Retrieve IDAM token for citizen user creation",
    async ({ tokenUtils }) => {
      const token = await tokenUtils.getAccessToken("citizenCreateUser");
      process.env.CREATE_USER_BEARER_TOKEN = token;
    },
  );
});
