/* ================= Terrain · ภูมิประเทศ 3D (locked data) ================= */
(function(){
const FORCED={"v":1,"rev":0,"t":1793496236206,"hv":"AP8A/wBQAQQACwEBAEcBAQIBAQcAIQIBBAEFAgQBAwECAQEDAgIDAQQDAgEBAQIBAQIABQEBAwECAQBCAQIABAMBBgEFAgMBAgEDAgAeAQIDAQUEBwEFAQMEBAEFAgcCBQEEAQMBAgIBBAIBBAIDAQEBAEEEAgIBAAMFAQsCCgEIAQIBCAEFAQIBABwKAgcBAwEEAQUBBwEKAQkBBgEEAQMFBAEFAQYBBQIEAQMBAgIDAwQDAgEBAQBAAQEGAQsBBAEAAwUBEwERAQ4BCwEEAQUBBAECAQAaBwELAQ4BEQEPAQoBCAEHAQgBCgEJAQYBBAECAwEDAgEDAgIFAwICAQMDAQEAQgUBDAEIAQADBgEWARIBDQEIAQUBBAEDAQIBABkGAggBCQEMAQ4BCgEIAQcCCAIGAQMBAQMABAEBAAMBCQBDAQEHAQQBAAIDAQwBEgEOAQsBBwEFAQQBAgEAGQcBBgEIAgQBBgEIAgcEBgEFAQIBAFcBAQUBBgEDAgYBEQIMAQoBBgEEAQMBABkGAQkBDAEOAQsBBgQHAQgDBgEEAQIBAFcBAQIBBAEGAQgBCgENAQwBEgEIAQQBAQEAGAMBBgEFAQgBDQIKAQgBBwMGAQoBDAEKAQcBAwEBAQBZAgEEAQcBBgEIAQwBBgEFAQIBABcCAQMBBQEGAQQBBwEJAQcBBQEHAwgBCgEOARABDgEHAQEBAFwDAgQCAwECAQEBABcDAQUBBwQFAQMCBgMIAQ0BDgEMAQoBBgEBAQBeAQQAFwEBBgEIAQkBCgIHAQQDBQEGAgUBBgIFAgQBAQEAeQMBCgEMAQsCCgEIAQYDBQMEAQECAgEEAQMBAQEAeQgBDgIMAQoBCQEHAgYBBQQGAQUBAwMCAQEBADICAgMCAQEAQggBEQEOAQkBBwEGAQQHBQEGAQUBAwECAQEBADIDAQUBBgEKAQkBBgEDAQAFAgEGAwEBADcGAQsBCQEGAQUBAwECAwMDAgEDAQQBAwECAQEBADICAQYBCgENARMBCwEGAQMBAAQBAQUEAwEANwUBBwIFAQQBAQcAOAcBCwEPARQBEQEHAQMBAQEABAEBAwECAQMCAQIANgMBBQMEAQEBAD4MAg4BDwEGAQAFAQUAOgIBBQIEAQMBAD8OAQoBCwEJAQsBAAgCAQA7AgEIAQcBBAECAQA6AQEABAEBBwICAQAJAgEAOwMBCwEHAQQBAgEANwEBAAEDAQkBBAECAQADAQEFAQEBAEUBAQYBBQEDAQEBADYBAQUBBAIKAQgBAwEADgEBADwBAQICAQEANwIBCAEHARABCgEJAQQBAA4BAQA9AQIAOAUBDAEVARoBEAEHAQQBAAsBAQACAQEATQECACcBAQwBDgEZARcBEgEJAQUBAQIASQECAAkBAQIBAQQCAgEBACYGAR8BGwEdARkBEgEMAQYBAAoBAQBAAQECAQEBAAEBBAABAQECAQMBBAEDAQEDAgIAJgMBEgEjASEBHQEWAQ8BCAECAQAKAQIAPwEDAwIEBAMBAgEDAgIBAQEAKgkBDQEWARkBFAENAQYBBAEBAQBMAQICAQMBBAEFAgQBAwECAQEBAgEAKwEBCQEKAQ4BCwEIAQIBAQIATgECAgIDAQQBAwECAQAvAQQACgEBAIsCAQUBAwEAgwEBAAUCAQYBCAEGAQCJAgEHAQYBBQEAiQEBBwEFAQMBAIoBAgD/AP8A/wD/AP8A/wAoAQMAigEBAwECAgEBAIkCAQMCAgEAiQIBAwICAgEBAA0BAQB4AwEJAQoBBgEFAQYBAwEADAIBAwEBAQB3BwESARUBDQEJAQYBAwEABwEBBQEIAQoCCAEGAQIBAHcEAQ8BEgEOAQoBBAEBAQAHAgEJAQ0BCgEIAQYBBQECAQB3AQEFAQcBCQEHAQIBAAgBAQYCAgEDAQQBAgEAegEBAwIACgECAwEHAQUBAIsDAQIBAP8A/wD/AP8A/wD/AP8A/wD/AP8AEQ==","sf":"AP8A0QQBAgQAdQQEAggECwAEBAMANgUDAAEFCwQDABkECwUHBAoFAQQHAAQEBQAyBREEBgAVBAwFDAQDBQQEBgAEBAYAMAIBBQQAAQUMBA0ADQQMBRUEBQAEBAYAMAIBBQUAAQUKBA4ACwQOBRQEBgAEBAcALwIBBQUAAwUIBA4ACgQOBRUEBgAEBAYAMAIBBREEDQAJBBAFBQQEBQoEBwAEBAYAMQIBBRAEDQAIBBIFAgQNBQEECQAEBAYANAUOBA0ABgQtAAMEBAA5BQwECQECBAIABAQtAgEEAQAEBAMAOwULBAcBBQADBCwCAwBGBQkEBgEDBAIAAwQrAgEAIgIJAB8FCAQGAQIEAwADBCkCAgAdAhQAGwUGBAwAAwQoAgMAGwIDBAcCAgQFAgMEAQIFABgFBQQMAAMEHwILABkCBQQUAgkAFAUDBA0AAwQcAgsAGwIBBBsCAgQCAgUAFAUBBA0AAwQYACgCAwQGBgEEHAICABUEDAADBBYAKQIEBAUFAQQBAAEEBQABBBUCBAAXBAgAAwQWACcCBgQHAAEEBQABBBcCAwAaBAQAAwQVACcCBwQIAAIEAgAEBAsAAQQKAgMAIAQVACYCAQQDAgIECgADBAIABAQKAAUEBwICACAEFAAnAgEEBgABBAcAAwQEAAQECQAGBAYCAwAfBBQAJgIBBAIFAwQBAAsEBAAIBAUACAQGAgIAHwQUACUCAgQBBQUACwQDAAsEAQALBAUCAwAeBBMAJQICBAIFBQALBAMAGAQFAgIAHgQSACYCAQQEBQQAJgQFAgMAHQQPACgCAgQDBgIFAwAnBAUCAgAdBAwAKwIBBAQGAwUCACcEBQIDABwECQAtAgIEBAYDBQEAKQQEAgMAHAQGADACAQQGBgEEAgAqBAMCBAAbBAQAMQICBAkAKgQEAgMAGwQBADMCAgQKACoEBAIDAE8CAQQFAAIEBAAqBAUCAgBOAgIEBgAvBAQCAwBOAgEECAAuBAQCBABMAgEECQAvBAQCAwBMAgEECQAvBAUCAgBLAgIECAAwBAUCAgBLAgEECQAxBAQCAgBLAgEECAAyBAQCAgBLAgEEBwAzBAQCAgBKAgIEBAA2BAUCAQBKAgIEBAA2BAUCAQBKAgIEBAA2BAUCAQBKAgIEBQA1BAUCAQBKAgIEBgAzBAYCAQBKAgIEBwAyBAYCAQBKAgIECAAxBAYCAQBKAgIECAAxBAYCAQBKAgIECQAwBAUCAgBKAgIECQAwBAUCAQBMAgEECgAuBAUCAgBMAgIECQAuBAUCAgBNAgEECQAfBAUABAQDAAMEBQICAE0CAQQNABAEAgAIBAgAAQQFAAIEBQICAE4CAQQNAAYEAgAFBAcABAQVAgIAUAIBBA4AAgQHAAIECAADBBQCAgBSAgIEIQABBBMCAgBUAgIEMQIEAFYCBAQtAgUAWAIGBAECBAQjAgQAXQIKBAECAwQSAgQEAQIBBAQCAwBlAggEEAIMAG8CEgD/AP8A/wD/AJQ=","bh":{"12:1":3},"bc":{"12:1":"#cce8b5"},"col":{"water":"#5aa9e0","beach":"#f1e4b8","sand":"#e2b96f","grass":"#7bbf5e","snow":"#caf0fe","rock":"#9b9a94","bld":"#d5dae3"},"base":"grass","snow":0.3,"beachW":5,"kz":2.4181391751897525};
const CG=10,CNX=140,CNY=76,CVX=CNX+1,CVY=CNY+1;           // stored (coarse) grid
const F=3,GS=CG/F,NX=CNX*F,NY=CNY*F,VX=NX+1,VY=NY+1,MAXH=130; // rendered (fine) grid
const SN=['auto','water','beach','sand','grass','snow','rock'];
const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const unrle=(s,len)=>{const b=atob(s),a=new Uint8Array(len);let p=0;for(let i=0;i+1<b.length;i+=2){const v=b.charCodeAt(i),n=b.charCodeAt(i+1);for(let k=0;k<n&&p<len;k++)a[p++]=v}return a};
const T={on:false,ph:0,th:0,phT:0,thT:0,kz:+FORCED.kz||2,bh:FORCED.bh||{},bc:FORCED.bc||{},col:FORCED.col,base:FORCED.base,snow:+FORCED.snow,beachW:(+FORCED.beachW)*F};
try{T.on=localStorage.getItem('terr_on')==='1';const k=parseFloat(localStorage.getItem('terr_kz'));if(k>=.2&&k<=8)T.kz=k}catch(_){}
const saveView=()=>{try{localStorage.setItem('terr_on',T.on?'1':'0');localStorage.setItem('terr_kz',String(T.kz))}catch(_){}};
/* ---------- finer height field: Catmull-Rom (bi-cubic) up-sampling of the stored grid ---------- */
let HC,SC;
const cr=(p0,p1,p2,p3,t)=>.5*(2*p1+(p2-p0)*t+(2*p0-5*p1+4*p2-p3)*t*t+(-p0+3*p1-3*p2+p3)*t*t*t);
const HV=new Float32Array(VX*VY),SF=new Uint8Array(NX*NY);
function initH(){HC=unrle(FORCED.hv,CVX*CVY);SC=unrle(FORCED.sf,CNX*CNY);const tmp=new Float32Array(VX*CVY);
 for(let y=0;y<CVY;y++)for(let X=0;X<VX;X++){const fx=X/F,x1=Math.floor(fx),t=fx-x1,g=i=>HC[y*CVX+Math.max(0,Math.min(CVX-1,i))];tmp[y*VX+X]=cr(g(x1-1),g(x1),g(x1+1),g(x1+2),t)}
 for(let Y=0;Y<VY;Y++){const fy=Y/F,y1=Math.floor(fy),t=fy-y1;for(let X=0;X<VX;X++){const g=j=>tmp[Math.max(0,Math.min(CVY-1,j))*VX+X];HV[Y*VX+X]=Math.max(0,Math.min(255,cr(g(y1-1),g(y1),g(y1+1),g(y1+2),t)))}}
 for(let y=0;y<NY;y++)for(let x=0;x<NX;x++)SF[y*NX+x]=SC[Math.min(CNY-1,(y/F)|0)*CNX+Math.min(CNX-1,(x/F)|0)]}
const eAt=v=>v/255*MAXH;
function hAt(x,y){const fx=Math.max(0,Math.min(NX-.001,x/GS)),fy=Math.max(0,Math.min(NY-.001,y/GS)),ix=fx|0,iy=fy|0,tx=fx-ix,ty=fy-iy;
 const a=HV[iy*VX+ix],b=HV[iy*VX+ix+1],c=HV[(iy+1)*VX+ix],d=HV[(iy+1)*VX+ix+1];return eAt((a*(1-tx)+b*tx)*(1-ty)+(c*(1-tx)+d*tx)*ty)}
/* ---------- geometry: land mask / coast distance / blocks ---------- */
const sample=(poly,cv)=>{const v=poly.split(' ').map(q=>q.split(',').map(Number)),n=v.length,o=[];
 for(let k=0;k<n;k++){const p=v[k],a=v[(k+n-1)%n],b=v[(k+1)%n],r=Math.min(1,(cv&&cv[k])||0);
  if(r<=0){o.push(p);continue}
  const la=Math.hypot(a[0]-p[0],a[1]-p[1])||1,lb=Math.hypot(b[0]-p[0],b[1]-p[1])||1,dd=r*Math.min(la,lb)/2;
  const p1=[p[0]+(a[0]-p[0])/la*dd,p[1]+(a[1]-p[1])/la*dd],p2=[p[0]+(b[0]-p[0])/lb*dd,p[1]+(b[1]-p[1])/lb*dd];
  for(let t=0;t<=6;t++){const u=t/6,w=1-u;o.push([w*w*p1[0]+2*w*u*p[0]+u*u*p2[0],w*w*p1[1]+2*w*u*p[1]+u*u*p2[1]])}}
 return o};
const pip=(x,y,P)=>{let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c}return c};
function clipRect(P,x0,y0,x1,y1){let o=P;const E=[[0,x0,1],[0,x1,-1],[1,y0,1],[1,y1,-1]];
 for(const[ax,v,sg]of E){const inp=o;o=[];if(!inp.length)break;for(let i=0;i<inp.length;i++){const a=inp[i],b=inp[(i+1)%inp.length],ia=sg*(a[ax]-v)>=0,ib=sg*(b[ax]-v)>=0;
  if(ia)o.push(a);if(ia!==ib){const t=(v-a[ax])/(b[ax]-a[ax]);o.push(ax?[a[0]+t*(b[0]-a[0]),v]:[v,a[1]+t*(b[1]-a[1])])}}}
 return o}
const LM=new Uint8Array(NX*NY),DC=new Uint8Array(NX*NY);let REG=[],LAND=[],LAND2=[],BL=[];
function buildGeo(){REG=[];DATA.forEach((_,i)=>OUT[i].forEach((s,k)=>{const pts=sample(s,CVR['o:'+i+':'+k]);let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;pts.forEach(p=>{x0=Math.min(x0,p[0]);y0=Math.min(y0,p[1]);x1=Math.max(x1,p[0]);y1=Math.max(y1,p[1])});REG.push({i,pts,x0,y0,x1,y1})}));
 for(let cy=0;cy<NY;cy++)for(let cx=0;cx<NX;cx++){const x=cx*GS+GS/2,y=cy*GS+GS/2;for(const r of REG){if(x<r.x0||x>r.x1||y<r.y0||y>r.y1)continue;if(pip(x,y,r.pts)){LM[cy*NX+cx]=1;break}}}
 DC.fill(255);const q=[];for(let c=0;c<LM.length;c++){if(!LM[c])continue;const x=c%NX,y=(c/NX)|0;if(x===0||y===0||x===NX-1||y===NY-1||!LM[c-1]||!LM[c+1]||!LM[c-NX]||!LM[c+NX]){DC[c]=0;q.push(c)}}
 for(let h=0;h<q.length;h++){const c=q[h],x=c%NX,y=(c/NX)|0,d=DC[c]+1;for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=NX||ny>=NY)continue;const n=ny*NX+nx;if(LM[n]&&DC[n]>d){DC[n]=d;q.push(n)}}}
 LAND=[];LAND2=[];for(let c=0;c<LM.length;c++)if(LM[c]){LAND.push(c);if(c%F===0&&((c/NX)|0)%F===0)LAND2.push(c)}
 BL=[];DATA.forEach((d,i)=>DS[i].forEach((s,j)=>{let parts=[];
  if(typeof s==='string')parts=[sample(s,CVR['c:'+i+':'+j])];
  else if(i<=1)parts=[[[s[0],s[1]],[s[2],s[1]],[s[2],s[3]],[s[0],s[3]]]];
  else OUT[i].forEach((o,k)=>{const c=clipRect(sample(o,CVR['o:'+i+':'+k]),s[0],s[1],s[2],s[3]);if(c.length>2)parts.push(c)});
  if(!parts.length)return;let sx=0,sy=0,n=0;parts.forEach(P=>P.forEach(p=>{sx+=p[0];sy+=p[1];n++}));
  const e=(d.entries&&d.entries[j])||{};BL.push({key:i+':'+j,i,j,parts,cx:sx/n,cy:sy/n,name:e.name||''})}))}
