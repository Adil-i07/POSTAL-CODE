/* ===== ตัดสิ่งที่อยู่นอกจอออกจากการวาด (ข้อมูลยังอยู่ใน PL ครบ แค่ไม่วาดลง DOM) ===== */
function inCv(p,B,pad){if(p.id==='tmp'||(FORM&&FORM.p&&p.id===FORM.p.id))return true;let a,b,c,d;const P=p.pts;
 if(P&&P.length&&(p.kind==='road'||(p.kind==='nature'&&p.nt!=='mountain'))){a=c=P[0][0];b=d=P[0][1];for(let i=1;i<P.length;i++){const q=P[i];if(q[0]<a)a=q[0];else if(q[0]>c)c=q[0];if(q[1]<b)b=q[1];else if(q[1]>d)d=q[1]}}
 else{a=c=p.x;b=d=p.y}
 if(!(a===a&&b===b&&c===c&&d===d))return true;
 return c>=B.x0-pad&&a<=B.x1+pad&&d>=B.y0-pad&&b<=B.y1+pad}
const FBX=new WeakMap();
function fbox(i){let b=FBX.get(i);if(b)return b;let a=Infinity,c=Infinity,d=-Infinity,e=-Infinity;const f=(x,y)=>{if(x<a)a=x;if(x>d)d=x;if(y<c)c=y;if(y>e)e=y};
 (i.pts||[]).forEach(p=>f(p[0],p[1]));(i.stops||[]).forEach(p=>f(p.x,p.y));b=[a,c,d,e];FBX.set(i,b);return b}
