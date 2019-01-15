import * as fs from 'fs';
import { dirname, resolve } from 'path';
import * as vscode from 'vscode';

function getDirPath(filePath: string | undefined): string | undefined {
    if (!filePath) {
        return undefined;
    }

    const stats = fs.statSync(filePath);
    const folderPath = stats.isDirectory() ? filePath : dirname(filePath);
    return resolve(folderPath);
}

function getWorkspacePath(): string | undefined {
    const { workspaceFolders } = vscode.workspace;
    const workspaceFolder = workspaceFolders && workspaceFolders[0];
    if (!workspaceFolder) {
        return undefined;
    }
    return workspaceFolder.uri.fsPath;
}

function getCurrentDirPath(): string | undefined {
    const activeEditor = vscode.window.activeTextEditor;
    const filePath = activeEditor && activeEditor.document.fileName;
    return getDirPath(filePath);
}

function getSelectedDirPath(...contextArgs: any[]): string | undefined {
    const selectedPath = contextArgs[0] && contextArgs[0].fsPath;
    return getDirPath(selectedPath);
}

export function getDestDirPath(...contextArgs: any[]): string | undefined{
    return (
        getSelectedDirPath(...contextArgs) ||
        getCurrentDirPath() ||
        getWorkspacePath()
    );
}

export function isDirectory(path: string): boolean {
    return fs.statSync(path).isDirectory();
}