/* ---------- colours ---------- */
const CRGB={};for(const k in T.col)CRGB[k]=hex(T.col[k]);
const cellSurf=c=>{const s=SF[c];if(s)return s;const x=c%NX,y=(c/NX)|0,i=y*VX+x,f=(HV[i]+HV[i+1]+HV[i+VX]+HV[i+VX+1])/1020;
 if(DC[c]<=T.beachW&&f<.14)return 2;if(f>=T.snow)return 5;if(f>=T.snow*.8)return 6;return T.base==='sand'?3:T.base==='snow'?5:4};
let CF=[];
function recolor(){CF=new Array(NX*NY);const L=[-.45,-.55,.7];
 for(const c of LAND){const x=c%NX,y=(c/NX)|0,i=y*VX+x,a=HV[i],b=HV[i+1],cc=HV[i+VX],d=HV[i+VX+1],sr=cellSurf(c),nm=SN[sr],col=CRGB[nm]||CRGB.grass;
  const gx=eAt((b+d-a-cc)/2),gy=eAt((cc+d-a-b)/2),nx=-gx/GS*1.1,ny=-gy/GS*1.1,nl=Math.hypot(nx,ny,1),dot=(nx*L[0]+ny*L[1]+L[2])/nl,sh=nm==='water'?1:Math.max(.5,Math.min(1.32,.74+.66*dot));
  CF[c]=`rgb(${Math.min(255,col[0]*sh)|0},${Math.min(255,col[1]*sh)|0},${Math.min(255,col[2]*sh)|0})`}}
