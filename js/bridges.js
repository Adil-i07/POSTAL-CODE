/* ================= Bridges · สะพาน (auto-detected crossings + /edit/bridge) ================= */
(function(){
const SV=(p,s)=>`<svg class="i" viewBox="0 0 24 24"${s?` style="width:${s}px;height:${s}px"`:''}>${p}</svg>`;
const IB={bridge:'<path d="M3 17h18M5 17V9M19 17V9M5 9c3 0 4 4 7 4s4-4 7-4M9 17v-3M15 17v-3"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/>',target:'<circle cx="12" cy="12" r="6.5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
 road:'<path d="M7 3 4 21M17 3l3 18M12 4v3M12 10.5v3M12 17v3"/>',plus:'<path d="M12 5v14M5 12h14"/>',reset:'<path d="M4 12a8 8 0 1 0 3-6.2M4 4v5h5"/>',
 save:'<path d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6"/>',water:'<path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>'};
const isBridgeRec=p=>p&&p.br;
/* ---------- geometry helpers ---------- */
const PC=new WeakMap();
function pathPts(p){const P=p.pts,key=P.length+'|'+(p.curve?1:0)+'|'+P[0][0]+','+P[0][1]+'|'+P[P.length-1][0]+','+P[P.length-1][1],r=PC.get(p);if(r&&r.k===key)return r.o;const o=[];
 if(!p.curve||P.length<3)P.forEach(q=>o.push(q));
 else{o.push(P[0]);for(let i=0;i<P.length-1;i++){const a=P[i-1]||P[i],b=P[i],c=P[i+1],e=P[i+2]||c;for(let t=1;t<=8;t++){const u=t/8,w=1-u,x1=b[0]+(c[0]-a[0])/6,y1=b[1]+(c[1]-a[1])/6,x2=c[0]-(e[0]-b[0])/6,y2=c[1]-(e[1]-b[1])/6;
   o.push([w*w*w*b[0]+3*w*w*u*x1+3*w*u*u*x2+u*u*u*c[0],w*w*w*b[1]+3*w*w*u*y1+3*w*u*u*y2+u*u*u*c[1]])}}}
 PC.set(p,{k:key,o});return o}
const cumOf=P=>{const c=[0];for(let i=1;i<P.length;i++)c.push(c[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));return c};
function at(P,cum,s){s=Math.max(0,Math.min(cum[cum.length-1],s));let i=1;while(i<cum.length-1&&cum[i]<s)i++;const L=cum[i]-cum[i-1]||1,t=(s-cum[i-1])/L;return[P[i-1][0]+(P[i][0]-P[i-1][0])*t,P[i-1][1]+(P[i][1]-P[i-1][1])*t]}
function segInt(a,b,c,d){const r=[b[0]-a[0],b[1]-a[1]],s=[d[0]-c[0],d[1]-c[1]],den=r[0]*s[1]-r[1]*s[0];if(Math.abs(den)<1e-9)return null;const t=((c[0]-a[0])*s[1]-(c[1]-a[1])*s[0])/den,u=((c[0]-a[0])*r[1]-(c[1]-a[1])*r[0])/den;return(t>=0&&t<=1&&u>=0&&u<=1)?t:null}
const pip=(x,y,P)=>{let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c}return c};
function nearOn(P,cum,x,y){let best=1e9,bs=0;for(let i=1;i<P.length;i++){const a=P[i-1],b=P[i],dx=b[0]-a[0],dy=b[1]-a[1],L2=dx*dx+dy*dy||1;let t=((x-a[0])*dx+(y-a[1])*dy)/L2;t=Math.max(0,Math.min(1,t));const px=a[0]+t*dx,py=a[1]+t*dy,d=Math.hypot(x-px,y-py);if(d<best){best=d;bs=cum[i-1]+t*Math.sqrt(L2)}}return{d:best,s:bs}}
/* ---------- detection ---------- */
const DR={};            // live drafts (not yet saved): key → {name,bz}
const BZ_MIN=.1,BZ_MAX=5,BZ_DEF=1.5,bzc=v=>{v=+v;return(isFinite(v)&&v>0)?Math.min(BZ_MAX,Math.max(BZ_MIN,Math.round(v*10)/10)):BZ_DEF};
const DEF_BZ={river:BZ_DEF,bay:BZ_DEF,canal:BZ_DEF};
let sig='',LST=[];
function build(){const roads=PL.filter(p=>p.kind==='road'&&p.pts&&p.pts.length>1&&!p.br),waters=PL.filter(p=>p.kind==='nature'&&(p.nt==='river'||p.nt==='canal'||p.nt==='bay')&&p.pts&&p.pts.length>=(p.nt==='bay'?3:2)),recs=PL.filter(isBridgeRec),used=new Set(),out=[];
 const mk=(key,r,w,P,cum,s0,s1,wk)=>{const L=cum[cum.length-1];s0=Math.max(0,s0);s1=Math.min(L,s1);if(s1-s0<8)return;const deck=[];for(let s=s0;s<s1;s+=4)deck.push(at(P,cum,s));deck.push(at(P,cum,s1));const c=at(P,cum,(s0+s1)/2);
  let rec=recs.find(x=>!used.has(x.id)&&x.bk===key)||recs.find(x=>!used.has(x.id)&&Math.hypot(x.x-c[0],x.y-c[1])<16&&!String(x.bk||'').startsWith('m:'));if(rec)used.add(rec.id);
  const dname=w.name?'สะพานข้าม'+w.name:('สะพาน'+(r.name?' '+r.name:'')),dz=DEF_BZ[wk]||BZ_DEF,d=DR[key];
  out.push({key,isBr:true,rid:r.id,wid:w.id,wkind:wk,wname:w.name||'',rname:r.name||'',rrt:r.rt||'local',s0,s1,deck,cx:c[0],cy:c[1],len:s1-s0,def:{name:dname,bz:dz},rec:rec||null,off:!!(rec&&rec.br===2),name:(d&&d.name!=null)?d.name:(rec&&rec.br===1&&rec.name)||dname,bz:bzc((d&&d.bz!=null)?d.bz:(rec&&rec.br===1&&rec.bz>0)?rec.bz:dz),manual:false})};
 roads.forEach(r=>{const P=pathPts(r),cum=cumOf(P),L=cum[cum.length-1];
  waters.forEach(w=>{
   if(w.nt==='bay'){let inside=false,s0=0,n=0;for(let s=0;s<=L;s+=2){const q=at(P,cum,s),ins=pip(q[0],q[1],w.pts);if(ins&&!inside){inside=true;s0=s}if(!ins&&inside){inside=false;mk(r.id+'|'+w.id+'|'+(n++),r,w,P,cum,s0-7,s+5,'bay')}}if(inside)mk(r.id+'|'+w.id+'|'+n,r,w,P,cum,s0-7,L,'bay')}
   else{const WP=pathPts(w),hits=[];for(let i=1;i<P.length;i++)for(let j=1;j<WP.length;j++){const t=segInt(P[i-1],P[i],WP[j-1],WP[j]);if(t!=null)hits.push(cumOf(P)[i-1]+t*Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]))}
    hits.sort((a,b)=>a-b);const merged=[];hits.forEach(h=>{if(!merged.length||h-merged[merged.length-1]>16)merged.push(h)});
    const half=w.nt==='river'?14:10;merged.forEach((h,n)=>mk(r.id+'|'+w.id+'|'+n,r,w,P,cum,h-half,h+half,w.nt))}})});
 // manual (stored) bridges that did not match a detected crossing
 recs.filter(x=>!used.has(x.id)&&x.br===1&&x.pts&&x.pts.length>=2).forEach(x=>{const a=x.pts[0],b=x.pts[x.pts.length-1];let par=null;
  for(const r of roads){const P=pathPts(r),cum=cumOf(P),na=nearOn(P,cum,a[0],a[1]),nb=nearOn(P,cum,b[0],b[1]);if(na.d<6&&nb.d<6&&(!par||na.d+nb.d<par.e))par={r,P,cum,s0:Math.min(na.s,nb.s),s1:Math.max(na.s,nb.s),e:na.d+nb.d}}
  let deck;if(par){deck=[];for(let s=par.s0;s<par.s1;s+=4)deck.push(at(par.P,par.cum,s));deck.push(at(par.P,par.cum,par.s1))}else deck=[a,b];
  const d=DR[x.bk||x.id];let len=0;for(let i=1;i<deck.length;i++)len+=Math.hypot(deck[i][0]-deck[i-1][0],deck[i][1]-deck[i-1][1]);
  out.push({key:x.bk||('m:'+x.id),isBr:true,rid:par?par.r.id:'',wid:'',wkind:'manual',wname:'',rname:par?par.r.name||'':'',rrt:par?par.r.rt||'local':'local',s0:par?par.s0:0,s1:par?par.s1:len,deck,cx:x.x,cy:x.y,len,def:{name:'สะพาน',bz:BZ_DEF},rec:x,off:false,name:(d&&d.name!=null)?d.name:(x.name||'สะพาน'),bz:bzc((d&&d.bz!=null)?d.bz:(x.bz>0?x.bz:BZ_DEF)),manual:true})});
 return out}
