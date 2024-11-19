import { test } from "@playwright/test";
import Config from "../../../../config";

test.use({ storageState: Config.sessionStoragePath + "caseWorker.json" });