function drawPl(){const s=sc(),W=vb.w,CVB=setCov(),PAD=40/s,FLT=!(ED.on&&ED.auth),MOB=innerWidth<900,MAXM=MOB?64:130,MAXR=MOB?130:240,pillOcc=[],mo=[],rlo=[],isFm=p=>!!(FORM&&FORM.p&&FORM.p.id===p.id),seen=p=>inCv(p,CVB,PAD),occ=OCC.slice(),hit=r=>occ.some(o=>r[0]<o[2]&&r[2]>o[0]&&r[1]<o[3]&&r[3]>o[1]),zf=Math.min(2.6,Math.max(1,Math.pow(1380/W,.35))),RD={c:[],f:[],t:[]},WT={c:[],f:[],t:[]};let nm=0,nr=0,hl='',dn={},gr='',bay='',defs='',mk='',pv='',hs='',fataekHtml='';
 const lab=(x,y,n,f0,r,style)=>{for(const k of[1,.78]){const f=f0*k,hw=n.length*.3*f,yy=y+r+f*.75,b=[x-hw,yy-f*.6,x+hw,yy+f*.6];if(!hit(b)){occ.push(b);return`<text x="${x}" y="${yy}" font-size="${f}" stroke-width="${3/sc()}" style="${style||''}">${n}</text>`}}return''};
 const pill=(x,y,t,f,bg,bd,col)=>{const w=(String(t).length*f*.58+16)/s,hh=(f+9)/s;{const pb=[x-w/2,y-hh/2,x+w/2,y+hh/2];if(MOB||FLT){if(pillOcc.some(o=>pb[0]<o[2]&&pb[2]>o[0]&&pb[1]<o[3]&&pb[3]>o[1]))return '';pillOcc.push(pb)}}return `<g pointer-events="none"><rect x="${x-w/2}" y="${y-hh/2}" width="${w}" height="${hh}" rx="${hh/2}" fill="${bg}" fill-opacity=".96" stroke="${bd}" stroke-width="${1.2/s}"/><text x="${x}" y="${y}" font-size="${f/s}" text-anchor="middle" dominant-baseline="central" font-weight="700" fill="${col}">${esc(t)}</text></g>`};

 if(gridOn()){const st=gstep(),x0=Math.floor(vb.x/st),y0=Math.floor(vb.y/st);for(let i=x0;i*st<=vb.x+vb.w;i++)gr+=`<line class="gl${i%5===0?' m':''}" x1="${i*st}" y1="${vb.y}" x2="${i*st}" y2="${vb.y+vb.h}"/>`;for(let i=y0;i*st<=vb.y+vb.h;i++)gr+=`<line class="gl${i%5===0?' m':''}" x1="${vb.x}" y1="${i*st}" x2="${vb.x+vb.w}" y2="${i*st}"/>`}

 // วาดเส้นทาง FATAEKTS บนแผนที่
 if(ADDONS.fataekts && fataekRoutes.length) {
   fataekRoutes.forEach(i => {
     if(!ADDONS.fataekTypes[i.type]) return;
      {const fb=fbox(i);if(isFinite(fb[0])&&!(fb[2]>=CVB.x0-PAD&&fb[0]<=CVB.x1+PAD&&fb[3]>=CVB.y0-PAD&&fb[1]<=CVB.y1+PAD))return;}
     const T = FATAEK_TYPES[i.type] || { c:'#015caf', s:'จุดรับส่ง', e:'📍' };
     const c = i.color || T.c;

     if(i.type === 'toll') {
       const p = i.pts[0]; if(!p) return;
       const scVal = 1 / s;
       fataekHtml += `<g style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.4))"><circle cx="${p[0]}" cy="${p[1]}" r="${16/s}" fill="transparent"/>`+
         `<g transform="translate(${p[0]} ${p[1]}) scale(${scVal})"><path d="M0 0C-9-11-14-17-14-24a14 14 0 1 1 28 0c0 7-5 13-14 24z" fill="${c}" stroke="#fff" stroke-width="2.5"/><circle cy="-24" r="9" fill="#fff"/>`+
         `<text y="-23.5" font-size="12" font-weight="800" text-anchor="middle" dominant-baseline="central" fill="${c}" pointer-events="none">E</text></g></g>`;
       if(W < 1100) fataekHtml += pill(p[0], p[1] - (52/s), (i.price!==''?i.price:'?')+' เจ๋ง', 11.5, c, '#fff', '#fff');
       if(W < 500) fataekHtml += `<text x="${p[0]}" y="${p[1]-(70/s)}" font-size="${11.5/s}" text-anchor="middle" font-weight="600" style="paint-order:stroke;stroke:#fff;stroke-width:${3/s};fill:${c}">${esc(i.name||'')}</text>`;
       return;
     }

     if(i.pts && i.pts.length > 1) {
       const pl = i.pts.map(p => p.join(',')).join(' '), dash = i.type === 'boat' ? ` stroke-dasharray="${11/s} ${7/s}"` : '';
       fataekHtml += `<g><polyline points="${pl}" fill="none" stroke="#fff" stroke-opacity=".92" stroke-width="${4.2/s}" stroke-linecap="round" stroke-linejoin="round"/>`+
         `<polyline points="${pl}" fill="none" stroke="${c}" stroke-width="${2/s}" stroke-linecap="round" stroke-linejoin="round"${dash}/></g>`;
       if(W < 1000 && i.name) {
         const m = i.pts[i.pts.length >> 1];
         fataekHtml += pill(m[0], m[1] - (16/s), i.name, 11, c, '#fff', '#fff');
       }
     }

     if(i.stops) {
       i.stops.map((s_,n_)=>[s_,n_]).sort((a_,b_)=>((b_[1]===0||b_[1]===i.stops.length-1)?1:0)-((a_[1]===0||a_[1]===i.stops.length-1)?1:0)).forEach(([st, n]) => {
         const end = n === 0 || n === i.stops.length - 1, r = (end ? 9.5 : 4.2) / s;
         fataekHtml += `<g style="filter:drop-shadow(0 2px 3px rgba(0,0,0,.38))"><circle cx="${st.x}" cy="${st.y}" r="${r+3/s}" fill="#fff"/>`+
           `<circle cx="${st.x}" cy="${st.y}" r="${r}" fill="${end?c:'#fff'}" stroke="${c}" stroke-width="${(end?0:2)/s}"/>`+
           (end ? `${window.emjG(T.e,st.x,st.y,12/s,c)||`<text x="${st.x}" y="${st.y}" font-size="${12/s}" text-anchor="middle" dominant-baseline="central" pointer-events="none">${T.e}</text>`}` : `<circle cx="${st.x}" cy="${st.y}" r="${r*.34}" fill="${c}"/>`) + `</g>`;
         if(W < (end ? 900 : 650) && st.n) fataekHtml += pill(st.x, st.y + (end ? 25 : 19)/s, st.n, 10.5, '#fff', c, '#2a3a2a');
       });
     }
   });
 }

 if(!ADDONS.mapPlaces) { $('#pl').innerHTML = fataekHtml; return; }
 const list=PL.slice();if(roadEditing()&&FORM.p.pts&&FORM.p.pts.length>1){const k=list.findIndex(a=>a.id===FORM.p.id);k<0?list.push({...FORM.p,id:'tmp'}):list[k]=FORM.p}
 list.filter(p=>p.kind==='nature'&&p.nt==='bay'&&p.pts&&p.pts.length>=3&&seen(p)).forEach(p=>{const D=pathC(p.pts,p.curve),n=esc(p.name||''),col=p.color||'var(--wt)',st=p.color?`color-mix(in srgb,${p.color} 60%,#000)`:'var(--wtc)',cx=p.pts.reduce((a,q)=>a+q[0],0)/p.pts.length,cy=p.pts.reduce((a,q)=>a+q[1],0)/p.pts.length;
  bay+=`<g class="pm" data-id="${p.id}"><path d="${D}" style="fill:${col};fill-opacity:.78;stroke:${st};pointer-events:none" stroke-width="${2/s}" stroke-linejoin="round"/><path d="${D}" fill="none" stroke="transparent" stroke-width="${12/s}" style="pointer-events:stroke"/></g>`;
  if(n)mk+=lab(cx,cy,n,12*(p.size||1)/s,-6/s,'font-style:italic')});
 list.filter(p=>isLine(p)&&p.pts&&p.pts.length>1&&seen(p)).sort((a,b)=>tOf(b).k-tOf(a).k||(b.size||1)-(a.size||1)).forEach(p=>{const t=tOf(p)||RT.local,A=p.kind==='road'?RD:WT;if(W>t.vw&&!(FORM&&FORM.p.id===p.id))return;if(QK&&t.k<3&&p.kind==='road'&&!isFm(p))return;
  const wpx=t.w*zf*(p.size||1),w=wpx/s,D=pathD(p.pts,p.curve),n=esc(p.name||''),pts=p.pts[p.pts.length-1][0]<p.pts[0][0]?p.pts.slice().reverse():p.pts,id='rp'+p.id;let L=0;for(let i=1;i<pts.length;i++)L+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
  if(FLT&&!isFm(p)&&(L*s<4||++nr>MAXR))return;
  const cs=p.color?`color-mix(in srgb,${p.color} 55%,#000)`:t.cs,cf=p.color||t.c;
  if(ED.msel&&ED.sel.includes(p.id))hl+=`<path d="${D}" fill="none" stroke="#ff922b" stroke-opacity=".75" stroke-width="${w+9/s}" stroke-linecap="round" stroke-linejoin="round"/>`;
  A.c.push(`<path d="${D}" fill="none" style="stroke:${cs}" stroke-width="${w+2.4/s}" stroke-linecap="round" stroke-linejoin="round"/>`);
  A.f.push(`<g class="pm" data-id="${p.id}"><path d="${D}" fill="none" stroke="transparent" stroke-width="${Math.max(wpx,16)/s}" stroke-linecap="round"/><path d="${D}" fill="none" style="stroke:${cf}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/></g>`);
  const fp=wpx*.62;if(n&&fp>=6&&L*s>=n.length*fp*.55+12&&!(p.grp&&dn[p.grp])&&(()=>{if(!FLT)return true;const m=pts[pts.length>>1],h=Math.max(n.length*fp*.3,fp)/s,b=[m[0]-h,m[1]-h,m[0]+h,m[1]+h];if(rlo.some(o=>b[0]<o[2]&&b[2]>o[0]&&b[1]<o[3]&&b[3]>o[1]))return false;rlo.push(b);return true})()){if(p.grp)dn[p.grp]=1;defs+=`<path id="${id}" d="${pathD(pts,p.curve)}" fill="none"/>`;A.t.push(`<text style="font-size:${fp/s}px;fill:${t.tc||'#3a3a3a'};stroke:none;font-weight:600"><textPath href="#${id}" startOffset="50%">${n}</textPath></text>`)}});
 PL.filter(p=>(p.kind==='place'||(p.kind==='nature'&&p.nt==='mountain'))&&W<=(LV[p.lvl]||LV.local).w&&(!QK||(LV[p.lvl]||LV.local).k>=3||isFm(p))&&seen(p)).sort((a,b)=>(LV[b.lvl]||LV.local).k-(LV[a.lvl]||LV.local).k||(b.size||1)-(a.size||1)).forEach(p=>{
  const L=LV[p.lvl]||LV.local,c=catOf(p.cat),sz=p.size||1,r=L.r*sz/s,n=esc(p.name||''),mt=p.kind==='nature';
  if(FLT&&!isFm(p)){const kk_=MOB?1.3:.85,bx=[p.x-r*kk_,p.y-r*kk_,p.x+r*kk_,p.y+r*kk_];if(++nm>MAXM||mo.some(o=>bx[0]<o[2]&&bx[2]>o[0]&&bx[1]<o[3]&&bx[3]>o[1]))return;mo.push(bx)}
  occ.push([p.x-r,p.y-r,p.x+r,p.y+r]);
  if(mt){const q=r*1.25,col=p.color||'#8d6e63';mk+=`<g class="pm" data-id="${p.id}"><circle cx="${p.x}" cy="${p.y}" r="${q+6/s}" fill="transparent"/><path d="M${p.x-q} ${p.y+q*.7}L${p.x} ${p.y-q}L${p.x+q} ${p.y+q*.7}Z" fill="${col}" stroke="#fff" stroke-width="${1.6/s}" stroke-linejoin="round"/><path d="M${p.x-q*.32} ${p.y-q*.35}L${p.x} ${p.y-q}L${p.x+q*.32} ${p.y-q*.35}L${p.x+q*.1} ${p.y-q*.2}L${p.x-q*.12} ${p.y-q*.3}Z" fill="#fff"/></g>`}
  else mk+=`<g class="pm" data-id="${p.id}"><circle cx="${p.x}" cy="${p.y}" r="${r+6/s}" fill="transparent"/><circle cx="${p.x}" cy="${p.y}" r="${r}" fill="${p.color||c[3]}" stroke="#fff" stroke-width="${2/s}"/>${r*s>=8?`${window.emjPin(p,r)||`<text x="${p.x}" y="${p.y}" font-size="${r*((icOf(p)&&icSeg(icOf(p)).length>1)?.8:1.15)}" style="stroke:none">${esc(pinIc(p))}</text>`}`:''}</g>`;
  if(n)mk+=lab(p.x,p.y,n,L.f*sz/s,mt?r*1.1:r)});
 if(ED.pts.length)pv=`<path d="${pathD(ED.pts,ED.curve)}" fill="none" stroke="#1c7ed6" stroke-width="${3/s}" stroke-dasharray="${6/s} ${5/s}"/>`+ED.pts.map(a=>`<circle cx="${a[0]}" cy="${a[1]}" r="${4.5/s}" fill="#fff" stroke="#1c7ed6" stroke-width="${2/s}"/>`).join('');
 if(pin)pv+=`<g transform="translate(${pin.x} ${pin.y}) scale(${1/s})"><path d="M0 0C-8-10-12-16-12-22a12 12 0 1 1 24 0c0 6-4 12-12 22z" fill="#1c7ed6" stroke="#fff" stroke-width="2"/><circle cy="-22" r="4.5" fill="#fff"/></g>`;
 if(roadEditing()&&FORM.p.pts&&FORM.p.pts.length>1){const P=FORM.p.pts,cl=FORM.p.kind==='nature'&&FORM.p.nt==='bay';P.forEach((a,i)=>{if(i<P.length-1||cl){const b=P[(i+1)%P.length];hs+=`<circle class="md" data-i="${i}" cx="${(a[0]+b[0])/2}" cy="${(a[1]+b[1])/2}" r="${5/s}" fill="#fff" stroke="#1c7ed6" stroke-width="${1.5/s}"/>`}});
  P.forEach((a,i)=>hs+=`<circle class="hd" data-i="${i}" cx="${a[0]}" cy="${a[1]}" r="${8/s}" fill="${i===0||i===P.length-1?'#1c7ed6':'#fff'}" stroke="#1c7ed6" stroke-width="${2.5/s}"/>`)}
 $('#pl').innerHTML=`<defs>${defs}</defs>`+bay+gr+WT.c.reverse().join('')+WT.f.reverse().join('')+WT.t.join('')+hl+RD.c.reverse().join('')+RD.f.reverse().join('')+RD.t.join('')+(window.tfHtml?tfHtml(s):'')+mk+(fataekHtml?`<g id="ftl" pointer-events="none">${fataekHtml}</g>`:'')+pv+hs}
