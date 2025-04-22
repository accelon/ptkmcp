import {allowedDirectories} from './datadir.js'
import { nodefs } from 'ptk/nodebundle.cjs';
import {email2ptkaddress,loadPtks} from './loadptk.js';
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
        const [ptk,address]=email2ptkaddress(id);
        let suttatext='';
        if (ptk)  {
            const r=ptk.rangeOfAddress(address);
            if (r[1]) suttatext=ptk.slice(r[0],r[1]).filter(it=>!!it).join('\n');
        }
        if (!suttatext) {
            reject(new Error(`Sutta ${id} not found`));
        } else {
            resolve(suttatext);
        }
    });
}