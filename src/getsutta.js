import {allowedDirectories} from './datadir.js'
import { nodefs } from 'ptk/platform/nodefs.ts';
import {getSuttaTextByAddress,loadPtks} from './loadptk.js';
await nodefs;
loadPtks(allowedDirectories[0]);
export const getsutta_tool={
    name: "get_sutta_by_email_address",
    description: "get sutta text by email address, return sutta text.",
    inputSchema: {
        type: "object",
        properties: {
            id: {
                type: "string",
                description: "email address of sutta"
            }
        },
        required: ["email"]
    }
}

export const get_sutta_by_email_address=async (id) => {
    return new Promise((resolve, reject) => {
        const suttatext=getSuttaTextByAddress(id);
        if (!suttatext) {
            reject(new Error(`Sutta ${id} not found`));
        } else {
            resolve(suttatext);
        }
    });
}