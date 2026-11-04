// ===== Add-ons: CarFMRFT + houses (แสดงบนแผนที่หลัก) + ลิงก์ /Add-ons?++-- =====
(function(){
'use strict';
const CARS_API='https://script.google.com/macros/s/AKfycbw-tX4HIUOXX9BdlrIpYRQ_6V-v9k3pLlFtC79dhCwlT5hdD6v-GJNhsPjGcDI7tNpRlg/exec';
const HAPI='https://script.google.com/macros/s/AKfycbwdcWq3N2XFV6j_7Sl_5P_S0G0gwb6D7i2ajzVZTw3LzlQrpMENsVy6CtbfESGy54I6LQ/exec';
const CAR_IMG='assets/img-756387cd.png';
const CAR_TS=20,CAR_MD={pp:'ไป-กลับ',lp:'วนซ้ำ',on:'ไปครั้งเดียวแล้วจอด'};
const VEH='🚗 🚕 🚙 🚌 🚎 🏎️ 🚓 🚑 🚒 🚐 🛻 🚚 🚛 🚜 🏍️ 🛵 🛺 🚲 🛴 🛹 🛼 🦼 🦽 🚖 🚍 🚘 🚔 🚋 🚃 🚂 🚄 🚅 🚆 🚇 🚈 🚉 🚊 🚝 🚞 🚟 🚠 🚡 🚁 ✈️ 🛩️ 🚀 🛸 ⛵ 🛶 🚤 🛥️ ⛴️ 🛳️ 🚢 🛞 🚧'.split(' ');
const E=s=>esc(s==null?'':s),num=(v,d)=>{v=+v;return isFinite(v)?v:d};
const lsGet=k=>{try{return JSON.parse(localStorage.getItem(k)||'null')}catch(_){return null}},lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(_){}};

/* ================= รหัสลิงก์ Add-ons : ลำดับ Map Places, fataekts, CarFMRFT, houses ================= */
const AO_KEYS=['mapPlaces','fataekts','carFMRFT','houses'],AO_DEF='+---';
const aoCode=()=>AO_KEYS.map(k=>ADDONS[k]?'+':'-').join('');
function aoRoot(){if(/^https?:$/.test(location.protocol)&&!/^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname))return location.origin+location.pathname.replace(/\/((cars|houses)\/edit|map|edit|zip|Add-ons|cars|houses|go)\/?$/i,'/');return baseUrl()}
function aoUrl(){const c=aoCode();return PATHMODE?aoRoot()+'Add-ons'+(c===AO_DEF?'':'?'+c):aoRoot()+'#/Add-ons'+(c===AO_DEF?'':'?'+c)}
function aoSync(){const a=document.getElementById('ao-link');if(a)a.textContent=aoUrl();
 if(curPage==='Add-ons'){try{const c=aoCode();history.replaceState(null,'',PATHMODE?location.pathname+(c===AO_DEF?'':'?'+c):location.pathname+location.search+'#/Add-ons'+(c===AO_DEF?'':'?'+c))}catch(_){}}capsuleSync()}
function aoSet(k,on){on=!!on;if(!!ADDONS[k]===on)return;ADDONS[k]=on;
 if(k==='mapPlaces'){if(!on){PL=[];drawPl()}else pull()}
 else if(k==='fataekts'){if(on){ftTxt='';pullFataekRoutes(true)}else{fataekRoutes=[];ftTxt='';drawPl()}}
 else if(k==='carFMRFT'){on?cStart():cStop()}
 else if(k==='houses'){on?hStart():hStop()}}
window.aoApplyUrl=function(){
 let q='';if(location.search.length>1&&!/[?&]edit\b/.test(location.search))q=location.search.slice(1);else{const h=location.hash||'',i=h.indexOf('?');if(i>=0)q=h.slice(i+1)}
 try{q=decodeURIComponent(q)}catch(_){}q=q.replace(/\s/g,'+');const m=q.match(/^[+\-]{1,4}/);if(!m)return;
 const c=m[0];AO_KEYS.forEach((k,i)=>{if(c[i]==='+'||c[i]==='-')aoSet(k,c[i]==='+')});saveAo();capsuleSync()};
function capsuleSync(){[['lgcar','carFMRFT','CarFMRFT · รถของมูลนิธิ'],['lghome','houses','houses · บ้านทั้งหมด']].forEach(([id,k,t])=>{const e=document.getElementById(id);if(!e)return;e.classList.toggle('xoff',!ADDONS[k]);e.classList.toggle('xon',!!ADDONS[k]);e.title=t+(ADDONS[k]?' (เปิดอยู่ — แตะเพื่อปิด)':' (ปิดอยู่ — แตะเพื่อเปิด)')})}
function toggleAddon(k,label){aoSet(k,!ADDONS[k]);saveAo();aoSync();toast((ADDONS[k]?'เปิด ':'ปิด ')+label+' บนแผนที่');if(curPage==='Add-ons')panel()}
document.addEventListener('click',e=>{
 const t=e.target.closest&&e.target.closest('#lgcar,#lghome,#ec-car,#ec-home');if(!t)return;e.preventDefault();e.stopPropagation();
 if(t.id==='lgcar')toggleAddon('carFMRFT','รถของมูลนิธิ');else if(t.id==='lghome')toggleAddon('houses','บ้านทั้งหมด');
 else{document.getElementById('ec').hidden=true;xEditStart(t.id==='ec-car'?'cars':'houses')}},true);
document.addEventListener('change',e=>{const t=e.target;if(!t||!t.id)return;
 if(t.id==='sw-car'){aoSet('carFMRFT',t.checked);saveAo();aoSync()}
 else if(t.id==='sw-hs'){aoSet('houses',t.checked);saveAo();aoSync()}
 else if(t.id==='sw-mp'||t.id==='sw-fts'){setTimeout(aoSync,0)}});
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#ao-copy,#ao-share');if(!t)return;
 if(t.id==='ao-copy')copy(aoUrl(),'คัดลอกลิงก์ Add-ons แล้ว');else shareLink(aoUrl())});

/* ================= รถของมูลนิธิ (CarFMRFT) ================= */
const CR={items:[],rev:0,skew:0,roads:new Map(),els:[],raf:0,tm:0,busy:0,follow:null,place:false,sig:''};
const cached=lsGet('cr_c');if(cached&&Array.isArray(cached.items)){CR.rev=0;CR._boot=cached.items}
const carNow=()=>Date.now()+CR.skew;
function cnorm(r){const o=unwire(r);o.sp=num(o.sp,60);o.t0=num(o.t0,0);o.md=o.md||'pp';o.rid=o.rid||'';o.pp=(o.pp===''||o.pp==null)?null:+o.pp;o.ic=o.ic||'';return o}
async function cpost(b){return(await fetch(CARS_API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(b)})).json()}
function cingest(rev,list){CR.rev=rev;const its=(list||[]).map(cnorm);CR.items=its.filter(p=>p.kind==='car');CR.roads=new Map(its.filter(p=>p.kind==='road'&&p.pts&&p.pts.length>1).map(r=>[r.id,r]));
 lsSet('cr_c',{items:list});cBuild();if(carPanelOn())panel()}
