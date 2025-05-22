import { defineConfig } from '@playwright/test';

export default (async () => {
  const { CommonConfig, ProjectsConfig } = await import('@hmcts/playwright-common');

  return defineConfig({
    testDir: './e2e',
    ...CommonConfig.recommended,

    projects: [
      { name: 'setup', testMatch: /global\.setup\.ts/ },
      { name: 'teardown', testMatch: /global\.teardown\.ts/ },
      { ...ProjectsConfig.chrome, dependencies: ['setup'] },
      { ...ProjectsConfig.chromium, dependencies: ['setup'] },
      { ...ProjectsConfig.edge, dependencies: ['setup'] },
      { ...ProjectsConfig.firefox, dependencies: ['setup'] },
      { ...ProjectsConfig.webkit, dependencies: ['setup'] },
      { ...ProjectsConfig.tabletChrome, dependencies: ['setup'] },
      { ...ProjectsConfig.tabletWebkit, dependencies: ['setup'] },
    ],
  });
})();
