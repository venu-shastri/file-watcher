const watcher = chokidar.watch(workspacePath, {
    ignored: [
        /(^|[\/\\])\../,                     // Ignore hidden files and dotfiles (like .git)
        '**/node_modules/**',                // Ignore node dependencies
        '**/package-lock.json',              // Ignore fast-changing lockfiles
        '**/yarn.lock',
        '**/*.log',                          // Ignore rolling output logfiles
        '**/build/**',                       // Ignore build artifacts
        '**/dist/**'
    ],
    persistent: true,
    ignoreInitial: true,                     // Crucial: skips inventorying thousands of files instantly
    awaitWriteFinish: {                      // Debounces rapid-fire file writes
        stabilityThreshold: 300,
        pollInterval: 100
    }
});