const carPanelOn=()=>!!(CV||(XE&&XE.k==='cars'));
let MR=null,MRsig='';
function mainRoad(id){const sg=PL.length+':'+(typeof lastChg!=='undefined'?lastChg:0);if(!MR||MRsig!==sg){MRsig=sg;MR=new Map(PL.filter(p=>p.kind==='road'&&p.pts&&p.pts.length>1).map(r=>[r.id,r]))}return MR.get(id)}
const roadOf=c=>c.rid?(CR.roads.get(c.rid)||mainRoad(c.rid)||null):null;
const allRoads=()=>{const m=new Map();PL.forEach(p=>{if(p.kind==='road'&&p.pts&&p.pts.length>1)m.set(p.id,p)});CR.roads.forEach((v,k)=>m.set(k,v));return[...m.values()]};
const pathCache=new Map();
function pathOf(r){const k=JSON.stringify(r.pts)+(r.curve?1:0);let o=pathCache.get(r.id);if(!o||o.k!==k){const el=document.createElementNS(NS,'path');el.setAttribute('d',pathC(r.pts,r.curve));o={k,el,L:el.getTotalLength()};pathCache.set(r.id,o)}return o}
const carV=c=>(+c.sp||0)/KM/3600*CAR_TS;
function carPos(c){const r=roadOf(c);if(!r)return{x:c.x,y:c.y,f:0,mv:0};const o=pathOf(r),L=o.L;if(!L)return{x:c.x,y:c.y,f:0,mv:0};const v=carV(c),ps=c.pp!=null&&c.pp!=='';let d=0,mv=0;
 if(ps)d=Math.min(1,Math.max(0,+c.pp))*L;else if(v>0){const t=Math.max(0,(carNow()-c.t0)/1000*v);if(c.md==='lp')d=t%L;else if(c.md==='on'){d=Math.min(t,L);mv=t<L?1:0}else{const m=t%(2*L);d=m<=L?m:2*L-m}if(c.md!=='on')mv=1}
 const p=o.el.getPointAtLength(Math.min(L,Math.max(0,d)));return{x:+p.x.toFixed(2),y:+p.y.toFixed(2),f:d/L,mv}}
const carRoute=c=>{const r=roadOf(c);return r?(r.name||'ถนนไม่มีชื่อ'):'จอดอยู่กับที่'};
const carStat=c=>{if(!roadOf(c))return'จอดอยู่';const q=carPos(c);return(q.mv?'กำลังเดินทาง':'หยุด')+' · '+Math.round(q.f*100)+'% · '+c.sp+' กม./ชม.'};
function carAnchor(it,f,paused){const r=roadOf(it);if(!r){it.pp=null;return}const L=pathOf(r).L,v=carV(it);if(paused||v<=0||!L){it.pp=f}else{it.pp=null;it.t0=carNow()-f*L/v*1000}}
function nearOn(r,x,y){const o=pathOf(r),L=o.L,n=Math.min(500,Math.max(30,Math.ceil(L/5)));let b=1e9,bd=0;for(let i=0;i<=n;i++){const d=L*i/n,p=o.el.getPointAtLength(d),h=Math.hypot(p.x-x,p.y-y);if(h<b){b=h;bd=d}}return{h:b,d:bd,L}}
const cwire=it=>({id:it.id,kind:'car',name:it.name,note:it.note||'',x:it.x,y:it.y,pts:[],meta:{grp:'',nt:'',curve:false,lvl:'local',cat:'other',sub:'general',rt:'local',color:it.color||'',size:it.size||1,rid:it.rid||'',sp:it.sp,md:it.md||'pp',t0:it.t0||0,pp:it.pp==null?'':it.pp,ic:it.ic||''}});
const carIcon=(c,sm)=>c.ic?`<span class="xi${sm?' sm':''}">${E(c.ic)}</span>`:`<span class="xi${sm?' sm':''}"><img src="${CAR_IMG}" alt=""></span>`;
function cLayer(){let g=document.getElementById('cr');if(!g){svg.insertAdjacentHTML('beforeend','<g id="cr"></g>');g=document.getElementById('cr')}return g}
function cBuild(){const g=cLayer();if(!ADDONS.carFMRFT||!CR.items.length){g.innerHTML='';CR.els=[];return}const R=26;
 g.innerHTML='<defs><clipPath id="ccl"><circle r="'+R+'"/></clipPath></defs>'+CR.items.map(c=>{const col=c.color||'#2f8a3b',inner=c.ic?`<circle r="${R}" fill="#fff"/>${window.emjG(c.ic,0,2,R*1.2,"#17301b")||`<text y="2" text-anchor="middle" dominant-baseline="central" font-size="${R*1.25}">${E(c.ic)}</text>`}`:`<g clip-path="url(#ccl)"><circle r="${R}" fill="#fff"/><image href="${CAR_IMG}" x="${-R*1.05}" y="${-R*1.05}" width="${R*2.1}" height="${R*2.1}"/></g>`;
  return `<g class="xcar" data-id="${E(c.id)}" style="cursor:pointer"><g transform="scale(${c.size||1})"><circle r="${R+5}" fill="${col}" opacity=".28"/><circle r="${R+1.5}" fill="${col}"/>${inner}<circle class="cdot" cx="${R*.74}" cy="${-R*.74}" r="5.5" fill="#9aa7c7" stroke="#fff" stroke-width="2"/><text y="${R+17}" text-anchor="middle" font-size="12" font-weight="700" fill="#17301b" stroke="#fff" stroke-width="3" paint-order="stroke">${E(c.name)}</text></g></g>`}).join('');
 CR.els=[...g.querySelectorAll('.xcar')].map((el,i)=>({el,c:CR.items[i],dot:el.querySelector('.cdot')}));if(!CR.raf)CR.raf=requestAnimationFrame(cTick)}
function cTick(){CR.raf=0;if(!ADDONS.carFMRFT||!CR.els.length)return;const k=1/sc();let fp=null;
 CR.els.forEach(o=>{const q=carPos(o.c);o.el.setAttribute('transform',`translate(${q.x} ${q.y}) scale(${k})`);if(o.dot)o.dot.setAttribute('fill',q.mv?'#4f86f7':'#9aa7c7');if(CR.follow&&CR.follow===o.c.id)fp=q});
 if(fp){const r=R0(),k2=vb.w/r.width,ins=DT.matches?0:Math.min(vis(st),r.height*.55),ox=DT.matches&&st?186*k2:0,tx=fp.x-ox,ty=fp.y+ins/2*k2,cx=vb.x+vb.w/2,cy=vb.y+vb.h/2;if(Math.abs(tx-cx)+Math.abs(ty-cy)>.01){vb.x+=(tx-cx)*.14;vb.y+=(ty-cy)*.14;upd()}}
 const e=document.getElementById('xcprog');if(e&&CV){const c=CR.items.find(a=>a.id===CV.id);if(c)e.textContent=carStat(c)}
 CR.raf=requestAnimationFrame(cTick)}
async function cPull(){if(!ADDONS.carFMRFT||CR.busy||document.hidden)return;CR.busy=1;try{const j=await(await fetch(CARS_API+'?action=list&rev='+CR.rev,{cache:'no-store'})).json();if(j&&j.ok){apiOk('CarFMRFT');if(j.now)CR.skew=j.now-Date.now();if(!j.same)cingest(j.rev,j.items)}else apiFail('CarFMRFT',false)}catch(_){apiFail('CarFMRFT',false)}CR.busy=0}
function cStart(){if(CR.tm)return;if(CR._boot&&!CR.items.length){cingest(0,CR._boot);CR._boot=null}cPull();CR.tm=setInterval(cPull,3000)}
function cStop(){clearInterval(CR.tm);CR.tm=0;CR.follow=null;CV=null;cBuild();const g=document.getElementById('cr');if(g)g.innerHTML='';if(curPage!=='Add-ons')panel()}