const shade=(col,f)=>{const c=hex(col);return `rgb(${Math.min(255,c[0]*f)|0},${Math.min(255,c[1]*f)|0},${Math.min(255,c[2]*f)|0})`};
/* ---------- canvas / camera ---------- */
const cv=document.createElement('canvas');cv.id='t3d';cv.style.cssText='position:fixed;left:0;top:0;width:100vw;height:100vh;display:none;touch-action:none';
document.body.insertBefore(cv,document.getElementById('m').nextSibling);const ctx=cv.getContext('2d');
let W=0,H=0,dpr=1,raf=0,lod=false,lodT=0,hitRoads=[],selId=null,selPt=null,selName='',selType='';
const vx=new Float32Array(VX*VY),vy=new Float32Array(VX*VY),vd=new Float32Array(VX*VY);
let lodUntil=0,lodT2=0;const bump=()=>{lodUntil=performance.now()+220;clearTimeout(lodT2);lodT2=setTimeout(()=>need(),260)};
function fitCanvas(){dpr=Math.min(innerWidth<900?1.5:2,window.devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr}
function cam(){const th=T.th*Math.PI/180,ph=T.ph*Math.PI/180;return{s:W/vb.w,cx:vb.x+vb.w/2,cy:vb.y+vb.h/2,c:Math.cos(th),sn:Math.sin(th),cp:Math.cos(ph),sp:Math.sin(ph),kz:T.kz}}
const pj=(K,x,y,z)=>{const dx=x-K.cx,dy=y-K.cy,rx=dx*K.c-dy*K.sn,ry=dx*K.sn+dy*K.c;return[W/2+rx*K.s,H/2+ry*K.s*K.cp-z*K.s*K.sp*K.kz,ry]};
function need(){if(!raf&&T.on)raf=requestAnimationFrame(draw)}
window.trNeed=need;
const overlay=()=>T.on&&(T.phT>.5||T.ph>.5);
function applyMode(){const ov=overlay();document.body.classList.toggle('terr',T.on);document.body.classList.toggle('t3d',ov);
 cv.style.display=T.on?'block':'none';cv.style.zIndex=ov?'0':'-1';cv.style.pointerEvents=ov?'auto':'none';const b=document.getElementById('b3d');if(b){b.classList.toggle('a',T.phT>.5&&T.on);b.setAttribute('aria-pressed',T.phT>.5&&T.on?'true':'false')}need()}
/* ---------- roads in 3D (draped on the terrain) ---------- */
const RSC=new WeakMap();
function roadPts(p){let r=RSC.get(p);if(r&&r.n===p.pts.length&&r.c===!!p.curve&&r.x===p.pts[0][0])return r.o;const P=p.pts,o=[];
 if(!p.curve||P.length<3)P.forEach(q=>o.push(q));
 else{o.push(P[0]);for(let i=0;i<P.length-1;i++){const a=P[i-1]||P[i],b=P[i],c=P[i+1],e=P[i+2]||c;for(let t=1;t<=8;t++){const u=t/8,w=1-u,x1=b[0]+(c[0]-a[0])/6,y1=b[1]+(c[1]-a[1])/6,x2=c[0]-(e[0]-b[0])/6,y2=c[1]-(e[1]-b[1])/6;
   o.push([w*w*w*b[0]+3*w*w*u*x1+3*w*u*u*x2+u*u*u*c[0],w*w*w*b[1]+3*w*w*u*y1+3*w*u*u*y2+u*u*u*c[1]])}}}
 RSC.set(p,{n:P.length,c:!!p.curve,x:P[0][0],o});return o}
const cssv=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const CSSC={t:-1e9,wt:'#8ec9ee',wtc:'#5aa3d1',ff:'sans-serif'};function cssC(){const n=performance.now();if(n-CSSC.t>1500){CSSC.t=n;CSSC.wt=cssv('--wt')||'#8ec9ee';CSSC.wtc=cssv('--wtc')||'#5aa3d1';CSSC.ff=getComputedStyle(document.body).fontFamily}return CSSC}
function roadItems(K,step){const items=[],src=window.lyFilt?window.lyFilt(PL):PL,Wv=vb.w,zf=Math.min(2.6,Math.max(1,Math.pow(1380/Wv,.35))),wt=cssC().wt,wtc=cssC().wtc;
 for(const p of src){if(!p.pts)continue;
  if(p.kind==='nature'&&p.nt==='bay'){if(p.pts.length<3)continue;const S=p.pts.map(q=>pj(K,q[0],q[1],hAt(q[0],q[1])+.5));let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9,dy=0;S.forEach(q=>{x0=Math.min(x0,q[0]);x1=Math.max(x1,q[0]);y0=Math.min(y0,q[1]);y1=Math.max(y1,q[1]);dy+=q[2]});
   if(x1<-30||x0>W+30||y1<-30||y0>H+30)continue;items.push({b:1,d:2*dy/S.length+GS*.6,S,col:p.color||wt,cas:p.color?shade(p.color,.6):wtc});continue}
  const isRoad=p.kind==='road',isWater=p.kind==='nature'&&(p.nt==='river'||p.nt==='canal');if(!(isRoad||isWater)||p.pts.length<2)continue;
  const t=isRoad?(RT[p.rt]||RT.local):NT[p.nt];if(Wv>t.vw)continue;
   if(isRoad&&FLYRE.test(p.name||'')&&p.pts.length>=2){flyItems(K,p,items,zf,t);continue}
  const wpx=t.w*zf*(p.size||1)*.8,col=p.color||(isRoad?t.c:wt),cas=p.color?shade(p.color,.55):(isRoad?t.cs:wtc),pts=window.BR?BR.pts(p):roadPts(p),zo=isRoad?.9:.5,eps=isRoad?GS*1.7:GS*1.4,skp=(isRoad&&window.BR)?BR.skip(p.id):[];let acc=0;
  for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(L/step)),a0=acc;acc+=L;
   for(let k=0;k<n;k++){if(skp.length){const ms=a0+L*(k+.5)/n;if(skp.some(r=>ms>=r[0]&&ms<=r[1]))continue}const x0=a[0]+(b[0]-a[0])*k/n,y0=a[1]+(b[1]-a[1])*k/n,x1=a[0]+(b[0]-a[0])*(k+1)/n,y1=a[1]+(b[1]-a[1])*(k+1)/n;
    const p0=pj(K,x0,y0,hAt(x0,y0)+zo),p1=pj(K,x1,y1,hAt(x1,y1)+zo);
    if(Math.max(p0[0],p1[0])<-30||Math.min(p0[0],p1[0])>W+30||Math.max(p0[1],p1[1])<-30||Math.min(p0[1],p1[1])>H+30)continue;
    items.push({r:1,p,wx0:x0,wy0:y0,wx1:x1,wy1:y1,d:p0[2]+p1[2]+eps,x0:p0[0],y0:p0[1],x1:p1[0],y1:p1[1],w:wpx,col,cas})}}}
 try{transitItems(K,step,items,zf)}catch(_){}
 if(window.BR)BR.list().forEach(b=>bridgeItems(K,b,items,zf));
 return items}