function showPc(){const c=$('#pc');if(!pin){c.hidden=true;return}const w=whereAt(pin.x,pin.y),t=!w?'นอกพื้นที่':w[1]==null?DATA[w[0]].provName:DATA[w[0]].entries[w[1]].name+' · '+DATA[w[0]].provName;
 c.hidden=false;c.innerHTML=`<span style="padding-left:10px;line-height:1.25"><b>${pin.x}, ${pin.y}</b><br><small style="color:var(--mut)">${esc(t)}</small></span><button data-a="cp" aria-label="คัดลอกพิกัด">${I.cp}</button><button data-a="sh" aria-label="แชร์พิกัด">${I.link}</button>${ED.on&&ED.auth?'<button data-a="add" aria-label="เพิ่มสถานที่"><svg class="i" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>':''}<button data-a="rm" aria-label="เอาหมุดออก"><svg class="i" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>`}
function addPin(w){pin={x:w[0],y:w[1]};try{navigator.vibrate&&navigator.vibrate(15)}catch(_){}drawPl();showPc()}
$('#pc').onclick=e=>{const b=e.target.closest('[data-a]');if(!b||!pin)return;const a=b.dataset.a;
 if(a==='cp')copy(pin.x+', '+pin.y,'คัดลอกพิกัดแล้ว');else if(a==='sh')shareLink(baseUrl()+HX()+'p='+pin.x+','+pin.y+viewQ());else if(a==='add')openForm({kind:'place',x:pin.x,y:pin.y});else{pin=null;showPc();drawPl()}};
// ฟอร์มสถานที่
const plText=p=>{const c=catOf(p.cat),sb=(c[5].find(a=>a[0]===p.sub)||[])[1]||'';return p.name+' '+(p.note||'')+' '+(p.kind==='road'?(RT[p.rt]||RT.local).n:p.kind==='nature'?(NT[p.nt]||{n:''}).n+' ธรรมชาติ natural':c[1]+' '+c[2]+' '+sb+' '+(LV[p.lvl]||LV.local).n)};
const placeRow=p=>{const rd=p.kind==='road',nt=p.kind==='nature',c=catOf(p.cat);return`<div class="it" data-pl="${p.id}"><span style="font-size:18px;width:20px;text-align:center">${rd?'🛣️':nt?(NT[p.nt]||{e:'🌿'}).e:esc(pinIc(p))}</span><div class="t"><b>${esc(p.name)}</b><small>${rd?(RT[p.rt]||RT.local).n:nt?(NT[p.nt]||{n:'ธรรมชาติ'}).n:c[1]}</small></div></div>`};
const opt=(a,v)=>a.map(x=>`<option value="${x[0]}"${x[0]===v?' selected':''}>${x[1]}</option>`).join('');
function openForm(p){tab=1;FORM={p:{name:'',note:'',lvl:'local',cat:'food',sub:'restaurant',rt:'secondary',size:1,color:'',curve:false,...p},isNew:!p.id};ED.tool=null;ED.pts=[];syncEd();setSt(1);panel();$('#body').scrollTop=0}
function showPlace(id){window.xClear&&xClear();const p=PL.find(a=>a.id===id);if(!p)return;FORM={p:{...p},isNew:false};addRc(id);tab=1;setSt(1);
 const b=hasPts(p)&&p.pts&&p.pts.length>1?bb([p.pts.map(a=>a.join(',')).join(' ')]):{x:p.x-30,y:p.y-30,w:60,h:60};fit(b,hasPts(p)?1.6:1);panel();$('#body').scrollTop=0}
function syncForm(){const p=FORM.p,g=id=>{const e=$('#'+id);return e?e.value:undefined},v={name:g('fn'),note:g('fnote'),rt:g('frt'),lvl:g('flv'),cat:g('fcat'),sub:g('fsub')};
 const oldIc=icOf(p);for(const k in v)if(v[k]!==undefined)p[k]=v[k];if(p.cat==='other'&&p.sub==='custom'){const fi=g('fic');p.sub='c:'+(icClip(fi!==undefined?fi:oldIc)||'📍')}const f=g('fk');if(f!==undefined){if(['river','canal','bay','mountain'].includes(f)){p.kind='nature';p.nt=f}else p.kind=f}const cv=g('fcurve');if(cv!==undefined){p.curve=cv==='1';ED.curve=p.curve}const z=g('fsz');if(z)p.size=z/100;const c=catOf(p.cat);if(!c[5].some(a=>a[0]===p.sub)&&!icOf(p))p.sub=c[5][0][0]}
function tabUI(){const t=$('#tth');if(!t)return;t.style.transform=`translateX(${tab*100}%)`;$('#tabs').querySelectorAll('button').forEach(b=>b.classList.toggle('a',+b.dataset.t===tab))}
function setTab(n){if(tab===n&&!qi.value)return;tab=n;FORM=null;qi.value='';panel()}
function stag(B){[...B.children].forEach((c,i)=>c.style.animationDelay=Math.min(i,14)*30+'ms')}
function mapList(){if(!loaded)return'<div class="sk"></div>'.repeat(4);if(!PL.length)return`<div class="em"><p>ยังไม่มีสถานที่บนแผนที่</p><small>เข้าโหมดแก้ไข (/edit) เพื่อเพิ่มร้าน ถนน และธรรมชาติ</small></div>`;
 const G=[['สถานที่',p=>p.kind==='place'],['ถนน',(p,i,a)=>p.kind==='road'&&(!p.grp||a.findIndex(x=>x.grp===p.grp)===i)],['ธรรมชาติ',p=>p.kind==='nature']];
 return G.map(([t,f])=>{const a=PL.filter(f);return a.length?`<h3>${t} (${a.length})</h3>`+a.map(placeRow).join(''):''}).join('')}
