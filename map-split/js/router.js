// ===== iOS-style home, pages & router =====
let forced=null,curPage=null,hv=null;const ZO={},PATHMODE=/\/(map|edit|zip|Add-ons|cars|houses|go)\/?$/i.test(location.pathname),HX=()=>PATHMODE?'#':'#/map/';
let RC=[];try{RC=JSON.parse(localStorage.getItem('rc')||'[]')}catch(_){}
function addRc(k){if(!k)return;const i=RC.indexOf(k);if(i>=0)RC.splice(i,1);RC.unshift(k);RC.length=Math.min(RC.length,8);try{localStorage.setItem('rc',JSON.stringify(RC))}catch(_){}}
const rowFor=k=>{const r=window.__row;if(Z[k])return Z[k][1]==null?r(Z[k][0],null,DATA[Z[k][0]].provName,'',k):r(Z[k][0],Z[k][1],DATA[Z[k][0]].entries[Z[k][1]].name,DATA[Z[k][0]].provName,k);const p=PL.find(a=>a.id===k);return p?placeRow(p):''};
const CH='<svg class="i" viewBox="0 0 24 24" style="width:16px;height:16px"><path d="m9 6 6 6-6 6"/></svg>';
function homeHtml(){const bk=`<div style="padding:0 4px"><span class="bk" data-hb="1">${I.back}Back</span></div>`;
 if(hv==='fav')return bk+`<h2>Favorites</h2>`+(FV.length?FV.map(rowFor).join(''):'<div class="em"><p>No favorites yet</p><small>Select an area and tap ★ Pin</small></div>');
 if(hv==='pl')return bk+`<h2>Places on Map</h2>`+mapList();
 if(hv==='rec')return bk+`<h2>Recents</h2>`+(RC.map(rowFor).join('')||'<div class="hint">Nothing yet</div>');
 const c=(a,ico,t,sub)=>`<div class="circ" ${a}><i>${ico}</i><span>${t}</span><small>${sub}</small></div>`,g=(a,e,t,sub)=>`<div class="gcard" ${a}><div class="gi">${e}</div><b>${t}</b><small>${sub}</small></div>`,
 ar=(a,p,t)=>`<div class="arow" data-act="${a}"><svg class="i" viewBox="0 0 24 24">${p}</svg>${t}</div>`;
 return `<div class="hsec">Places ${CH}</div><div class="circs">${c('data-h="fav"',I.starf.replace('width:17px;height:17px','width:26px;height:26px'),'Favorites',FV.length+' saved')}${c('data-pg="zip"','<svg class="i" viewBox="0 0 24 24" style="width:26px;height:26px"><path d="M4 7h16M4 12h16M4 17h10"/></svg>','Zip Codes','Open')}${c('data-act="add"','<svg class="i" viewBox="0 0 24 24" style="width:28px;height:28px"><path d="M12 5v14M5 12h14"/></svg>','Add','Place')}${c('data-act="go"','<svg class="i" viewBox="0 0 24 24" style="width:26px;height:26px"><path d="M12 3 5 20l7-4 7 4z"/></svg>','Navigate','Route')}</div>
<div class="hsec" data-h="rec" style="cursor:pointer">Recents ${CH}</div>${RC.length?RC.slice(0,4).map(rowFor).join(''):'<div class="hint">Areas and places you open will appear here</div>'}
<div class="hsec">Your Guides ${CH}</div><div class="guides">${g('data-h="fav"','<svg class="i" viewBox="0 0 24 24" style="width:34px;height:34px"><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg>','Favorites',FV.length+' places')}${g('data-h="pl"','<svg class="i" viewBox="0 0 24 24" style="width:34px;height:34px"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>','Map Places',PL.length+' items')}${g('data-pg="zip"','<svg class="i" viewBox="0 0 24 24" style="width:34px;height:34px"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>','Postal Codes',DATA.length+' provinces')}</div>
<div style="height:10px"></div>${ar('share','<path d="M12 15V4M8 7.5 12 4l4 3.5"/><path d="M5 12v6.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V12"/>','Share This View')}${ar('pin','<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>','Drop Pin at Center')}${ar('measure','<path d="m14.5 3.5 6 6L9 21l-6-6z"/><path d="m8 11 2 2M11 8l2 2M14 5l2 2M5 14l2 2"/>','Measure Distance &amp; Area')}${ar('help','<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.8M12 17h.01"/>','Help')}${ar('theme','<path d="M12 3a9 9 0 1 0 9 9c-5 0-9-4-9-9z"/>','Theme')}${ar('full','<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>','Full screen')}${EDIT?ar('bridge','<path d="M3 17h18M5 17V9M19 17V9M5 9c3 0 4 4 7 4s4-4 7-4M9 17v-3M15 17v-3"/>','Bridges · สะพาน'):''}${ar('reset','<path d="M4 12a8 8 0 1 0 3-6.2M4 4v5h5"/>','Reset view')}${DT.matches?ar('side','<path d="M4 5h16v14H4zM9 5v14"/>','Sidebar'):''}`}
function askEdit(){if(ED.auth){ED.on=true;ED.msel=false;ED.tool='place';$('#ed').hidden=false;syncEd();toast('Tap the map to place a pin');return}$('#lgn').textContent=API?'':'Local mode — data is saved on this device only';$('#lg').hidden=false;$('#pw').focus()}
function homeAct(a){if(a==='go')return goPage('go');if(a==='addons')goPage('Add-ons');else if(a==='share')shareView();else if(a==='pin')addPin(wpos(innerWidth/2,innerHeight/2));else if(a==='measure')setMeas(!ms);else if(a==='help'){$('#hc').hidden=false;$('#hp').classList.add('a')}else if(a==='add')askEdit();else if(a==='theme')$('#tb').click();else if(a==='reset')select(null);else if(a==='bridge'){window.BR&&BR.openList()}else if(a==='full')$('#fsb').click();else if(a==='side')$('#mnb').click()}
function scaleBar(){const b=$('#sbar'),k=KM/sc();let v=1;for(const n of[1,2,5,10,20,50,100,200,500,1000])if(n/k<=130)v=n;b.firstChild.style.width=(v/k)+'px';b.lastChild.textContent=v+' km'}
$('#opt').onclick=e=>{e.stopPropagation();const m=$('#mo');m.hidden=!m.hidden;$('#opt').classList.toggle('a',!m.hidden)};
$('#mo').onclick=e=>{const b=e.target.closest('button');if(b&&b.id!=='tb'){$('#mo').hidden=true;$('#opt').classList.remove('a')}};
$('#av').onclick=()=>goPage('zip');
// Postal Codes page ('/')
function zipHtml(q){q=(q||'').trim().toLowerCase();let h='';
 REG.forEach((r,k)=>{let sec='';DATA.forEach((p,i)=>{if(p.district-1!==k)return;const pm=!q||(p.provName+p.areaCode+r.ab+r.f+r.n).toLowerCase().includes(q),ents=p.entries.filter(e=>!q||pm||(e.name+e.zip).toLowerCase().includes(q));if(q&&!pm&&!ents.length)return;const open=!!q||ZO[i];
  sec+=`<div class="zc"><div class="zr zp" data-zi="${i}"><span class="dot r${k}"></span><b>${p.provName}</b><small>${p.areaCode} · ${p.entries.length} districts</small><span class="zch${open?' o':''}">${CH}</span></div>`+(open?ents.map(e=>`<div class="zr zd" data-gm="${e.zip}"><span class="zn">${e.name}</span><em>${e.zip}</em><button class="cp" data-zip="${e.zip}" aria-label="Copy">${I.cp}</button>${CH}</div>`).join(''):'')+'</div>'});
  if(sec)h+=`<h3 class="zs"><span class="dot r${k}"></span>${r.n} · ${r.ab} <small>${r.f}</small></h3>`+sec});
 return h||'<div class="em"><p>No results</p></div>'}