function all(){const s=PL.length+':'+(typeof lastChg!=='undefined'?lastChg:0)+':'+Object.keys(DR).length+JSON.stringify(DR);if(s!==sig){sig=s;try{LST=build()}catch(_){LST=[]}}return LST}
const active=()=>all().filter(b=>!b.off);
const skipFor=rid=>active().filter(b=>b.rid===rid).map(b=>[b.s0,b.s1]);
window.BR={pts:pathPts,list:active,all,skip:skipFor,open:key=>openView(key,false),openList:()=>openView(null,true),find:key=>all().find(b=>b.key===key),draft:DR};
/* ---------- 2D bridge overlay ---------- */
let g2=null;
function draw2D(){if(!g2||!g2.parentNode){g2=document.createElementNS('http://www.w3.org/2000/svg','g');g2.id='brg';g2.setAttribute('pointer-events','none');const pl=svg.querySelector('#pl');pl&&pl.parentNode?pl.parentNode.insertBefore(g2,pl.nextSibling):svg.appendChild(g2)}
 const s=sc(),W=vb.w,zf=Math.min(2.6,Math.max(1,Math.pow(1380/W,.35)));let h='';
 if(W<2400)active().forEach(b=>{const t=RT[b.rrt]||RT.local;if(W>t.vw)return;const w=t.w*zf/s,D='M'+b.deck.map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join('L');
  h+=`<path d="${D}" fill="none" stroke="#4b5563" stroke-width="${w+5/s}" stroke-linecap="butt"/><path d="${D}" fill="none" stroke="#f3f4f6" stroke-width="${w+1/s}" stroke-linecap="butt"/><path d="${D}" fill="none" stroke="${t.c}" stroke-width="${w*.7}" stroke-linecap="butt"/>`});
 g2.innerHTML=h}
