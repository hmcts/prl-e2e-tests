import { SimpleGit, simpleGit } from "simple-git";
import * as process from "node:process";

export class ChangedTestsRunner {
  private static git: SimpleGit = simpleGit();

  public static async run(): Promise<void> {
    try {
      await this.fetchMasterBranch();
      const changedTestFiles: string[] = await this.getChangedTestFiles();
      await this.runPlaywrightTests(changedTestFiles);
    } catch (error) {
      console.error("Failed to run tests:", error);
      process.exit(1);
    }
  }

  private static async fetchMasterBranch(): Promise<void> {
    try {
      console.log("Fetching master branch...");
      await this.git.fetch(
        `https://${process.env.GITHUB_USERNAME}:${process.env.GITHUB_PAT}@github.com/hmcts/prl-e2e-tests.git`,
        "master",
      );
      console.log("Master branch fetched successfully.");
    } catch (error) {
      console.error("Error fetching master branch: ", error);
      process.exit(1);
    }
  }

  private static async getChangedTestFiles(): Promise<string[]> {
    try {
      console.log("Getting changed test files...");
      const diff: string = await this.git.diff([
        "--name-only",
        "origin/master...HEAD",
      ]);
      const changedFiles: string[] = diff.split("\n").filter(Boolean);
      return changedFiles.filter((file) => file.endsWith(".spec.ts"));
    } catch (error) {
      console.error("Error detecting changed test files: ", error);
      process.exit(1);
    }
  }

  private static async runPlaywrightTests(testFiles: string[]): Promise<void> {
    if (testFiles.length === 0) {
      console.log("No test files changed, skipping tests.");
      return;
    }
    try {
      const command: string = `yarn playwright test ${testFiles.join(" ")} --project chromium`;
      console.log(`Running Playwright tests on: ${testFiles.join(", ")}`);
      await this.execCommand(command);
    } catch (error) {
      console.error("Error running Playwright tests: ", error);
      process.exit(1);
    }
  }

  private static execCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const child = require("child_process").exec(command, (error: Error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    });
  }
}

ChangedTestsRunner.run().catch((error) => {
  console.error("Execution failed:", error);
  process.exit(1);
});
