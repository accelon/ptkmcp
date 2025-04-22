import {email2ptkaddress,loadPtks} from './src/loadptk.js';
import { usePtk } from 'ptk/nodebundle.cjs';
await loadPtks('/2023/sz/dist/');
const [ptk,address]=email2ptkaddress('cs-ccc@s12.68');

const r=ptk.rangeOfAddress(address);
const line=ptk.slice(r[0],r[1]).filter(it=>!!it).join('\n')
console.log(r,address,line)