let tx0=0,ty0=0;$('#body').addEventListener('touchstart',e=>{tx0=e.touches[0].clientX;ty0=e.touches[0].clientY},{passive:true});
$('#body').addEventListener('touchend',e=>{const t=e.changedTouches[0],dx=t.clientX-tx0,dy=t.clientY-ty0;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.6&&!FORM&&!ED.msel)setTab(dx<0?1:0)});
function mergeHtml(){const rs=ED.sel.map(id=>PL.find(a=>a.id===id)).filter(Boolean);
 return`<h2>รวมถนนสายเดียว</h2><p style="margin:0 6px 8px;color:var(--mut);font-size:13px">แตะถนนบนแผนที่เพื่อเลือก/ยกเลิก — เลือกแล้ว ${rs.length} เส้น</p>`+(rs.length?`<div class="fm"><label>ชื่อถนนสาย<input id="mgn" value="${esc((rs.find(a=>a.name)||{name:''}).name)}" placeholder="เช่น ถนนประชาธิป"></label><label>ประเภทถนน<select id="mgt">${opt([['keep','คงประเภทเดิมของแต่ละเส้น'],...Object.entries(RT).map(([k,v])=>[k,'ตั้งทั้งสายเป็น '+v.n])],'keep')}</select></label></div><div class="act"><button data-mg="join">รวมเป็นสายเดียว</button><button data-mg="split">แยกออกจากสาย</button><button data-mg="clear">ล้างที่เลือก</button></div>`:'')+rs.map(p=>`<div class="it"><span>🛣️</span><div class="t"><b>${esc(p.name||'(ไม่มีชื่อ)')}</b><small>${(RT[p.rt]||RT.local).n}${p.grp?' · อยู่ในสายแล้ว':''}</small></div></div>`).join('')}
$('#body').addEventListener('click',async e=>{const b=e.target.closest('[data-mg]');if(!b||!ED.msel)return;const rs=ED.sel.map(id=>PL.find(a=>a.id===id)).filter(Boolean),m=b.dataset.mg;
 if(m==='clear'){ED.sel=[];drawPl();panel();return}
 if(m==='join'){if(rs.length<2)return toast('เลือกอย่างน้อย 2 เส้น');const nm=$('#mgn').value.trim(),tp=$('#mgt').value;if(!nm)return toast('ใส่ชื่อสายถนนก่อน');
  const gid=(rs.find(a=>a.grp)||{}).grp||'g'+Date.now().toString(36);rs.forEach(p=>p.grp=gid);const all=PL.filter(a=>a.grp===gid);all.forEach(p=>{p.name=nm;if(tp!=='keep')p.rt=tp});
  drawPl();panel();toast('รวมเป็นสายเดียวแล้ว');for(const p of all)await push('upsert',p)}
 else if(m==='split'){rs.forEach(p=>p.grp='');drawPl();panel();toast('แยกออกจากสายแล้ว');for(const p of rs)await push('upsert',p)}});
const fkv=p=>p.kind==='nature'?p.nt:p.kind;
function formHtml(){const p=FORM.p,ed=ED.on&&ED.auth,hp=hasPts(p),pl=p.kind==='place',mt=p.kind==='nature'&&p.nt==='mountain',c=catOf(p.cat),sb=(c[5].find(a=>a[0]===p.sub)||[])[1]||(icOf(p)?'กำหนดเอง':''),bk=`<div style="padding:0 4px"><span class="bk" data-fx="1">${I.back}กลับ</span></div>`;
 if(!ed)return bk+`<h2>${esc(p.name)}</h2><div class="chips">${pl?`<span>${esc(pinIc(p))} ${c[1]}</span><span>${sb}</span>`:`<span>${p.kind==='road'?(RT[p.rt]||RT.local).n:(NT[p.nt]||{n:''}).n}</span>`}${pl||mt?`<span>${(LV[p.lvl]||LV.local).n}</span>`:''}<span>${p.x}, ${p.y}</span></div>${p.note?`<p style="margin:0 6px 10px;color:var(--mut)">${esc(p.note)}</p>`:''}<div class="act"><button data-pcp="1">${I.cp}คัดลอกพิกัด</button><button data-psh="1">${I.link}แชร์</button></div>`;
 const dc=p.kind==='road'?(RT[p.rt]||RT.local).c:pl?c[3]:mt?'#8d6e63':'#8ec9ee',ab=k=>ED.ext===k?' style="background:var(--ac);color:#fff"':'';
 return bk+`<h2>${FORM.isNew?'เพิ่ม':'แก้ไข'}${pl?'สถานที่':'รายการ'}</h2><div class="fm"><label>ชื่อ<input id="fn" value="${esc(p.name||'')}" placeholder="เช่น ร้านก๋วยเตี๋ยว / ถนนประชาธิป / คลองเจ๋ง"></label>
<label>ชนิด<select id="fk">${opt([['place','สถานที่ (หมุด)'],['road','ถนน (เส้น)'],['river','แม่น้ำ (เส้น)'],['canal','คลอง (เส้น)'],['bay','อ่าว/พื้นน้ำ (พื้นที่)'],['mountain','ภูเขา (หมุด)']],fkv(p))}</select></label>`+
 (p.kind==='road'&&p.grp?`<small style="color:var(--mut)">ถนนสายเดียวกับอีก ${PL.filter(a=>a.grp===p.grp&&a.id!==p.id).length} เส้น — แก้ชื่อจะเปลี่ยนทั้งสาย</small>`:'')+(p.kind==='road'?`<label>ประเภทถนน<select id="frt">${opt(Object.entries(RT).map(([k,v])=>[k,v.n]),p.rt)}</select></label>`:'')+
 (hp?`<label>รูปแบบเส้น<select id="fcurve">${opt([['0','เส้นตรง (ล็อกตามกริด)'],['1','เส้นโค้งผ่านจุดกริด']],p.curve?'1':'0')}</select></label><div class="act" style="margin:0 0 2px"><button data-ext="end"${ab('end')}>ต่อปลายท้าย</button><button data-ext="start"${ab('start')}>ต่อปลายต้น</button><button data-trim="end">ตัดจุดท้าย</button><button data-trim="start">ตัดจุดต้น</button></div>`:'')+
 (pl||mt?`<label>ระดับการแสดงผล / ขนาด<select id="flv">${opt(Object.entries(LV).map(([k,v])=>[k,v.n]),p.lvl)}</select></label>`:'')+
 (pl?`<label>หมวดหมู่หลัก<select id="fcat">${opt(CATS.map(a=>[a[0],a[4]+' '+a[1]+' · '+a[2]]),p.cat)}</select></label><label>ประเภทสถานที่ย่อย<select id="fsub">${opt(p.cat==='other'?c[5].concat([['custom','✏️ กำหนดเอง (อิโมจิ/อักษร 1–2 ตัว)']]):c[5],icOf(p)?'custom':p.sub)}</select></label>${icOf(p)?`<div class="icp"><div class="r"><span id="icpv">${esc(icOf(p))}</span><input id="fic" value="${esc(icOf(p))}" maxlength="12" placeholder="พิมพ์อิโมจิ หรืออักษร 1–2 ตัว" autocomplete="off"></div><div class="icg">${IC_PAL.map(e=>`<button type="button" data-ic="${e}">${e}</button>`).join('')}</div></div>`:''}`:'')+
 `<label>${pl||mt?'ขนาดหมุด':p.nt==='bay'?'ขนาดข้อความ':'ความกว้างเส้น'} <b id="fszv">${Math.round((p.size||1)*100)}%</b><input id="fsz" type="range" min="50" max="250" step="10" value="${Math.round((p.size||1)*100)}"></label>
<label>สี<div class="row2"><input id="fc" type="color" value="${p.color||dc}"><div class="act" style="margin:0"><button data-fcr="1">ค่าเริ่มต้น</button></div></div></label>
<label>หมายเหตุ<textarea id="fnote" rows="3">${esc(p.note||'')}</textarea></label><small id="fcnt" style="color:var(--mut)">${hp?(p.pts?p.pts.length:0)+' จุด':p.x+', '+p.y}</small></div><div class="act"><button data-fsave="1">บันทึก</button>${FORM.isNew?'':'<button data-fdel="1">ลบ</button>'}</div>`}
function saveForm(){syncForm();const p=FORM.p,hp=hasPts(p);if(!p.name.trim())return toast('ใส่ชื่อก่อน');if(hp&&!(p.pts&&p.pts.length>=minPts(p)))return toast('ต้องวาดเส้น/รูปร่างก่อน (ใช้เครื่องมือบนแถบด้านบน)');
 const it={id:p.id||'p'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),kind:p.kind,nt:p.nt||'',name:p.name.trim(),note:(p.note||'').trim(),x:hp?p.pts[0][0]:p.x,y:hp?p.pts[0][1]:p.y,pts:hp?p.pts:[],curve:!!p.curve,lvl:p.lvl,cat:p.cat,sub:p.sub,rt:p.rt,grp:p.grp||'',color:p.color||'',size:p.size||1,tf:p.tf||[]},n=PL.findIndex(a=>a.id===it.id);
 n<0?PL.push(it):PL[n]=it;FORM=null;push('upsert',it);PL.filter(a=>it.grp&&a.grp===it.grp&&a.id!==it.id&&a.name!==it.name).forEach(a=>{a.name=it.name;push('upsert',a)});drawPl();panel()}
