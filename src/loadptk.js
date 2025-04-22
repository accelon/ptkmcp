import { nodefs,usePtk,openPtk,enableAccelon23Features} from 'ptk/nodebundle.cjs';
import { toIASTOffText } from 'provident-pali/src/iast.js';
export const ptks=['cs','sc','cs-ccc']//,'cs-kmj','cs-mm','cs-yh','cs-xsq'];

await nodefs;
export const loadPtks=async (dir)=>{
    dir&&process.chdir(dir);
    for (let i=0;i<ptks.length;i++) {
        const blob=fs.readFileSync(ptks[i]+".ptk");
        const ptk=await openPtk(ptks[i],blob);
        enableAccelon23Features(ptk);
        await ptk.loadAll();
    }
}

export const email2ptkaddress=(id)=>{
    const emailParts = id.split('@');
    const localPart = emailParts[0].split('.');
    const domainPart = emailParts[1];
    const at=ptks.indexOf(domainPart);
    let ptk=null;
    if (~at) {
        ptk=usePtk(ptks[at]);
    } else {
        ptk=usePtk('cs');
    }
    const address='ck#'+localPart[0]+'.n'+localPart[1];
    return [ptk,address];
}


export const getSuttaTextByAddress=(addr)=>{
    const [ptk,address]=email2ptkaddress(addr);
    let suttatext='';
    if (ptk)  {
        const r=ptk.rangeOfAddress(address);
        if (r[1]) suttatext=ptk.slice(r[0],r[1]).filter(it=>!!it).join('\n');
        if (ptk.name=='cs') {
            suttatext=toIASTOffText(suttatext);
            console.log(suttatext)
        }
    }
    return suttatext;
}