/* ----- Transit (fataekts: รถไฟ/รถเมล์/เรือ) วาดบนสุด เส้นบาง ----- */
const trSvcOn=()=>{try{return !!(ADDONS&&ADDONS.fataekts&&fataekRoutes&&fataekRoutes.length)}catch(_){return false}};
function transitItems(K,step,items,zf){if(!trSvcOn())return;
 for(const i of fataekRoutes){if(!i||i.type==='toll'||!ADDONS.fataekTypes[i.type]||!i.pts||i.pts.length<2)continue;
  const c=i.color||(FATAEK_TYPES[i.type]&&FATAEK_TYPES[i.type].c)||'#015caf',dash=i.type==='boat',w=Math.max(1.4,zf*1.35);
  for(let a=0;a<i.pts.length-1;a++){const ax=+i.pts[a][0],ay=+i.pts[a][1],bx=+i.pts[a+1][0],by=+i.pts[a+1][1];if(!isFinite(ax+ay+bx+by))continue;
   const L=Math.hypot(bx-ax,by-ay),n=Math.max(1,Math.ceil(L/step));
   for(let k=0;k<n;k++){if(dash&&(k+a)%2)continue;const x0=ax+(bx-ax)*k/n,y0=ay+(by-ay)*k/n,x1=ax+(bx-ax)*(k+1)/n,y1=ay+(by-ay)*(k+1)/n,p0=pj(K,x0,y0,hAt(x0,y0)+1.6),p1=pj(K,x1,y1,hAt(x1,y1)+1.6);
    if(Math.max(p0[0],p1[0])<-30||Math.min(p0[0],p1[0])>W+30||Math.max(p0[1],p1[1])<-30||Math.min(p0[1],p1[1])>H+30)continue;
    items.push({tr:1,d:p0[2]+p1[2]+GS*4,x0:p0[0],y0:p0[1],x1:p1[0],y1:p1[1],w,col:c})}}}}