function renderZip(){const l=$('#zl');l.innerHTML=zipHtml($('#zq').value);stag(l)}
$('#zq').oninput=renderZip;$('#zmap').onclick=()=>goPage('map');
$('#zl').onclick=e=>{const c=e.target.closest('[data-zip]');if(c)return copy(c.dataset.zip);const g=e.target.closest('[data-gm]');if(g)return goPage('map',g.dataset.gm);const p=e.target.closest('[data-zi]');if(p){const i=+p.dataset.zi;ZO[i]=!ZO[i];renderZip()}};
// router: '/' = Postal Codes, '/Map' (or #/map) = Map, '/Add-ons' = Add-ons
function pageOf(){const p=location.pathname.toLowerCase(),h=(location.hash||'').toLowerCase();if(!EDIT&&(/\/zip\/?$/.test(p)||/^#\/?zip/.test(h)))return 'zip';if(/\/go\/?$/.test(p)||/^#\/?go(\?|&|\/|$)/.test(h))return 'go';if(/\/add-ons\/?$/i.test(p)||/^#\/?add-ons/i.test(h))return 'Add-ons';return 'map'}
function route(){const pg=forced||pageOf();document.body.classList.toggle('emb',/[#&]embed=1/.test(location.hash));document.body.classList.toggle('pz',pg==='zip');document.body.classList.toggle('gop',pg==='go');if(pg===curPage)return;curPage=pg;if(pg!=='go'&&window.goLeave)goLeave();
 if(pg==='zip'){document.title='Postal Codes';const k=(location.hash||'').replace(/^#\/?(map\/?|zip\/?|Add-ons\/?)?/i,'').split('&')[0];if(Z[k])ZO[Z[k][0]]=true;renderZip()}else if(pg==='go'){document.title='นำทาง';if(window.goEnter)goEnter();panel()}else if(pg==='Add-ons'){document.title='Add-ons';if(window.aoApplyUrl)aoApplyUrl();panel();if(window.aoSync)aoSync();}else{document.title='Map';rs();hv=null;panel()}}
function goPage(p,code){forced=p;const root=location.pathname.replace(/\/((cars|houses)\/edit|map|edit|zip|Add-ons|cars|houses|go)\/?$/i,'/');
 try{if(PATHMODE)history.pushState(null,'',p==='map'?root+'Map'+(code?'#'+code:''):root+p);else location.hash=p==='map'?'#/map/'+(code||''):'#/'+p}catch(_){}
 route();if(p==='map')setTimeout(go,0)}
// ===== หน้า /go : นำทางจุด A → B (หลายจุด) บนแผนที่นี้ =====
(function(){
'use strict';
let items=[],FT=[];
const M=p=>p;
const isRoad=p=>p.kind==='road'&&p.pts&&p.pts.length>1;
const isPlace=p=>p.kind==='place'||(p.kind==='nature'&&p.nt==='mountain');
const iconOf=p=>{try{return pinIc(p)}catch(_){return '📍'}};
const RTN={highway:'ทางหลวง/ทางด่วน',main:'ถนนสายหลัก',secondary:'ถนนสายรอง',local:'ถนนท้องถิ่น'};
/* ---------- ตั้งค่า (แก้ได้ในหน้า ⚙️ เก็บในเครื่อง) ---------- */
const DEF={unit:'เจ๋ง',mu:0.1,
 speed:{walk:12,car:{highway:120,main:80,secondary:60,local:45}},
  svc:{
  bus:{name:'รถประจำทาง',emoji:'🚌',color:'#e8590c',speed:80,base:0,perKm:0,wait:2.5,roads:['highway','main','secondary'],stops:'อู่รถเมล์|สถานีขนส่ง|ป้ายรถ',exclude:'อุทยาน|พิพิธภัณฑ์'},
  train:{name:'รถไฟ/รถราง',emoji:'🚆',color:'#7048e8',speed:200,base:0,perKm:0,wait:5,stops:'รถไฟ|รถราง|รถไฟฟ้า',exclude:'พิพิธภัณฑ์|ร้าน|โรงไฟฟ้า'},
  boat:{name:'เรือ',emoji:'⛴️',color:'#0c8599',speed:75,base:0,perKm:0,wait:5,stops:'ท่าเรือ|ท่าน้ำ',exclude:''}},
 custom:[]};
const clone=o=>JSON.parse(JSON.stringify(o));
const merge=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object')merge(a[k],b[k]);else a[k]=b[k]}return a};
const CF=DEF; /* ค่ามาตรฐานตายตัว — ไม่มีหน้าตั้งค่าความเร็ว/ราคา (ราคาอ่านจาก fataekts) */
const fmtT=m=>{m=Math.max(1,Math.round(m));if(m<60)return m+' นาที';const h=Math.floor(m/60),r=m%60;if(h<48)return h+' ชม.'+(r?' '+r+' นาที':'');return Math.round(h/24*10)/10+' วัน'};
const fmtD=k=>k<1?Math.round(k*1000)+' ม.':(k<100?k.toFixed(1):Math.round(k).toLocaleString('th'))+' กม.';
const fmtF=f=>(Math.round(f*10)/10).toLocaleString('th')+' '+CF.unit;

/* ---------- สร้างกราฟถนน ---------- */
const G={nodes:[],adj:[],E:[],base:0,baseE:0,svcs:[],L:1,places:[],roadNames:[]};
function buildGraph(){
 const nodes=[],adj=[],E=[],grid=new Map(),MT=1.01,TJ=1.0,CS=3;
 const key=(i,j)=>i+','+j;
 const nid=(x,y)=>{const ci=Math.floor(x/CS),cj=Math.floor(y/CS);for(let i=ci-1;i<=ci+1;i++)for(let j=cj-1;j<=cj+1;j++){const a=grid.get(key(i,j));if(a)for(const n of a)if(Math.abs(nodes[n].x-x)<=MT&&Math.abs(nodes[n].y-y)<=MT)return n}
  nodes.push({x,y});adj.push([]);const n=nodes.length-1,k=key(ci,cj);if(!grid.has(k))grid.set(k,[]);grid.get(k).push(n);return n};
 const roads=items.filter(isRoad);let segs=[];
 roads.forEach(r=>{const rt=M(r).rt||'local';let prev=null;r.pts.forEach(p=>{const n=nid(+p[0],+p[1]);if(prev!==null&&prev!==n)segs.push({a:prev,b:n,rt,name:r.name||'',rid:r.id});prev=n})});
 /* T-junction: ปลายถนนที่แตะกลางเส้นอื่น → ตัดเส้นนั้นแล้วต่อ */
 const splits=new Map();
 nodes.forEach((n,ni)=>{segs.forEach((s,si)=>{if(s.a===ni||s.b===ni)return;const A=nodes[s.a],B=nodes[s.b],dx=B.x-A.x,dy=B.y-A.y,L2=dx*dx+dy*dy;if(!L2)return;const t=((n.x-A.x)*dx+(n.y-A.y)*dy)/L2;if(t<=.02||t>=.98)return;if(Math.hypot(n.x-A.x-t*dx,n.y-A.y-t*dy)<=TJ){if(!splits.has(si))splits.set(si,[]);splits.get(si).push({t,n:ni})}})});
 const out=[];segs.forEach((s,si)=>{const sp=splits.get(si);if(!sp){out.push(s);return}sp.sort((p,q)=>p.t-q.t);let cur=s.a;sp.forEach(q=>{if(q.n!==cur)out.push({...s,a:cur,b:q.n});cur=q.n});if(cur!==s.b)out.push({...s,a:cur,b:s.b})});
 const seen=new Set();
 out.forEach(s=>{const k=s.a<s.b?s.a+'-'+s.b+s.rid:s.b+'-'+s.a+s.rid;if(seen.has(k))return;seen.add(k);const A=nodes[s.a],B=nodes[s.b],km=Math.hypot(A.x-B.x,A.y-B.y)*KM;
  const e={id:E.length,a:s.a,b:s.b,km,type:'road',rt:s.rt,name:s.name,rid:s.rid,orig:E.length};E.push(e);adj[s.a].push({e:e.id,to:s.b});adj[s.b].push({e:e.id,to:s.a})});
 G.nodes=nodes;G.adj=adj;G.E=E;G.base=nodes.length;G.baseE=E.length;G.roadE=E.length;G.roadN=nodes.length;
 G.places=items.filter(isPlace).filter(p=>p.name);
 const rn=new Map();roads.forEach(r=>{if(!r.name)return;const o=rn.get(r.name)||{name:r.name,pts:[]};o.pts.push(...r.pts);rn.set(r.name,o)});
 G.roadNames=[...rn.values()].map(o=>{const m=o.pts[o.pts.length>>1];return{name:o.name,x:+m[0],y:+m[1]}});
 buildServices();
}
const dist2=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function nearestNode(x,y,filter){let b=-1,bd=1e9;G.nodes.forEach((n,i)=>{if(i>=G.roadN)return;if(filter&&!filter(i))return;const d=Math.hypot(n.x-x,n.y-y);if(d<bd){bd=d;b=i}});return b}
function addEdge(a,b,km,type,extra){const e={id:G.E.length,a,b,km,type,orig:G.E.length,name:'',rt:'',...extra};G.E.push(e);G.adj[a].push({e:e.id,to:b});G.adj[b].push({e:e.id,to:a});return e}
const ftNum=v=>{const n=parseFloat(String(v==null?'':v).replace(/[^0-9.]/g,''));return isFinite(n)?n:0};
const ftPrice=i=>ftNum(i.price!==''&&i.price!=null?i.price:i.fare);
const segDist=(x,y,e)=>{const A=G.nodes[e.a],B=G.nodes[e.b],dx=B.x-A.x,dy=B.y-A.y,L2=dx*dx+dy*dy;let t=L2?((x-A.x)*dx+(y-A.y)*dy)/L2:0;t=Math.max(0,Math.min(1,t));return Math.hypot(x-A.x-t*dx,y-A.y-t*dy)};
/* ด่านเก็บเงิน (toll จาก fataekts): ผูกกับถนนที่ใกล้ที่สุด — ผ่านด่านไหนเก็บเฉพาะด่านนั้น */
function assignTolls(){
 G.E.forEach(e=>{if(e.type==='road'){e.toll=0;e.gates=null}});G.gates=[];
 FT.filter(i=>i&&i.type==='toll'&&i.pts&&i.pts[0]).forEach((i,k)=>{const pr=ftPrice(i),gx=+i.pts[0][0],gy=+i.pts[0][1];if(!isFinite(gx)||!isFinite(gy))return;
  const g={id:'g'+k,name:i.name||('ด่าน '+(i.no||k+1)),price:pr,x:gx,y:gy};G.gates.push(g);if(pr<=0)return;
  let best=null,bd=1e9;G.E.forEach(e=>{if(e.type!=='road')return;const d=segDist(gx,gy,e);if(d<bd){bd=d;best=e}});if(!best||bd>3)return;
  G.E.forEach(e=>{if(e.type!=='road')return;if(e===best||(best.name&&e.name===best.name&&segDist(gx,gy,e)<=1.5)){(e.gates||(e.gates=[])).push(g);e.toll=(e.toll||0)+pr}})})}
/* สายรถไฟ/รถประจำทาง/เรือ จาก fataekts: เส้น pts + ป้าย stops + ราคา price */
const FTYPE={train:{n:'รถไฟ/รถไฟฟ้า',c:'#015caf',e:'🚆'},bus:{n:'รถประจำทาง',c:'#f4901e',e:'🚌'},boat:{n:'เรือประจำทาง',c:'#018dda',e:'⛴️'}};
function ftServices(){
 let n=0;
 FT.forEach((it,k)=>{const T=FTYPE[it&&it.type];if(!T)return;const cf=CF.svc[it.type];
  let pts=(it.pts||[]).map(p=>[+p[0],+p[1]]).filter(p=>isFinite(p[0])&&isFinite(p[1]));let stops=(it.stops||[]).map(s=>({x:+s.x,y:+s.y,n:s.n||''})).filter(s=>isFinite(s.x)&&isFinite(s.y));
  if(pts.length<2&&stops.length>=2)pts=stops.map(s=>[s.x,s.y]);if(pts.length<2)return;
  if(stops.length<2)stops=[{x:pts[0][0],y:pts[0][1],n:''},{x:pts[pts.length-1][0],y:pts[pts.length-1][1],n:''}];
  const cum=[0];for(let i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));
  const proj=(x,y)=>{let b=null;for(let i=0;i<pts.length-1;i++){const A=pts[i],B=pts[i+1],dx=B[0]-A[0],dy=B[1]-A[1],L2=dx*dx+dy*dy;let t=L2?((x-A[0])*dx+(y-A[1])*dy)/L2:0;t=Math.max(0,Math.min(1,t));const d=Math.hypot(x-A[0]-t*dx,y-A[1]-t*dy);if(!b||d<b.d)b={d,pos:cum[i]+t*Math.sqrt(L2)}}return b.pos};
  const sn=stops.map(s=>({...s,pos:proj(s.x,s.y)})).sort((a,b)=>a.pos-b.pos);
  const ids=sn.map(s=>{G.nodes.push({x:s.x,y:s.y,stop:1,name:s.n});G.adj.push([]);const id=G.nodes.length-1;const r=nearestNode(s.x,s.y);if(r>=0)addEdge(id,r,Math.hypot(G.nodes[r].x-s.x,G.nodes[r].y-s.y)*KM,'link',{});return id});
  const sid='ft'+k,at=(pos)=>{for(let i=0;i<pts.length-1;i++){if(pos<=cum[i+1]||i===pts.length-2){const f=(pos-cum[i])/((cum[i+1]-cum[i])||1);return[pts[i][0]+(pts[i+1][0]-pts[i][0])*Math.max(0,Math.min(1,f)),pts[i][1]+(pts[i+1][1]-pts[i][1])*Math.max(0,Math.min(1,f))]}}return pts[pts.length-1]};
  for(let i=0;i+1<sn.length;i++){const p0=sn[i].pos,p1=sn[i+1].pos;if(p1-p0<1e-6)continue;const g=[at(p0)];for(let j=0;j<pts.length;j++)if(cum[j]>p0+1e-6&&cum[j]<p1-1e-6)g.push(pts[j]);g.push(at(p1));
   addEdge(ids[i],ids[i+1],(p1-p0)*KM,'line',{svc:sid,geom:g})}
  const nm=((it.no?T.n+' สาย '+it.no:T.n)+(it.name?' '+it.name:'')).trim();
  G.svcs.push({id:sid,key:it.type,name:nm,emoji:T.e,color:it.color||T.c,speed:cf.speed,base:ftPrice(it),perKm:cf.perKm||0,wait:cf.wait,stops:new Set(ids),ok:ids.length>=2,edgeOk:e=>e.svc===sid,fromFt:1});n++});
 return n}
function buildServices(){
 G.svcs=[];G.E.length=G.roadE;G.nodes.length=G.roadN;G.adj.length=G.roadN;G.adj.forEach((a,i)=>{G.adj[i]=a.filter(x=>x.e<G.roadE)});assignTolls();const pl=G.places;const rx=(s,x)=>{try{return new RegExp(s)}catch(_){return x}};
 const match=(sv)=>pl.filter(p=>rx(sv.stops,/$^/).test(p.name)&&!(sv.exclude&&rx(sv.exclude,/$^/).test(p.name)));
 const hasFt=ftServices()>0;
 /* สำรอง (เมื่อยังไม่มีข้อมูลสายจาก fataekts): รถประจำทางตามถนนสายหลัก หยุดตามแยก + อู่/สถานีขนส่ง — ค่าโดยสารฟรี */
 const bus=CF.svc.bus;if(!hasFt){const ok=e=>e.type==='road'&&bus.roads.includes(e.rt);const deg=new Map();G.E.forEach(e=>{if(!ok(e))return;deg.set(e.a,(deg.get(e.a)||0)+1);deg.set(e.b,(deg.get(e.b)||0)+1)});
  const stops=new Set();deg.forEach((d,n)=>{if(d!==2)stops.add(n)});
  match(bus).forEach(p=>{const n=nearestNode(+p.x,+p.y,i=>deg.has(i));if(n>=0)stops.add(n)});
  G.svcs.push({id:'bus',key:'bus',...bus,ok:stops.size>=2,stops,edgeOk:ok})}
 /* รถไฟ/เรือ: เชื่อมสถานี/ท่าเรือที่พบในแผนที่ด้วยเส้นทางตรง (แบบต้นไม้ที่สั้นที่สุด) */
 const lineSvc=(key,sv,stopPlaces)=>{const nodesS=[];const seenN=new Set();stopPlaces.forEach(p=>{const n=nearestNode(+p.x,+p.y);if(n<0||seenN.has(n))return;seenN.add(n);nodesS.push({n,p})});
  const o={id:key,key,...sv,stops:new Set(nodesS.map(q=>q.n)),ok:nodesS.length>=2,edgeOk:e=>e.svc===key,stopList:nodesS};
  if(o.ok){const inT=[0],rest=nodesS.map((_,i)=>i).slice(1);while(rest.length){let bi=-1,bj=-1,bd=1e9;inT.forEach(i=>rest.forEach(j=>{const d=Math.hypot(G.nodes[nodesS[i].n].x-G.nodes[nodesS[j].n].x,G.nodes[nodesS[i].n].y-G.nodes[nodesS[j].n].y);if(d<bd){bd=d;bi=i;bj=j}}));
    const a=nodesS[bi].n,b=nodesS[bj].n;addEdge(a,b,bd*KM,key,{svc:key});inT.push(bj);rest.splice(rest.indexOf(bj),1)}}
  G.svcs.push(o)};
 if(!hasFt){lineSvc('train',CF.svc.train,match(CF.svc.train));lineSvc('boat',CF.svc.boat,match(CF.svc.boat))}
 /* อื่นๆ: สายที่กำหนดเอง (ตั้งค่า ⚙️ → JSON) */
 (CF.custom||[]).forEach((c,i)=>{const ps=(c.stops||[]).map(s=>pl.find(p=>p.id===s||p.name===s)||items.find(p=>p.id===s||p.name===s)).filter(Boolean);const ns=[];ps.forEach(p=>{const n=nearestNode(+p.x,+p.y);if(n>=0&&ns[ns.length-1]!==n)ns.push(n)});
  const key='other'+i,o={id:key,key:'other',...{name:'สายพิเศษ',emoji:'✨',color:'#d6336c',speed:40,base:0,perKm:0,wait:6},...c,stops:new Set(ns),ok:ns.length>=2,edgeOk:e=>e.svc===key};
  if(o.ok)for(let k=1;k<ns.length;k++)addEdge(ns[k-1],ns[k],Math.hypot(G.nodes[ns[k-1]].x-G.nodes[ns[k]].x,G.nodes[ns[k-1]].y-G.nodes[ns[k]].y)*KM,key,{svc:key});
  G.svcs.push(o)});
 G.svcs=G.svcs.filter(s=>s.ok);G.L=1+G.svcs.length;G.base=G.nodes.length;G.baseE=G.E.length;
}

/* ---------- จุดบนแผนที่ → โหนดเสมือนบนถนน ---------- */
let VIRT=[];
function snapTo(x,y){let best=null;for(let i=0;i<G.baseE;i++){const e=G.E[i];if(e.type!=='road')continue;const A=G.nodes[e.a],B=G.nodes[e.b],dx=B.x-A.x,dy=B.y-A.y,L2=dx*dx+dy*dy;let t=L2?((x-A.x)*dx+(y-A.y)*dy)/L2:0;t=Math.max(0,Math.min(1,t));const px=A.x+t*dx,py=A.y+t*dy,d=Math.hypot(x-px,y-py);if(!best||d<best.d)best={e:i,t,px,py,d}}return best}
function addVirtual(pt){const s=snapTo(pt.x,pt.y);if(!s)return null;const e=G.E[s.e];G.nodes.push({x:s.px,y:s.py,virt:1});G.adj.push([]);const v=G.nodes.length-1;
 [[e.a,s.t],[e.b,1-s.t]].forEach(([u,f])=>{const ne=addEdge(v,u,e.km*f,'road',{rt:e.rt,name:e.name,rid:e.rid,orig:e.orig});ne.virt=1;ne.gates=e.gates;ne.toll=e.toll;VIRT.push({u,eid:ne.id})});
 return{node:v,conn:{km:s.d*KM,from:[pt.x,pt.y],to:[s.px,s.py]}}}
function clearVirtual(){VIRT.forEach(q=>{G.adj[q.u]=G.adj[q.u].filter(a=>a.e<G.baseE)});VIRT=[];G.nodes.length=G.base;G.adj.length=G.base;G.E.length=G.baseE}

/* ---------- Dijkstra หลายชั้น (เดิน/ขับ + ขึ้นรถประจำทาง/รถไฟ/เรือ) ---------- */
class Heap{constructor(){this.k=[];this.v=[]}push(key,val){const k=this.k,v=this.v;let i=k.length;k.push(key);v.push(val);while(i>0){const p=(i-1)>>1;if(k[p]<=key)break;k[i]=k[p];v[i]=v[p];i=p}k[i]=key;v[i]=val}
 pop(){const k=this.k,v=this.v,rv=v[0],lk=k.pop(),lv=v.pop(),n=k.length;if(n){let i=0;for(;;){let c=2*i+1;if(c>=n)break;if(c+1<n&&k[c+1]<k[c])c++;if(k[c]>=lk)break;k[i]=k[c];v[i]=v[c];i=c}k[i]=lk;v[i]=lv}return rv}get size(){return this.k.length}}
function stepMetrics(ed,layer,P){
 if(layer===0){
  if(P.mode==='car'){if(ed.type!=='road')return null;if(ed.toll>0&&P.noToll)return null;const sp=CF.speed.car[ed.rt]||CF.speed.car.local;return{t:ed.km/sp*60,f:ed.toll||0}}
  if(ed.type==='road'){if(ed.rt==='highway')return null;return{t:ed.km/CF.speed.walk*60,f:0}}
  if(ed.type==='link')return{t:ed.km/CF.speed.walk*60,f:0};
  return null}
 const sv=G.svcs[layer-1];if(!sv.edgeOk(ed))return null;return{t:ed.km/sv.speed*60,f:ed.km*sv.perKm}}
function dijkstra(S,T,P){
 const N=G.nodes.length,L=P.mode==='transit'?G.L:1,D=new Float64Array(N*L).fill(Infinity),PV=new Int32Array(N*L).fill(-1),PE=new Int32Array(N*L).fill(-2),H=new Heap(),mu=P.mu;
 D[S*L]=0;H.push(0,S*L);
 const wcost=P.obj==='dist'&&P.mode!=='transit';
 while(H.size){const st=H.pop(),d=D[st],n=(st/L)|0,ly=st%L;
  if(st===T*L)break;
  const rows=G.adj[n];
  for(let i=0;i<rows.length;i++){const a=rows[i],ed=G.E[a.e],m=stepMetrics(ed,ly,P);if(!m)continue;
   let c=wcost?ed.km:m.t+mu*m.f;const pn=P.pen&&P.pen.get(ed.orig);if(pn)c*=1+pn;
   const ns=a.to*L+ly;if(d+c<D[ns]){D[ns]=d+c;PV[ns]=st;PE[ns]=a.e;H.push(d+c,ns)}}
  if(P.mode==='transit'){
   if(ly===0){for(let s=0;s<G.svcs.length;s++){const sv=G.svcs[s];if(!P.use[sv.key]||!sv.ok||!sv.stops.has(n))continue;const c=sv.wait+mu*sv.base,ns=n*L+s+1;if(d+c<D[ns]){D[ns]=d+c;PV[ns]=st;PE[ns]=-1;H.push(d+c,ns)}}}
   else{const sv=G.svcs[ly-1];if(sv.stops.has(n)){const ns=n*L;if(d<D[ns]){D[ns]=d;PV[ns]=st;PE[ns]=-3;H.push(d,ns)}}}}}
 const end=T*L;if(!isFinite(D[end]))return null;
 const path=[];let s=end;while(PV[s]>=0){path.push({from:(PV[s]/L)|0,to:(s/L)|0,e:PE[s],layer:PE[s]===-3?(PV[s]%L):(s%L),k:PE[s]===-1?'board':PE[s]===-3?'alight':'move'});s=PV[s]}
 path.reverse();return{cost:D[end],path}}

/* ---------- ประกอบผลลัพธ์ของเส้นทาง (เวลา ระยะทาง ค่าเดินทาง ขั้นตอน) ---------- */
function geomOf(ed,from){if(ed.geom)return from===ed.a?ed.geom:ed.geom.slice().reverse();const A=G.nodes[ed.a],B=G.nodes[ed.b];return from===ed.a?[[A.x,A.y],[B.x,B.y]]:[[B.x,B.y],[A.x,A.y]]}
function placeNear(x,y,r){let b=null,bd=r;items.forEach(p=>{if(!isPlace(p)||!p.name)return;const d=Math.hypot(+p.x-x,+p.y-y);if(d<bd){bd=d;b=p}});return b}
function stopName(n){const nd=G.nodes[n];if(nd.name)return nd.name;const p=placeNear(nd.x,nd.y,3);if(p)return p.name;const nm=[...new Set(G.adj[n].map(a=>G.E[a.e].name).filter(Boolean))];return nm.length?('แยก'+nm.slice(0,2).join(' / ')):'จุดจอด'}
function evalLeg(res,P,conn0,conn1){
 const segs=[];let cur=null,t=0,km=0,fareSvc={},walkT=0;const gateSet=new Map();
 const flush=()=>{if(cur){segs.push(cur);cur=null}};
 const addConn=(c,first)=>{if(!c||c.km<0.02)return;const w=c.km/CF.speed.walk*60;t+=w;km+=c.km;const g=first?[c.from,c.to]:[c.to,c.from];segs.push({layer:0,type:'conn',name:'',km:c.km,t:w,geom:g,svc:null,conn:1,edges:[]})};
 addConn(conn0,true);
 let lastHW=false,boardAt=null;
 res.path.forEach(st=>{
  if(st.k==='board'){flush();const sv=G.svcs[st.layer-1];t+=sv.wait;boardAt=st.from;fareSvc[sv.id]=fareSvc[sv.id]||0;cur={layer:st.layer,type:'ride',svc:sv,name:sv.name,km:0,t:sv.wait,geom:[],edges:[],from:st.from,to:st.from,wait:sv.wait};return}
  if(st.k==='alight'){if(cur){cur.to=st.from;flush()}return}
  const ed=G.E[st.e],m=stepMetrics(ed,st.layer,P),g=geomOf(ed,st.from);
  t+=m.t;km+=ed.km;
  let key=st.layer===0?(P.mode==='car'?'car':'walk')+'|'+(ed.name||ed.type):'ride';
  if(st.layer>0){fareSvc[G.svcs[st.layer-1].id]=fareSvc[G.svcs[st.layer-1].id]||0;if(!cur||cur.layer!==st.layer){flush();cur={layer:st.layer,type:'ride',svc:G.svcs[st.layer-1],name:G.svcs[st.layer-1].name,km:0,t:0,geom:[],edges:[],from:st.from,to:st.to}}cur.hops=(cur.hops||0)+1}
  else{if(!cur||cur.key!==key){flush();cur={layer:0,type:P.mode==='car'?'car':'walk',key,name:ed.name||(ed.type==='link'?'ทางเดินไปจุดขึ้นรถ/สถานี':'ถนนไม่มีชื่อ'),km:0,t:0,geom:[],edges:[],rt:ed.rt}}
   if(P.mode==='car'&&ed.gates)ed.gates.forEach(gt=>gateSet.set(gt.id,gt))}
  cur.km+=ed.km;cur.t+=m.t;cur.geom.push(...(cur.geom.length?g.slice(1):g));cur.edges.push(ed.orig);cur.to=st.to;cur.hw=cur.hw||ed.rt==='highway';
  if(ed.rt==='highway')cur.hw=1;cur.roads=cur.roads||new Set();if(ed.name)cur.roads.add(ed.name)});
 flush();addConn(conn1,false);
 /* ค่าโดยสาร = ราคาสาย(API) ÷ จำนวนสถานีที่เดินทาง · เศษปัดเป็น .0 หรือ .5 เท่านั้น (เช่น 5 ÷ 2 = 2.5) */
 segs.forEach(sg=>{if(sg.type==='ride'&&sg.svc){const h=Math.max(1,sg.hops||0),f=Math.round(((+sg.svc.base||0)/h)*2)/2;sg.stn=h;sg.fare=f;fareSvc[sg.svc.id]=(fareSvc[sg.svc.id]||0)+f}});
 const gl=[...gateSet.values()],tollTotal=gl.reduce((a,g)=>a+g.price,0);
 return{segs,t,km,fare:{toll:tollTotal,gates:gl,svc:fareSvc},edges:new Set(segs.flatMap(s=>s.edges))};
}

/* ---------- คำนวณเส้นทางหลายจุด ---------- */
function planRoute(points,P){
 VIRT=[];const vs=points.map(addVirtual);let out=null;
 try{if(vs.some(v=>!v))return null;const legs=[];
  for(let i=0;i<points.length-1;i++){const r=dijkstra(vs[i].node,vs[i+1].node,P);if(!r)return null;legs.push(evalLeg(r,P,i===0?vs[0].conn:vs[i].conn,vs[i+1].conn))}
  const fare={toll:0,gates:[],svc:{}};let t=0,km=0;const edges=new Set();
  legs.forEach(l=>{t+=l.t;km+=l.km;fare.toll+=l.fare.toll;l.fare.gates.forEach(g=>fare.gates.push(g));for(const k in l.fare.svc)fare.svc[k]=(fare.svc[k]||0)+l.fare.svc[k];l.edges.forEach(x=>edges.add(x))});
  const svcFare=Object.values(fare.svc).reduce((a,b)=>a+b,0);
  out={legs,t,km,fare,total:fare.toll+svcFare,svcFare,edges,mode:P.mode,P}
 }finally{clearVirtual()}
 return out}
const edgeKm=new Map();function overlap(a,b){let sh=0,ta=0,tb=0;G.E.forEach(e=>{});a.edges.forEach(id=>{const k=G.E[id]?G.E[id].km:0;ta+=k;if(b.edges.has(id))sh+=k});b.edges.forEach(id=>{tb+=G.E[id]?G.E[id].km:0});const m=Math.min(ta,tb);return m?sh/m:1}
function usesSvc(r){return Object.keys(r.fare.svc).length>0}
function variants(points,mode,use,obj,nt){
 const base={mode,use,mu:CF.mu,obj:obj||'t',noToll:!!nt},list=[];
 const add=(P,label,tag)=>{const r=planRoute(points,P);if(r){r.label=label;r.tag=tag||'';list.push(r)}return r};
 const r1=add(base,obj==='d'?'ระยะสั้นที่สุด':obj==='f'?'ประหยัดที่สุด':'เร็วที่สุด');
 if(!r1)return list;
 if(mode!=='transit'&&obj!=='d')add({...base,obj:'dist'},'ระยะสั้นที่สุด');
 if(mode==='car'&&!nt&&r1.fare.toll>0)add({...base,noToll:true},'เลี่ยงทางด่วน (ไม่เสียค่าผ่านทาง)','noToll');
 if(mode==='transit'&&usesSvc(r1)){add({...base,mu:2},'ประหยัดค่าโดยสาร')}
 const pen=new Map();r1.edges.forEach(id=>pen.set(id,1.5));
 for(let k=0;k<3&&list.length<6;k++){const r=planRoute(points,{...base,pen});if(!r)break;r.label='เส้นทางสำรอง';list.push(r);r.edges.forEach(id=>pen.set(id,(pen.get(id)||0)+1.5))}
 return list}
function pickAlts(cands,max,score){
 cands.forEach(c=>c.score=score(c));
 const sorted=cands.slice().sort((a,b)=>a.score-b.score),out=[];
 for(const c of sorted){if(out.length>=max)break;if(c.edges.size===0&&out.some(o=>o.mode===c.mode&&o.edges.size===0))continue;
  if(out.some(o=>o.mode===c.mode&&overlap(o,c)>0.82))continue;if(out.length&&c.score>sorted[0].score*3+60)continue;out.push(c)}
 return out}

/* ---------- คำอธิบายเส้นทาง ---------- */
const dirv=(a,b)=>[b[0]-a[0],b[1]-a[1]];
function turnWord(v0,v1){const c=v0[0]*v1[1]-v0[1]*v1[0],d=v0[0]*v1[0]+v0[1]*v1[1],ang=Math.atan2(c,d)*180/Math.PI;const a=Math.abs(ang);if(a<25)return 'ตรงไป';if(a>155)return 'กลับรถ';return ang>0?(a<65?'เลี้ยวขวาเล็กน้อย':'เลี้ยวขวา'):(a<65?'เลี้ยวซ้ายเล็กน้อย':'เลี้ยวซ้าย')}
function stepsOf(r){
 const steps=[];let prevDir=null;const P=S.pts;
 steps.push({i:'🟢',t:'เริ่มที่ '+(P[0].name||'ต้นทาง'),s:'',box:[P[0].x,P[0].y,P[0].x,P[0].y]});
 r.legs.forEach((leg,li)=>{
  leg.segs.forEach(sg=>{const box=sg.geom.length?[Math.min(...sg.geom.map(a=>a[0])),Math.min(...sg.geom.map(a=>a[1])),Math.max(...sg.geom.map(a=>a[0])),Math.max(...sg.geom.map(a=>a[1]))]:null;
   const dv=sg.geom.length>1?dirv(sg.geom[0],sg.geom[Math.min(2,sg.geom.length-1)]):null;
   if(sg.type==='conn'){steps.push({i:'🚶',t:'เดินเข้า/ออกจากถนน',s:fmtD(sg.km)+' · '+fmtT(sg.t),box});return}
   if(sg.layer>0){const sv=sg.svc;const a=stopName(sg.from),b=stopName(sg.to);const roads=sg.roads&&sg.roads.size?[...sg.roads].slice(0,3).join(' › '):'';const fare=sg.fare!=null?sg.fare:sv.base;
    steps.push({i:sv.emoji,t:`ขึ้น${sv.name}ที่ ${a} → ลงที่ ${b}`,s:`${fmtD(sg.km)} · ${fmtT(sg.t)} (รวมรอ ${sv.wait} นาที)${roads?' · ผ่าน '+roads:''} · เดินทาง ${sg.stn||1} สถานี · ค่าโดยสาร ${fmtF(fare)}${(+sv.base>0&&(sg.stn||1)>0)?` (${sv.base} ÷ ${sg.stn||1})`:''}`,box});prevDir=null;return}
   const tw=prevDir&&dv?turnWord(prevDir,dv):'';const verb=sg.type==='car'?'ขับ':'เดิน';const hw=sg.hw?` · 🛣️ ทางด่วน/ทางหลวง`:'';
   steps.push({i:sg.type==='car'?(tw&&tw!=='ตรงไป'?(tw.indexOf('ซ้าย')>=0?'↰':tw.indexOf('ขวา')>=0?'↱':'↩'):'⬆️'):'🚶',t:`${tw&&tw!=='ตรงไป'?tw+' แล้ว':''}${verb}ตาม ${sg.name}`,s:`${fmtD(sg.km)} · ${fmtT(sg.t)}${hw}`,box});
   if(dv){const e=sg.geom.length;prevDir=dirv(sg.geom[Math.max(0,e-2)],sg.geom[e-1])}});
  const q=P[li+1];steps.push({i:li===r.legs.length-1?'🏁':'📌',t:(li===r.legs.length-1?'ถึง ':'แวะที่ ')+(q.name||'จุดหมาย'),s:'',box:[q.x,q.y,q.x,q.y]})});
 return steps}
/* ---------- สถานะ UI ของหน้า /go ---------- */
const S={pts:[{},{}],mode:'rec',obj:'t',use:{road:true,train:true,bus:true,boat:true,other:true},noToll:false,routes:[],sel:0,focus:-1,cfg:0,__r:0,panel:'',_steps:[]};
const COL={car:'#1a73e8',walk:'#5f6368'};
let built=0,gsig='',calcT=0,entered=0,rq=0,sgList=[],sgFor=-1,ftSig='',ftT=0;
let FTAPI2=0;
async function ftBackup2(){if(FTAPI2||FT.length)return;try{const r=await fetch(encodeURI(FT_CSV),{cache:'no-store'});if(!r.ok)return;const it=ftCsvItems(await r.text());if(!it.length||FTAPI2||FT.length)return;FT=it;gsig='';if(curPage==='go'){ensureGraph();if(built)renderModes();if(S.cfg)renderChips();if(S.pts.every(p=>p.x!=null))recalc()}}catch(_){}}
async function loadFt(force){if(typeof FATAEKTS_API==='undefined'||!FATAEKTS_API)return;if(!force&&Date.now()-ftT<20000)return;ftT=Date.now();
 if(!FT.length)ftBackup2();
 try{const r=await fetch(FATAEKTS_API+'?action=list',{cache:'no-store'});const t=await r.text();const j0=JSON.parse(t);if(!(j0&&j0.ok&&Array.isArray(j0.items)))throw 0;FTAPI2=1;apiOk('fataekts');if(t===ftSig)return;const j=j0;
  if(j&&j.ok&&Array.isArray(j.items)){ftSig=t;FT=j.items;if(curPage==='go'){ensureGraph();if(built)renderModes();if(S.cfg)renderChips();if(S.pts.every(p=>p.x!=null))recalc()}}}catch(_){apiFail('fataekts',false);ftBackup2()}}
const $B=()=>document.querySelector('#body');
function ensureGraph(){const sig=PL.length+':'+rev+':'+(typeof lastChg!=='undefined'?lastChg:0)+':'+ftSig.length+':'+FT.length;if(sig===gsig&&G.nodes.length)return false;gsig=sig;items=PL.filter(p=>p&&p.kind);buildGraph();return true}

/* ---------- โครงหน้า (ใช้สไตล์เดียวกับแอป) ---------- */
function skeleton(){return `<div class="go"><div class="ao-box"><div id="go-pts"></div><div class="go-tools"><button data-go="add">➕ จุดแวะ</button><button data-go="swap">⇅ สลับ</button><button data-go="clear">ล้าง</button></div></div>
<div id="go-modes" class="go-modes"></div><div id="go-res"></div></div>`}
window.goPanel=function(Bel){
 if(S.cfg){Bel.innerHTML=cfgHtml();built=0;renderChips();return}
 ensureGraph();
 if(!built||!document.querySelector('#go-pts')){Bel.innerHTML=skeleton();built=1;renderPts();renderModes();renderRes();dockUpdate();if(S.pts.every(p=>p.x!=null)&&!S.routes.length)recalc()}}
window.goEnter=function(){loadFt();setSt(Math.max(st,1));if(!entered){entered=1;ensureGraph();if(loadFromUrl()){built=0;S.cfg=0}}else ensureGraph();setTimeout(()=>goDraw(false),0)};
window.goLeave=function(){built=0;S.focus=-1;S.panel='';const dk=document.getElementById('godock'),pn=document.getElementById('gopanel');if(dk)dk.hidden=true;document.body.classList.remove('gopd');document.body.classList.remove('gomin');const mb=document.getElementById('go-min');if(mb)mb.textContent='▾';if(pn)pn.hidden=true;const t=document.getElementById('gotap');if(t)t.hidden=true;const g=document.getElementById('goL');if(g)g.innerHTML=''};

/* ---------- ชั้นเส้นทางบนแผนที่หลัก ---------- */
function ovl(){let g=document.getElementById('goL');if(!g){svg.insertAdjacentHTML('beforeend','<g id="goL" pointer-events="none"></g>');g=document.getElementById('goL')}return g}
window.goScale=function(){if(curPage==='go'&&!rq){rq=1;requestAnimationFrame(()=>{rq=0;goDraw(false)})}};
function goDraw(fitIt){
 const g=ovl();g.innerHTML='';if(curPage!=='go')return;const k=1/sc();
 const line=(pts,col,wpx,dash,op)=>`<path d="M${pts.map(a=>a[0]+' '+a[1]).join('L')}" fill="none" stroke="${col}" stroke-width="${wpx*k}" stroke-linecap="round" stroke-linejoin="round"${dash?` stroke-dasharray="${dash[0]*k} ${dash[1]*k}"`:''}${op?` stroke-opacity="${op}"`:''}/>`;
 let h='';
 S.routes.forEach((r,i)=>{if(i===S.sel)return;r.legs.forEach(l=>l.segs.forEach(s=>{if(s.geom.length>1)h+=line(s.geom,'#7b8ea6',5,null,.7)}))});
 const r=S.routes[S.sel];
 if(r){const segs=r.legs.flatMap(l=>l.segs);segs.forEach(s=>{if(s.geom.length>1)h+=line(s.geom,'#fff',9)});
  segs.forEach(s=>{if(s.geom.length<2)return;const w=s.type==='walk'||s.type==='conn';h+=line(s.geom,s.layer>0?s.svc.color:s.type==='car'?COL.car:COL.walk,w?4.5:6.5,w?[7,7]:null)})}
 const n=S.pts.length;S.pts.forEach((p,i)=>{if(p.x==null)return;const col=i===0?'#2f9e44':i===n-1?'#e03131':'#1c7ed6';h+=`<circle cx="${p.x}" cy="${p.y}" r="${11*k}" fill="${col}" stroke="#fff" stroke-width="${2.5*k}"/><text x="${p.x}" y="${p.y}" text-anchor="middle" dominant-baseline="central" font-size="${12*k}" font-weight="800" fill="#fff">${i===0?'A':i===n-1?'B':i}</text>`});
 g.innerHTML=h;
 if(fitIt){const xs=[],ys=[];if(r)r.legs.forEach(l=>l.segs.forEach(s=>s.geom.forEach(p=>{xs.push(p[0]);ys.push(p[1])})));S.pts.forEach(p=>{if(p.x!=null){xs.push(p.x);ys.push(p.y)}});
  if(xs.length){const x0=Math.min(...xs),y0=Math.min(...ys);fit({x:x0,y:y0,w:Math.max(Math.max(...xs)-x0,24),h:Math.max(Math.max(...ys)-y0,24)},1.5)}}}

/* ---------- แตะแผนที่เพื่อเลือกจุด ---------- */
document.body.insertAdjacentHTML('beforeend','<div id="gotap" hidden></div>');
let tapPt=null;
const catLabel=p=>{try{return catOf(p.cat)[1]}catch(_){return ''}};
window.goTap=function(e){
 const w=wpos(e.clientX,e.clientY),pm=e.target.closest&&e.target.closest('.pm');let p=null;
 const toP=it=>({x:+it.x,y:+it.y,id:it.id,name:it.name||'สถานที่',sub:catLabel(it)});
 if(pm){const it=PL.find(a=>a.id===pm.dataset.id);if(it&&it.kind==='place')p=toP(it)}
 if(!p){let bd=18/sc();PL.forEach(it=>{if(it.kind!=='place')return;const d=Math.hypot(+it.x-w[0],+it.y-w[1]);if(d<bd){bd=d;p=toP(it)}})}
 if(!p)p={x:w[0],y:w[1],name:'จุดบนแผนที่',sub:Math.round(w[0])+', '+Math.round(w[1])};
 if(S.focus>=0){const i=S.focus;S.focus=-1;setPoint(i,p);document.getElementById('gotap').hidden=true;return true}
 tapPt=p;const t=document.getElementById('gotap');t.innerHTML=`<div><b>${esc(p.name)}</b><br><small>${esc(p.sub)}</small></div><div class="go-tb"><button data-go="tap" data-v="from">🟢 เริ่มจากที่นี่</button><button data-go="tap" data-v="via">🔵 แวะที่นี่</button><button data-go="tap" data-v="to">🔴 ไปที่นี่</button></div>`;t.hidden=false;return true};
svg.addEventListener('pointerdown',()=>{const t=document.getElementById('gotap');if(t)t.hidden=true},true);

/* ---------- ช่องกรอกจุด + ค้นหา ---------- */
function renderPts(){
 if(window.gbR)gbR();const box=document.getElementById('go-pts');if(!box)return;const n=S.pts.length;
 box.innerHTML=S.pts.map((p,i)=>{const col=i===0?'#2f9e44':i===n-1?'#e03131':'#1c7ed6';
  return `<div class="go-pr"><span class="go-dot" style="background:${col}">${i===0?'A':i===n-1?'B':i}</span><input class="go-in" data-i="${i}" placeholder="${i===0?'ต้นทาง (ชื่อสถานที่/ถนน หรือแตะแผนที่)':i===n-1?'ปลายทาง':'จุดแวะ '+i}" value="${esc(p&&p.name?p.name:'')}" autocomplete="off"><button class="go-x" data-go="pick" data-v="${i}" title="เลือกจากแผนที่">📍</button>${n>2&&i>0&&i<n-1?`<button class="go-x" data-go="del" data-v="${i}" title="ลบ">✕</button>`:''}</div>`}).join('');
 goDraw(false)}
function suggestFor(q){q=q.trim().toLowerCase();if(!q)return[];const out=[];
 G.places.forEach(p=>{const k=p.name.toLowerCase().indexOf(q);if(k>=0)out.push({k,type:'place',p,label:p.name,sub:catLabel(p)||'สถานที่'})});
 G.roadNames.forEach(r=>{const k=r.name.toLowerCase().indexOf(q);if(k>=0)out.push({k:k+.5,type:'road',label:r.name,sub:'ถนน',p:{x:r.x,y:r.y,name:r.name}})});
 out.sort((a,b)=>a.k-b.k||a.label.length-b.label.length);const seen=new Set();return out.filter(o=>{const k=o.label+o.type;if(seen.has(k))return false;seen.add(k);return true}).slice(0,8)}
function showSg(i,input){const old=document.getElementById('go-sg');if(old)old.remove();ensureGraph();sgList=suggestFor(input.value);sgFor=i;if(!sgList.length)return;
 const d=document.createElement('div');d.id='go-sg';d.innerHTML=sgList.map((o,k)=>`<button data-go="sg" data-v="${k}"><span>${esc(o.type==='place'?iconOf(o.p):'🛣️')}</span><span>${esc(o.label)}</span><small>${esc(o.sub)}</small></button>`).join('');
 d.onmousedown=d.ontouchstart=e=>e.preventDefault();input.parentNode.appendChild(d)}
function setPoint(i,p){S.pts[i]=p;renderPts();recalc()}

/* ---------- โหมด / ตัวเลือก ---------- */
const MODES=[['rec','🧭','แนะนำ'],['car','🚗','รถยนต์'],['walk','🚶','เดิน'],['transit','🚌','ขนส่งสาธารณะ']];
function renderModes(){
 if(window.gbR)gbR();const a=document.getElementById('go-modes');if(!a)return;
 a.innerHTML=MODES.map(m=>`<button data-go="mode" data-v="${m[0]}" class="${S.mode===m[0]?'on':''}"><b>${m[1]}</b>${m[2]}</button>`).join('')}
function renderChips(){
 const u=document.getElementById('go-use'),o=document.getElementById('go-obj');if(!u||!o)return;
 const have=k=>k==='road'||G.svcs.some(s=>s.key===k&&s.ok);
 u.innerHTML=[['road','🛣️ ถนน'],['train','🚆 รถไฟ'],['bus','🚌 รถประจำทาง'],['boat','⛴️ เรือ'],['other','✨ อื่นๆ']].filter(c=>c[0]!=='other'||G.svcs.some(s=>s.key==='other')).map(c=>`<button data-go="use" data-v="${c[0]}" class="${S.use[c[0]]&&have(c[0])?'on':''}" ${have(c[0])?'':'disabled title="ยังไม่มีข้อมูลสายนี้ในแผนที่"'}>${c[1]}</button>`).join('');
 o.innerHTML=[['t','⏱️ เร็วที่สุด'],['d','📏 สั้นที่สุด'],['f','💰 ประหยัดที่สุด']].map(c=>`<button data-go="obj" data-v="${c[0]}" class="${S.obj===c[0]?'on':''}">${c[1]}</button>`).join('')+`<button data-go="nt" class="${S.noToll?'on':''}">🚫 เลี่ยงทางด่วน</button>`}

/* ---------- คำนวณ + แสดงผล ---------- */
function recalc(){clearTimeout(calcT);calcT=setTimeout(doCalc,30)}
function doCalc(){
 ensureGraph();
 if(S.pts.some(p=>p.x==null)){S.routes=[];renderRes();goDraw(false);return}
 const use={bus:!!S.use.bus,train:!!S.use.train,boat:!!S.use.boat,other:!!S.use.other};
 const U=new Proxy({},{get:(_,k)=>String(k).indexOf('other')===0?use.other:use[k]});
 let cands=[];const score=r=>S.obj==='d'?r.km:S.obj==='f'?r.t+2*r.total:r.t+CF.mu*r.total;
 (S.mode==='rec'?['car','transit','walk']:[S.mode]).forEach(m=>{if(m!=='transit'&&!S.use.road)return;if(m==='transit'&&!G.svcs.some(s=>S.use[s.key]&&s.ok))return;
  let cs=variants(S.pts,m,U,S.obj,m==='car'&&S.noToll);if(m==='transit')cs=cs.filter(r=>usesSvc(r)||S.mode==='transit');cands.push(...cs)});
 const alts=S.mode==='rec'?pickRec(cands,4,score):pickAlts(cands,3,score);
 if(S.mode==='rec'&&alts.length)alts[0].label='แนะนำ · '+alts[0].label;
 S.routes=alts;S.sel=S.__r&&alts[S.__r]?S.__r:0;S.__r=0;renderRes();goDraw(true);saveUrl()}
function pickRec(cands,max,score){
 cands.forEach(c=>c.score=score(c));const sorted=cands.slice().sort((a,b)=>a.score-b.score);if(!sorted.length)return[];const out=[sorted[0]];
 ['car','transit','walk'].forEach(m=>{if(out.length>=max||out.some(o=>o.mode===m))return;const c=sorted.find(x=>x.mode===m);if(c&&c.score<=sorted[0].score*4+30)out.push(c)});
 for(const c of sorted){if(out.length>=max)break;if(out.includes(c))continue;if(out.some(o=>o.mode===c.mode&&overlap(o,c)>0.82))continue;out.push(c)}
 return out}
function altCards(){return S.routes.map((x,i)=>{const mi=x.mode==='car'?'🚗':x.mode==='walk'?'🚶':'🚌',tags=[];if(x.fare.toll>0)tags.push('<span class="go-tag">🛣️ ผ่านด่านทางด่วน</span>');Object.keys(x.fare.svc).forEach(k=>{const s=G.svcs.find(q=>q.id===k);if(s)tags.push(`<span class="go-tag">${s.emoji} ${esc(s.name)}</span>`)});
  return `<button class="go-alt ${i===S.sel?'on':''}" data-go="alt" data-v="${i}"><div class="go-t"><b>${fmtT(x.t)}</b><span>${fmtD(x.km)}</span><em>${x.total>0?fmtF(x.total):'ฟรี'}</em></div><div class="go-s">${mi} ${esc(x.label)}</div><div>${tags.join('')}</div></button>`}).join('')}
function renderRes(){
 const box=document.getElementById('go-res');if(box){
  if(!S.routes.length){const ready=S.pts.every(p=>p.x!=null);
   box.innerHTML=ready?`<div class="go-msg">ไม่พบเส้นทางด้วยตัวเลือกนี้ — ลองเปลี่ยนรูปแบบการเดินทาง หรือกด ⚙️ เปิดตัวเลือก 🛣️ ถนน / ปิด “เลี่ยงทางด่วน”</div>`:`<div class="go-note">ใส่ต้นทางและปลายทาง (เพิ่มจุดแวะได้) แล้วระบบจะแสดงเส้นทาง เวลา ระยะทาง และค่าเดินทางเป็น “${esc(CF.unit)}”</div>`}
  else box.innerHTML=`<div class="go-alts">${altCards()}</div>`}
 S._steps=S.routes.length?stepsOf(S.routes[S.sel]):[];dockUpdate()}
/* ---------- แถบไอคอนติดล่างจอ + แผงเต็ม ---------- */
document.body.insertAdjacentHTML('beforeend','<div id="godock" hidden><button data-go="fare"><i>💰</i><span>ค่าเดินทาง</span></button><button data-go="route"><i>🧭</i><span>วิธีเดินทาง</span></button><button data-go="share"><i>🔗</i><span>แชร์</span></button></div><div id="gopanel" hidden></div>');
function dockUpdate(){const dk=document.getElementById('godock');if(!dk)return;dk.hidden=!(curPage==='go'&&S.routes.length);document.body.classList.toggle('gopd',!dk.hidden);
 dk.querySelectorAll('button').forEach(b=>b.classList.toggle('on',b.dataset.go===S.panel));if(S.panel&&S.routes.length)renderPanel();else if(!S.routes.length){S.panel='';const p=document.getElementById('gopanel');if(p)p.hidden=true}}
function openPanel(k){S.panel=S.panel===k?'':k;const p=document.getElementById('gopanel');if(!S.panel){p.hidden=true}else{renderPanel();p.hidden=false}dockUpdate()}
function summaryHtml(r){return `<div class="go-sum"><div><b>${fmtT(r.t)}</b><small>เวลา</small></div><div><b>${fmtD(r.km)}</b><small>ระยะทาง</small></div><div><b>${r.total>0?fmtF(r.total):'ฟรี'}</b><small>ค่าเดินทาง</small></div></div>`}
function renderPanel(){
 const p=document.getElementById('gopanel'),r=S.routes[S.sel];if(!p||!r)return;
 const head=t=>`<div class="go-ph"><b>${t}</b><button data-go="pclose" aria-label="ปิด">✕</button></div>`;
 if(S.panel==='fare'){
  const rows=[];r.fare.gates.forEach(gt=>rows.push(`<div><span>🛣️ ${esc(/^ด่าน/.test(gt.name)?gt.name:'ด่าน'+gt.name)}</span><b>${fmtF(gt.price)}</b></div>`));
  Object.keys(r.fare.svc).forEach(k=>{const s=G.svcs.find(q=>q.id===k);if(s){const dt=r.legs.flatMap(l=>l.segs).filter(sg=>sg.svc&&sg.svc.id===k).map(sg=>(sg.stn||1)+' สถานี').join(' + ');rows.push(`<div><span>${s.emoji} ${esc(s.name)}${dt?` <small style="color:var(--mut)">(${dt})</small>`:''}</span><b>${fmtF(r.fare.svc[k])}</b></div>`)}});
  const cmp=S.routes.map((x,i)=>`<button class="go-cmp ${i===S.sel?'on':''}" data-go="palt" data-v="${i}"><span>${x.mode==='car'?'🚗':x.mode==='walk'?'🚶':'🚌'} ${esc(x.label)}</span><small>${fmtT(x.t)} · ${fmtD(x.km)}</small><b>${x.total>0?fmtF(x.total):'ฟรี'}</b></button>`).join('');
  p.innerHTML=head('💰 ค่าเดินทาง')+`<div class="go-pb"><div class="go-big"><small>${esc(r.label)}</small><b>${r.total>0?fmtF(r.total):'ฟรี'}</b></div><div class="go-fare"><h3>รายละเอียด</h3>${rows.length?rows.join('')+`<div class="go-tot"><span>รวม</span><span>${fmtF(r.total)}</span></div>`:`<div><span>ไม่ผ่านด่านเก็บเงิน และไม่ต้องจ่ายค่าโดยสาร</span><b>0 ${esc(CF.unit)}</b></div>`}</div><div class="go-note">ค่าทางด่วนเก็บเฉพาะด่านที่เส้นทางผ่าน · ค่าโดยสารรถไฟ/รถประจำทาง/เรือ = ราคาของสายใน fataekts ÷ จำนวนสถานีที่เดินทาง (เศษปัดเป็น .0 หรือ .5)</div><div class="go-l">เปรียบเทียบทุกเส้นทาง</div>${cmp}</div>`}
 else{
  p.innerHTML=head('🧭 วิธีเดินทาง')+`<div class="go-pb">${summaryHtml(r)}<div class="go-s" style="margin:4px 2px">${esc(r.label)}</div><ol class="go-steps">${S._steps.map((s,i)=>`<li data-go="step" data-v="${i}"><i>${s.i}</i><div>${esc(s.t)}<small>${esc(s.s)}</small></div></li>`).join('')}</ol></div>`}}
function selectRoute(i){if(i<0||i>=S.routes.length)return;S.sel=i;renderRes();goDraw(false);saveUrl()}

/* ---------- แชร์เส้นทาง ---------- */
const encPt=p=>p.id?p.id:(Math.round(p.x*10)/10)+','+(Math.round(p.y*10)/10);
function goQ(){const q=new URLSearchParams();q.set('p',S.pts.map(encPt).join('~'));q.set('m',S.mode);q.set('o',S.obj);q.set('u',['road','train','bus','boat','other'].filter(k=>S.use[k]).join(','));if(S.noToll)q.set('nt','1');q.set('r',S.sel);return q}
function siteRoot(){if(/^https?:$/.test(location.protocol)&&!/^(localhost|127\.|0\.0\.0\.0)/.test(location.hostname))return location.origin+location.pathname.replace(/\/((cars|houses)\/edit|map|edit|zip|Add-ons|cars|houses|go)\/?$/i,'/');return baseUrl()}
function shareUrl(){return PATHMODE?siteRoot()+'go?'+goQ():siteRoot()+'#/go?'+goQ()}
function saveUrl(){try{if(curPage!=='go')return;history.replaceState(null,'',PATHMODE?location.pathname+'?'+goQ():location.pathname+location.search+'#/go?'+goQ())}catch(_){}}
function loadFromUrl(){
 let qs=location.search;if(!/[?&]p=/.test(qs)){const h=location.hash||'',k=h.indexOf('?');qs=k>=0?h.slice(k):''}
 const q=new URLSearchParams(qs);if(!q.get('p'))return false;
 ensureGraph();
 const pts=q.get('p').split('~').map(s=>{if(s.indexOf(',')>=0){const[x,y]=s.split(',').map(Number);return isFinite(x)&&isFinite(y)?{x,y,name:'จุดบนแผนที่'}:{}}const p=PL.find(i=>i.id===s);return p?{x:+p.x,y:+p.y,id:p.id,name:p.name}:{}});
 if(pts.length<2)return false;S.pts=pts;if(['rec','car','walk','transit'].includes(q.get('m')))S.mode=q.get('m');if(['t','d','f'].includes(q.get('o')))S.obj=q.get('o');
 if(q.get('u')!=null){const u=q.get('u').split(',');['road','train','bus','boat','other'].forEach(k=>S.use[k]=u.includes(k))}S.noToll=q.get('nt')==='1';S.__r=+q.get('r')||0;S.routes=[];return true}
async function doShare(){const r=S.routes[S.sel];if(!r)return;const url=shareUrl();
 const txt=`เส้นทาง ${S.pts.map(p=>p.name||'จุดบนแผนที่').join(' → ')}\n${fmtT(r.t)} · ${fmtD(r.km)} · ${r.total>0?fmtF(r.total):'ฟรี'}`;
 if(navigator.share){try{await navigator.share({title:'เส้นทางนำทาง',text:txt,url});return}catch(e){if(e&&e.name==='AbortError')return}}
 copy(url,'คัดลอกลิงก์เส้นทางแล้ว')}

/* ---------- ตั้งค่า (ในหน้าเดียวกัน) ---------- */
function cfgHtml(){return `<div class="go"><div class="ao-box"><b>⚙️ ตัวเลือกเส้นทาง</b><div class="go-l" style="margin-left:0">เลือกใช้เส้นทาง</div><div id="go-use" class="go-chips"></div><div class="go-l" style="margin-left:0">เรียงตาม</div><div id="go-obj" class="go-chips"></div></div><div class="go-acts"><button data-go="cfg-close">เสร็จ</button></div></div>`}

/* ---------- เหตุการณ์ (delegation บน #body) ---------- */
function onClick(e){
 if(curPage!=='go')return;const b=e.target.closest('[data-go]');if(!b)return;const a=b.dataset.go,v=b.dataset.v;e.stopPropagation();
 if(a==='add'){if(S.pts.length>=8){toast('เพิ่มจุดแวะได้สูงสุด 6 จุด');return}S.pts.splice(S.pts.length-1,0,{});renderPts();const el=document.querySelector('.go-in[data-i="'+(S.pts.length-2)+'"]');if(el)el.focus()}
 else if(a==='swap'){S.pts.reverse();renderPts();recalc()}
 else if(a==='clear'){S.pts=[{},{}];S.routes=[];renderPts();renderRes();goDraw(false);saveUrl()}
 else if(a==='del'){S.pts.splice(+v,1);renderPts();recalc()}
 else if(a==='pick'){S.focus=+v;toast('แตะบนแผนที่เพื่อเลือกจุด');if(!DT.matches)setSt(0)}
 else if(a==='sg'){const o=sgList[+v];if(o){const d=document.getElementById('go-sg');if(d)d.remove();setPoint(sgFor,{x:+o.p.x,y:+o.p.y,name:o.label,id:o.type==='place'?o.p.id:undefined})}}
 else if(a==='mode'){S.mode=v;renderModes();recalc()}
 else if(a==='use'){if(!b.disabled){S.use[v]=!S.use[v];renderChips();recalc()}}
 else if(a==='obj'){S.obj=v;renderChips();recalc()}
 else if(a==='nt'){S.noToll=!S.noToll;renderChips();recalc()}
 else if(a==='alt')selectRoute(+v);
 else if(a==='step'){const st2=S._steps[+v];if(st2&&st2.box){const bx=st2.box;S.panel='';document.getElementById('gopanel').hidden=true;dockUpdate();fit({x:bx[0],y:bx[1],w:Math.max(bx[2]-bx[0],14),h:Math.max(bx[3]-bx[1],14)},2);if(!DT.matches)setSt(0)}}
 else if(a==='fare'||a==='route')openPanel(a);
 else if(a==='pclose'){S.panel='';document.getElementById('gopanel').hidden=true;dockUpdate()}
 else if(a==='palt'){selectRoute(+v)}
 else if(a==='share')doShare();
 else if(a==='cfg-close'){S.cfg=0;built=0;panel();recalc()}
 else if(a==='tap'){const t=document.getElementById('gotap');if(!tapPt)return;if(v==='from')setPoint(0,tapPt);else if(v==='to')setPoint(S.pts.length-1,tapPt);else{S.pts.splice(S.pts.length-1,0,tapPt);renderPts();recalc()}tapPt=null;t.hidden=true}}
document.addEventListener('click',onClick,true);
const bodyEl=$B();
bodyEl.addEventListener('input',e=>{if(curPage==='go'&&e.target.classList&&e.target.classList.contains('go-in'))showSg(+e.target.dataset.i,e.target)});
bodyEl.addEventListener('focusin',e=>{if(curPage==='go'&&e.target.classList&&e.target.classList.contains('go-in')){e.target.select();if(e.target.value)showSg(+e.target.dataset.i,e.target)}});
bodyEl.addEventListener('focusout',e=>{if(e.target.classList&&e.target.classList.contains('go-in'))setTimeout(()=>{const s=document.getElementById('go-sg');if(s)s.remove()},180)});
bodyEl.addEventListener('keydown',e=>{if(curPage==='go'&&e.key==='Enter'&&e.target.classList&&e.target.classList.contains('go-in')){const b=document.querySelector('#go-sg button');if(b)b.click()}});
/* ---------- Mobile navigation bar: A → B on top, icon-only modes ---------- */
(function(){
const SV=(p,s)=>`<svg class="i" viewBox="0 0 24 24"${s?` style="width:${s}px;height:${s}px"`:''}>${p}</svg>`;
const P={back:'<path d="M19 12H5M11 6l-6 6 6 6"/>',swap:'<path d="M8 4v15M4 8l4-4 4 4M16 20V5M12 16l4 4 4-4"/>',
 car:'<path d="M4 15v-3l2-5h12l2 5v3M4 15h16M4 15v3h3v-3M17 15v3h3v-3M7.5 12h.01M16.5 12h.01"/>',
 rec:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
 transit:'<path d="M7 3h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2zM5 11h14M8 21l2-3M16 21l-2-3M9 14.5h.01M15 14.5h.01"/>',
 walk:'<circle cx="13" cy="4.5" r="1.8"/><path d="M10 21l1.5-6-2.5-2 1-5 4 2 2 3.5M11.5 15 14 17.5V21M9 9 7 12"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',x:'<path d="M6 6l12 12M18 6 6 18"/>',
 pin:'<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
 map:'<path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14"/>',
 road:'<path d="M7 3 4 21M17 3l3 18M12 4v3M12 10.5v3M12 17v3"/>',
 sl:'<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>'};
const bar=document.createElement('div');bar.id='gobar';
bar.innerHTML='<div class="gb-top"><button class="gb-ic" data-gb="back" aria-label="Back" title="Back">'+SV(P.back)+'</button><div class="gb-rows"></div><button class="gb-ic" data-gb="swap" aria-label="Swap origin and destination" title="Swap">'+SV(P.swap)+'</button></div><div class="gb-modes"></div><div id="gb-hint" hidden></div><div id="gb-sg" hidden></div>';
document.body.appendChild(bar);
const rows=bar.querySelector('.gb-rows'),modes=bar.querySelector('.gb-modes'),sg=bar.querySelector('#gb-sg'),hint=bar.querySelector('#gb-hint');
let gbFocus=-1,gl=[];
const MODEB=[['car','car','Car · รถยนต์'],['rec','rec','Recommended · แนะนำ'],['transit','transit','Public transport · ขนส่งสาธารณะ'],['walk','walk','Walking · เดิน']];
const role=i=>i===0?'starting point':i===S.pts.length-1?'destination':'stop '+i;
window.gbR=function(){
 const n=S.pts.length,act=document.activeElement,typing=act&&act.classList&&act.classList.contains('gb-in')&&bar.querySelectorAll('.gb-in').length===n;
 if(!typing)rows.innerHTML=S.pts.map((p,i)=>{
  const dot=i===0?'<span class="gb-d o"></span>':i===n-1?'<span class="gb-d p">'+SV(P.pin,22)+'</span>':'<span class="gb-d v"></span>';
  return `<div class="gb-row">${dot}<input class="gb-in" data-i="${i}" placeholder="${i===0?'Choose starting point':i===n-1?'Choose destination':'Stop '+i}" value="${esc(p&&p.name?p.name:'')}" autocomplete="off" enterkeyhint="search" aria-label="${i===0?'Origin':i===n-1?'Destination':'Stop '+i}">${n>2&&i>0&&i<n-1?`<button class="gb-x" data-gb="del" data-v="${i}" aria-label="Remove stop">${SV(P.x,16)}</button>`:''}</div>`}).join('');
 modes.innerHTML=MODEB.map(m=>`<button class="gb-m${S.mode===m[0]?' on':''}" data-gb="mode" data-v="${m[0]}" aria-label="${m[2]}" title="${m[2]}">${SV(P[m[1]],22)}</button>`).join('')+`<button class="gb-m gb-s" data-gb="add" aria-label="Add stop" title="Add stop · เพิ่มจุดแวะ">${SV(P.plus,20)}</button><button class="gb-m gb-s" data-gb="cfg" aria-label="Route options" title="Route options · ตัวเลือกเส้นทาง">${SV(P.sl,20)}</button>`;
 if(S.focus>=0){hint.hidden=false;hint.innerHTML=`<span>Tap the map to choose the ${role(S.focus)} · แตะแผนที่เพื่อเลือกจุด</span><button class="gb-c" data-gb="cancelpick">Cancel</button>`}else hint.hidden=true;
 requestAnimationFrame(()=>document.documentElement.style.setProperty('--gbh',bar.offsetHeight+'px'))};
function showSug(i){gbFocus=i;const inp=bar.querySelector('.gb-in[data-i="'+i+'"]'),v=inp?inp.value.trim():'';ensureGraph();
 const cur=S.pts[i]&&S.pts[i].name;gl=(v&&v!==cur)?suggestFor(v):[];
 sg.innerHTML=`<button data-gb="map" data-v="${i}"><span class="gb-oi">${SV(P.map,18)}</span><span>Choose on map<small>เลือกบนแผนที่</small></span></button>`+gl.map((o,k)=>`<button data-gb="sg" data-v="${k}"><span class="gb-oi">${SV(o.type==='road'?P.road:P.pin,16)}</span><span>${esc(o.label)}<small>${esc(o.sub)}</small></span></button>`).join('');sg.hidden=false}
const hideSug=()=>{sg.hidden=true};
bar.addEventListener('click',e=>{const b=e.target.closest('[data-gb]');if(!b)return;e.stopPropagation();const a=b.dataset.gb,v=b.dataset.v;
 if(a==='back')goPage('map');
 else if(a==='swap'){S.pts.reverse();renderPts();recalc()}
 else if(a==='mode'){S.mode=v;renderModes();recalc()}
 else if(a==='add'){if(S.pts.length>=8){toast('Up to 6 stops · เพิ่มจุดแวะได้สูงสุด 6 จุด');return}S.pts.splice(S.pts.length-1,0,{});renderPts();const el=bar.querySelector('.gb-in[data-i="'+(S.pts.length-2)+'"]');if(el)el.focus()}
 else if(a==='del'){S.pts.splice(+v,1);renderPts();recalc()}
 else if(a==='cfg'){S.cfg=S.cfg?0:1;built=0;setSt(Math.max(st,1));panel()}
 else if(a==='map'){S.focus=+v;hideSug();if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();gbR();toast('Tap the map to choose a point · แตะบนแผนที่เพื่อเลือกจุด')}
 else if(a==='sg'){const o=gl[+v];if(o){const i=gbFocus;hideSug();if(document.activeElement&&document.activeElement.blur)document.activeElement.blur();setPoint(i,{x:+o.p.x,y:+o.p.y,name:o.label,id:o.type==='place'?o.p.id:undefined})}}
 else if(a==='cancelpick'){S.focus=-1;gbR()}});
bar.addEventListener('focusin',e=>{if(e.target.classList&&e.target.classList.contains('gb-in')){e.target.select();showSug(+e.target.dataset.i)}});
bar.addEventListener('input',e=>{if(e.target.classList&&e.target.classList.contains('gb-in'))showSug(+e.target.dataset.i)});
bar.addEventListener('focusout',e=>{if(e.target.classList&&e.target.classList.contains('gb-in'))setTimeout(()=>{if(!bar.contains(document.activeElement))hideSug()},200)});
bar.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.classList&&e.target.classList.contains('gb-in')){const b=sg.querySelector('[data-gb=sg]');if(b)b.click();else e.target.blur()}});
['pointerdown','mousedown'].forEach(t=>sg.addEventListener(t,e=>e.preventDefault()));
if(DT.addEventListener)DT.addEventListener('change',()=>{hideSug();gbR()});
gbR();
})();

document.getElementById('go-back').onclick=()=>goPage('map');
document.getElementById('go-cfg').onclick=()=>{S.cfg=S.cfg?0:1;built=0;setSt(Math.max(st,1));panel()};
if(curPage==='go'){goEnter();panel()}

})();
