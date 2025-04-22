import path from "path";
import os from 'os';

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: ptkmcp <allowed-directory> [additional-directories...]");
    process.exit(1);
}
// Normalize all paths consistently
function normalizePath(p) {
    return path.normalize(p);
}
function expandHome(filepath) {
    if (filepath.startsWith('~/') || filepath === '~') {
        return path.join(os.homedir(), filepath.slice(1));
    }
    return filepath;
}
// Store allowed directories in normalized form
export const allowedDirectories = args.map(dir => normalizePath(path.resolve(expandHome(dir))));
