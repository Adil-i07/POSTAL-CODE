/* ================= Traffic · การจราจร =================
 * - เส้นสีบนถนน: แดง=หนาแน่น → เหลือง=ปานกลาง → เขียว=คล่องตัว · ไม่มีเส้น = ว่าง
 * - เปิดพร้อม Transit ไม่ได้ · ไม่แสดงใน 3D (3D วาดบน canvas แยก)
 * - ข้อมูลเก็บต่อท้ายระเบียนถนนใน API Map Places (meta.tf) :
 *   tf = [{e:รหัสเหตุการณ์, a:เริ่ม(0-1), b:จบ(0-1), t0:เวลาเริ่มนับ(ms), l:สีเริ่มต้น r|y|g, s:[[นาที,สี r|y|g|n],…]}]
 * - /edit : ปุ่มไฟจราจรบนแถบแก้ไข → ลากสีบนถนน (ข้ามหลายถนนได้) → เสร็จ → กำหนด "อีกกี่นาทีจะเป็นสีอะไร" เรียงตามเวลา · แตะเส้นเพื่อแก้ไข
 */
(function(){
const LVN={r:'หนาแน่น',y:'ปานกลาง',g:'คล่องตัว',n:'ว่าง'},LVE={r:'🔴',y:'🟡',g:'🟢',n:'⚪'};
const PAL={r:['#ff1744','#ff6d3a'],y:['#ffd60a','#ffab2e'],g:['#12c764','#7df09a']};
const ORD={g:0,y:1,r:2};
const TFE={on:false,mode:'',pend:[],undo:[],drag:null,sel:null,dlg:null,tap:null};
const $q=s=>document.querySelector(s);
/* ---------- เรขาคณิตบนถนน (เส้นตรงระหว่างจุด) ---------- */
const geo=new Map();
function G(p){const sig=p.pts.length+':'+p.pts[0]+':'+p.pts[p.pts.length-1];let g=geo.get(p.id);if(g&&g.sig===sig)return g;
 const cum=[0];for(let i=1;i<p.pts.length;i++)cum.push(cum[i-1]+Math.hypot(p.pts[i][0]-p.pts[i-1][0],p.pts[i][1]-p.pts[i-1][1]));
 g={sig,cum,len:cum[cum.length-1]||1};geo.set(p.id,g);return g}
function proj(p,w){const g=G(p),P=p.pts;let b=null;
 for(let i=0;i<P.length-1;i++){const ax=P[i][0],ay=P[i][1],dx=P[i+1][0]-ax,dy=P[i+1][1]-ay,L2=dx*dx+dy*dy||1e-9;let t=((w[0]-ax)*dx+(w[1]-ay)*dy)/L2;t=Math.max(0,Math.min(1,t));
  const x=ax+dx*t,y=ay+dy*t,d=Math.hypot(w[0]-x,w[1]-y);if(!b||d<b.d)b={d,f:(g.cum[i]+Math.sqrt(L2)*t)/g.len,x,y}}return b}
function ptAt(p,f){const g=G(p),s=f*g.len;let i=1;while(i<g.cum.length-1&&g.cum[i]<s)i++;const L=g.cum[i]-g.cum[i-1]||1,t=Math.max(0,Math.min(1,(s-g.cum[i-1])/L));
 return[p.pts[i-1][0]+(p.pts[i][0]-p.pts[i-1][0])*t,p.pts[i-1][1]+(p.pts[i][1]-p.pts[i-1][1])*t]}
const roadsAll=()=>PL.filter(p=>p.kind==='road'&&p.pts&&p.pts.length>1);
/* ---------- ระดับ ณ ตอนนี้ ---------- */
function level(pc,now){const el=((now||Date.now())-pc.t0)/60000;let lv=pc.l;for(const st of(pc.s||[])){if(el>=st[0])lv=st[1];else break}return lv}
const expired=(pc,now)=>{const s=pc.s||[];if(!s.length)return false;const last=s[s.length-1];return last[1]==='n'&&((now||Date.now())-pc.t0)/60000>last[0]+5};
/* ---------- วาดบนแผนที่ 2D ---------- */
let gid=0;
window.tfHtml=function(s){
 if(!ADDONS.traffic&&!TFE.on)return'';
 const now=Date.now(),zf=Math.min(2.6,Math.max(1,Math.pow(1380/vb.w,.35))),r=R0(),vh=vb.w*r.height/r.width,m=vb.w*.12,
  vis=window.lyFilt?new Set(window.lyFilt(PL).map(p=>p.id)):null,items=[];
 const inView=p=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;for(const q of p.pts){if(q[0]<x0)x0=q[0];if(q[0]>x1)x1=q[0];if(q[1]<y0)y0=q[1];if(q[1]>y1)y1=q[1]}return!(x1<vb.x-m||x0>vb.x+vb.w+m||y1<vb.y-m||y0>vb.y+vh+m)};
 for(const p of PL){if(p.kind!=='road'||!p.tf||!p.tf.length||!p.pts||p.pts.length<2)continue;if(vis&&!vis.has(p.id))continue;if(!inView(p))continue;
  for(const pc of p.tf){const lv=level(pc,now);if(lv==='n'||!PAL[lv])continue;items.push({p,a:pc.a,b:pc.b,lv,e:pc.e,pend:0})}}
 const pend=TFE.pend.slice();if(TFE.drag){const D=TFE.drag;D.runs.concat(D.cur?[D.cur]:[]).forEach(u=>{if(u.max-u.min>.002)pend.push({id:u.p.id,a:u.min,b:u.max,l:TFE.mode})})}
 for(const q of pend){const p=PL.find(a=>a.id===q.id);if(p&&PAL[q.l])items.push({p,a:q.a,b:q.b,lv:q.l,e:'',pend:1})}
 items.sort((x,y)=>ORD[x.lv]-ORD[y.lv]);
 let h='';
 for(const it of items){const p=it.p,t=RT[p.rt]||RT.local,wpx=t.w*zf*(p.size||1),ow=Math.max(wpx*.6,3.2)/s,cw=ow+2.4/s,D=pathD(p.pts,p.curve),A=ptAt(p,it.a),B=ptAt(p,it.b),c=PAL[it.lv],id='tg'+(++gid),len=(it.b-it.a)*1000;
  const sel=TFE.sel&&it.e&&it.e===TFE.sel;
  h+=`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${A[0]}" y1="${A[1]}" x2="${B[0]}" y2="${B[1]}"><stop offset="0" stop-color="${c[0]}"/><stop offset=".5" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[0]}"/></linearGradient>`+
   `<path d="${D}" pathLength="1000" stroke="${sel?'#1c7ed6':'#fff'}" stroke-opacity="${sel?1:.88}" stroke-width="${sel?cw+3/s:cw}" stroke-dasharray="${len} 2000" stroke-dashoffset="${-it.a*1000}"/>`+
   `<path d="${D}" pathLength="1000" stroke="url(#${id})" stroke-opacity="${it.pend?.78:1}" stroke-width="${ow}" stroke-dasharray="${len} 2000" stroke-dashoffset="${-it.a*1000}"/>`}
 return`<g id="tfl" pointer-events="none" fill="none" stroke-linecap="round" stroke-linejoin="round">${h}</g>`};
function refresh(){const g=$q('#tfl');if(!g)return;g.outerHTML=window.tfHtml(sc())||'<g id="tfl"></g>'}
let rafR=0;const refreshSoon=()=>{if(!rafR)rafR=requestAnimationFrame(()=>{rafR=0;refresh()})};
setInterval(()=>{if(!document.hidden&&(ADDONS.traffic||TFE.on))refresh()},15000);
/* ---------- เปิด/ปิด · ไม่เปิดพร้อม Transit ---------- */
function tfSet(on,quiet){on=!!on;if(!!ADDONS.traffic===on)return;
 if(on&&ADDONS.fataekts){window.aoSet('fataekts',false);if(!quiet)toast('ปิด Transit แล้ว — เปิดพร้อม Traffic ไม่ได้')}
 ADDONS.traffic=on;saveAo();if(window.aoSync)try{aoSync()}catch(_){}drawPl()}
window.tfIsOn=()=>!!ADDONS.traffic;window.tfToggle=()=>tfSet(!ADDONS.traffic);
const _ao=window.aoSet;window.aoSet=function(k,on){if(k==='fataekts'&&on&&ADDONS.traffic){ADDONS.traffic=false;if(TFE.on)exitTf();saveAo();toast('ปิด Traffic แล้ว — เปิดพร้อม Transit ไม่ได้')}return _ao.apply(this,arguments)};
if(ADDONS.traffic&&(ADDONS.fataekts||window.FTEMB))ADDONS.traffic=false;
/* ---------- บันทึกลง API Map Places (ต่อท้ายระเบียนถนน) ---------- */
const prune=tf=>tf.filter(x=>!expired(x));
async function saveEvent(e,pieces,steps,t0){
 const by={};pieces.forEach(q=>(by[q.id]=by[q.id]||[]).push(q));
 const ids=new Set(Object.keys(by).concat(PL.filter(p=>p.tf&&p.tf.some(x=>x.e===e)).map(p=>p.id)));
 for(const id of ids){const p=PL.find(a=>a.id===id);if(!p)continue;
  let tf=(p.tf||[]).filter(x=>x.e!==e);(by[id]||[]).forEach(q=>tf.push({e,a:+q.a.toFixed(4),b:+q.b.toFixed(4),t0,l:q.l,s:steps.map(x=>[x[0],x[1]])}));
  const it={...p,tf:prune(tf)},n=PL.findIndex(a=>a.id===id);if(n>=0)PL[n]=it;await push('upsert',it)}
 drawPl()}
function eventData(e){const pcs=[];let steps=[],t0=Date.now();
 for(const p of PL){if(!p.tf)continue;for(const x of p.tf)if(x.e===e){pcs.push({id:p.id,a:x.a,b:x.b,l:x.l});steps=(x.s||[]).map(y=>[y[0],y[1]]);t0=x.t0}}
 return{e,pieces:pcs,steps,t0}}
/* ---------- กล่องกำหนดเวลา ---------- */
const dlg=document.createElement('div');dlg.id='tfm';dlg.hidden=true;document.body.appendChild(dlg);
function dlgRender(){const D=TFE.dlg;if(!D)return;
 const cnt={r:0,y:0,g:0};D.pieces.forEach(q=>cnt[q.l]=(cnt[q.l]||0)+1);
 const chips=['r','y','g'].filter(k=>cnt[k]).map(k=>`<span class="tfchip">${LVE[k]} ${LVN[k]} · ${cnt[k]} ช่วง</span>`).join('');
 const roads=new Set(D.pieces.map(q=>q.id)).size;
 const rows=D.steps.map((st,i)=>`<div class="tfrow"><span>อีก</span><input class="tfmin" type="number" inputmode="numeric" min="1" max="2880" step="1" value="${st[0]}" data-i="${i}"><span>นาที →</span><select class="tflv" data-i="${i}">${['r','y','g','n'].map(k=>`<option value="${k}"${st[1]===k?' selected':''}>${LVE[k]} ${LVN[k]}${k==='n'?' (ไม่มีเส้น)':''}</option>`).join('')}</select><button class="tfdel" data-del="${i}" aria-label="ลบ">✕</button></div>`).join('');
 const sorted=D.steps.slice().sort((a,b)=>a[0]-b[0]);
 const flow=['ตอนนี้'+' '+['r','y','g'].filter(k=>cnt[k]).map(k=>LVE[k]).join('')].concat(sorted.map(s=>`${s[0]} นาที ${LVE[s[1]]}`)).join(' → ');
 const el=D.edit?Math.max(0,Math.round((Date.now()-D.t0)/60000)):0;
 dlg.innerHTML=`<div class="tfc"><b>${D.edit?'แก้ไขการจราจร':'กำหนดเวลาการจราจร'}</b><small>${D.pieces.length} ช่วง · ${roads} ถนน${D.edit?` · เริ่มนับมาแล้ว ${el} นาที`:''}</small><div class="tfchips">${chips}</div>
 <p class="tfh2">ลำดับตามเวลา (นับจากเวลาเริ่มนับ) — เลือกว่าอีกกี่นาทีจะเป็นสีอะไร</p>${rows||'<div class="tfempty">ยังไม่มีลำดับ · สีจะคงอยู่จนกว่าจะแก้ไข</div>'}
 <button class="tfadd" id="tfadd" type="button">+ เพิ่มลำดับเวลา</button><div class="tfflow">${flow}</div>
 ${D.edit?'<label class="tfk"><input type="checkbox" id="tfrst"> เริ่มนับเวลาใหม่ตอนนี้</label>':''}
 <div class="tfbtn">${D.edit?'<button id="tfdelev" class="d" type="button">ลบ</button>':''}<button id="tfcan" type="button">ยกเลิก</button><button id="tfsave" class="p" type="button">บันทึก</button></div></div>`}
function dlgOpen(D){TFE.dlg=D;dlgRender();dlg.hidden=false}
function dlgClose(){TFE.dlg=null;dlg.hidden=true;TFE.sel=null;refresh()}
dlg.addEventListener('input',e=>{const D=TFE.dlg;if(!D)return;const i=+e.target.dataset.i;if(e.target.classList.contains('tfmin')){D.steps[i][0]=Math.max(1,Math.min(2880,Math.round(+e.target.value)||1));const f=dlg.querySelector('.tfflow');if(f)dlgRenderFlowOnly()}else if(e.target.classList.contains('tflv')){D.steps[i][1]=e.target.value;dlgRenderFlowOnly()}});
function dlgRenderFlowOnly(){const D=TFE.dlg;if(!D)return;const cnt={};D.pieces.forEach(q=>cnt[q.l]=1);const sorted=D.steps.slice().sort((a,b)=>a[0]-b[0]);const f=dlg.querySelector('.tfflow');if(f)f.textContent=['ตอนนี้ '+['r','y','g'].filter(k=>cnt[k]).map(k=>LVE[k]).join('')].concat(sorted.map(s=>`${s[0]} นาที ${LVE[s[1]]}`)).join(' → ')}
dlg.addEventListener('click',async e=>{const D=TFE.dlg;if(!D)return;const b=e.target.closest('button');if(!b){if(e.target===dlg)dlgClose();return}
 if(b.id==='tfadd'){const last=D.steps.length?Math.max(...D.steps.map(s=>s[0])):0;D.steps.push([last+10,D.steps.length?'g':'y']);dlgRender()}
 else if(b.dataset.del!==undefined){D.steps.splice(+b.dataset.del,1);dlgRender()}
 else if(b.id==='tfcan')dlgClose();
 else if(b.id==='tfdelev'){if(!b.dataset.c){b.dataset.c=1;b.textContent='กดอีกครั้งเพื่อลบ';return}b.disabled=true;await saveEvent(D.e,[],[],0);TFE.dlg=null;dlg.hidden=true;TFE.sel=null;toast('ลบแล้ว');refresh()}
 else if(b.id==='tfsave'){b.disabled=true;
  const m=new Map();D.steps.forEach(s=>m.set(s[0],s[1]));const steps=[...m.entries()].sort((a,b)=>a[0]-b[0]);
  const rst=dlg.querySelector('#tfrst'),t0=(!D.edit||(rst&&rst.checked))?Date.now():D.t0;
  await saveEvent(D.e,D.pieces,steps,t0);TFE.dlg=null;dlg.hidden=true;TFE.sel=null;if(!D.edit){TFE.pend=[];TFE.undo=[]}toast('บันทึก Traffic แล้ว');refresh()}});
/* ---------- แถบเครื่องมือ Traffic ---------- */
const bar=document.createElement('div');bar.id='tfp';bar.hidden=true;
bar.innerHTML='<div class="tfh1"><b>Traffic</b><small id="tfhint"></small></div><div class="tfr1"><button data-m="" class="a" title="เลื่อนแผนที่ / แตะเส้นเพื่อแก้ไข">✋</button><button data-m="r" title="แดง · หนาแน่น">🔴</button><button data-m="y" title="เหลือง · ปานกลาง">🟡</button><button data-m="g" title="เขียว · คล่องตัว">🟢</button><i></i><button id="tfu" title="ย้อนช่วงล่าสุด">↩︎</button><button id="tfc" title="ล้างที่ลากไว้">ล้าง</button><button id="tfd" class="p">เสร็จ</button><button id="tfx" title="ปิด">✕</button></div>';
document.body.appendChild(bar);
function hint(){$q('#tfhint').textContent=TFE.mode?`ลากนิ้วไปตามถนน (ข้ามหลายถนนได้) · ลากแล้ว ${TFE.pend.length} ช่วง · กด เสร็จ`:'แตะเส้นจราจรเพื่อแก้ไข · เลือกสี 🔴🟡🟢 แล้วลากบนถนน'}
function setMode(m){TFE.mode=m;bar.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('a',b.dataset.m===m));hint()}
bar.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.m!==undefined)setMode(b.dataset.m);
 else if(b.id==='tfu'){const n=TFE.undo.pop();if(n)TFE.pend.splice(-n,n);hint();refresh()}
 else if(b.id==='tfc'){TFE.pend=[];TFE.undo=[];hint();refresh()}
 else if(b.id==='tfx')exitTf();
 else if(b.id==='tfd'){if(!TFE.pend.length){toast('ยังไม่ได้ลากสีบนถนน');return}
  dlgOpen({e:'tf'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),pieces:TFE.pend.map(q=>({...q})),steps:[[30,'n']],t0:Date.now(),edit:false})}});
