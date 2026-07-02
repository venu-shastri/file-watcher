import * as cp from 'child_process';
import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Path to your isolated watcher script
    const watcherModule = context.asAbsolutePath(path.join('out', 'watcherWorker.js'));
    
    // Fork a background process
    const watcherProcess = cp.fork(watcherModule);

    // Send workspace path to the background worker
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (workspaceFolder) {
        watcherProcess.send({ command: 'start', path: workspaceFolder });
    }

    // Receive lightweight messages from the worker thread
    watcherProcess.on('message', (msg: any) => {
        if (msg.event === 'change') {
            // Safely execute lightweight UI updates or task notifications here
        }
    });

    context.subscriptions.push({
        dispose: () => watcherProcess.kill()
    });
}