function delForm(b){if(!b.dataset.c){b.dataset.c=1;b.textContent='กดอีกครั้งเพื่อลบ';return}const p=FORM.p;PL=PL.filter(a=>a.id!==p.id);FORM=null;push('delete',p);drawPl();panel()}
$('#body').addEventListener('change',e=>{if(FORM&&(e.target.id==='fk'||e.target.id==='fcat'||e.target.id==='fcurve'||(e.target.id==='fsub'&&(e.target.value==='custom'||icOf(FORM.p))))){syncForm();panel()}
 if(FORM&&e.target.id==='fic'){e.target.value=icClip(e.target.value)||e.target.value.slice(0,0)}});
$('#body').addEventListener('input',e=>{if(FORM&&e.target.id==='fic'){const v=icClip(e.target.value);FORM.p.sub='c:'+(v||'📍');const pv=$('#icpv');if(pv)pv.textContent=v||'📍'}});
$('#body').addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-ic]');if(!b||!FORM)return;const i=$('#fic');if(!i)return;i.value=b.dataset.ic;FORM.p.sub='c:'+b.dataset.ic;const pv=$('#icpv');if(pv)pv.textContent=b.dataset.ic});
$('#body').addEventListener('input',e=>{if(!FORM)return;if(e.target.id==='fc')FORM.p.color=e.target.value;if(e.target.id==='fsz')$('#fszv').textContent=e.target.value+'%'});
$('#body').addEventListener('click',e=>{if(!FORM)return;const x=e.target.closest('[data-ext]'),t=e.target.closest('[data-trim]');
 if(e.target.closest('[data-fcr]')){syncForm();FORM.p.color='';panel()}
 else if(x){syncForm();ED.ext=ED.ext===x.dataset.ext?null:x.dataset.ext;if(ED.ext)toast('แตะแผนที่เพื่อต่อเส้น (กดปุ่มเดิมอีกครั้งเพื่อหยุด)');panel()}
 else if(t){const P=FORM.p.pts;if(P.length<=minPts(FORM.p))return toast('ต้องเหลืออย่างน้อย '+minPts(FORM.p)+' จุด');t.dataset.trim==='end'?P.pop():P.shift();syncForm();panel()}});
// ซิงค์กับ Google Apps Script (โพลลิ่งต่อเนื่อง)
const post=(b,pw=PW)=>fetch(API,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({...b,pw})}).then(r=>r.json());
const wire=it=>({id:it.id,kind:it.kind,name:it.name,note:it.note||'',x:it.x,y:it.y,pts:it.pts||[],meta:{grp:it.grp||'',nt:it.nt||'',curve:!!it.curve,lvl:it.lvl,cat:it.cat,sub:it.sub,rt:it.rt,color:it.color||'',size:it.size||1,br:it.br||0,bz:it.bz||0,bk:it.bk||'',tf:(it.tf&&it.tf.length)?it.tf:undefined}});
const unwire=r=>{const o={...r,...(r.meta||{})};delete o.meta;if(o.kind==='shop'){o.kind='place';o.cat=o.cat||'shopping';o.sub=o.sub||'supermarket'}else if(o.kind==='other'){o.kind='place';o.cat='other';o.sub='general'}
 o.lvl=LV[o.lvl]?o.lvl:'local';o.rt=RT[o.rt]?o.rt:'local';o.cat=o.cat||'other';o.size=+o.size||1;o.curve=!!o.curve;o.nt=o.nt||'';o.grp=o.grp||'';o.pts=o.pts||[];o.br=+o.br||0;o.bz=+o.bz||0;o.bk=o.bk||'';o.tf=Array.isArray(o.tf)?o.tf:[];return o};
let BKON=0,BKWARN=0;
// ===== BACKUP PLACES: ใช้ไฟล์ "Untitled spreadsheet - places.csv" เท่านั้น (วางโฟลเดอร์เดียวกับหน้านี้) =====
// ไม่มีข้อมูลสำรองฝังในหน้า · ยังดึง API ตามปกติ — พอ API ตอบแล้วจะใช้ข้อมูลจาก API แทนเสมอ
let BKAPI=0,BKT=0;const BK_CSV='Untitled spreadsheet - places.csv',FT_CSV='Untitled spreadsheet - routes.csv';
function bkCsv(t){t=String(t).replace(/^\uFEFF/,'');const fl=t.split(/\r?\n/,1)[0]||'',d=(fl.indexOf('\t')>=0&&fl.indexOf(',')<0)?'\t':',';const R=[];let r=[],c='',q=0;
 for(let i=0;i<t.length;i++){const ch=t[i];if(q){if(ch==='"'){if(t[i+1]==='"'){c+='"';i++}else q=0}else c+=ch}
  else if(ch==='"')q=1;else if(ch===d){r.push(c);c=''}else if(ch==='\n'||ch==='\r'){if(ch==='\r'&&t[i+1]==='\n')i++;r.push(c);c='';R.push(r);r=[]}else c+=ch}
 if(c!==''||r.length){r.push(c);R.push(r)}return R.filter(x=>x.some(v=>String(v).trim()!==''))}