function enterTf(){if(!(ED.on&&ED.auth)){toast('เข้าโหมดแก้ไขก่อน');return}
 ED.tool=null;ED.pts=[];ED.msel=false;ED.sel=[];try{FORM=null}catch(_){}
 if(!ADDONS.traffic)tfSet(true);TFE.on=true;TFE.pend=[];TFE.undo=[];setMode('');bar.hidden=false;
 const b=$q('#edtf');if(b)b.classList.add('a');try{syncEd();panel()}catch(_){};toast('โหมดแก้ไข Traffic');refresh()}
function exitTf(){TFE.on=false;TFE.drag=null;TFE.pend=[];TFE.undo=[];TFE.sel=null;bar.hidden=true;dlg.hidden=true;TFE.dlg=null;const b=$q('#edtf');if(b)b.classList.remove('a');refresh()}
(function(){const b=$q('#edtf'),ed=$q('#ed');if(!b||!ed)return;
 b.addEventListener('click',e=>{e.stopPropagation();TFE.on?exitTf():enterTf()});
 ed.addEventListener('click',e=>{const x=e.target.closest('button');if(x&&x.id!=='edtf'&&TFE.on)exitTf()},true)})();
addEventListener('keydown',e=>{if(e.key==='Escape'&&TFE.on){if(TFE.dlg)dlgClose();else exitTf()}});
/* ---------- ลากบนถนน: เส้นตามถนนและข้ามหลายถนนได้ ---------- */
function feed(w){const D=TFE.drag,s=sc(),tol=16/s,stick=28/s;let cp=null;
 if(D.cur){const pr=proj(D.cur.p,w);if(pr.d<=stick)cp={p:D.cur.p,pr}}
 if(!cp){let b=null;for(const p of D.roads){const pr=proj(p,w);if(pr.d<=tol&&(!b||pr.d<b.pr.d))b={p,pr}}cp=b}
 if(!cp)return;
 if(D.cur&&D.cur.p.id!==cp.p.id){const pa=proj(D.cur.p,w);if(pa.d<=tol*3){D.cur.min=Math.min(D.cur.min,pa.f);D.cur.max=Math.max(D.cur.max,pa.f)}D.runs.push(D.cur);D.cur=null}
 if(!D.cur){D.cur={p:cp.p,min:cp.pr.f,max:cp.pr.f};if(D.last){const pb=proj(cp.p,D.last);if(pb.d<=tol*3){D.cur.min=Math.min(D.cur.min,pb.f);D.cur.max=Math.max(D.cur.max,pb.f)}}}
 D.cur.min=Math.min(D.cur.min,cp.pr.f);D.cur.max=Math.max(D.cur.max,cp.pr.f);D.last=w}