const _dp=drawPl;drawPl=function(){const full=PL;if(PL.some(p=>p.br===2))PL=PL.filter(p=>p.br!==2);try{_dp.apply(this,arguments)}finally{PL=full}try{draw2D()}catch(_){}};
/* ---------- sheet view ---------- */
const BD=$('#body'),SR=$('#srow-bridge');let BV=false,sel=null,listMode=false,q='',msg='';
const canEdit=()=>!!(typeof ED!=='undefined'&&ED.auth);
const fmt=n=>(Math.round(n*10)/10);
function row(b){const on=sel===b.key;return `<button class="brrow${on?' on':''}" data-br="sel:${esc(b.key)}"><span class="bri">${SV(IB.bridge,20)}</span><span class="brt"><b>${esc(b.name)}</b><small>${esc(b.off?'Converted to road · เปลี่ยนเป็นถนนแล้ว':(b.wkind==='manual'?'Manual · สร้างเอง':(b.wname?b.wname:({river:'River',canal:'Canal',bay:'Water'}[b.wkind]))+' × '+(b.rname||'Road'))+' · '+fmt(b.bz)+' h')}</small></span><span class="brb ${b.rec?'s':'a'}">${b.off?'Road':b.rec?'Saved':'Auto'}</span></button>`}
function card(b){const ed=canEdit(),d=b.name;
 let h=`<div class="brcard"><div class="brh"><span class="bri big">${SV(IB.bridge,26)}</span><div><b>${esc(b.name)}</b><small>${esc(b.wkind==='manual'?'Manual bridge':'Crossing '+(b.wname||({river:'river',canal:'canal',bay:'water'}[b.wkind]))+' · '+(b.rname||'road'))}</small></div></div>
 <div class="brs"><div><small>Length</small><b>${fmt(b.len)}</b></div><div><small>Height</small><b>${fmt(b.bz)}</b></div><div><small>Status</small><b>${b.off?'Road':b.rec?'Saved':'Auto'}</b></div></div>`;
 if(ed){h+=`<label class="brf">Name · ชื่อสะพาน<input id="br-n" value="${esc(b.name)}" maxlength="60" autocomplete="off"></label>
  <label class="mes-r"><span>Height · ความสูง <b id="br-hv">${fmt(b.bz)}</b></span><input id="br-h" type="range" min="0.1" max="5" step="0.1" value="${b.bz}"></label>
  <div class="act"><button data-br="save">${SV(IB.save,15)}Save</button><button data-br="toroad">${SV(IB.road,15)}Convert to road</button></div>
  <div class="act"><button data-br="zoom">${SV(IB.target,15)}Locate</button>${b.rec?`<button data-br="reset">${SV(IB.reset,15)}Reset to auto</button>`:''}${b.manual&&b.rec?`<button data-br="del">${SV(IB.trash,15)}Delete</button>`:''}</div>`}
 else h+=`<div class="hint">Sign in with edit mode to rename or change this bridge. · เข้าสู่ระบบโหมดแก้ไขเพื่อแก้ไขสะพาน</div><div class="act"><button data-br="login">Sign in · เข้าสู่ระบบ</button><button data-br="zoom">${SV(IB.target,15)}Locate</button></div>`;
 return h+'</div>'}