function bkItems(t){let R=bkCsv(t);if(!R.length)return[];let H=R[0].map(h=>String(h).trim().toLowerCase().replace(/^\uFEFF/,''));
 if(H.indexOf('kind')<0&&H.indexOf('name')<0){H=['id','kind','name','note','x','y','pts',(R[0][7]||'').trim().charAt(0)==='{'?'meta':'grp','nt','curve','lvl','cat','sub','rt','color','size'];R=[H].concat(R)}
 const J=v=>{try{return JSON.parse(v)}catch(_){return undefined}},out=[];let MI=H.indexOf('meta');if(MI<0)MI=H.findIndex(h=>h===''||h==='json'||h==='data');
 R.slice(1).forEach((r,n)=>{const g=k=>{const i=H.indexOf(k);return i<0?'':String(r[i]==null?'':r[i]).trim()};
  if(/^(1|true|yes)$/i.test(g('deleted')))return;
  let meta={};const mj=(MI>=0&&r[MI]!=null?String(r[MI]).trim():'')||g('meta');if(mj){const o=J(mj);if(o&&typeof o==='object'&&!Array.isArray(o))meta=o}
  ['grp','nt','lvl','cat','sub','rt','color','size'].forEach(k=>{const v=g(k);if(v!=='')meta[k]=k==='size'?(+v||1):v});
  const cv=g('curve');if(cv!=='')meta.curve=/^(1|true|yes)$/i.test(cv);
  let pts=[];const ps=g('pts')||g('points')||g('path');if(ps){const o=ps.charAt(0)==='['?J(ps):undefined;if(Array.isArray(o))pts=o;else{const m=ps.match(/-?\d+(?:\.\d+)?/g)||[];for(let i=0;i+1<m.length;i+=2)pts.push([+m[i],+m[i+1]])}}
  let x=parseFloat(g('x')),y=parseFloat(g('y'));if(isNaN(x)&&pts.length)x=pts[0][0];if(isNaN(y)&&pts.length)y=pts[0][1];
  if(isNaN(x)||isNaN(y))return;
  let kd=g('kind').trim().toLowerCase();if(BK_KDX[kd])kd=BK_KDX[kd];
  if(kd!=='place'&&kd!=='road'&&kd!=='nature'&&kd!=='shop'&&kd!=='other'){const nt0=bkNorm(kd,NT,'',BK_NTX);if(nt0){meta.nt=nt0;kd='nature'}else kd=''}
  if(!kd){const nt1=bkNorm(meta.nt,NT,'',BK_NTX);kd=nt1?'nature':(pts.length?'road':'place')}
  if(kd==='nature'){let nt2=bkNorm(meta.nt,NT,'',BK_NTX);if(!nt2)nt2=pts.length>=3?'bay':pts.length>=2?'river':'mountain';meta.nt=nt2}else if(meta.nt)meta.nt=bkNorm(meta.nt,NT,'',BK_NTX);
  meta.rt=bkNorm(meta.rt,RT,'local',BK_RTX);meta.lvl=bkNorm(meta.lvl,LV,'local',BK_LVX);if(meta.curve!==undefined)meta.curve=(meta.curve===true||/^(1|true|yes|ใช่)$/i.test(String(meta.curve)));
  const it={id:g('id')||('bk'+n),kind:kd||'place',name:g('name'),x:x,y:y,meta:meta};const nt=g('note');if(nt)it.note=nt;if(pts.length)it.pts=pts;out.push(it)});
 return out}
const BK_RTX={'ทางด่วน':'highway','มอเตอร์เวย์':'highway','motorway':'highway','trunk':'highway','expressway':'highway','primary':'main','arterial':'main','สายหลัก':'main','ถนนหลัก':'main','tertiary':'secondary','สายรอง':'secondary','ถนนรอง':'secondary','residential':'local','ท้องถิ่น':'local','ซอย':'local','street':'local','4':'highway','3':'main','2':'secondary','1':'local'},
 BK_LVX={'ประเทศ':'national','ใหญ่':'major','สำคัญ':'major','ทั่วไป':'poi','จุดสนใจ':'poi','minor':'poi','4':'national','3':'major','2':'local','1':'poi'},
 BK_NTX={'แม่น้ำ':'river','แม่นํ้า':'river','สายน้ำ':'river','อ่าว':'bay','พื้นน้ำ':'bay','ทะเล':'bay','water':'bay','lake':'bay','sea':'bay','เขา':'mountain','ภูเขา':'mountain','hill':'mountain','peak':'mountain','ลำคลอง':'canal','ลำธาร':'canal','stream':'canal'},
 BK_KDX={'สถานที่':'place','หมุด':'place','poi':'place','point':'place','marker':'place','pin':'place','ถนน':'road','street':'road','highway':'road','line':'road','ธรรมชาติ':'nature'};
function bkNorm(v,tab,def,ex){const s=String(v==null?'':v).trim().toLowerCase();if(!s)return def;if(tab[s])return s;
 for(const k in tab){const n=String(tab[k].n||'').toLowerCase();if(n&&(n===s||n.replace(/\s/g,'')===s.replace(/\s/g,'')))return k}
 if(ex[s])return ex[s];for(const k in ex)if(s.indexOf(k)>=0)return ex[k];
 for(const k in tab){const n=String(tab[k].n||'').toLowerCase();if(n&&(s.indexOf(n)>=0||n.indexOf(s)>=0))return k}return def}
async function bkLoad(){if(!ADDONS.mapPlaces||BKAPI||Date.now()-BKT<8000)return;BKT=Date.now();
 try{const r=await fetch(encodeURI(BK_CSV),{cache:'no-store'});if(!r.ok)return;const raw=bkItems(await r.text());if(!raw.length||BKAPI)return;
  PL=raw.map(unwire);BKON=1;loaded=true;lastChg=Date.now();reqR(1);if(!FORM)panel();if(typeof hideLd==='function')hideLd()}catch(_){}}
/* BACKUP fataekts: "Untitled spreadsheet - routes.csv" → รูปแบบเดียวกับที่ API ส่ง (type, no, name, fare, price, note, road, color, pts, stops) */
function ftCsvItems(t){let R=bkCsv(t);if(!R.length)return[];let H=R[0].map(h=>String(h).trim().toLowerCase().replace(/^\uFEFF/,''));
 if(H.indexOf('type')<0&&H.indexOf('pts')<0){H=['id','type','no','name','fare','price','note','road','color','pts','stops'];R=[H].concat(R)}
 const J=v=>{try{return JSON.parse(v)}catch(_){return undefined}},out=[];
 R.slice(1).forEach(r=>{const o={};H.forEach((h,i)=>{if(h)o[h]=r[i]==null?'':String(r[i]).trim()});
  if(/^(1|true|yes)$/i.test(o.deleted||''))return;
  ['json','meta','data'].forEach(k=>{if(o[k]){const m=J(o[k]);if(m&&typeof m==='object'&&!Array.isArray(m)){delete o[k];Object.assign(o,m)}}});
  let ty=String(o.type||o.kind||'').trim().toLowerCase();const TX=[['toll',['toll','ด่าน','ทางด่วน','expressway']],['train',['train','รถไฟ','รถราง','bts','mrt','รถไฟฟ้า']],['bus',['bus','รถประจำทาง','รถเมล์','รถบัส']],['boat',['boat','เรือ','ferry']]];
  if(['train','bus','boat','toll'].indexOf(ty)<0){ty='';for(const[k,al]of TX){if(al.some(a=>String(o.type||o.kind||'').toLowerCase().indexOf(a)>=0)){ty=k;break}}}
  if(!ty)return;o.type=ty;
  ['pts','stops'].forEach(k=>{let v=o[k];if(typeof v==='string')v=v.trim().charAt(0)==='['?J(v):undefined;o[k]=Array.isArray(v)?v:[]});
  if(!o.pts.length&&o.x!==undefined&&o.x!==''&&o.y!==undefined&&o.y!=='')o.pts=[[+o.x,+o.y]];
  o.pts=o.pts.map(p=>[+p[0],+p[1]]).filter(p=>isFinite(p[0])&&isFinite(p[1]));
  o.stops=o.stops.map(s=>({x:+(s.x!=null?s.x:s[0]),y:+(s.y!=null?s.y:s[1]),n:s.n||s.name||''})).filter(s=>isFinite(s.x)&&isFinite(s.y));
  if(!o.id)o.id='r'+out.length;out.push(o)});
 return out}
