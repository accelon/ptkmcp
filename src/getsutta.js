import {allowedDirectories} from './datadir.js'
import { nodefs } from 'ptk/platform/nodefs.ts';
import {getSuttaTextByAddress,loadPtks} from './loadptk.js';
await nodefs;
loadPtks(allowedDirectories[0]);
export const getsutta_tool={
    name: "get_sutta_by_id",
    description: "get sutta text by id, return sutta text.",
    inputSchema: {
        type: "object",
        properties: {
            id: {
                type: "string",
                description: "id of sutta"
            }
        },
        required: ["id"]
    }
}

export const get_sutta_by_id=async (id) => {
    return new Promise((resolve, reject) => {
        const suttatext=getSuttaTextByAddress(id);
        if (!suttatext) {
            reject(new Error(`Sutta ${id} not found`));
        } else {
            console.log(`Sutta ${id} len: ${suttatext.length}`);
            resolve(suttatext);
        }
    });
}