function offCard(b){return `<div class="brcard"><div class="brh"><span class="bri big">${SV(IB.road,24)}</span><div><b>${esc(b.def.name)}</b><small>Converted to a plain road · เปลี่ยนเป็นถนนแล้ว</small></div></div><div class="act"><button data-br="remake">${SV(IB.bridge,15)}Make it a bridge again</button><button data-br="zoom">${SV(IB.target,15)}Locate</button></div></div>`}
function render(){if(!BV)return;const A=all(),b=A.find(x=>x.key===sel),ed=canEdit(),a=document.activeElement,keep=a&&a.id==='br-n'?{v:a.value,s:a.selectionStart}:null;
 let h='<div class="lyw">';
 if(msg)h+=`<div class="mes-st"><small style="margin:0">${esc(msg)}</small></div>`;
 if(listMode&&!ed)h+=`<div class="mes-st d">Sign in to edit bridges · เข้าสู่ระบบโหมดแก้ไขเพื่อบันทึก<div class="act" style="margin-top:8px"><button data-br="login">Sign in</button></div></div>`;
 if(b)h+=b.off?offCard(b):card(b);
 else if(!listMode)h+=`<div class="hint">No bridge selected. · ยังไม่ได้เลือกสะพาน</div>`;
 if(listMode){const act=A.filter(x=>!x.off),off=A.filter(x=>x.off),f=x=>!q||(x.name+' '+x.rname+' '+x.wname).toLowerCase().includes(q.toLowerCase());
  h+=`<div class="trh">Bridges · สะพาน (${act.length} active${off.length?` · ${off.length} converted`:''})</div><label class="lysb">${SV(IB.road,16)}<input id="br-q" placeholder="Search bridges" value="${esc(q)}" autocomplete="off"></label>`;
  h+=act.filter(f).map(row).join('')||'<div class="hint">No crossings detected between roads and water yet. · ยังไม่พบจุดที่ถนนข้ามน้ำ</div>';
  if(off.length)h+=`<div class="trh">Converted to roads · เปลี่ยนเป็นถนน</div>`+off.filter(f).map(row).join('');
  if(ed)h+=`<div class="act" style="margin-top:10px"><button data-br="addhere">${SV(IB.plus,15)}Add bridge at map center</button></div>`}
 h+=`<div class="act" style="margin-top:12px"><button data-br="close">Close · ปิด</button></div></div>`;
 const top=BD.scrollTop;BD.innerHTML=h;BD.scrollTop=top;if(keep){const n=$('#br-n');if(n){n.value=keep.v;n.focus();try{n.setSelectionRange(keep.s,keep.s)}catch(_){}}}}
