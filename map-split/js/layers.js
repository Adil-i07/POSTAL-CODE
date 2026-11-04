/* ================= Layers · เลเยอร์ (toggle · create · share · Add-ons) ================= */
(function(){
/* ---------- Icons ---------- */
const IC={
 pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 road:'<path d="M7 3 4 21M17 3l3 18M12 4v3M12 10.5v3M12 17v3"/>',
 water:'<path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
 mountain:'<path d="m3 19 6-11 4 7 3-4 5 8z"/>',
 food:'<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 7 0 2 1 3 3 3"/>',
 car:'<path d="M4 15v-3l2-5h12l2 5v3M4 15h16M4 15v3h3v-3M17 15v3h3v-3M7.5 12h.01M16.5 12h.01"/>',
 bed:'<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11.5h.01"/>',
 bag:'<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
 health:'<path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM12 8v8M8 12h8"/>',
 star:'<path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/>',
 landmark:'<path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18"/>',
 cap:'<path d="m2 9 10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>',
 coin:'<circle cx="12" cy="12" r="9"/><path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5"/>',
 gov:'<path d="M3 21h18M5 21V10M19 21V10M9 21v-5h6v5M3 10l9-6 9 6"/>',
 worship:'<path d="M12 3v4M10 5h4M6 21V12l6-4 6 4v9M10 21v-4a2 2 0 0 1 4 0v4"/>',
 leaf:'<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14M5 19c2-4 5-7 9-9"/>',
 house:'<path d="M4 11 12 4l8 7M6 10v10h12V10M10 20v-5h4v5"/>',
 flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 label:'<path d="M4 7V4h16v3M9 20h6M12 4v16"/>',
 train:'<path d="M7 3h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2zM5 11h14M8 21l2-3M16 21l-2-3M9 14.5h.01M15 14.5h.01"/>',
 bus:'<path d="M5 4h14a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1zM4 11h16M7 18v2M17 18v2M8 14.5h.01M16 14.5h.01"/>',
 boat:'<path d="M2 19c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M5 16l-1-4h16l-1 4M12 12V4l5 5"/>',
 toll:'<path d="M3 20h18M5 20V6M19 20V6M3 6h18M5 12h14M9 6v6M15 6v6"/>',
 theme:'<path d="M12 3a9 9 0 1 0 9 9c-5 0-9-4-9-9z"/>',
 ruler:'<path d="m14.5 3.5 6 6L9 21l-6-6z"/><path d="m8 11 2 2M11 8l2 2M14 5l2 2M5 14l2 2"/>',
 full:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
 share:'<path d="M12 15V4M8 7.5 12 4l4 3.5"/><path d="M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 17h.01"/>',
 side:'<path d="M4 5h16v14H4zM9 5v14"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',
 edit:'<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/>',
 target:'<circle cx="12" cy="12" r="6.5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
 eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
 down:'<path d="M12 4v11M7.5 11 12 15.5 16.5 11M5 20h14"/>',
 plug:'<path d="M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0zM12 18v3"/>',
 ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
 search:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
 layers:'<path d="m12 3 9 4.5-9 4.5-9-4.5z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>',
 back:'<path d="m15 6-6 6 6 6"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
 nav:'<path d="M12 3 5 20l7-4 7 4z"/>',
 right:'<path d="m9 6 6 6-6 6"/>',
 more:'<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
 chev:'<path d="m6 9 6 6 6-6"/>',
 sliders:'<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>'
};
window.LYIC=IC;
const ico=(n,s)=>`<svg class="i" viewBox="0 0 24 24"${s?` style="width:${s}px;height:${s}px"`:''}>${IC[n]||IC.pin}</svg>`;
window.lyIco=ico;
const CATIC={food:'food',automotive:'car',lodging:'bed',shopping:'bag',health:'health',entertainment:'star',culture:'landmark',education:'cap',finance:'coin',government:'gov',worship:'worship',nature:'leaf',other:'pin'};
const BASE=[['k:road','road','ถนน','Roads','#6c757d'],['k:water','water','แม่น้ำ / คลอง / อ่าว','Waterways','#1c7ed6'],['k:mountain','mountain','ภูเขา','Mountains','#2b8a3e']];
const CATK=CATS.map(c=>['c:'+c[0],CATIC[c[0]]||'pin',c[1],c[2],c[3]]);
const ALLK=BASE.concat(CATK);
const LIC=['pin','star','flag','food','bed','bag','health','landmark','cap','coin','gov','worship','leaf','car','house','road','water','mountain'];
const AOK=['mapPlaces','fataekts','carFMRFT','houses'],FTK=['train','bus','boat','toll'];
const FTEN={train:'Rail',bus:'Bus',boat:'Ferry',toll:'Expressway'};
const ST='ly_cfg';
let LY={off:{},c:[],solo:'',lab:true,fold:{cats:true}};
try{const s=JSON.parse(localStorage.getItem(ST)||'null');if(s&&typeof s==='object'){LY.off=s.off||{};LY.c=Array.isArray(s.c)?s.c:[];LY.solo=s.solo||'';LY.lab=s.lab!==false;if(s.fold&&typeof s.fold==='object')LY.fold=s.fold}}catch(_){}
const lsv=()=>{try{localStorage.setItem(ST,JSON.stringify(LY))}catch(_){}};
const cl=o=>({i:String(o.i||('l'+Math.random().toString(36).slice(2,8))).replace(/[^\w-]/g,'').slice(0,24)||('l'+Date.now().toString(36)),n:String(o.n||'Layer').slice(0,40),e:IC[o.e]?o.e:'pin',col:/^#[0-9a-f]{3,8}$/i.test(o.col||'')?o.col:'#e8590c',rc:o.rc?1:0,k:(Array.isArray(o.k)?o.k:[]).filter(x=>ALLK.some(a=>a[0]===x)),q:String(o.q||'').slice(0,60),d:(Array.isArray(o.d)?o.d:[]).map(String).slice(0,2000),on:(o.on===0||o.on===false)?0:1});
LY.c=LY.c.map(cl);
if(LY.solo&&!LY.c.some(l=>l.i===LY.solo))LY.solo='';

/* ---------- Matching / filtering ---------- */
const key=p=>p.kind==='road'?'k:road':p.kind==='nature'?(p.nt==='mountain'?'k:mountain':'k:water'):'c:'+(p.cat||'other');
const txt=p=>((p.name||'')+' '+(p.note||'')).toLowerCase();
const match=(l,p)=>{if(l.d&&l.d.length&&l.d.includes(p.id))return true;const hk=l.k&&l.k.length,hq=!!(l.q&&l.q.trim());if(!hk&&!hq)return false;if(hk&&!l.k.includes(key(p)))return false;if(hq&&!txt(p).includes(l.q.trim().toLowerCase()))return false;return true};
const active=()=>Object.values(LY.off).some(Boolean)||LY.c.some(l=>!l.on||(l.rc&&l.col))||!!LY.solo;
function filt(list){const solo=LY.solo?LY.c.find(l=>l.i===LY.solo):null,out=[];
 for(const p of list){if(LY.off[key(p)])continue;let hide=false,col=null,inSolo=false;
  for(const l of LY.c){if(!match(l,p))continue;if(solo&&l.i===solo.i)inSolo=true;if(!l.on&&!(solo&&l.i===solo.i))hide=true;else if(l.rc&&l.col&&!col)col=l.col}
  if(solo&&!inSolo)continue;if(hide)continue;out.push(col?{...p,color:col}:p)}
 return out}
window.lyFilt=list=>active()?filt(list):list;
const _draw=drawPl;
drawPl=function(){if(!active())return _draw.apply(this,arguments);const full=PL;PL=filt(full);try{return _draw.apply(this,arguments)}finally{PL=full}};

/* ---------- Encode / share ---------- */
const b64=s=>{const u=new TextEncoder().encode(s);let b='';for(let i=0;i<u.length;i+=8192)b+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(b).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')};
const unb=c=>{c=c.replace(/-/g,'+').replace(/_/g,'/');while(c.length%4)c+='=';const b=atob(c),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return new TextDecoder().decode(u)};
const lst=(only)=>{const c=only?LY.c.filter(l=>l.i===only):LY.c;return{v:1,o:Object.keys(LY.off).filter(k=>LY.off[k]),a:AOK.map(k=>ADDONS[k]?'+':'-').join(''),t:FTK.map(k=>ADDONS.fataekTypes[k]?'1':'0').join(''),lb:LY.lab?1:0,s:only||LY.solo||'',c:c.map(l=>({...l,on:only?1:(l.on?1:0),rc:l.rc?1:0}))}};
const isDef=s=>!s.o.length&&s.a==='+---'&&s.t==='1111'&&s.lb&&!s.s&&!s.c.length;
window.lyQ=()=>{const s=lst();return isDef(s)?'':'&ly='+b64(JSON.stringify(s))};
const link=only=>baseUrl()+HX()+'ly='+b64(JSON.stringify(lst(only)));
window.lyLink=link;
let lastCode='';
function applyState(s){if(!s||typeof s!=='object')throw 0;
 LY.off={};(s.o||[]).forEach(k=>{if(ALLK.some(a=>a[0]===k))LY.off[k]=true});
 LY.lab=s.lb!==0;
 if(typeof s.t==='string')FTK.forEach((k,i)=>{ADDONS.fataekTypes[k]=s.t[i]!=='0'});
 if(typeof s.a==='string')AOK.forEach((k,i)=>{if((s.a[i]==='+'||s.a[i]==='-')&&window.aoSet)window.aoSet(k,s.a[i]==='+')});
 (Array.isArray(s.c)?s.c:[]).map(cl).forEach(l=>{const j=LY.c.findIndex(x=>x.i===l.i);if(j>=0)LY.c[j]=l;else LY.c.push(l)});
 LY.solo=LY.c.some(l=>l.i===s.s)?s.s:'';
 lsv();saveAo();if(window.aoSync)aoSync();ui();drawPl()}
window.lyApply=code=>{if(!code||code===lastCode)return;lastCode=code;try{applyState(JSON.parse(unb(code)));toast('Layers loaded from link · โหลดเลเยอร์จากลิงก์แล้ว')}catch(_){toast('Invalid layer code · รหัสเลเยอร์ไม่ถูกต้อง')}};
function importText(t){t=(t||'').trim();if(!t)return;try{if(t[0]==='{'){applyState(JSON.parse(t))}else{const m=t.match(/[#&?\/]ly=([A-Za-z0-9_-]+)/),c=m?m[1]:t;applyState(JSON.parse(unb(c)))}toast('Layers imported · นำเข้าเลเยอร์แล้ว');return true}catch(_){toast('Import failed · นำเข้าไม่ได้')}}

/* ---------- On/off state ---------- */
const isOn=id=>id==='tr'?!!ADDONS.fataekts:id==='mp'?!!ADDONS.mapPlaces:id==='car'?!!ADDONS.carFMRFT:id==='hs'?!!ADDONS.houses:id==='lab'?LY.lab:id.startsWith('ft:')?!!(ADDONS.fataekts&&ADDONS.fataekTypes[id.slice(3)]):id.startsWith('u:')?!!(LY.c.find(l=>l.i===id.slice(2))||{}).on:!LY.off[id];
function setRaw(id,on){
 if(id==='tr'){window.aoSet('fataekts',on);if(on&&!FTK.some(t=>ADDONS.fataekTypes[t]))FTK.forEach(t=>ADDONS.fataekTypes[t]=true)}
 else if(id==='mp')window.aoSet('mapPlaces',on);else if(id==='car')window.aoSet('carFMRFT',on);else if(id==='hs')window.aoSet('houses',on);
 else if(id==='lab')LY.lab=on;
 else if(id.startsWith('ft:')){ADDONS.fataekTypes[id.slice(3)]=on;if(on&&!ADDONS.fataekts)window.aoSet('fataekts',true)}
 else if(id.startsWith('u:')){const l=LY.c.find(x=>x.i===id.slice(2));if(l)l.on=on?1:0}
 else{if(on)delete LY.off[id];else LY.off[id]=true}}
function fin(){saveAo();lsv();if(window.aoSync)aoSync();ui();drawPl()}
const toggle=(id,on)=>{setRaw(id,on);fin()};
function allSet(on){
 ['mapPlaces','fataekts','carFMRFT','houses'].forEach(k=>window.aoSet(k,on));
 FTK.forEach(k=>ADDONS.fataekTypes[k]=on);
 LY.off={};if(!on)ALLK.forEach(a=>LY.off[a[0]]=true);
 LY.lab=true;LY.c.forEach(l=>l.on=on?1:0);if(on)LY.solo='';fin()}

/* ---------- Sidebar / bottom-sheet view ---------- */
const B=$('#lyb'),SR=$('#srow-layers'),BD=$('#body');
let LYV=false,SQ='';
const gdef=()=>[
 {id:'main',en:'Core Data',th:'ข้อมูลหลัก',ids:['mp','lab','car','hs']},
 {id:'ft',en:'Transit Networks',th:'ระบบขนส่ง (fataekts)',ids:FTK.map(t=>'ft:'+t)},
 {id:'kinds',en:'Feature Types',th:'ชนิดข้อมูลบนแผนที่',ids:BASE.map(a=>a[0])},
 {id:'cats',en:'Place Categories',th:'หมวดสถานที่',ids:CATK.map(a=>a[0])}];
const gids=id=>id==='u'?LY.c.map(l=>'u:'+l.i):(gdef().find(g=>g.id===id)||{ids:[]}).ids;
const MAINI={mp:['pin','Map Places','สถานที่ / ถนน / ธรรมชาติ','#2f8a3b'],lab:['label','Area Labels','ชื่อพื้นที่บนแผนที่','#495057'],car:['car','CarFMRFT Vehicles','รถของมูลนิธิ','#e8590c'],hs:['house','Houses','บ้านทั้งหมด','#7048e8']};
const FTCOL={train:'#364fc7',bus:'#e8590c',boat:'#1c7ed6',toll:'#868e96'};
function info(id,cnt){
 if(MAINI[id]){const m=MAINI[id];return{ic:m[0],en:m[1],th:m[2],col:m[3],c:id==='mp'?PL.length:null}}
 if(id.startsWith('ft:')){const t=id.slice(3),f=FATAEK_TYPES[t]||{};return{ic:t,en:FTEN[t]||t,th:f.n||t,col:FTCOL[t]||'#495057',c:fataekRoutes.filter(r=>r.type===t).length}}
 if(id.startsWith('u:')){const l=LY.c.find(x=>x.i===id.slice(2));return{ic:l.e,en:l.n,th:'',col:l.col,c:PL.filter(p=>match(l,p)).length}}
 const a=ALLK.find(x=>x[0]===id);return{ic:a[1],en:a[3],th:a[2],col:a[4],c:cnt[id]||0}}
const row=(id,cnt,extra)=>{const f=info(id,cnt),sub=[f.th,f.c==null?'':f.c+' items'].filter(Boolean).join(' · ');
 return `<div class="lyr"><label class="sw"><input type="checkbox" data-lyt="${id}" ${isOn(id)?'checked':''}><span class="sw-s"></span></label><span class="lye"${id.startsWith('u:')?` style="color:${f.col}"`:''}>${ico(f.ic,17)}</span><div class="lyn"><b>${esc(f.en)}</b>${sub?`<small>${esc(sub)}</small>`:''}${extra?`<div class="lyacts">${extra}</div>`:''}</div></div>`};
let lastSig='',LYS='main';
const sigOf=()=>{const c={};PL.forEach(p=>{const k=key(p);c[k]=(c[k]||0)+1});return[c,PL.length+'|'+fataekRoutes.length+'|'+JSON.stringify(c)]};
const tile=(a,ic,en,sub,on,dis)=>`<button class="lytile${on?' on':''}${dis?' dis':''}" ${dis?'disabled aria-disabled="true"':''} data-lya="${a}"><span class="lti2">${ico(ic,26)}</span><b>${en}</b><small>${sub}</small></button>`;
const gsw=(id,en,th)=>`<div class="lygh2"><div class="lyt2"><b>${en}</b><small>${th}</small></div><label class="sw"><input type="checkbox" data-lyg="${id}" ${gids(id).some(isOn)?'checked':''}><span class="sw-s"></span></label></div>`;
function title(){const h=SR&&SR.querySelector('h2');if(h)h.innerHTML=LYS==='more'?'More <small style="font-weight:400;color:var(--mut);font-size:13px">เพิ่มเติม</small>':'Layers <small style="font-weight:400;color:var(--mut);font-size:13px">เลเยอร์</small>'}
function render(){if(!LYV)return;title();
 const[cnt,sg]=sigOf();lastSig=sg;
 if(LYS==='main'){BD.innerHTML=`<div class="lyw"><div class="lytiles">${tile('tile:terrain','mountain','Terrain',(window.trIsOn&&window.trIsOn())?'On':'Off',!!(window.trIsOn&&window.trIsOn()),false)}${tile('tile:traffic','road','Traffic','Soon',false,true)}${tile('tile:transit','train','Transit','fataekts',isOn('tr'),false)}${tile('tile:more','more','More','Data',false,false)}</div><p class="lynote">Traffic is coming soon. · การจราจรจะมาเร็ว ๆ นี้</p></div>`;return}
 const solo=LY.solo?LY.c.find(l=>l.i===LY.solo):null;
 let h='<div class="lyw">';
 if(solo)h+=`<div class="lysolo"><span>Isolated: <b>${esc(solo.n)}</b></span><button class="lyb2 a" data-lya="unsolo">Clear</button></div>`;
 h+=gsw('main','Core Data','ข้อมูลหลัก')+['mp','lab','car','hs'].map(id=>row(id,cnt)).join('');
 h+=gsw('ft','Transit Networks','ระบบขนส่ง (fataekts)')+FTK.map(t=>row('ft:'+t,cnt)).join('');
 const adv=!!LY.fold.advOpen;
 h+=`<div class="lygh" data-lya="fold:advOpen"><span class="lyar">${ico(adv?'chev':'right',14)}</span><div class="lyt2"><b>Advanced</b><small>เลเยอร์ของฉัน · Add-ons · แชร์</small></div></div>`;
 if(adv){
  h+=`<div class="lygh2"><div class="lyt2"><b>My Layers</b><small>เลเยอร์ของฉัน</small></div><button class="lyb2 a" data-lya="new">${ico('plus',14)}New</button></div>`;
  h+=LY.c.length?LY.c.map(l=>row('u:'+l.i,cnt,`<button class="lyb2${LY.solo===l.i?' a':''}" data-lya="solo:${l.i}" title="Show only this layer">${ico('eye',14)}Only</button><button class="lyb2" data-lya="zoom:${l.i}" title="Zoom to layer" aria-label="Zoom to layer">${ico('target',14)}</button><button class="lyb2" data-lya="edit:${l.i}" title="Edit" aria-label="Edit">${ico('edit',14)}</button><button class="lyb2" data-lya="share:${l.i}" title="Share this layer" aria-label="Share">${ico('share',14)}</button><button class="lyb2" data-lya="del:${l.i}" title="Delete" aria-label="Delete">${ico('trash',14)}</button>`)).join(''):`<div class="hint" style="margin:6px 4px">No custom layers yet. Tap “New” to group places by type, keyword or manual selection.</div>`;
  h+=`<div class="lybox"><b>Add-ons · API sources</b><small>เพิ่ม URL Google Apps Script / API เพื่อดึงข้อมูลสถานที่เพิ่มเติม</small><div class="lyimp"><input id="ly-api" placeholder="Paste API / Apps Script URL" autocomplete="off"><button class="lyb2 a" data-lya="addapi">${ico('plus',14)}Add</button></div>${ADDONS.customApis.map((u,i)=>`<div class="lyapi"><span>${esc(u)}</span><button class="lyb2" data-lya="delapi:${i}" aria-label="Remove">${ico('trash',14)}</button></div>`).join('')}<a class="lyext" href="https://fataekts.wasmer.app" target="_blank" rel="noopener">${ico('ext',14)}fataekts · Official site</a></div>`;
  h+=`<div class="lysh"><b>Share current layers</b><small>แชร์เลเยอร์ปัจจุบัน — ลิงก์เก็บสถานะเปิด/ปิดและเลเยอร์ที่สร้างไว้</small><div class="act"><button data-lya="copy">${ico('copy',15)}Copy link</button><button data-lya="native">${ico('share',15)}Share</button><button data-lya="json">${ico('down',15)}.json</button></div><div class="lyimp"><input id="ly-imp" placeholder="Paste link / code / JSON to import" autocomplete="off"><button class="lyb2 a" data-lya="imp">Import</button></div></div>`}
 h+='</div>';
 const top=BD.scrollTop,a=document.activeElement,aid=a&&a.id&&BD.contains(a)?a.id:'',ss=aid?a.selectionStart:0,v=(aid==='ly-imp'||aid==='ly-api')?a.value:'';
 BD.innerHTML=h;BD.scrollTop=top;
 if(aid){const n=document.getElementById(aid);if(n){if(v)n.value=v;n.focus();try{n.setSelectionRange(ss,ss)}catch(_){}}}}
function ui(){if(lb)lb.style.display=LY.lab?'':'none';if(B){B.classList.toggle('f',active());B.classList.toggle('a',LYV)}if(SR)SR.style.display=LYV?'flex':'none';if(LYV)render()}
function openView(){LYV=true;LYS='main';FORM=null;qi.value='';SQ='';setSt(Math.max(st,1));panel();ui()}
function closeView(){LYV=false;panel();ui()}
window.lyOpen=()=>LYV?closeView():openView();
const _panel=panel;
panel=function(){if(LYV&&FORM)LYV=false;
 if(!LYV){if(SR)SR.style.display='none';if(B)B.classList.remove('a');return _panel.apply(this,arguments)}
 tabUI();$('#srow-main').style.display='none';$('#srow-addons').style.display='none';$('#srow-go').style.display='none';SR.style.display='flex';render()};
const _gp=goPage;goPage=function(p){if(p==='Add-ons'){const r=_gp.call(this,'map');openView();return r}if(LYV)closeView();return _gp.apply(this,arguments)};
const _sl=select;select=function(){if(LYV){LYV=false;ui()}return _sl.apply(this,arguments)};
const _stab=setTab;setTab=function(){if(LYV)closeView();return _stab.apply(this,arguments)};
if(B)B.onclick=e=>{e.stopPropagation();window.lyOpen()};
window.lyReopen=()=>openView();
window.lyClose=()=>{if(LYV){LYV=false;if(SR)SR.style.display='none';if(B)B.classList.remove('a')}};
const bk=$('#ly-back');if(bk)bk.onclick=()=>{if(LYV&&LYS==='more'){LYS='main';render()}else closeView()};
setInterval(()=>{if(LYV&&sigOf()[1]!==lastSig){const a=document.activeElement;if(!(a&&(a.id==='ly-imp'||a.id==='ly-api')))render()}},2500);
setTimeout(()=>{if(curPage==='Add-ons')goPage('Add-ons')},40);

function setMany(ids,on){ids.forEach(i=>setRaw(i,on));fin()}
function zoomTo(id){const l=LY.c.find(x=>x.i===id);if(!l)return;const a=PL.filter(p=>match(l,p));if(!a.length){toast('No items in this layer yet · ยังไม่มีรายการในเลเยอร์นี้');return}
 let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;a.forEach(p=>{const pts=(p.pts&&p.pts.length)?p.pts:[[p.x,p.y]];pts.forEach(q=>{x0=Math.min(x0,q[0]);y0=Math.min(y0,q[1]);x1=Math.max(x1,q[0]);y1=Math.max(y1,q[1])})});
 const w=Math.max(x1-x0,40),h=Math.max(y1-y0,40);fit({x:x0-(w-(x1-x0))/2,y:y0-(h-(y1-y0))/2,w,h},1.4)}
BD.addEventListener('change',e=>{if(!e.target.closest('.lyw'))return;const t=e.target.closest('[data-lyt]');if(t)toggle(t.dataset.lyt,t.checked);const g=e.target.closest('[data-lyg]');if(g)setMany(gids(g.dataset.lyg),g.checked)});
BD.addEventListener('input',e=>{if(e.target.id==='ly-s'){SQ=e.target.value;render()}});
function addApi(){const i=BD.querySelector('#ly-api'),val=i?i.value.trim():'';if(!val)return;if(ADDONS.customApis.includes(val)){toast('API already added · มี API นี้อยู่แล้ว');return}
 ADDONS.customApis.push(val);saveAo();render();toast('API added · เพิ่ม API เรียบร้อยแล้ว');if(ADDONS.mapPlaces&&typeof pull==='function')pull()}
BD.addEventListener('click',e=>{if(!e.target.closest('.lyw'))return;const b=e.target.closest('[data-lya]');if(!b)return;const[a,v]=b.dataset.lya.split(':');
 if(a==='tile'){if(v==='terrain'){if(window.trToggle)window.trToggle();render()}else if(v==='transit')toggle('tr',!isOn('tr'));else if(v==='more'){LYS='more';render()}}
 else if(a==='medit'){closeView();if(window.meOpen)window.meOpen()}
 else if(a==='fold'){LY.fold[v]=!LY.fold[v];lsv();render()}
 else if(a==='gset'){const ids=gids(v),on=!ids.some(isOn);setMany(ids,on)}
 else if(a==='allon')allSet(true);else if(a==='alloff')allSet(false);
 else if(a==='tool'){const t=document.getElementById(v);if(t){t.click();if(v==='ru'&&!DT.matches)setSt(0);setTimeout(render,80)}}
 else if(a==='new')openEd(null);else if(a==='edit')openEd(v);
 else if(a==='zoom')zoomTo(v);
 else if(a==='solo'){LY.solo=LY.solo===v?'':v;lsv();ui();drawPl()}
 else if(a==='unsolo'){LY.solo='';lsv();ui();drawPl()}
 else if(a==='share'){const l=window.lyLink(v);if(l.length>6000)toast('Link is very long — try exporting .json · ลิงก์ยาวมาก');shareLink(l)}
 else if(a==='del'){const l=LY.c.find(x=>x.i===v);if(l&&confirm('Delete layer "'+l.n+'"? · ลบเลเยอร์นี้?')){LY.c=LY.c.filter(x=>x.i!==v);if(LY.solo===v)LY.solo='';lsv();ui();drawPl()}}
 else if(a==='copy'){const l=link();if(l.length>6000)toast('Link is very long · ลิงก์ยาวมาก');copy(l,'Layer link copied · คัดลอกลิงก์เลเยอร์แล้ว')}
 else if(a==='native')shareLink(link());
 else if(a==='json')save('layers.json',JSON.stringify(lst(),null,1),'application/json');
 else if(a==='imp'){const i=BD.querySelector('#ly-imp');if(i&&importText(i.value))i.value=''}
 else if(a==='addapi')addApi();
 else if(a==='delapi'){ADDONS.customApis.splice(+v,1);saveAo();render();toast('API removed · ลบ API แล้ว')}});
BD.addEventListener('keydown',e=>{if(e.key!=='Enter')return;if(e.target.id==='ly-imp'){e.preventDefault();const b=BD.querySelector('[data-lya=imp]');b&&b.click()}else if(e.target.id==='ly-api'){e.preventDefault();addApi()}});
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(M&&!M.hidden)closeEd();else if(LYV){if(LYS==='more'){LYS='main';render()}else closeView()}});

/* ---------- Layer editor ---------- */
let E=null;const M=$('#lye');
const kn=p=>(ALLK.find(a=>a[0]===key(p))||[0,'','','Other'])[3];
function cnt(){const n=PL.filter(p=>match(E,p)).length;$('#lye-cnt').textContent=PL.length?'Matches '+n+' items right now · ตรงกับ '+n+' รายการ':'No place data loaded yet — enable Map Places first · ยังไม่มีข้อมูลสถานที่'}
function pick(){const q=($('#lye-s').value||'').trim().toLowerCase(),a=PL.filter(p=>!q||txt(p).includes(q)).slice(0,60);
 $('#lye-pl').innerHTML=a.length?a.map(p=>`<label class="lyp1"><input type="checkbox" data-d="${esc(p.id)}" ${E.d.includes(p.id)?'checked':''}><span>${esc(p.name||'(untitled)')}</span><small>${esc(kn(p))}</small></label>`).join(''):'<div class="hint">No items found · ไม่พบรายการ</div>';
 $('#lye-dn').textContent='· '+E.d.length+' selected'}
function openEd(id){const src=id&&LY.c.find(l=>l.i===id);E=src?JSON.parse(JSON.stringify(src)):cl({i:'l'+Date.now().toString(36),n:'',e:'pin',col:'#e8590c',rc:0,k:[],q:'',d:[],on:1});E._new=!src;
 M.hidden=false;
 M.innerHTML=`<div class="fl"><div class="smh"><h2>${E._new?'New layer · สร้างเลเยอร์ใหม่':'Edit layer · แก้ไขเลเยอร์'}</h2><button class="lyb2" id="lye-x" aria-label="Close">${ico('x',16)}</button></div><div class="fm" style="margin:10px 0 6px">
 <label>Layer name · ชื่อเลเยอร์<input id="lye-n" maxlength="40" value="${esc(E._new?'':E.n)}" placeholder="e.g. Recommended restaurants"></label>
 <div class="lyt">Icon · ไอคอน</div><div class="lyic">${LIC.map(k=>`<label class="lyi"><input type="radio" name="lye-ic" value="${k}" ${E.e===k?'checked':''}>${ico(k,18)}</label>`).join('')}</div>
 <label class="lyrc"><input type="checkbox" id="lye-rc" ${E.rc?'checked':''}><span>Recolor items · ทับสีรายการด้วยสีนี้</span><input type="color" id="lye-c" value="${/^#[0-9a-f]{6}$/i.test(E.col)?E.col:'#e8590c'}"></label>
 <div class="lyt">Include types · ประเภทที่รวมเข้ามา <small>(none selected = any type)</small></div>
 <div class="lych">${ALLK.map(a=>`<label class="lyc"><input type="checkbox" data-k="${a[0]}" ${E.k.includes(a[0])?'checked':''}>${ico(a[1],14)}${esc(a[3])}</label>`).join('')}</div>
 <label>Keyword in name / notes · คำค้น<input id="lye-q" value="${esc(E.q)}" placeholder="e.g. noodle"></label>
 <div class="lyt">Pick items manually · เลือกรายการเอง <small id="lye-dn"></small></div><input id="lye-s" placeholder="Search items to pick…" autocomplete="off"><div id="lye-pl"></div>
 <div class="hint" id="lye-cnt"></div></div>
 <div class="act"><button id="lye-ok">Save · บันทึก</button><button id="lye-cancel">Cancel · ยกเลิก</button></div></div>`;
 pick();cnt();setTimeout(()=>{const n=$('#lye-n');n&&n.focus()},50)}
function closeEd(){M.hidden=true;M.innerHTML='';E=null}
if(M){
 M.addEventListener('input',e=>{if(!E)return;const t=e.target;
  if(t.id==='lye-n')E.n=t.value;else if(t.id==='lye-q'){E.q=t.value;cnt()}
  else if(t.id==='lye-c'){E.col=t.value;const r=$('#lye-rc');if(r)r.checked=true;E.rc=1}
  else if(t.id==='lye-s')pick()});
 M.addEventListener('change',e=>{if(!E)return;const t=e.target;
  if(t.id==='lye-rc')E.rc=t.checked?1:0;
  else if(t.name==='lye-ic')E.e=t.value;
  else if(t.dataset.k){const k=t.dataset.k;E.k=t.checked?E.k.concat(k):E.k.filter(x=>x!==k);cnt()}
  else if(t.dataset.d){const d=t.dataset.d;E.d=t.checked?E.d.concat(d):E.d.filter(x=>x!==d);$('#lye-dn').textContent='· '+E.d.length+' selected';cnt()}});
 M.addEventListener('click',e=>{const t=e.target;
  if(t===M||t.closest('#lye-x')||t.id==='lye-cancel')closeEd();
  else if(t.id==='lye-ok'){if(!(E.n||'').trim()){toast('Enter a layer name · ตั้งชื่อเลเยอร์ก่อน');return}
   if(!E.k.length&&!(E.q||'').trim()&&!E.d.length){toast('Choose a type, keyword or items · เลือกประเภท คำค้น หรือรายการ');return}
   const o=cl(E),j=LY.c.findIndex(l=>l.i===o.i);if(j>=0)LY.c[j]=o;else LY.c.push(o);
   lsv();closeEd();ui();drawPl();toast('Layer saved · บันทึกเลเยอร์ "'+o.n+'" แล้ว')}})}

/* ---------- Share-sheet row ---------- */
const SM=$('#sm');if(SM)SM.addEventListener('click',e=>{const b=e.target.closest('[data-sa]');if(!b)return;const a=b.dataset.sa;
 if(a==='lyc')copy(link(),'Layer link copied · คัดลอกลิงก์เลเยอร์แล้ว');else if(a==='lyn')shareLink(link())});

/* ---------- Mobile: search bar on top, Navigate button ---------- */
const TB=document.createElement('div');TB.id='topbar';document.body.appendChild(TB);
const MAIN=$('#srow-main'),HD=$('#hd');
function place(){if(!MAIN||!HD)return;if(DT.matches){if(MAIN.parentNode!==HD)HD.insertBefore(MAIN,HD.children[1]||null)}else if(MAIN.parentNode!==TB)TB.appendChild(MAIN);
 try{geo();setSt(typeof st==='number'?st:0,1)}catch(_){}}
if(DT.addEventListener)DT.addEventListener('change',place);else DT.addListener(place);
place();
const _ss=setSt;setSt=function(s){document.body.classList.toggle('shfull',!DT.matches&&s===2);return _ss.apply(this,arguments)};
const NF=$('#navfab');if(NF)NF.onclick=()=>goPage('go');

ui();
})();

/* ================= Name-change notice ================= */
(function(){
const RN=[{id:'rn-20327-v1',zip:'20327',from:'สลัมคลองเจ๋ง',to:'อำเภอเมือง'}];
const KEY='rn_seen';
const seen=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(_){return[]}};
function show(){const s=seen(),todo=RN.filter(r=>!s.includes(r.id));if(!todo.length||document.getElementById('rnn'))return;
 const d=document.createElement('div');d.id='rnn';d.className='fl';d.setAttribute('role','alert');
 d.innerHTML=`<div class="rni">${window.lyIco('info',22)}</div><div class="rnb"><b>Name change notice · แจ้งการเปลี่ยนชื่อ</b>${todo.map(r=>`<p>Postal code <b>${r.zip}</b> has been renamed from “${esc(r.from)}” to “<b>${esc(r.to)}</b>”.<small>รหัสไปรษณีย์ ${r.zip} เปลี่ยนชื่อจาก “${esc(r.from)}” เป็น “${esc(r.to)}”</small></p>`).join('')}<button id="rnok">Acknowledge · รับทราบ</button></div>`;
 document.body.appendChild(d);
 document.getElementById('rnok').onclick=()=>{try{localStorage.setItem(KEY,JSON.stringify(seen().concat(todo.map(r=>r.id))))}catch(_){}d.remove()}}
setTimeout(show,900);
})();
