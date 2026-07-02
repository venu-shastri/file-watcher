import { Worker } from 'worker_threads';

const worker = new Worker(watcherModule);

worker.on('message', msg => {
    // handle events
});

worker.postMessage({
    command: 'watch',
    path: folder
});



//

import { parentPort } from 'worker_threads';

parentPort?.on('message', message => {
    // start chokidar
});

watcher.on('all', (event, path) => {
    parentPort?.postMessage({
        event,
        path
    });
});
