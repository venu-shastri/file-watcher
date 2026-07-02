mport chokidar from 'chokidar';

process.on('message', (msg: any) => {
    if (msg.command === 'start') {
        const watcher = chokidar.watch(msg.path, {
            ignored: [
                '**/node_modules/**', 
                '**/.git/**', 
                '**/dist/**', 
                '**/build/**'
            ],
            persistent: true,
            ignoreInitial: true // Prevents massive CPU spikes on startup
        });

        watcher.on('all', (event, filePath) => {
            // Send essential data back to extension host without blocking it
            if (process.send) {
                process.send({ event, filePath });
            }
        });
    }
});
