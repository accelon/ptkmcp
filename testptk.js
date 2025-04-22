import {getSuttaTextByAddress,loadPtks} from './src/loadptk.js';

await loadPtks('/2023/sz/dist/');
const address='s12.70@cs';
const t=getSuttaTextByAddress(address);


console.log(address)