/* ---------- การ์ดรถ / ฟอร์มแก้ไขรถ ---------- */
let CV=null,XE=null;
function carOpen(id,edit){const c=CR.items.find(a=>a.id===id);if(!c)return;HV=null;HF=null;FORM=null;CV={id,isNew:false,p:{...c,paused:c.pp!=null&&c.pp!==''},edit:!!edit&&!!(XE&&XE.auth)};
 if(!DT.matches)setSt(Math.max(st,1));const q=carPos(c);fit({x:q.x-30,y:q.y-30,w:60,h:60},1.2);panel()}
function csync(){if(!CV||!CV.edit)return;const p=CV.p,g=id=>{const e=document.getElementById(id);return e?e.value:undefined};
 const v={name:g('xfn'),note:g('xfnote'),rid:g('xfr'),md:g('xfmd'),color:g('xfc')};for(const k in v)if(v[k]!==undefined)p[k]=v[k];
 const sp=g('xfsp');if(sp!==undefined)p.sp=+sp;const z=g('xfsz');if(z)p.size=z/100;const pa=document.getElementById('xfpa');if(pa)p.paused=pa.checked}
function carHtml(){const p=CV.p,ed=CV.edit,bk=`<div style="padding:0 4px"><span class="bk" data-x="${XE&&XE.k==='cars'?'cback':'close'}">${I.back}กลับ</span></div>`,fol=CR.follow===p.id,sp=p.sp==null?60:p.sp,md=p.md||'pp';
 const head=`<div class="xbrand">${carIcon(p)}<div><b>${E(p.name||'รถใหม่')}</b><small id="xcprog">${!CV.isNew?carStat(p):'รถใหม่'}</small></div></div>`;
 if(!ed)return bk+head+`<div class="chips"><span>🛣️ ${E(carRoute(p))}</span><span>⚡ ${sp} กม./ชม.</span><span>${CAR_MD[md]||''}</span></div>${p.note?`<p style="margin:0 6px 10px;color:var(--mut)">${E(p.note)}</p>`:''}<div class="act"><button data-x="follow">${fol?'หยุดติดตาม':'ติดตามรถ'}</button>${XE&&XE.k==='cars'&&XE.auth?'<button data-x="cedit">แก้ไข</button>':''}</div>`;
 const roads=allRoads().sort((a,b)=>(a.name||'').localeCompare(b.name||'','th')),dz=Math.round((p.size||1)*100),pz=p.paused!==undefined?p.paused:(p.pp!=null&&p.pp!=='');
 return bk+head+`<div class="fm"><label>ชื่อรถ<input id="xfn" value="${E(p.name)}" placeholder="เช่น รถมูลนิธิคันที่ 1"></label>
<label>เส้นทาง (ถนน)<select id="xfr">${opt([['','— จอดอยู่กับที่ —'],...roads.map(a=>[a.id,(a.name||'ถนนไม่มีชื่อ')+' · '+((RT[a.rt]||RT.local).n)])],p.rid||'')}</select></label>
<label>ความเร็ว <b id="xfspv">${sp} กม./ชม.</b><input id="xfsp" type="range" min="0" max="240" step="5" value="${sp}"></label>
<label>รูปแบบการวิ่ง<select id="xfmd">${opt(Object.entries(CAR_MD),md)}</select></label>
<label style="flex-direction:row;align-items:center;gap:8px"><input id="xfpa" type="checkbox" style="width:auto"${pz?' checked':''}> หยุดรถชั่วคราว</label>
<label>ขนาดไอคอน <b id="xfszv">${dz}%</b><input id="xfsz" type="range" min="50" max="250" step="10" value="${dz}"></label>
<label>สีวงแหวน<input id="xfc" type="color" value="${E(p.color||'#2f8a3b')}"></label>
<div class="xeh"><b>ไอคอนรถ</b><small>เลือกอิโมจิรถแทนรูปมูลนิธิได้ (${VEH.length} แบบ)</small></div>
<div class="xcur">${carIcon(p)}<button class="xmini" data-x="cclr">${p.ic?'ใช้รูปมูลนิธิ':'กำลังใช้รูปมูลนิธิ'}</button></div>
<div class="xeg">${VEH.map(e=>`<button type="button" data-x="cic" data-v="${e}" class="${p.ic===e?'on':''}">${e}</button>`).join('')}</div>
<label>อิโมจิอื่น / อักษร 1–2 ตัว<input id="xfic" value="${E(p.ic||'')}" maxlength="8" placeholder="พิมพ์หรือวางอิโมจิ"></label>
<label>หมายเหตุ<textarea id="xfnote" rows="2">${E(p.note)}</textarea></label></div>
<div class="act"><button data-x="cplace">📍 ย้ายรถ (แตะแผนที่)</button></div>
<div class="act"><button data-x="csave">บันทึก</button>${CV.isNew?'':'<button data-x="follow">'+(fol?'หยุดติดตาม':'ติดตามรถ')+'</button><button data-x="cdel" style="color:#e03131">ลบ</button>'}</div>`}
const icClip2=s=>{s=String(s||'').trim();try{return Array.from(new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(s),x=>x.segment).slice(0,2).join('')}catch(_){return Array.from(s).slice(0,2).join('')}};
async function carSave(){csync();const p=CV.p;if(!(p.name||'').trim())return toast('ใส่ชื่อรถก่อน');
 const old=CR.items.find(a=>a.id===p.id)||null,it={id:p.id||'c'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),kind:'car',nt:'',name:p.name.trim(),note:(p.note||'').trim(),x:p.x,y:p.y,pts:[],curve:false,lvl:'local',cat:'other',sub:'general',rt:'local',grp:'',color:p.color||'',size:p.size||1,rid:p.rid||'',sp:+p.sp||0,md:p.md||'pp',t0:carNow(),pp:null,ic:p.ic||''};
 const f=old&&old.rid===it.rid?carPos(old).f:0;carAnchor(it,f,!!p.paused);const q=carPos(it);it.x=q.x;it.y=q.y;
 try{const j=await cpost({action:'upsert',pw:XE.pw,item:cwire(it)});if(j.ok){cingest(j.rev,j.items);CV=null;apiSave('บันทึก',it,'CarFMRFT',true);panel()}else apiSave('บันทึก',it,'CarFMRFT',false,j.err||'ไม่สำเร็จ')}catch(_){apiSave('บันทึก',it,'CarFMRFT',false,'เชื่อมต่อไม่ได้')}}