function frame(b){if(!b)return;const w=Math.max(160,Math.min(420,b.len*7));vb.w=w;vb.x=b.cx-w/2;vb.h=w*innerHeight/innerWidth;vb.y=b.cy-vb.h/2;upd()}
function openView(key,list){if(window.lyClose)window.lyClose();if(window.trClose)try{window.trClose()}catch(_){}try{FORM=null}catch(_){}
 BV=true;sel=key||sel;listMode=list||(listMode&&!key);if(key){const b=all().find(x=>x.key===key);if(b)frame(b)}msg='';setSt(Math.max(st,1));panel();render()}
function closeView(){if(!BV)return;BV=false;sel=null;for(const k in DR)delete DR[k];panel();try{drawPl()}catch(_){}}
/* ---------- save / convert ---------- */
const newId=()=>'br'+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
function upsertLocal(it){const i=PL.findIndex(x=>x.id===it.id);if(i>=0)PL[i]=it;else PL.push(it);try{lastChg=Date.now()}catch(_){}}
function recFor(b,br){const base=b.rec||{};const d=DR[b.key]||{};return{id:base.id||newId(),kind:'place',cat:'other',sub:'c:🌉',lvl:'local',rt:'local',nt:'',grp:'',curve:false,color:'',size:1,note:base.note||'',
 name:br===2?('ถนน (ไม่ใช่สะพาน) · '+(d.name||b.name)):((d.name!=null?d.name:b.name)||b.def.name),x:b.cx,y:b.cy,pts:[b.deck[0],b.deck[b.deck.length-1]],br,bz:br===1?bzc(d.bz!=null?d.bz:b.bz):0,bk:b.key}}
async function doSave(b,br){if(!canEdit()){$('#lg').hidden=false;return}const it=recFor(b,br);upsertLocal(it);delete DR[b.key];
 try{await push('upsert',it);msg=br===2?'Converted to road · เปลี่ยนเป็นถนนแล้ว':'Saved · บันทึกสะพานแล้ว'}catch(_){msg='Save failed · บันทึกไม่สำเร็จ'}
 sig='';try{drawPl()}catch(_){}render()}
async function doDelete(b){if(!b.rec)return;const id=b.rec.id;const i=PL.findIndex(x=>x.id===id);if(i>=0)PL.splice(i,1);delete DR[b.key];try{lastChg=Date.now()}catch(_){}
 try{await push('delete',{id,name:b.rec.name});msg='Reset · คืนค่าอัตโนมัติแล้ว'}catch(_){msg='Failed · ไม่สำเร็จ'}sig='';try{drawPl()}catch(_){}render()}