function finishDrag(){const D=TFE.drag;TFE.drag=null;if(!D)return;if(D.cur)D.runs.push(D.cur);let n=0;
 for(const u of D.runs){let a=u.min,b=u.max;if(b-a<.004)continue;if(a<.02)a=0;if(b>.98)b=1;TFE.pend.push({id:u.p.id,a,b,l:D.lv});n++}
 if(n)TFE.undo.push(n);else toast('ลากให้ตรงถนน');hint();refresh()}
function pick(w){const s=sc(),tol=16/s,now=Date.now();let best=null;
 for(const p of PL){if(p.kind!=='road'||!p.tf||!p.tf.length||!p.pts||p.pts.length<2)continue;const pr=proj(p,w);if(pr.d>tol)continue;
  const pc=p.tf.find(x=>pr.f>=x.a-.01&&pr.f<=x.b+.01&&level(x,now)!=='n');if(pc&&(!best||pr.d<best.d))best={d:pr.d,e:pc.e}}
 if(!best){toast('แตะบนเส้นจราจรที่ต้องการแก้ไข');return}
 const d=eventData(best.e);TFE.sel=best.e;refresh();dlgOpen({...d,edit:true})}
const od=svg.onpointerdown,om=svg.onpointermove,ou=svg.onpointerup;
svg.onpointerdown=e=>{
 if(TFE.on&&!TFE.dlg){
  if(TFE.mode&&e.isPrimary&&!TFE.drag&&(e.pointerType!=='mouse'||e.button===0)&&!(e.target.closest&&e.target.closest('.hd'))){
   e.preventDefault();try{svg.setPointerCapture(e.pointerId)}catch(_){}
   TFE.drag={id:e.pointerId,lv:TFE.mode,runs:[],cur:null,last:null,roads:roadsAll()};feed(wpos(e.clientX,e.clientY));refreshSoon();return}
  TFE.tap={x:e.clientX,y:e.clientY,t:performance.now(),id:e.pointerId}}
 if(TFE.drag&&e.pointerId!==TFE.drag.id){TFE.drag=null;refresh()}
 const r=od(e);if(TFE.on)clearTimeout(lpT);return r};
svg.onpointermove=e=>{if(TFE.drag&&e.pointerId===TFE.drag.id){const ev=e.getCoalescedEvents?e.getCoalescedEvents():[];(ev.length?ev:[e]).forEach(q=>feed(wpos(q.clientX,q.clientY)));refreshSoon();return}return om(e)};
svg.onpointerup=svg.onpointercancel=e=>{
 if(TFE.drag&&e.pointerId===TFE.drag.id){finishDrag();return}
 if(TFE.on&&TFE.tap&&e.pointerId===TFE.tap.id){const t=TFE.tap;TFE.tap=null;if(e.type==='pointerup'&&Math.hypot(e.clientX-t.x,e.clientY-t.y)<7&&performance.now()-t.t<450)pick(wpos(e.clientX,e.clientY))}
 return ou(e)};
svg.addEventListener('click',e=>{if(TFE.on){e.stopImmediatePropagation();e.preventDefault()}},true);
})();