async function carDel(){if(!CV||CV.isNew||!confirm('ลบรถ '+CV.p.name+' ?'))return;try{const j=await cpost({action:'delete',pw:XE.pw,item:{id:CV.p.id}});if(j.ok){cingest(j.rev,j.items);apiSave('ลบ',CV.p,'CarFMRFT',true);CV=null;panel()}else apiSave('ลบ',CV.p,'CarFMRFT',false,j.err||'ไม่สำเร็จ')}catch(_){apiSave('ลบ',CV.p,'CarFMRFT',false,'เชื่อมต่อไม่ได้')}}
function carNew(){const c=wpos(innerWidth/2,innerHeight/2);CV={id:'',isNew:true,edit:true,p:{id:'',name:'',note:'',x:c[0],y:c[1],rid:'',sp:60,md:'pp',size:1,color:'#2f8a3b',ic:'',paused:true,pp:null}};panel()}
function carMoveTo(x,y){if(!CV)return;const p=CV.p;let best=null;allRoads().forEach(r=>{const n=nearOn(r,x,y);if(!best||n.h<best.h)best={...n,r}});
 const cur=roadOf(p),ps=!!p.paused;
 if(best&&best.h*sc()<26){p.rid=best.r.id;CR.roads.has(best.r.id)||CR.roads.set(best.r.id,best.r);const q=carPos({...p,pp:best.d/best.L});p.x=q.x;p.y=q.y;carAnchor(p,best.d/best.L,ps)}
 else if(cur){const n=nearOn(cur,x,y);carAnchor(p,n.d/n.L,ps)}else{p.x=x;p.y=y}
 toast('ย้ายรถแล้ว — กด “บันทึก” เพื่อยืนยัน');panel()}

/* ================= บ้านทั้งหมด (houses) ================= */
const HC={'ใช้งาน':'#2f8a3b','ยกเลิก':'#c0392b','รอตรวจสอบ':'#e6a100'};
const HTYPES=['บ้านเดี่ยว','บ้านแฝด','ทาวน์เฮาส์','อาคารชุด','อาคารอื่น'],HSTAT=['ใช้งาน','ยกเลิก','รอตรวจสอบ'],HVER=['ตรวจสอบแล้ว','รอตรวจสอบ','พบข้อผิดพลาด'];
const PIN_D='M0 0C-5-8-9-11-9-17a9 9 0 1 1 18 0c0 6-4 9-9 17z';
const HS={items:[],tm:0,busy:0,q:'',stat:''};let HV=null,HF=null,HPK=null,hq=0;
function hnorm(h){h.X=+h.X;h.Y=+h.Y;h.Floors=+h.Floors||0;h.Members=+h.Members||0;h.RegYear=(h.RegYear===''||h.RegYear==null)?'':+h.RegYear;h.HasOwner=String(h.HasOwner)==='1'||h.HasOwner===true;h.Postal=String(h.Postal||'');
 if(typeof h.Polygon==='string'){try{h.Polygon=h.Polygon?JSON.parse(h.Polygon):null}catch(_){h.Polygon=null}}
 const z=Z[h.Postal];if(z&&z[1]!=null){h.i=z[0];h.j=z[1];h.Province=DATA[h.i].provName;h.Amphoe=DATA[h.i].entries[h.j].name;h.Region=REG[DATA[h.i].district-1].n}else{h.i=h.j=undefined}return h}
