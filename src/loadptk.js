import { nodefs,usePtk,openPtk,enableAccelon23Features } from 'ptk/nodebundle.cjs';
export const ptks=['sc','cs-ccc']//,'cs-kmj','cs-mm','cs-yh','cs-xsq'];
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
    const localPart = emailParts[0];
    const domainPart = emailParts[1].split('.');
    const at=ptks.indexOf(localPart);
    let ptk=null;
    if (~at) {
        ptk=usePtk(ptks[at]);
    }
    const address='ck#'+domainPart[0]+'.n'+domainPart[1];
    return [ptk,address];
}