function addHere(){const c=wpos(innerWidth/2,innerHeight/2),roads=PL.filter(p=>p.kind==='road'&&p.pts&&p.pts.length>1&&!p.br);let best=null;
 roads.forEach(r=>{const P=pathPts(r),cum=cumOf(P),n=nearOn(P,cum,c[0],c[1]);if(!best||n.d<best.d)best={r,P,cum,...n}});
 if(!best||best.d*sc()>60){msg='No road near the map center · ไม่มีถนนใกล้กลางแผนที่';render();return}
 const s0=Math.max(0,best.s-12),s1=Math.min(best.cum[best.cum.length-1],best.s+12),a=at(best.P,best.cum,s0),b2=at(best.P,best.cum,s1),cc=at(best.P,best.cum,best.s),id=newId(),key='m:'+id;
 const it={id,kind:'place',cat:'other',sub:'c:🌉',lvl:'local',rt:'local',nt:'',grp:'',curve:false,color:'',size:1,note:'',name:'สะพาน'+(best.r.name?' '+best.r.name:''),x:cc[0],y:cc[1],pts:[a,b2],br:1,bz:BZ_DEF,bk:key};
 if(!canEdit()){$('#lg').hidden=false;return}upsertLocal(it);push('upsert',it);sig='';sel=key;msg='Bridge added · เพิ่มสะพานแล้ว';render()}
/* ---------- events ---------- */
BD.addEventListener('click',e=>{const t=e.target.closest('[data-br]');if(!t||!BV)return;const[a,v]=t.dataset.br.split(/:(.*)/s),b=all().find(x=>x.key===sel);
 if(a==='sel'){sel=v;const x=all().find(y=>y.key===v);if(x)frame(x);render()}
 else if(a==='save'&&b)doSave(b,1);else if(a==='toroad'&&b){if(confirm('Convert this bridge to a plain road? · เปลี่ยนสะพานนี้เป็นถนน?'))doSave(b,2)}
 else if(a==='remake'&&b)doDelete(b);else if(a==='reset'&&b)doDelete(b);else if(a==='del'&&b){if(confirm('Delete this bridge? · ลบสะพานนี้?'))doDelete(b)}
 else if(a==='zoom'&&b)frame(b);else if(a==='login'){$('#lg').hidden=false}
 else if(a==='addhere')addHere();else if(a==='close')closeView()});
BD.addEventListener('input',e=>{if(!BV)return;const t=e.target;
 if(t.id==='br-n'&&sel){(DR[sel]=DR[sel]||{}).name=t.value}
 else if(t.id==='br-h'&&sel){(DR[sel]=DR[sel]||{}).bz=bzc(t.value);const h=$('#br-hv');if(h)h.textContent=fmt(+t.value);sig='';try{window.trNeed&&trNeed();drawPl()}catch(_){}}
 else if(t.id==='br-q'){q=t.value;render();const n=$('#br-q');if(n){n.focus();n.setSelectionRange(q.length,q.length)}}});
const _pn=panel;panel=function(){if(BV&&FORM)BV=false;
 if(!BV){if(SR)SR.style.display='none';return _pn.apply(this,arguments)}
 tabUI();['#srow-main','#srow-addons','#srow-go','#srow-layers','#srow-terrain','#srow-mapedit'].forEach(s=>{const n=$(s);if(n)n.style.display='none'});SR.style.display='flex';render()};
const _gp=goPage;goPage=function(){if(BV)closeView();return _gp.apply(this,arguments)};
const _sl=select;select=function(){if(BV)closeView();return _sl.apply(this,arguments)};
const bk=$('#br-back');if(bk)bk.onclick=closeView;
/* /edit/bridge page */
const BRIDGE_PAGE=/\/edit\/bridge\/?$/.test(location.pathname)||/[?&]edit=bridge\b/.test(location.search)||/^#\/?(map\/?)?edit\/bridge/i.test(location.hash);
window.BRIDGE_PAGE=BRIDGE_PAGE;
if(BRIDGE_PAGE)setTimeout(()=>{openView(null,true)},700);
setInterval(()=>{if(BV&&canEdit()!==lastEd){lastEd=canEdit();render()}},500);let lastEd=canEdit();
})();