const hcache=lsGet('hs_c');if(Array.isArray(hcache))HS._boot=hcache;
function hIngest(list){HS.items=list.map(x=>hnorm({...x}));lsSet('hs_c',list);hDraw();if(housePanelOn())panel()}
const housePanelOn=()=>!!(HV||HF||(XE&&XE.k==='houses'));
async function hLoad(){if(!ADDONS.houses||HS.busy)return;HS.busy=1;try{const r=await(await fetch(HAPI+'?action=list',{cache:'no-store'})).json();if(r&&r.ok&&Array.isArray(r.data)){apiOk('houses');const t=JSON.stringify(r.data);if(t!==HS.sig){HS.sig=t;if(!(HF||HPK))hIngest(r.data)}}else apiFail('houses',false)}catch(_){apiFail('houses',false)}HS.busy=0}
function hStart(){if(HS.tm)return;if(HS._boot&&!HS.items.length){hIngest(HS._boot);HS._boot=null}hLoad();HS.tm=setInterval(()=>{if(!document.hidden)hLoad()},15000)}
function hStop(){clearInterval(HS.tm);HS.tm=0;HV=null;HF=null;if(HPK)endPick();hDraw();if(curPage!=='Add-ons')panel()}
function hLayer(){let g=document.getElementById('hh');if(!g){svg.insertAdjacentHTML('beforeend','<g id="hh"></g>');g=document.getElementById('hh')}return g}
function hDraw(){const g=hLayer();if(!ADDONS.houses){g.innerHTML='';return}const s=sc();let o='',p='';
 HS.items.forEach(h=>{if(!isFinite(h.X+h.Y))return;const c=HC[h.Status]||'#777',on=HV&&HV.id===h.HouseID;
  if(Array.isArray(h.Polygon)&&h.Polygon.length>2)o+=`<polygon class="xhs xhp${on?' on':''}" data-hs="${E(h.HouseID)}" points="${h.Polygon.map(q=>q.join(',')).join(' ')}" fill="${c}" stroke="${c}"/>`;
  p+=`<g class="xhs" data-hs="${E(h.HouseID)}" style="cursor:pointer" transform="translate(${h.X} ${h.Y}) scale(${(on?1.35:1)/s})"><path d="${PIN_D}" fill="${c}" stroke="#fff" stroke-width="1.5"/><circle cy="-17" r="3.5" fill="#fff"/></g>`});
 if(HPK&&HPK.pts.length)o+=`<polyline points="${HPK.pts.map(q=>q.join(',')).join(' ')}" fill="#e8590c" fill-opacity=".18" stroke="#e8590c" stroke-width="2" vector-effect="non-scaling-stroke"/>`+HPK.pts.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="${4/s}" fill="#fff" stroke="#e8590c" stroke-width="${2/s}"/>`).join('');
 g.innerHTML=o+p}
window.xScale=function(){if(!hq&&ADDONS.houses){hq=1;requestAnimationFrame(()=>{hq=0;hDraw()})}};
const hsBox=rows=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;rows.forEach(h=>{[[h.X,h.Y],...(h.Polygon||[])].forEach(p=>{x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])})});const w=Math.max(x1-x0,40),hh=Math.max(y1-y0,40);return{x:(x0+x1)/2-w/2,y:(y0+y1)/2-hh/2,w,h:hh}};
function houseOpen(id,zoom){const h=HS.items.find(x=>x.HouseID===id);if(!h)return;HV={id};HF=null;CV=null;FORM=null;qi.value='';if(zoom){setSt(Math.max(st,1));fit(hsBox([h]),h.Polygon?1.8:1)}hDraw();panel();const b=document.getElementById('body');if(b)b.scrollTop=0}
const hText=h=>[h.HouseID,h.HouseNo,h.DeedNo,h.Road,h.Soi,h.Tambon,h.Postal,h.Amphoe,h.Province].join(' ').toLowerCase();
const houseRow=h=>`<div class="it" data-x="hrow" data-v="${E(h.HouseID)}"><span style="font-size:18px;width:20px;text-align:center">🏠</span><div class="t"><b>${E(h.HouseNo)} ${E(h.Road||h.Soi||'')}</b><small>${E(h.HouseID)} · ${E(h.Amphoe||'-')} · ${E(h.Province||'-')}</small></div><em>${E(h.Postal)}</em></div>`;
function houseDetailHtml(){const h=HS.items.find(x=>x.HouseID===HV.id);if(!h){HV=null;return''}
 const kv=a=>`<dl class="kv">${a.map(([k,v])=>`<dt>${k}</dt><dd>${E(v===''||v==null?'-':v)}</dd>`).join('')}</dl>`,c=HC[h.Status]||'#777',ed=XE&&XE.k==='houses';
 return `<div style="padding:0 4px"><span class="bk" data-x="${ed?'hlist':'close'}">${I.back}กลับ</span></div><h2>รหัสบ้าน ${E(h.HouseID)}</h2>
<div class="chips"><span style="background:${c};color:#fff">${E(h.Status)}</span><span>${E(h.HouseType)}</span><span>${h.Floors} ชั้น</span><span>${h.Members} คน</span></div>
<div class="act"><button data-x="hcpid">${I.cp}คัดลอกรหัส</button><button data-x="hcpxy">${I.pin}คัดลอกพิกัด</button>${ed?'<button data-x="hedit">แก้ไขข้อมูล</button>':''}</div>
<h3>ที่ตั้ง</h3>${kv([['รหัสบ้าน (HouseID)',h.HouseID],['บ้านเลขที่',h.HouseNo],['หมู่',h.Moo],['ซอย',h.Soi],['ถนน',h.Road],['ตำบล',h.Tambon],['เขต',h.Amphoe],['จังหวัด',h.Province],['รหัสไปรษณีย์',h.Postal],['เลขโฉนด',h.DeedNo],['พิกัด','X '+h.X+', Y '+h.Y]])}
<h3>ข้อมูลทะเบียน</h3>${kv([['ประเภทบ้าน',h.HouseType],['จำนวนชั้น',h.Floors],['จำนวนสมาชิก',h.Members],['เจ้าบ้าน',h.HasOwner?'มีเจ้าบ้านแล้ว':'ยังไม่มีเจ้าบ้าน'],['วันที่จดทะเบียน',h.RegDate],['ปีที่ขึ้นทะเบียน (ฝ.ต.)',h.RegYear],['แก้ไขล่าสุด',String(h.UpdatedAt||'').slice(0,16)],['สถานะบ้าน',h.Status],['สถานะการตรวจสอบ',h.VerifyStatus]])}
<h3>ข้อมูลเจ้าหน้าที่</h3>${kv([['ประวัติการแก้ไข',h.History],['เอกสารอ้างอิง',h.Docs],['หมายเหตุ',h.Note]])}`}
function hFiltered(){const q=HS.q.trim().toLowerCase();return HS.items.filter(h=>(!q||hText(h).includes(q))&&(!HS.stat||h.Status===HS.stat))}
function houseFormHtml(){const p=HF.p,n=HF.isNew,f=(l,k,x='')=>`<label>${l}<input data-hf="${k}" value="${E(p[k]==null?'':p[k])}" ${x}></label>`,s=(l,k,a)=>`<label>${l}<select data-hf="${k}">${opt(a,String(p[k]))}</select></label>`,
 pz=DATA.map(pv=>`<optgroup label="${E(pv.provName)}">${pv.entries.map(e=>`<option value="${e.zip}"${e.zip===p.Postal?' selected':''}>${E(e.name)} (${e.zip})</option>`).join('')}</optgroup>`).join('');
 return `<div style="padding:0 4px"><span class="bk" data-x="hcancel">${I.back}ยกเลิก</span></div><h2>${n?'เพิ่มบ้านใหม่':'แก้ไข '+E(p.HouseID)}</h2><div class="fm">
<div class="row2">${f('รหัสบ้าน','HouseID',n?'placeholder="สร้างให้อัตโนมัติ"':'readonly')}${f('เลขโฉนด','DeedNo')}</div>
<div class="row2">${f('บ้านเลขที่','HouseNo')}${f('หมู่','Moo')}</div><div class="row2">${f('ซอย','Soi')}${f('ถนน','Road')}</div>
<div class="row2">${f('ตำบล','Tambon')}<label>เขต / รหัสไปรษณีย์<select data-hf="Postal">${pz}</select></label></div>
<div class="row2">${f('X','X','type="number" step="any"')}${f('Y','Y','type="number" step="any"')}</div>
<div class="act" style="margin:0"><button data-x="hpt">แตะเลือกตำแหน่ง</button><button data-x="hpoly">วาดเส้นขอบแปลง</button></div>
<label>เส้นขอบแปลง (JSON [[x,y],...])<textarea data-hf="Polygon" rows="3">${E(p.Polygon||'')}</textarea></label>
<div class="row2">${s('ประเภทบ้าน','HouseType',HTYPES.map(x=>[x,x]))}${f('จำนวนชั้น','Floors','type="number" min="1"')}</div>
<div class="row2">${f('จำนวนผู้มีชื่อ','Members','type="number" min="0"')}${s('เจ้าบ้าน','HasOwner',[['1','มีเจ้าบ้านแล้ว'],['0','ยังไม่มีเจ้าบ้าน']])}</div>
<div class="row2">${f('วันที่จดทะเบียน','RegDate')}${f('ปีที่ขึ้นทะเบียน (ฝ.ต.)','RegYear','type="number"')}</div>
<div class="row2">${s('สถานะบ้าน','Status',HSTAT.map(x=>[x,x]))}${s('การตรวจสอบ','VerifyStatus',HVER.map(x=>[x,x]))}</div>
${f('เอกสารอ้างอิง','Docs')}<label>หมายเหตุ<textarea data-hf="Note" rows="2">${E(p.Note)}</textarea></label>
<div class="row2">${f('ผู้แก้ไข','Editor')}<label>รหัสแก้ไข<input data-hf="Key" type="password" value="${E(p.Key)}"></label></div></div>
<div class="act"><button data-x="hsave">บันทึก</button>${n?'':'<button data-x="hdel" style="color:#e03131">ลบ</button>'}</div>`}
function hOpenForm(h){const sk=k=>{try{return sessionStorage.getItem(k)||''}catch(_){return''}};
 HF=h?{isNew:false,p:{...h,Polygon:h.Polygon?JSON.stringify(h.Polygon):'',HasOwner:h.HasOwner?'1':'0',Editor:sk('he'),Key:sk('hk')}}
  :{isNew:true,p:{HouseID:'',DeedNo:'',HouseNo:'',Moo:'',Soi:'',Road:'',Tambon:'',Postal:'10101',X:'',Y:'',Polygon:'',HouseType:HTYPES[0],Floors:1,Members:0,HasOwner:'1',RegDate:'',RegYear:'',Status:HSTAT[0],VerifyStatus:HVER[1],Docs:'',Note:'',Editor:sk('he'),Key:sk('hk')}};
 HV=null;CV=null;panel();const b=document.getElementById('body');if(b)b.scrollTop=0;hDraw()}
function hsyncForm(){if(!HF)return;document.querySelectorAll('[data-hf]').forEach(e=>{HF.p[e.dataset.hf]=e.value})}
async function hpost(b){return(await fetch(HAPI,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(b)})).json()}
async function hSave(){hsyncForm();const p=HF.p;
 if(!p.HouseNo||p.X===''||p.Y===''||isNaN(+p.X)||isNaN(+p.Y))return toast('กรอกบ้านเลขที่ และพิกัด X, Y');
 if(p.Polygon){try{JSON.parse(p.Polygon)}catch(_){return toast('รูปแบบเส้นขอบแปลงไม่ถูกต้อง')}}
 const z=Z[p.Postal];if(!z||z[1]==null)return toast('เลือกเขต');
 const d={...p,Province:DATA[z[0]].provName,Amphoe:DATA[z[0]].entries[z[1]].name,Region:REG[DATA[z[0]].district-1].n};
 try{sessionStorage.setItem('hk',p.Key||'');sessionStorage.setItem('he',p.Editor||'')}catch(_){}
 try{const j=await hpost({action:'upsert',key:p.Key,data:d});if(!j.ok)throw new Error(j.error||'บันทึกไม่สำเร็จ');d.HouseID=j.HouseID;HF=null;HS.sig='';apiSave('บันทึก',{name:d.HouseNo,id:d.HouseID},'houses',true);await hLoad();houseOpen(d.HouseID,1)}catch(e){apiSave('บันทึก',{name:d.HouseNo,id:d.HouseID},'houses',false,e.message)}}
async function hDel(){hsyncForm();const p=HF.p;if(!p.HouseID||!confirm('ยืนยันลบ '+p.HouseID+'?'))return;
 try{const j=await hpost({action:'delete',key:p.Key,data:{HouseID:p.HouseID}});if(!j.ok)throw new Error(j.error||'ลบไม่สำเร็จ');const di={name:p.HouseNo,id:p.HouseID};HF=null;HV=null;HS.sig='';apiSave('ลบ',di,'houses',true);await hLoad();panel()}catch(e){apiSave('ลบ',{name:p.HouseNo,id:p.HouseID},'houses',false,e.message)}}
/* เลือกตำแหน่ง / วาดแปลงบนแผนที่ */
document.body.insertAdjacentHTML('beforeend','<div id="xpk" hidden><span id="xpt"></span><button id="xpo">เสร็จ</button><button id="xpu">ย้อน</button><button id="xpx">ยกเลิก</button></div>');
function startPick(m){hsyncForm();HPK={m,pts:[]};if(!DT.matches)setSt(0);const b=document.getElementById('xpk');b.hidden=false;document.getElementById('xpt').textContent=m==='pt'?'แตะแผนที่เพื่อเลือกตำแหน่ง':'วาดแปลง: แตะเพื่อเพิ่มจุด';document.getElementById('xpo').hidden=document.getElementById('xpu').hidden=m==='pt';hDraw()}
function endPick(ok){if(!HPK)return;if(ok&&HPK.m==='poly'){if(HPK.pts.length<3)return toast('ต้องมีอย่างน้อย 3 จุด');const p=HF.p,n=HPK.pts.length;p.Polygon=JSON.stringify(HPK.pts);if(p.X===''||p.X==null){p.X=+(HPK.pts.reduce((a,q)=>a+q[0],0)/n).toFixed(1);p.Y=+(HPK.pts.reduce((a,q)=>a+q[1],0)/n).toFixed(1)}}
 HPK=null;document.getElementById('xpk').hidden=true;setSt(Math.max(st,1));panel();hDraw()}
function hpkTap(w){if(HPK.m==='pt'){const p=HF.p,z=whereAt(w[0],w[1]);p.X=w[0];p.Y=w[1];if(z&&z[1]!=null)p.Postal=DATA[z[0]].entries[z[1]].zip;endPick();return}HPK.pts.push(w);document.getElementById('xpt').textContent='วาดแปลง: '+HPK.pts.length+' จุด';hDraw()}
document.getElementById('xpo').onclick=()=>endPick(true);document.getElementById('xpx').onclick=()=>endPick(false);document.getElementById('xpu').onclick=()=>{if(HPK){HPK.pts.pop();document.getElementById('xpt').textContent='วาดแปลง: '+HPK.pts.length+' จุด';hDraw()}};

/* ================= โหมดแก้ไข (/edit): รถ / บ้าน ในหน้าเว็บหลัก ================= */
function xEditStart(k){XE={k,auth:k==='houses',pw:''};CV=null;HV=null;HF=null;ADDONS[k==='cars'?'carFMRFT':'houses']=true;saveAo();k==='cars'?cStart():hStart();capsuleSync();setSt(Math.max(st,1));toast(k==='cars'?'แก้ไขรถของมูลนิธิ':'แก้ไขบ้าน');panel()}
function xEditHtml(){
 const bk=`<div style="padding:0 4px"><span class="bk" data-x="xback">${I.back}เลือกประเภทที่จะแก้ไข</span></div>`;
 if(XE.k==='cars'){
  if(!XE.auth){let pw='';try{pw=sessionStorage.getItem('pw')||''}catch(_){}return bk+`<h2>แก้ไขรถของมูลนิธิ</h2><div class="fm"><label>รหัสผ่านโหมดแก้ไข<input id="xpw" type="password" value="${E(pw)}" autocomplete="current-password"></label><small id="xpe" style="color:#e03131"></small></div><div class="act"><button data-x="clogin">เข้าสู่ระบบ</button></div>`}
  return bk+`<h2>แก้ไขรถของมูลนิธิ</h2><div class="act"><button data-x="cnew">+ เพิ่มรถ</button></div>`+(CR.items.length?CR.items.map(c=>`<div class="it" data-x="crow" data-v="${E(c.id)}">${carIcon(c,1)}<div class="t"><b>${E(c.name)}</b><small>${E(carRoute(c))}</small></div><em>${E(carStat(c))}</em></div>`).join(''):'<div class="hint">ยังไม่มีรถ — กด “+ เพิ่มรถ”</div>')}
 const a=hFiltered();
 return bk+`<h2>แก้ไขบ้าน</h2><div class="fm"><div class="row2"><label>ค้นหา (โฉนด/รหัส/บ้านเลขที่)<input id="hsq" value="${E(HS.q)}"></label><label>สถานะ<select id="hss"><option value="">ทั้งหมด</option>${opt(HSTAT.map(x=>[x,x]),HS.stat)}</select></label></div></div><div class="act"><button data-x="hnew">+ เพิ่มบ้าน</button><button data-x="hfit">แสดงทั้งหมดบนแผนที่</button></div><h3>บ้าน (${a.length} จาก ${HS.items.length})</h3><div id="hlst">${a.length?a.slice(0,100).map(houseRow).join(''):'<div class="hint">ไม่พบบ้าน</div>'}</div>`}
window.xClear=function(){if(CV||HV){CV=null;HV=null;hDraw()}};
window.xPanel=function(B){
 if(curPage==='go'||curPage==='Add-ons'||curPage==='zip')return false;
 let h=null;
 if(CV)h=carHtml();else if(HF)h=houseFormHtml();else if(HV)h=houseDetailHtml();else if(XE)h=xEditHtml();
 if(h==null||h==='')return false;
 $('#srow-main').style.display='flex';$('#srow-addons').style.display='none';$('#srow-go').style.display='none';
 const sc0=B.scrollTop;B.innerHTML=h;B.scrollTop=sc0;return true};
document.getElementById('body').addEventListener('click',e=>{
 const b=e.target.closest('[data-x]');if(!b)return;const a=b.dataset.x,v=b.dataset.v;e.stopPropagation();
 if(a==='close'){CV=null;HV=null;CR.follow=null;hDraw();panel()}
 else if(a==='xback'){XE=null;CV=null;HV=null;HF=null;CR.follow=null;panel();if(typeof EDIT!=='undefined'&&EDIT)showEc()}
 else if(a==='follow'){csync();if(CR.follow===CV.id){CR.follow=null;toast('หยุดติดตาม')}else{CR.follow=CV.id;toast('กำลังติดตามรถ')}panel()}
 else if(a==='cback'){csync();CV=null;CR.follow=null;panel()}
 else if(a==='cedit'){CV.edit=true;panel()}
 else if(a==='clogin'){const pw=(document.getElementById('xpw')||{}).value||'';cpost({action:'auth',pw}).then(j=>{if(j&&j.ok){XE.auth=true;XE.pw=pw;try{sessionStorage.setItem('pw',pw)}catch(_){}panel()}else{const m=document.getElementById('xpe');if(m)m.textContent=(j&&j.err)||'รหัสไม่ถูกต้อง'}}).catch(()=>{const m=document.getElementById('xpe');if(m)m.textContent='เชื่อมต่อเซิร์ฟเวอร์ไม่ได้'})}
 else if(a==='crow')carOpen(v,true);
 else if(a==='cnew')carNew();
 else if(a==='csave')carSave();
 else if(a==='cdel')carDel();
 else if(a==='cplace'){csync();CR.place=true;toast('แตะบนแผนที่เพื่อวางรถ/ย้ายรถ');if(!DT.matches)setSt(0)}
 else if(a==='cic'){csync();CV.p.ic=v;panel()}
 else if(a==='cclr'){csync();CV.p.ic='';panel()}
 else if(a==='hrow')houseOpen(v,1);
 else if(a==='hlist'){HV=null;hDraw();panel()}
 else if(a==='hnew')hOpenForm(null);
 else if(a==='hedit'){const h=HS.items.find(x=>x.HouseID===HV.id);if(h)hOpenForm(h)}
 else if(a==='hcancel'){hsyncForm();const wasNew=HF&&HF.isNew,id=HF&&HF.p.HouseID;HF=null;if(!wasNew&&id)houseOpen(id,0);else panel();hDraw()}
 else if(a==='hsave')hSave();
 else if(a==='hdel')hDel();
 else if(a==='hpt')startPick('pt');
 else if(a==='hpoly')startPick('poly');
 else if(a==='hcpid'){const h=HS.items.find(x=>x.HouseID===HV.id);if(h)copy(h.HouseID,'คัดลอกรหัสแล้ว')}
 else if(a==='hcpxy'){const h=HS.items.find(x=>x.HouseID===HV.id);if(h)copy(h.X+', '+h.Y,'คัดลอกพิกัดแล้ว')}
 else if(a==='hfit'){if(HS.items.length){setSt(Math.max(st,1));fit(hsBox(hFiltered().length?hFiltered():HS.items),1.2)}}},true);
document.getElementById('body').addEventListener('input',e=>{const t=e.target;if(!t.id)return;
 if(t.id==='xfsp'){const v=document.getElementById('xfspv');if(v)v.textContent=t.value+' กม./ชม.'}
 else if(t.id==='xfsz'){const v=document.getElementById('xfszv');if(v)v.textContent=t.value+'%'}
 else if(t.id==='xfic'&&CV){CV.p.ic=icClip2(t.value)}
 else if(t.id==='hsq'){HS.q=t.value;const l=document.getElementById('hlst');if(l){const a=hFiltered();l.innerHTML=a.length?a.slice(0,100).map(houseRow).join(''):'<div class="hint">ไม่พบบ้าน</div>'}}});
document.getElementById('body').addEventListener('change',e=>{const t=e.target;if(t.id==='hss'){HS.stat=t.value;panel()}else if(t.id==='xfr'&&CV){csync();panel()}else if(t.id==='xfic'&&CV){CV.p.ic=icClip2(t.value);csync();panel()}});

/* แตะบนแผนที่: เปิดรถ/บ้าน, เลือกตำแหน่ง, วางรถ */
let down=null;
svg.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY}},true);
svg.addEventListener('click',e=>{const moved=down&&Math.hypot(e.clientX-down.x,e.clientY-down.y)>6;
 const car=e.target.closest&&e.target.closest('.xcar'),hs=e.target.closest&&e.target.closest('.xhs');
 if(HPK){if(moved)return;e.stopPropagation();hpkTap(wpos(e.clientX,e.clientY));return}
 if(CR.place&&CV&&!moved){e.stopPropagation();const w=wpos(e.clientX,e.clientY);CR.place=false;carMoveTo(w[0],w[1]);if(!DT.matches)setSt(Math.max(st,1));return}
 if(moved)return;
 if(car){e.stopPropagation();carOpen(car.dataset.id,!!(XE&&XE.k==='cars'&&XE.auth))}
 else if(hs){e.stopPropagation();houseOpen(hs.dataset.hs,1)}},true);

/* เริ่มต้น */
capsuleSync();if(ADDONS.carFMRFT)cStart();if(ADDONS.houses)hStart();
window.aoUrl=aoUrl;window.aoSync=aoSync;window.aoSet=aoSet;setTimeout(()=>{if(curPage==='Add-ons'){aoApplyUrl();panel();aoSync()}},0);
})();

/* ================= Emoji → SVG icon layer (HTML text + SVG map glyphs) ================= */
(function(){
const P={
 bridge:'<path d="M3 17h18M5 17V9M19 17V9M5 9c3 0 4 4 7 4s4-4 7-4M9 17v-3M15 17v-3"/>',
 pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 road:'<path d="M7 3 4 21M17 3l3 18M12 4v3M12 10.5v3M12 17v3"/>',
 water:'<path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
 mountain:'<path d="m3 19 6-11 4 7 3-4 5 8z"/>',
 food:'<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 7 0 2 1 3 3 3"/>',
 car:'<path d="M4 15v-3l2-5h12l2 5v3M4 15h16M4 15v3h3v-3M17 15v3h3v-3M7.5 12h.01M16.5 12h.01"/>',
 bus:'<path d="M5 4h14a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1zM4 11h16M7 18v2M17 18v2M8 14.5h.01M16 14.5h.01"/>',
 train:'<path d="M7 3h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2zM5 11h14M8 21l2-3M16 21l-2-3M9 14.5h.01M15 14.5h.01"/>',
 boat:'<path d="M2 19c2 1.5 4 1.5 6 0s4-1.5 6 0 4 1.5 6 0M5 16l-1-4h16l-1 4M12 12V4l5 5"/>',
 bike:'<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16 9.5 8H14l4 8M9.5 8 12 16M13 5h3"/>',
 plane:'<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
 house:'<path d="M4 11 12 4l8 7M6 10v10h12V10M10 20v-5h4v5"/>',
 building:'<path d="M4 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16M14 10h5a1 1 0 0 1 1 1v10M3 21h18M8 8h2M8 12h2M8 16h2"/>',
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
 heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
 bolt:'<path d="M13 3 5 13h6l-1 8 8-10h-6z"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 ruler:'<path d="m14.5 3.5 6 6L9 21l-6-6z"/><path d="m8 11 2 2M11 8l2 2M14 5l2 2M5 14l2 2"/>',
 ban:'<circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 x:'<path d="M6 6l12 12M18 6 6 18"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
 warn:'<path d="M12 4 2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 17h.01"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
 access:'<circle cx="12" cy="5" r="1.8"/><path d="M5 9h14M12 9v6l-3 5M12 15l3 5"/>',
 parking:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3"/>',
 fuel:'<path d="M5 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16M4 21h11M14 10h2.5a1.5 1.5 0 0 1 1.5 1.5V17a1.5 1.5 0 0 0 3 0V9l-3-3M7.5 8h4"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
 link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
 map:'<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/>',
 edit:'<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19z"/>',
 sliders:'<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
 flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 walk:'<circle cx="13" cy="4.5" r="1.8"/><path d="M10 21l1.5-6-2.5-2 1-5 4 2 2 3.5M11.5 15 14 17.5V21M9 9 7 12"/>',
 up:'<path d="M12 20V5M6 11l6-6 6 6"/>',
 turnl:'<path d="M9 14 4 9l5-5M4 9h10a5 5 0 0 1 5 5v6"/>',
 turnr:'<path d="m15 14 5-5-5-5M20 9H10a5 5 0 0 0-5 5v6"/>',
 uturn:'<path d="M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3"/>'
};
window.ICP=P;
const G={};const add=(k,s)=>Array.from(s).forEach(c=>{G[c.codePointAt(0)]=k});
add('car','🚗🚕🚙🏎🚓🚑🚒🚐🛻🚚🚛🚜🚘🚔🚖');add('bus','🚌🚎🚍🚏');add('train','🚆🚇🚈🚉🚊🚝🚞🚋🚃🚂🚄🚅🚟🚠🚡');
add('boat','⛴🚢⛵🛶🚤🛥🛳');add('bike','🏍🛵🛺🚲🛴🛹🛼🦼🦽');add('plane','✈🛩🚁🚀🛸');add('road','🛣🛞🚧');
add('food','🍽🍜🍚🍔🍕🍟🍣🌮🍎🍌🍉☕🍺🍷🍦🥗🍰🍩🍳🍲🍛🍱🍢🥤🧋');add('house','🏠🏡🏘');add('building','🏢🏬🏪🏭🏗');
add('bed','🏨🛏🛌');add('cap','🏫🎓📚');add('health','🏥💊🩺⚕');add('coin','🏦💰💵💲💳🪙');add('gov','🏛🏤🏣');
add('worship','⛪🕌🛕⛩🕍🛐🕋');add('landmark','🏰🏯🖼🎨🗿🗽🗼');add('star','🎡🎢🎠🎪🎭⭐🌟✨★🎉🎊💫🔥');
add('heart','❤💛💚💙💜🧡🖤🤍💗');add('leaf','🌿🌳🌲🌴🌵🌸🌻🌱🍀🌾🌺🌼');add('mountain','⛰🏔🗻🌋');add('water','🌊🏞💧⛲');
add('pin','📍📌');add('bridge','🌉');add('map','🗺');add('compass','🧭');add('link','🔗');add('edit','✏✎');add('sliders','⚙');add('bolt','⚡');
add('clock','⏱⏰🕐');add('ruler','📏');add('ban','🚫');add('plus','➕');add('x','❌✖✕');add('check','✅✔✓☑');add('warn','⚠');
add('help','❓❔');add('info','❗ℹ');add('access','♿');add('parking','🅿');add('fuel','⛽');add('flag','🏁🚩');add('walk','🚶');
add('up','⬆');add('bag','🛍🛒');add('turnl','↰');add('turnr','↱');add('uturn','↩');
const DOT={'🟢':'#2f9e44','🔴':'#e03131','🔵':'#1c7ed6','🟡':'#f59f00','🟠':'#e8590c','🟣':'#7048e8','🟤':'#8d6e63','⚪':'#ffffff','⚫':'#111111'};
const keyOf=ch=>{const cp=ch.codePointAt(0);if(G[cp])return G[cp];if(DOT[String.fromCodePoint(cp)])return 'dot';
 if((cp>=0x1F32D&&cp<=0x1F37F)||(cp>=0x1F950&&cp<=0x1F96F)||(cp>=0x1F9C0&&cp<=0x1F9CB))return 'food';
 if(cp>=0x1F331&&cp<=0x1F344)return 'leaf';return null};
const dotCol=ch=>DOT[String.fromCodePoint(ch.codePointAt(0))]||'#888';
const B='[\\u{1F000}-\\u{1FAFF}\\u21A9\\u21B0\\u21B1\\u2300-\\u23FF\\u2600-\\u27BF\\u2B00-\\u2BFF]';
const RE=new RegExp(B+'\\uFE0F?(?:\\u200D'+B+'\\uFE0F?)*','gu');
window.emjHas=s=>{RE.lastIndex=0;return RE.test(String(s||''))};
const el=(ch)=>{const k=keyOf(ch);const t=document.createElement('span');t.className='ei';t.setAttribute('aria-hidden','true');
 t.innerHTML=k==='dot'?`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="${dotCol(ch)}" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/></svg>`:`<svg viewBox="0 0 24 24">${P[k]}</svg>`;return t};
/* SVG (map) glyph: returns '' when the character has no icon */
window.emjG=function(ch,cx,cy,size,color){ch=String(ch==null?'':ch);RE.lastIndex=0;const m=RE.exec(ch);if(!m)return '';const k=keyOf(m[0]);if(!k)return '';
 if(k==='dot')return `<circle cx="${cx}" cy="${cy}" r="${size*.35}" fill="${dotCol(m[0])}" style="pointer-events:none"/>`;
 const sc=size/24;return `<g transform="translate(${cx-size/2} ${cy-size/2}) scale(${sc})" fill="none" stroke="${color||'currentColor'}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;stroke:${color||'currentColor'};fill:none">${P[k]}</g>`};
window.emjPin=function(p,r){const ic=pinIc(p);if(ic&&!window.emjHas(ic))return '';return window.emjG(ic,p.x,p.y,r*1.3,'#fff')||window.emjG(catOf(p.cat)[4],p.x,p.y,r*1.3,'#fff')};
/* HTML text conversion */
const SKIP=new Set(['SCRIPT','STYLE','TEXTAREA','INPUT','TITLE','NOSCRIPT']);
const skip=n=>!n||n.nodeType!==1||SKIP.has(n.nodeName)||n instanceof SVGElement||(n.closest&&n.closest('.icg,.icp,[data-noemj]'));
function conv(tn){const t=tn.nodeValue;if(!t||t.length>600)return;RE.lastIndex=0;if(!RE.test(t))return;const par=tn.parentNode;if(skip(par))return;
 const opt=par.nodeName==='OPTION';RE.lastIndex=0;const frag=document.createDocumentFragment();let last=0,m,ch=false;
 while((m=RE.exec(t))){const k=keyOf(m[0]);if(!k&&!opt)continue;if(m.index>last)frag.append(t.slice(last,m.index));if(!opt)frag.append(el(m[0]));last=m.index+m[0].length;if(opt&&t[last]===' ')last++;ch=true}
 if(!ch)return;if(last<t.length)frag.append(t.slice(last));par.replaceChild(frag,tn)}
function walk(root){if(root.nodeType===3){conv(root);return}if(root.nodeType!==1||root instanceof SVGElement)return;
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),list=[];let n;while((n=w.nextNode()))list.push(n);list.forEach(conv)}
const mo=new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData'){conv(m.target)}else m.addedNodes.forEach(walk)}});
walk(document.body);
mo.observe(document.body,{childList:true,subtree:true,characterData:true});
})();