bkLoad();
PL=PL.map(unwire);
const apply=(rv,items)=>{loaded=true;BKON=0;BKAPI=1;rev=rv;PL=items.map(unwire);lastChg=Date.now();reqR(1);if(!FORM)panel()};
async function push(act,item){const op=act==='delete'?'ลบ':'บันทึก',it0={name:item.name,id:item.id};if(!API||!ADDONS.mapPlaces){try{localStorage.setItem('pl',JSON.stringify(PL))}catch(_){}apiSave(op,it0,'Map Places (ในเครื่อง)',true);return}inflight++;
 try{const j=await post({action:act,item:wire(item)});if(j.ok){apply(j.rev,j.items);apiSave(op,it0,'Map Places',true)}else apiSave(op,it0,'Map Places',false,j.err||'ไม่สำเร็จ')}catch(_){apiSave(op,it0,'Map Places',false,'เชื่อมต่อไม่ได้')}inflight--}
async function pull(){if(!API||pulling||inflight||!ADDONS.mapPlaces||moving())return;pulling=1;const ac=new AbortController(),tm=setTimeout(()=>ac.abort(),12000);let okp=0;try{const j=await(await fetch(API+'?action=list&rev='+rev,{cache:'no-store',signal:ac.signal})).json();if(j.ok){okp=1;BKON=0;BKAPI=1;if(!j.same&&!inflight)apply(j.rev,j.items)}}catch(_){}clearTimeout(tm);if(okp)apiOk('Map Places');else{apiFail('Map Places',!!BKON);if(!BKAPI)bkLoad()}pulling=0}
// ความเร็วโพลล์: เร็ว (POLL_FAST) เมื่อมีการใช้งาน/แก้ไข/มีการเปลี่ยนแปลงล่าสุด, ช้าลง (POLL_IDLE) เมื่อเงียบ เพื่อไม่ให้โควตา Apps Script หมด
const POLL_FAST=700,POLL_IDLE=4000;let act=Date.now();
['pointerdown','keydown','wheel','touchstart'].forEach(ev=>addEventListener(ev,()=>{act=Date.now()},{passive:true}));
async function loop(){for(;;){const busy=ED.on||Date.now()-act<20000||Date.now()-lastChg<60000;await pull();if(ADDONS.fataekts&&Date.now()-lastFt>8000) await pullFataekRoutes();await new Promise(r=>setTimeout(r,document.hidden?5000:busy?POLL_FAST:POLL_IDLE))}}
const hideLd=()=>{const l=$('#ld');if(l){l.classList.add('x');setTimeout(()=>l.remove(),600)}};setTimeout(hideLd,9000);
loaded=!API||PL.length>0;if(API){if(PL.length)setTimeout(hideLd,400);pull().finally(()=>{loaded=true;hideLd();if(!FORM)panel()});loop()}else setTimeout(hideLd,500);
if(ADDONS.fataekts) pullFataekRoutes();

// เข้าสู่ระบบ /edit
// ===== เมาส์ของผู้แก้ไขหลายคนพร้อมกัน (presence) =====
const edGet=(k,d)=>{try{return localStorage.getItem(k)||d}catch(_){return d}};
const edName=()=>edGet('ed_name','').trim();
let EDCID='';try{EDCID=sessionStorage.getItem('ed_cid')||'';if(!EDCID){EDCID='u'+Math.random().toString(36).slice(2,9);sessionStorage.setItem('ed_cid',EDCID)}}catch(_){EDCID='u'+Math.random().toString(36).slice(2,9)}
function edSave(n,c){try{localStorage.setItem('ed_name',n);localStorage.setItem('ed_color',c)}catch(_){}}
const ED_COLORS=['#e03131','#e8590c','#f08c00','#2f9e44','#1c7ed6','#7048e8','#d6336c','#0c8599'];
(()=>{const n=$('#ename'),c=$('#ecol'),sw=$('#ecsw');if(!n||!c||!sw)return;n.value=edName();c.value=edGet('ed_color','')||ED_COLORS[Math.floor(Math.random()*ED_COLORS.length)];
 sw.innerHTML=ED_COLORS.map(x=>`<button type="button" data-c="${x}" style="background:${x}" aria-label="${x}"></button>`).join('');
 sw.onclick=e=>{const b=e.target.closest('[data-c]');if(b)c.value=b.dataset.c};
 n.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();$('#pw').focus()}}})();