function transitMarks(K,ff){if(!trSvcOn())return;const list=[],MOBL=innerWidth<900;
 for(const i of fataekRoutes){if(!i||!ADDONS.fataekTypes[i.type])continue;const Tt=FATAEK_TYPES[i.type]||{c:'#015caf',e:'📍'},c=i.color||Tt.c;
  if(i.type==='toll'){const q=i.pts&&i.pts[0];if(q)list.push({x:+q[0],y:+q[1],c,e:'E',r:8,end:1,n:i.name||'',txt:1});continue}
  const sp=i.stops||[];sp.forEach((s,n)=>{const end=n===0||n===sp.length-1;list.push({x:+s.x,y:+s.y,c,e:Tt.e,r:end?10:3.6,end:end?1:0,n:s.n||''})})}
 list.sort((a,b)=>b.end-a.end);const occ=[];let cnt=0;ctx.textAlign='center';ctx.textBaseline='middle';
 for(const m of list){if(!isFinite(m.x+m.y)||cnt>400)break;const q=pj(K,m.x,m.y,hAt(m.x,m.y)+2.6);if(q[0]<-20||q[0]>W+20||q[1]<-20||q[1]>H+20)continue;
  const pad=MOBL?m.r*1.8:m.r*1.1,bx=[q[0]-pad,q[1]-pad,q[0]+pad,q[1]+pad];if(!m.end&&occ.some(o=>bx[0]<o[2]&&bx[2]>o[0]&&bx[1]<o[3]&&bx[3]>o[1]))continue;occ.push(bx);cnt++;
  ctx.beginPath();ctx.arc(q[0],q[1],m.r+2,0,7);ctx.fillStyle='#fff';ctx.fill();
  ctx.beginPath();ctx.arc(q[0],q[1],m.r,0,7);ctx.fillStyle=m.end?m.c:'#fff';ctx.fill();ctx.lineWidth=m.end?0:2;if(!m.end){ctx.strokeStyle=m.c;ctx.stroke()}
  if(m.end){ctx.font=m.txt?`800 ${m.r*1.3}px ${ff}`:`${m.r*1.35}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;ctx.fillStyle='#fff';ctx.fillText(m.e,q[0],q[1]+.5);
   if(m.n&&K.s>=1.2){ctx.font=`700 11px ${ff}`;ctx.lineWidth=3;ctx.strokeStyle='rgba(255,255,255,.92)';ctx.strokeText(m.n,q[0],q[1]+m.r+10);ctx.fillStyle=m.c;ctx.fillText(m.n,q[0],q[1]+m.r+10)}}}}
/* ----- ถนนที่มีคำว่า "ทางต่างระดับ" → ยกสูงเป็นทางยกระดับ ----- */
const FLYRE=/ทางต่างระดับ/,BZK=4,FLYZ=2.5;
function pathAt(P,cum,s){let i=1;while(i<cum.length-1&&cum[i]<s)i++;const L=cum[i]-cum[i-1]||1,t=Math.max(0,Math.min(1,(s-cum[i-1])/L));return[P[i-1][0]+(P[i][0]-P[i-1][0])*t,P[i-1][1]+(P[i][1]-P[i-1][1])*t]}
function flyItems(K,p,items,zf,t){const P=roadPts(p),cum=[0];for(let i=1;i<P.length;i++)cum.push(cum[i-1]+Math.hypot(P[i][0]-P[i-1][0],P[i][1]-P[i-1][1]));
 const L=cum[cum.length-1];if(!(L>4))return;const stp=Math.max(4,L/120),D=[];for(let s=0;s<L;s+=stp)D.push(pathAt(P,cum,s));D.push([P[P.length-1][0],P[P.length-1][1]]);
 const n=D.length;if(n<2)return;const lift=(p.bz>0?Math.min(5,p.bz):FLYZ)*BZK,g=D.map(q=>hAt(q[0],q[1])),
  Z=D.map((q,i)=>{const u=i/(n-1),e=Math.min(u,1-u)/.22,r=e>=1?1:e*e*(3-2*e);return g[i]+.9+lift*r}),Q=D.map((q,i)=>pj(K,q[0],q[1],Z[i]));
 let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;Q.forEach(q=>{x0=Math.min(x0,q[0]);x1=Math.max(x1,q[0]);y0=Math.min(y0,q[1]);y1=Math.max(y1,q[1])});if(x1<-60||x0>W+60||y1<-120||y0>H+60)return;
 const w=t.w*zf*(p.size||1)*.8*1.1,col=p.color||t.c,stepP=Math.max(2,Math.round(n/14));
 for(let i=2;i<n-2;i+=stepP){if(Z[i]-g[i]<3)continue;const pg=pj(K,D[i][0],D[i][1],g[i]);items.push({pier:1,d:Q[i][2]*2+GS*2.2,x0:Q[i][0],y0:Q[i][1],x1:pg[0],y1:pg[1],w:Math.max(2.5,w*.4)})}
 for(let i=0;i<n-1;i++)items.push({r:1,br:1,p,wx0:D[i][0],wy0:D[i][1],wx1:D[i+1][0],wy1:D[i+1][1],d:Q[i][2]+Q[i+1][2]+GS*2.8,x0:Q[i][0],y0:Q[i][1],x1:Q[i+1][0],y1:Q[i+1][1],w,col,cas:'#4b5563'})}
function bridgeItems(K,b,items,zf){const D=b.deck,n=D.length;if(n<2)return;const g=D.map(q=>hAt(q[0],q[1])),top=Math.max(...g)+.9+b.bz*BZK,t=RT[b.rrt]||RT.local,w=t.w*zf*1.3*.8;
 const Z=D.map((q,i)=>{const u=i/(n-1),e=Math.min(u,1-u)/.3,r=e>=1?1:e*e*(3-2*e);return(g[i]+.9)*(1-r)+top*r}),P=D.map((q,i)=>pj(K,q[0],q[1],Z[i]));
 let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;P.forEach(p=>{x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1])});if(x1<-60||x0>W+60||y1<-120||y0>H+60)return;
 for(let i=1;i<n-1;i+=Math.max(2,Math.round(n/5))){if(Z[i]-g[i]<3)continue;const pg=pj(K,D[i][0],D[i][1],g[i]);items.push({pier:1,d:P[i][2]*2+GS*2.2,x0:P[i][0],y0:P[i][1],x1:pg[0],y1:pg[1],w:Math.max(2.5,w*.4)})}
 for(let i=0;i<n-1;i++)items.push({r:1,br:1,p:b,wx0:D[i][0],wy0:D[i][1],wx1:D[i+1][0],wy1:D[i+1][1],d:P[i][2]+P[i+1][2]+GS*2.8,x0:P[i][0],y0:P[i][1],x1:P[i+1][0],y1:P[i+1][1],w,col:'#eceff3',cas:'#4b5563'})}
/* ---------- drawing ---------- */
function draw(){raf=0;if(!T.on)return;ensureT();lod=performance.now()<lodUntil;updCompass();if(cv.width!==Math.round(innerWidth*dpr)||cv.height!==Math.round(innerHeight*dpr))fitCanvas();
 let busy=false;const ea=(k,t)=>{const d=T[t]-T[k];if(Math.abs(d)>.05){T[k]+=d*.2;busy=true}else T[k]=T[t]};ea('ph','phT');ea('th','thT');
 const st=(lod||busy)?F:1,OV=overlay();hitRoads=[];
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=T.col.water;ctx.fillRect(0,0,W,H);
 const K=cam(),kk=K.s*K.sp*K.kz,sy0=K.s*K.cp;
 for(let y=0;y<VY;y+=st)for(let x=0;x<VX;x+=st){const i=y*VX+x,dx=x*GS-K.cx,dy=y*GS-K.cy,rx=dx*K.c-dy*K.sn,ry=dx*K.sn+dy*K.c;vx[i]=W/2+rx*K.s;vy[i]=H/2+ry*sy0-eAt(HV[i])*kk;vd[i]=ry}
 const items=[],m=40,cells=st===F?LAND2:LAND;
 for(const c of cells){const x=c%NX,y=(c/NX)|0,i=y*VX+x,j=i+st*VX;const a=vx[i],b=vx[i+st],cc=vx[j],d=vx[j+st],e=vy[i],f=vy[i+st],g=vy[j],h=vy[j+st];
  if(Math.max(a,b,cc,d)<-m||Math.min(a,b,cc,d)>W+m||Math.max(e,f,g,h)<-m||Math.min(e,f,g,h)>H+m)continue;items.push({c,d:vd[i]+vd[j+st]})}
 if(OV)roadItems(K,st>1?20:9).forEach(r=>items.push(r));
 items.sort((p,q)=>p.d-q.d);
 const slab=7,wallOn=K.sp>.03;ctx.lineCap='round';ctx.lineJoin='round';
 for(const it of items){
  if(it.b){ctx.beginPath();it.S.forEach((q,n)=>n?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.closePath();ctx.globalAlpha=.85;ctx.fillStyle=it.col;ctx.fill();ctx.globalAlpha=1;ctx.lineWidth=1.5;ctx.strokeStyle=it.cas;ctx.stroke();continue}
  if(it.tr){ctx.lineCap='round';ctx.lineWidth=it.w+2.2;ctx.strokeStyle='rgba(255,255,255,.92)';ctx.beginPath();ctx.moveTo(it.x0,it.y0);ctx.lineTo(it.x1,it.y1);ctx.stroke();ctx.lineWidth=it.w;ctx.strokeStyle=it.col;ctx.stroke();continue}
if(it.pier){ctx.lineCap='butt';ctx.lineWidth=it.w;ctx.strokeStyle='#8b919b';ctx.beginPath();ctx.moveTo(it.x0,it.y0);ctx.lineTo(it.x1,it.y1);ctx.stroke();continue}
  if(it.r){const sel=selId&&(it.p.isBr?selId==='br:'+it.p.key:it.p.id===selId),w=it.w+(sel?3:0),ux=it.x1-it.x0,uy=it.y1-it.y0,L=Math.hypot(ux,uy)||1,ex=ux/L*.9,ey=uy/L*.9;
   hitRoads.push(it);ctx.lineCap='butt';
   ctx.lineWidth=w+2.4;ctx.strokeStyle=sel?'#e8590c':it.cas;ctx.beginPath();ctx.moveTo(it.x0-ex,it.y0-ey);ctx.lineTo(it.x1+ex,it.y1+ey);ctx.stroke();
   const fc=sel?'#fff3bf':it.col;ctx.lineWidth=w;ctx.strokeStyle=fc;ctx.beginPath();ctx.moveTo(it.x0-ex,it.y0-ey);ctx.lineTo(it.x1+ex,it.y1+ey);ctx.stroke();
   ctx.beginPath();ctx.arc(it.x1,it.y1,w/2,0,7);ctx.fillStyle=fc;ctx.fill();
   if(it.br){const nx=-uy/L,ny=ux/L,o=w/2+1.6;ctx.lineWidth=1.5;ctx.strokeStyle=sel?'#e8590c':'#374151';for(const sg of[-1,1]){ctx.beginPath();ctx.moveTo(it.x0+nx*o*sg-ex,it.y0+ny*o*sg-ey-3);ctx.lineTo(it.x1+nx*o*sg+ex,it.y1+ny*o*sg+ey-3);ctx.stroke()}}
   continue}
  const c=it.c,x=c%NX,y=(c/NX)|0,i=y*VX+x,j=i+st*VX,col=CF[c]||'#7bbf5e',water=SF[c]===1;
  let p0x=vx[i],p0y=vy[i],p1x=vx[i+st],p1y=vy[i+st],p2x=vx[j+st],p2y=vy[j+st],p3x=vx[j],p3y=vy[j];
  if(water){const q=[[x,y],[x+st,y],[x+st,y+st],[x,y+st]].map(a=>pj(K,a[0]*GS,a[1]*GS,.5));p0x=q[0][0];p0y=q[0][1];p1x=q[1][0];p1y=q[1][1];p2x=q[2][0];p2y=q[2][1];p3x=q[3][0];p3y=q[3][1]}
  if(wallOn){const sides=[[0,-1,i,i+st],[1,0,i+st,j+st],[0,1,j+st,j],[-1,0,j,i]];
   for(const[dx,dy,va,vB]of sides){const nx=x+dx*st,ny=y+dy*st;if(nx>=0&&ny>=0&&nx<NX&&ny<NY&&LM[ny*NX+nx])continue;const nry=dx*K.sn+dy*K.c;if(nry<=0)continue;
    const xa=va%VX,ya=(va/VX)|0,xb=vB%VX,yb=(vB/VX)|0,pa=pj(K,xa*GS,ya*GS,-slab),pb=pj(K,xb*GS,yb*GS,-slab);
    ctx.beginPath();ctx.moveTo(vx[va],vy[va]);ctx.lineTo(vx[vB],vy[vB]);ctx.lineTo(pb[0],pb[1]);ctx.lineTo(pa[0],pa[1]);ctx.closePath();ctx.fillStyle=shade(T.col.rock,.55+.25*nry);ctx.fill()}}
  ctx.beginPath();ctx.moveTo(p0x,p0y);ctx.lineTo(p1x,p1y);ctx.lineTo(p2x,p2y);ctx.lineTo(p3x,p3y);ctx.closePath();ctx.fillStyle=col;ctx.fill();ctx.strokeStyle=col;ctx.lineWidth=.7;ctx.stroke()}
 if(OV){ctx.lineWidth=1.2;ctx.strokeStyle='rgba(20,40,25,.45)';REG.forEach(r=>{ctx.beginPath();r.pts.forEach((p,n)=>{const q=pj(K,p[0],p[1],hAt(p[0],p[1]));n?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])});ctx.closePath();ctx.stroke()})}
 const bl=BL.filter(b=>T.bh[b.key]>0).map(b=>({b,d:pj(K,b.cx,b.cy,0)[2]})).sort((a,b)=>a.d-b.d);
 for(const{b}of bl){const hh=T.bh[b.key]*Math.max(1,K.kz/2),base=hAt(b.cx,b.cy),col=T.bc[b.key]||T.col.bld;
  for(const P of b.parts){let sa=0;for(let n=0;n<P.length;n++){const a=P[n],c=P[(n+1)%P.length];sa+=a[0]*c[1]-c[0]*a[1]}const ccw=sa>0;
   for(let n=0;n<P.length;n++){const a=P[n],c=P[(n+1)%P.length];let nx=ccw?c[1]-a[1]:-(c[1]-a[1]),ny=ccw?-(c[0]-a[0]):c[0]-a[0];const l=Math.hypot(nx,ny)||1;nx/=l;ny/=l;const nry=nx*K.sn+ny*K.c;if(nry<=0||K.sp<=.03)continue;
    const pa=pj(K,a[0],a[1],base),pc=pj(K,c[0],c[1],base),ta=pj(K,a[0],a[1],base+hh),tc=pj(K,c[0],c[1],base+hh);
    ctx.beginPath();ctx.moveTo(pa[0],pa[1]);ctx.lineTo(pc[0],pc[1]);ctx.lineTo(tc[0],tc[1]);ctx.lineTo(ta[0],ta[1]);ctx.closePath();ctx.fillStyle=shade(col,.62+.25*nry);ctx.fill();ctx.strokeStyle='rgba(0,0,0,.18)';ctx.lineWidth=.8;ctx.stroke()}
   ctx.beginPath();P.forEach((p,n)=>{const q=pj(K,p[0],p[1],base+hh);n?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])});ctx.closePath();ctx.fillStyle=shade(col,1.04);ctx.fill();ctx.strokeStyle='rgba(0,0,0,.25)';ctx.lineWidth=.8;ctx.stroke()}}
 if(OV){const ff=cssC().ff;ctx.textAlign='center';ctx.textBaseline='middle';
  const lab=(t,x,y,z,sz)=>{const q=pj(K,x,y,z);if(q[0]<-50||q[0]>W+50||q[1]<-20||q[1]>H+20)return;ctx.font=`700 ${sz}px ${ff}`;ctx.lineWidth=3;ctx.strokeStyle='rgba(255,255,255,.85)';ctx.strokeText(t,q[0],q[1]);ctx.fillStyle='#17301b';ctx.fillText(t,q[0],q[1])};
  if(K.s<1.5)DATA.forEach((d,i)=>{if(!d.provName||i<2&&K.s>1)return;const P=OUT[i][0].split(' ').map(q=>q.split(',').map(Number));let sx=0,sy=0;P.forEach(p=>{sx+=p[0];sy+=p[1]});const x=sx/P.length,y=sy/P.length;lab(d.provName,x,y,hAt(x,y),Math.max(11,Math.min(15,12*K.s+4)))});
  if(K.s>=.95)BL.forEach(b=>{if(b.name)lab(b.name,b.cx,b.cy,hAt(b.cx,b.cy)+(T.bh[b.key]||0),11)});
  if(window.PL)PL.forEach(p=>{if(p.kind&&p.kind!=='place'||p.x==null)return;const q=pj(K,p.x,p.y,hAt(p.x,p.y)+1);if(q[0]<-10||q[0]>W+10||q[1]<-10||q[1]>H+10)return;ctx.beginPath();ctx.arc(q[0],q[1],5,0,7);ctx.fillStyle=p.color||'#e8590c';ctx.fill();ctx.lineWidth=2;ctx.strokeStyle='#fff';ctx.stroke()});try{transitMarks(K,ff)}catch(_){}}
 if(busy)raf=requestAnimationFrame(draw);else if((OV?'0':'-1')!==cv.style.zIndex)applyMode()}
function pickRoad(sx,sy){let best=null,bd=1e9;for(const it of hitRoads){const dx=it.x1-it.x0,dy=it.y1-it.y0,L2=dx*dx+dy*dy||1;let u=((sx-it.x0)*dx+(sy-it.y0)*dy)/L2;u=Math.max(0,Math.min(1,u));const d=Math.hypot(sx-(it.x0+u*dx),sy-(it.y0+u*dy));
  const pri=it.br?-3:0;if(d-pri<bd&&d<=Math.max(9,it.w/2+7)){bd=d-pri;best=it}}
 if(best){const p=best.p;if(p.isBr){selId='br:'+p.key;if(window.BR)BR.open(p.key)}else{selId=p.id;if(p.id&&typeof showPlace==='function')showPlace(p.id)}}else selId=null;
 need()}
/* ---------- interaction (pan / zoom / rotate) ---------- */
let ptr=new Map(),gest=null,rotMode=false;
const toVBpan=(dsx,dsy)=>{const K=cam(),rx=dsx/K.s,ry=dsy/(K.s*Math.max(K.cp,.2)),dx=rx*K.c+ry*K.sn,dy=-rx*K.sn+ry*K.c;vb.x-=dx;vb.y-=dy;upd()};
function zoomAt(f,sx,sy){const K=cam(),rx=(sx-W/2)/K.s,ry=(sy-H/2)/(K.s*Math.max(K.cp,.2)),ox=rx*K.c+ry*K.sn,oy=-rx*K.sn+ry*K.c,ns=Math.max(.2,Math.min(12,K.s*f)),k=K.s/ns;
 const ncx=K.cx+ox-ox*k,ncy=K.cy+oy-oy*k;vb.w=W/ns;vb.h=H/ns;vb.x=ncx-vb.w/2;vb.y=ncy-vb.h/2;upd()}
cv.addEventListener('contextmenu',e=>e.preventDefault());
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);ptr.set(e.pointerId,{x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,t:Date.now()});rotMode=e.button===2||e.shiftKey||e.ctrlKey;
 if(ptr.size===2){const a=[...ptr.values()];gest={d:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),ang:Math.atan2(a[1].y-a[0].y,a[1].x-a[0].x),my:(a[0].y+a[1].y)/2}}});
cv.addEventListener('pointermove',e=>{const p=ptr.get(e.pointerId);if(!p)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
 if(ptr.size===1){if(rotMode){T.thT=T.th=T.th+dx*.4;T.phT=T.ph=Math.max(0,Math.min(75,T.ph-dy*.3));bump();moving();return}bump();moving();toVBpan(dx,dy)}
 else if(ptr.size===2&&gest){const a=[...ptr.values()],d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),ang=Math.atan2(a[1].y-a[0].y,a[1].x-a[0].x),mx=(a[0].x+a[1].x)/2,my=(a[0].y+a[1].y)/2;
  if(gest.d>0)zoomAt(d/gest.d,mx,my);T.thT=T.th=T.th-(ang-gest.ang)*180/Math.PI;T.phT=T.ph=Math.max(5,Math.min(75,T.ph-(my-gest.my)*.25));gest={d,ang,my};bump();moving()}});
const up=e=>{const p=ptr.get(e.pointerId);ptr.delete(e.pointerId);if(ptr.size<2)gest=null;if(e.type==='pointerup'&&p&&ptr.size===0&&Math.hypot(e.clientX-p.sx,e.clientY-p.sy)<6&&!rotMode)pickRoad(e.clientX,e.clientY)};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
cv.addEventListener('wheel',e=>{e.preventDefault();if(e.shiftKey)T.thT=T.th=T.th+e.deltaY*.1;else zoomAt(Math.exp(-e.deltaY*.0015),e.clientX,e.clientY);bump();moving()},{passive:false});
/* ---------- 3D button: tap = on/off, drag up/down = height ---------- */
const rcg=document.querySelector('#zr').parentNode;rcg.style.display='none';
const g3=document.createElement('div');g3.className='fl grp';g3.innerHTML='<button id="b3d" aria-label="3D view" aria-pressed="false" title="3D · tap to toggle, drag up/down to change height"><b class="cmp">3D</b></button>';rcg.parentNode.appendChild(g3);
const b3=g3.firstChild,tip=document.createElement('div');tip.id='b3tip';document.body.appendChild(tip);let bd=null;
b3.addEventListener('pointerdown',e=>{e.stopPropagation();b3.setPointerCapture(e.pointerId);bd={y:e.clientY,kz:T.kz,moved:false,id:e.pointerId}});
b3.addEventListener('pointermove',e=>{if(!bd||e.pointerId!==bd.id)return;const dy=bd.y-e.clientY;if(Math.abs(dy)>6)bd.moved=true;
 if(bd.moved){T.kz=Math.max(.2,Math.min(8,bd.kz*Math.exp(dy/140)));tip.textContent='Height ×'+T.kz.toFixed(1);const r=b3.getBoundingClientRect();tip.style.cssText=`display:block;top:${r.top+r.height/2-14}px;right:${innerWidth-r.left+8}px`;need()}});
b3.addEventListener('pointerup',e=>{if(!bd||e.pointerId!==bd.id)return;const m=bd.moved;bd=null;tip.style.display='none';if(m){saveView();return}set3D(!(T.phT>.5&&T.on))});
b3.addEventListener('pointercancel',()=>{bd=null;tip.style.display='none'});
function set3D(on){if(!on){selId=null;selPt=null}if(on&&!T.on){T.on=true}if(on)ensureT();T.phT=on?55:0;if(!on)T.thT=0;applyMode();saveView();need();refreshTile()}
/* ---------- compass: tap = Reset view · drag = rotate/tilt 3D ---------- */
const gc=document.createElement('div');gc.className='fl grp';
gc.innerHTML='<button id="bcmp" aria-label="Reset view" title="Reset view · ลากเพื่อหมุนแผนที่ 3D"><svg class="i" viewBox="0 0 24 24" style="width:24px;height:24px"><circle cx="12" cy="12" r="9.4" fill="none" stroke="currentColor" stroke-opacity=".28" stroke-width="1.2"/><g id="cmpn"><path d="M12 3.6l3.1 8.4H8.9z" fill="#e03131" stroke="none"/><path d="M12 20.4L8.9 12h6.2z" fill="currentColor" fill-opacity=".5" stroke="none"/></g><circle cx="12" cy="12" r="1.5" fill="var(--paper)" stroke="none"/></svg></button>';
g3.parentNode.insertBefore(gc,g3);
const bc=gc.firstChild,cmpN=bc.querySelector('#cmpn');let cmpA=null,cmpD=null;
function updCompass(){const a=Math.round(T.th*10)/10;if(a!==cmpA){cmpA=a;cmpN.setAttribute('transform','rotate('+a+' 12 12)')}bc.classList.toggle('dim',!(T.on&&(T.phT>.5||T.ph>.5)))}
function resetView(){if(!(T.on&&T.phT>.5)){T.thT=0;updCompass();toast('เปิดโหมด 3D ก่อน · Turn on 3D first');return}T.thT=0;T.phT=55;applyMode();need();toast('Reset view')}
bc.addEventListener('pointerdown',e=>{e.stopPropagation();bc.setPointerCapture(e.pointerId);cmpD={x:e.clientX,y:e.clientY,th:T.thT,ph:T.phT,moved:false,id:e.pointerId}});
bc.addEventListener('pointermove',e=>{if(!cmpD||e.pointerId!==cmpD.id)return;const dx=e.clientX-cmpD.x,dy=e.clientY-cmpD.y;if(Math.abs(dx)+Math.abs(dy)>6)cmpD.moved=true;
 if(cmpD.moved&&T.on&&T.phT>.5){T.thT=T.th=cmpD.th+dx*.7;T.phT=T.ph=Math.max(5,Math.min(75,cmpD.ph-dy*.35));bump();need()}});
bc.addEventListener('pointerup',e=>{if(!cmpD||e.pointerId!==cmpD.id)return;const m=cmpD.moved;cmpD=null;if(!m)resetView()});
bc.addEventListener('pointercancel',()=>{cmpD=null});
updCompass();
/* ---------- terrain on/off (Layers → Terrain tile) ---------- */
function refreshTile(){const t=document.querySelector('[data-lya="tile:terrain"]');if(t){t.classList.toggle('on',T.on);const s=t.querySelector('small');if(s)s.textContent=T.on?'On':'Off'}}
function setTerrain(on){T.on=on;if(!on){selId=null;selPt=null}if(on)ensureT();else{T.phT=0;T.thT=0;T.ph=0;T.th=0}applyMode();saveView();need();refreshTile()}
window.trDebug=()=>({n:hitRoads.length,selId,all:hitRoads.map(r=>[r.x0,r.y0,r.x1,r.y1])});window.trToggle=()=>setTerrain(!T.on);window.trIsOn=()=>T.on;window.trOpen=()=>setTerrain(!T.on);
let TI0=0;function ensureT(){if(TI0)return;TI0=1;initH();buildGeo();recolor()}
fitCanvas();addEventListener('resize',()=>{fitCanvas();need()});
const _upd=upd;upd=function(){const r=_upd.apply(this,arguments);if(T.on)bump();need();return r};
if(T.on)ensureT();applyMode();if(T.on)need();
})();
