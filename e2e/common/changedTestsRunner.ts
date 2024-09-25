import { execSync } from "child_process";

export class ChangedTestsRunner {
  public static run(): void {
    try {
      const changedTestFiles: string[] = this.getChangedTestFiles();
      this.runPlaywrightTests(changedTestFiles);
    } catch (error) {
      console.error('Failed to run tests:', error);
      process.exit(1);
    }
  }

  private static getChangedTestFiles(): string[] {
    try {
      const diff: string =  execSync('git diff --name-only origin/master...HEAD').toString();
      const changedFiles: string[] = diff.split(`\n`).filter(Boolean);
      return changedFiles.filter(file => file.endsWith('.spec.ts'));
    } catch (error) {
      console.error('Error detecting changed test files: ', error);
      process.exit(1)
    }
  }

  private static runPlaywrightTests(testFiles: string[]): void {
    if (testFiles.length === 0) {
      console.log('No test files changed, skipping tests.');
      return;
    }
    try {
      const command: string = `yarn playwright test ${testFiles.join(' ')}`
      console.log(`Running playwright tests on": ${testFiles.join(', ')}`)
      execSync(command, { stdio: 'inherit'});
    } catch (error) {
      console.error('Error running Playwright tests: ', error);
      process.exit(1)
    }
  }
}

ChangedTestsRunner.run();