const PR={on:0,me:{x:null,y:null,mv:0},users:new Map(),t:0,raf:0,fail:0,self:null};
const prArrow=c=>`<svg width="20" height="22" viewBox="0 0 20 22"><path d="M2 1.5v16l4.4-4.1 3 6.6 3-1.4-3-6.4 6-.2z" fill="${c}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
function prEl(){const el=document.createElement('div');el.className='pcu';el.style.display='none';document.body.appendChild(el);return el}
function prFill(o,n,c,me){if(o.n===n&&o.c===c)return;o.n=n;o.c=c;o.el.innerHTML=prArrow(c)+`<span style="background:${c}">${esc(n)}${me?' (คุณ)':''}</span>`}
function selfCur(x,y){if(!PR.self){PR.self={el:prEl(),n:'',c:''};PR.self.el.classList.add('me')}const s=PR.self;prFill(s,edName()||'ฉัน',edGet('ed_color','#2f8a3b'),1);s.el.style.display='';s.el.style.transform=`translate(${x}px,${y}px)`;document.body.classList.add('pcm')}
function hideSelf(){if(PR.self)PR.self.el.style.display='none';document.body.classList.remove('pcm')}
function presApply(list){const seen=new Set();list.forEach(u=>{if(!u||!u.id)return;seen.add(u.id);let o=PR.users.get(u.id);if(!o){o={el:prEl(),x:null,y:null,tx:null,ty:null,n:'',c:''};PR.users.set(u.id,o)}prFill(o,u.n||'?',u.c||'#2f8a3b',0);o.tx=u.x==null?null:+u.x;o.ty=u.y==null?null:+u.y});
 PR.users.forEach((o,id)=>{if(!seen.has(id)){o.el.remove();PR.users.delete(id)}})}
function presFrame(){if(!PR.on&&!PR.users.size){PR.raf=0;return}PR.raf=requestAnimationFrame(presFrame);const r=R0();
 PR.users.forEach(o=>{if(o.tx==null){o.el.style.display='none';o.x=null;return}if(o.x==null){o.x=o.tx;o.y=o.ty}else{o.x+=(o.tx-o.x)*.25;o.y+=(o.ty-o.y)*.25}
  const sx=r.left+(o.x-vb.x)/vb.w*r.width,sy=r.top+(o.y-vb.y)/vb.h*r.height;
  if(sx<r.left-24||sx>r.right+24||sy<r.top-24||sy>r.bottom+24){o.el.style.display='none';return}
  o.el.style.display='';o.el.style.transform=`translate(${sx}px,${sy}px)`})}
async function presTick(){if(!PR.on)return;const idle=Date.now()-PR.me.mv>8000&&!PR.users.size;
 try{const j=await post({action:'presence',id:EDCID,name:edName()||'ไม่ระบุชื่อ',color:edGet('ed_color','#2f8a3b'),x:PR.me.x,y:PR.me.y});
  if(j&&j.ok){PR.fail=0;if(PR.on)presApply(j.users||[]);if(j.rev!=null&&j.rev!==rev&&!inflight&&!pulling)pull()}else PR.fail++}catch(_){PR.fail++}
 if(PR.on)PR.t=setTimeout(presTick,document.hidden?4000:PR.fail>3?6000:idle?2500:650)}
function presStart(){if(PR.on||!API)return;PR.on=1;PR.fail=0;presTick();if(!PR.raf)PR.raf=requestAnimationFrame(presFrame)}
function presStop(){if(!PR.on)return;PR.on=0;clearTimeout(PR.t);hideSelf();try{post({action:'presence',id:EDCID,leave:1}).catch(()=>{})}catch(_){}presApply([])}
svg.addEventListener('pointermove',e=>{if(!PR.on)return;const w=wpos(e.clientX,e.clientY);PR.me.x=w[0];PR.me.y=w[1];PR.me.mv=Date.now();if(e.pointerType==='mouse')selfCur(e.clientX,e.clientY);else hideSelf()},{passive:true});
svg.addEventListener('pointerleave',()=>{PR.me.x=null;PR.me.y=null;hideSelf()});
addEventListener('pagehide',()=>{if(PR.on&&API){try{navigator.sendBeacon(API,new Blob([JSON.stringify({action:'presence',id:EDCID,leave:1,pw:PW})],{type:'text/plain;charset=utf-8'}))}catch(_){}}});
async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function login(pw){if(API){try{return(await post({action:'auth'},pw)).ok?1:0}catch(_){return-1}}try{return await sha(pw)===PH?1:0}catch(_){return 0}}
function enter(pw){PW=pw;presStart();ED.on=ED.auth=true;$('#ed').hidden=false;$('#lg').hidden=true;try{sessionStorage.setItem('pw',pw)}catch(_){}toast('เข้าสู่โหมดแก้ไข');showPc();if(sel.i===null)panel()}
function setSearch(on){const r=$('#srow-main');if(!r||r.classList.contains('so')===on)return;r.classList.toggle('so',on);qi.tabIndex=0;const p=$('#pcp');
 if(on){$('#sb').removeAttribute('role');$('#sb').removeAttribute('aria-label');setTimeout(()=>qi.focus(),30)}
 else{$('#sb').setAttribute('role','button');$('#sb').setAttribute('aria-label','ค้นหา');p.classList.add('c');p.offsetWidth;requestAnimationFrame(()=>requestAnimationFrame(()=>p.classList.remove('c')))}}
$('#sb').setAttribute('role','button');$('#sb').setAttribute('aria-label','ค้นหา');
$('#sb').addEventListener('click',e=>{if(!$('#srow-main').classList.contains('so')){e.preventDefault();setSearch(true);setSt(Math.max(st,1))}});
qi.addEventListener('blur',()=>setTimeout(()=>{if(!qi.value&&document.activeElement!==qi)setSearch(false)},150));
qi.addEventListener('keydown',e=>{if(e.key==='Escape'){qi.value='';panel();qi.blur();setSearch(false)}});
requestAnimationFrame(()=>requestAnimationFrame(()=>$('#pcp').classList.remove('c')));
// ลิงก์ไปแอปอื่น (เปลี่ยนที่นี่ถ้าชื่อไฟล์/ที่อยู่ต่างไป)
for(const [id,p] of [['lggo','go']])$('#'+id).addEventListener('click',e=>{e.preventDefault();goPage(p)});
// ตัวเลือกก่อนแก้ไข: รถของมูลนิธิ / บ้าน / Map Places
function showEc(){$('#ec').hidden=false}
$('#ec-map').onclick=()=>{$('#ec').hidden=true;bootMapEdit()};
$('#ec-x').onclick=()=>{$('#ec').hidden=true};
$('#ec').addEventListener('click',e=>{if(e.target.id==='ec')$('#ec').hidden=true});
function bootEdit(){if(EDIT)showEc()}
async function bootMapEdit(){if(!EDIT)return;let pw='';try{pw=sessionStorage.getItem('pw')||''}catch(_){}
 if(pw&&edName()&&await login(pw)===1)return enter(pw);$('#lgn').textContent=API?'':'ยังไม่ได้เชื่อม Google Apps Script — ข้อมูลบันทึกในเครื่องนี้เท่านั้น';$('#lg').hidden=false;$('#pw').focus()}
$('#lgb').onclick=async()=>{const en=$('#ename').value.trim().slice(0,20);if(!en){$('#lge').textContent='ใส่ชื่อก่อน';$('#ename').focus();return}edSave(en,$('#ecol').value);const pw=$('#pw').value,r=await login(pw);$('#lge').textContent=r===1?'':r<0?'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้':'รหัสไม่ถูกต้อง';if(r===1)enter(pw)};
$('#pw').onkeydown=e=>{if(e.key==='Enter')$('#lgb').click()};$('#lgc').onclick=()=>{$('#lg').hidden=true;if(EDIT&&!ED.auth)showEc()};
function syncEd(){if(!roadEditing())ED.ext=null;const rc=MP.includes(ED.tool)||roadEditing();
 $('#ed').querySelectorAll('[data-tool]').forEach(b=>b.classList.toggle('a',b.dataset.tool===ED.tool));
 $('#edok').hidden=!MP.includes(ED.tool);$('#edu').hidden=!MP.includes(ED.tool);$('#edc').hidden=!rc;$('#edl').hidden=!rc;
 $('#edc').classList.toggle('a',ED.curve);$('#edm').classList.toggle('a',ED.msel);$('#edl').classList.toggle('a',ED.lock);
 svg.classList.toggle('svgm',!!ED.tool||ms||!!ED.ext||ED.msel);if(!MP.includes(ED.tool)){const g=$('#gh');if(g)g.innerHTML=''}drawPl()}
$('#ed').onclick=e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.tool){ED.msel=false;ED.sel=[];ED.tool=ED.tool===b.dataset.tool?null:b.dataset.tool;ED.pts=[];syncEd();if(ED.tool)toast(MP.includes(ED.tool)?'แตะแผนที่เพื่อวางจุด แล้วกด ✓ เมื่อเสร็จ':'แตะแผนที่เพื่อวางตำแหน่ง')}
 else if(b.id==='edok'){const mn=ED.tool==='bay'?3:2;if(ED.pts.length>=mn){const q=ED.pts,t=ED.tool;openForm({...(t==='road'?{kind:'road'}:{kind:'nature',nt:t}),x:q[0][0],y:q[0][1],pts:q,curve:ED.curve})}else toast('วางอย่างน้อย '+mn+' จุด')}
 else if(b.id==='edu'){ED.pts.pop();syncEd()}else if(b.id==='edc'){const nv=!ED.curve;if(roadEditing()){syncForm();FORM.p.curve=nv;ED.curve=nv;panel()}else{ED.curve=nv;syncEd()}}else if(b.id==='edl'){ED.lock=!ED.lock;syncEd();toast(ED.lock?'ล็อกมุม 45° + กริด':'ตามกริดอย่างเดียว')}else if(b.id==='edm'){ED.msel=!ED.msel;ED.sel=[];if(ED.msel){ED.tool=null;ED.pts=[];FORM=null;setSt(1);toast('แตะถนนหลายเส้นบนแผนที่เพื่อเลือก')}syncEd();panel()}else if(b.id==='edx'){ED.msel=false;ED.sel=[];ED.on=false;presStop();ED.tool=null;ED.pts=[];$('#ed').hidden=true;syncEd();showPc()}};
addEventListener('keydown',e=>{if(e.key==='Escape'&&ED.tool){ED.tool=null;ED.pts=[];syncEd()}});
bootEdit();
// mobile sheet: scroll/swipe up at half height -> expand; pull down at top of full -> back to half
$('#body').addEventListener('scroll',()=>{if(!DT.matches&&st===1&&$('#body').scrollTop>10){setSt(2);if(sel.i!==null)refit()}},{passive:true});
$('#body').addEventListener('touchmove',e=>{if(DT.matches||FORM&&0)return;const d=ty0-e.touches[0].clientY;if(st===1&&d>28){setSt(2);if(sel.i!==null)refit()}else if(st===2&&d<-50&&$('#body').scrollTop<=0){setSt(1);if(sel.i!==null)refit()}},{passive:true});
