const DATA = [
  {district:1, provName:"นครราชธานี", areaCode:"101", entries:[{zip:"10101",name:"วังฯ"},{zip:"10102",name:"เวียง"},{zip:"10103",name:"คลัง"},{zip:"10104",name:"ประชาธิป"},{zip:"10105",name:"พรศรีแผ่นดิน"},{zip:"10106",name:"โรงพยาบาล"},{zip:"10107",name:"รถราง"},{zip:"10108",name:"ไฟฟ้าสถิต"},{zip:"10109",name:"รัฐสภาเก่า"}]},
  {district:1, provName:"ราษฎรมณฑล", areaCode:"102", entries:[{zip:"10210",name:"บางแตงโม"},{zip:"10211",name:"บางแมวโต"},{zip:"10212",name:"มาลีวง"},{zip:"10213",name:"ยูเรนัส"},{zip:"10214",name:"สัมพันธไมต"},{zip:"10215",name:"พระอาทิตย์"},{zip:"10216",name:"วงรี"},{zip:"10217",name:"ตลาดวงรี"},{zip:"10218",name:"ผีเปรต"},{zip:"10219",name:"พันเก้าเล่า"},{zip:"10220",name:"เรือนจำ"},{zip:"10221",name:"ธนาคารกลาง"},{zip:"10222",name:"เสรีฝาแตก"},{zip:"10223",name:"ชาตินิยม"},{zip:"10224",name:"สังคมนิยม"},{zip:"10225",name:"อนุรักษ์นิยม"}]},
  {district:2, provName:"สลัมคลองเจ๋ง", areaCode:"203", entries:[{zip:"20326",name:"กะสี"},{zip:"20327",name:"อำเภอเมือง"},{zip:"20328",name:"คลองเจ๋ง"},{zip:"20329",name:"เขต49"},{zip:"20330",name:"ทะเลเปรี้ยว"},{zip:"20331",name:"กล้วยแตก"}]},
  {district:2, provName:"เขาเจ๋ง", areaCode:"204", entries:[{zip:"20432",name:"บายาโดลิด"},{zip:"20433",name:"หลุมริม"},{zip:"20434",name:"ด้านขนาน"}]},
  {district:2, provName:"ต้มยำไก่", areaCode:"205", entries:[{zip:"20535",name:"กลีเจ๋ง"},{zip:"20536",name:"กลีดำ"},{zip:"20537",name:"กลีโอ้ล"},{zip:"20538",name:"กลีเปรียว"},{zip:"20539",name:"กลีแดง"}]},
  {district:2, provName:"โอ้ลลิ่ง", areaCode:"206", entries:[{zip:"20640",name:"หลอกูด"},{zip:"20641",name:"หลอ"},{zip:"20642",name:"โอ้ลซิ่ง"},{zip:"20643",name:"โอ้ลวิ่ง"}]},
  {district:2, provName:"เลิกโง่", areaCode:"207", entries:[{zip:"20744",name:"เลิกโง่"},{zip:"20745",name:"เลิกเหลี่ยม"},{zip:"20746",name:"ประหารชีวิต"}]},
  {district:2, provName:"โยดก", areaCode:"208", entries:[{zip:"20847",name:"ไส้ติ่งแตก"},{zip:"20848",name:"สมองแตก"}]},
  {district:2, provName:"กรุงเจ๋ง", areaCode:"209", entries:[{zip:"20949",name:"กรุงเจ๋ง"},{zip:"20950",name:"อาณานิคม"},{zip:"20951",name:"ส้มปอด"}]},
  {district:3, provName:"งอ", areaCode:"310", entries:[{zip:"31052",name:"งอ"},{zip:"31053",name:"งอลวง"}]},
  {district:3, provName:"พรศรี", areaCode:"311", entries:[{zip:"31154",name:"พระพร"},{zip:"31155",name:"ศรีบุแม่"},{zip:"31156",name:"มุมปาน"}]},
  {district:3, provName:"ทม", areaCode:"312", entries:[{zip:"31257",name:"ทมตะวันตก"},{zip:"31258",name:"ทมตะวันออก"}]},
  {district:3, provName:"ยากส์", areaCode:"313", entries:[{zip:"31359",name:"ยากส์ชิบหาย"},{zip:"31360",name:"เมืองกรุงเขา"}]},
  {district:3, provName:"ประปาแตก", areaCode:"314", entries:[{zip:"31461",name:"ประปาแตก"}]}
];
const REG=[{n:"ภาค 1",ab:"ศสว.",f:"ศรีสุนทรโวหาร"},{n:"ภาค 2",ab:"ปดน.",f:"ประดิษฐ์มนูธรรม"},{n:"ภาค 3",ab:"ธรส.",f:"ธรรมรงนาวาสวัสดิ์"}];
const $=s=>document.querySelector(s),svg=$('#m'),NS='http://www.w3.org/2000/svg';
// polygons in screenshot coordinates (1380x750)
const bb=a=>{let p=a.join(' ').split(/[ ,]/).map(Number),xs=[],ys=[];p.forEach((v,i)=>(i%2?ys:xs).push(v));const x=Math.min(...xs),y=Math.min(...ys);return{x,y,w:Math.max(...xs)-x,h:Math.max(...ys)-y}};
const OUT={
0:["780,378 860,378 860,445 780,445"],1:["738,345 905,345 905,485 738,485"],
2:["905,345 1122,303 1140,345 1148,400 1148,485 905,485"],
3:["543,345 570,290 610,235 670,190 740,160 810,153 783,345"],
4:["612,345 738,345 738,675 615,655"],
5:["543,345 612,345 615,655 570,640 520,600 490,540 487,487 500,420 520,380"],
6:["810,153 880,155 960,172 1040,185 1090,235 1122,303 905,345 783,345"],
7:["905,485 1148,485 1148,520 1140,580 1090,640 1010,672 880,677"],
8:["738,485 905,485 897,560 880,677 740,675"],
9:["210,48 490,32 485,147 450,150 430,190 380,198 235,195 200,290","528,30 575,30 610,70 605,120 570,148 524,147"],
10:["10,140 60,115 130,55 210,48 200,290 98,327 10,357"],
11:["1190,150 1258,38 1330,65 1380,55 1380,235 1275,212 1230,190"],
12:["1065,70 1095,45 1150,35 1200,40 1258,38 1190,150 1130,125 1075,100"],
13:["1210,665 1235,645 1275,650 1290,690 1275,720 1235,725 1210,700"]};
const DS={
2:[[905,303,968,410],[968,303,1088,410],[1088,303,1148,410],[905,410,1030,485],[1030,410,1112,485],[1112,410,1148,485]],
3:["543,345 570,290 610,235 670,190 675,198 735,285 720,340 720,345","675,198 670,190 740,160 810,153 783,300 735,285","735,285 783,300 783,345 720,345 720,340"],
4:[[612,345,738,408],[612,408,738,487],[612,487,738,565],[612,565,738,637],[612,637,738,675]],
5:[[480,345,612,408],[480,408,612,487],[480,487,612,565],[480,565,612,655]],
6:["810,153 880,155 960,172 936,248 795,225","795,225 936,248 905,345 783,345","960,172 1040,185 1090,235 1122,303 905,345 936,248"],
7:["905,485 1050,640 1010,672 880,677","905,485 1148,485 1148,520 1140,580 1090,640 1050,640"],
8:[[738,485,905,565],[738,565,905,637],[738,637,905,675]],
9:OUT[9],
10:["10,140 60,115 130,242 100,290 98,327 10,357","60,115 130,55 210,48 200,230 170,225 130,242","130,242 170,225 200,230 200,290 98,327 100,290"],
11:["1258,38 1330,65 1275,212 1230,190 1190,150","1330,65 1380,55 1380,235 1275,212"],
12:[OUT[12][0],[1100,35,1170,105]],13:[OUT[13][0]]};
{const g=(xs,ys,skip)=>{const o=[];for(let r=0;r<ys.length-1;r++)for(let c=0;c<xs.length-1;c++)if(!skip(r,c,xs.length-1,ys.length-1))o.push([xs[c],ys[r],xs[c+1],ys[r+1]]);return o};
DS[0]=g([780,807,833,860],[378,403,425,445],()=>0);
DS[1]=g([738,780,807,833,860,905],[345,378,403,425,445,485],(r,c)=>r>0&&r<4&&c>0&&c<4)}
const LP={1:[820,357],9:[350,120]};
const GEO0={o:JSON.parse(JSON.stringify(OUT)),d:JSON.parse(JSON.stringify(DS))};
let CVR={},GEOREV=0;
const okPoly=s=>typeof s==='string'&&/^-?\d+(\.\d+)?,-?\d+(\.\d+)?( -?\d+(\.\d+)?,-?\d+(\.\d+)?){2,}$/.test(s);
function geoSync(){DS[9]=OUT[9];if(DS[12]&&OUT[12])DS[12][0]=OUT[12][0];if(DS[13]&&OUT[13])DS[13][0]=OUT[13][0]}
function geoApply(g){if(!g||typeof g!=='object')return false;
 if(g.o)for(const k in g.o){if(OUT[k]&&Array.isArray(g.o[k])&&g.o[k].length&&g.o[k].every(okPoly))OUT[k]=g.o[k].slice()}
 if(g.p)for(const k in g.p){const a=k.split(':').map(Number);if(DS[a[0]]&&typeof DS[a[0]][a[1]]==='string'&&okPoly(g.p[k]))DS[a[0]][a[1]]=g.p[k]}
 CVR=(g.c&&typeof g.c==='object')?g.c:{};GEOREV=+g.rev||0;geoSync();return true}
function geoSnap(){const o={},p={};DATA.forEach((_,i)=>{o[i]=OUT[i].slice();if(i!==9)DS[i].forEach((s,j)=>{if(typeof s==='string'&&!((i===12||i===13)&&j===0))p[i+':'+j]=s})});return{v:1,rev:GEOREV,t:Date.now(),o,p,c:CVR}}
const FORCED_GEO={"v":1,"rev":2,"t":1793421074297,"o":{"0":["780,378 860,378 860,445 780,445"],"1":["738,345 905,345 905.2,485 738,485"],"2":["905,345 1122,303 1140,345 1148,400 1148,485 905.2,485"],"3":["540.7,344.9 569.8,289.5 610,235 670.4,191.1 740,160 810,153 783,345"],"4":["612,344.9 738,345 738.3,675.4 612,654.9"],"5":["540.7,344.9 612,344.9 612,654.9 570,640 520,600 490,540 487,487 500,420 520,380"],"6":["810,153 880,155 960,172 1022.5,186.5 1077.6,219.9 1122,303 905,345 783,345"],"7":["905.2,485 1148,485 1148,520 1140,580 1091.9,641.7 1009.5,672.4 905.1,675.4"],"8":["738,485 905.2,485 905.1,565 905.1,675.4 738.3,675.4"],"9":["210,48 490,32 485,147 450,150 430,190 380,198 235,195 200,290","528,30 575,30 610,70 605,120 570,148 524,147"],"10":["10,140 60,115 130,55 210,48 200,290 98,327 10,357"],"11":["1190,150 1258.9,35 1327.6,61.7 1380,55 1380,235 1278.3,210.8 1230,190"],"12":["1065,70 1095,45 1150,35 1200,40 1258.9,35 1190,150 1130,125 1073.4,100.9"],"13":["1207.4,661.6 1232.5,644 1274.1,645.2 1290,690 1278.2,720.1 1234.1,729.6 1207.2,701.9"]},"p":{"3:0":"540.7,344.9 569.8,289.5 610,235 670.4,191.1 675,198 734.3,283.4 720.7,345","3:1":"675,198 670.4,191.1 740,160 810,153 788.8,302.5 734.3,283.4","3:2":"734.3,283.4 788.8,302.5 783,345 720.7,345","6:0":"810,153 880,155 960,172 934.2,249.4 799.8,224.3","6:1":"799.8,224.3 934.2,249.4 905,345 783,345","6:2":"960,172 1022.5,186.5 1077.6,219.9 1122,303 905,345 934.2,249.4","7:0":"905.2,485 1050.1,657.1 1009.5,672.4 905.1,675.4","7:1":"905.2,485 1148,485 1148,520 1140,580 1091.9,641.7 1050.1,657.1","10:0":"10,140 60,115 130,242 100,290 98,327 10,357","10:1":"60,115 130,55 210,48 202.6,226.4 170,225 130,242","10:2":"130,242 170,225 202.6,226.4 200,290 98,327 100,290","11:0":"1258.9,35 1327.6,61.7 1278.3,210.8 1230,190 1190,150","11:1":"1327.6,61.7 1380,55 1380,235 1278.3,210.8"},"c":{"o:13:0":[1,1,1,1,1,1,1],"o:9:1":[0.4,1,1,1,1,0.4],"o:9:0":[0,0.2,0.2,1,1,1,1,0],"c:10:2":[0,0,0,1,0,0],"c:10:1":[1,1,1,0,0,0],"o:12:0":[1,1,1,1,0,0,1,1],"o:5:0":[0,0,0,0,0,1,1,1,1],"c:3:0":[0,0,1,0,0,0,0]}};
geoApply(FORCED_GEO);
const PB=DATA.map((_,i)=>bb(OUT[i]));
const mkC=i=>DS[i].map(s=>{
 if(typeof s=='string'){const b=bb([s]),v=s.split(' ').map(q=>q.split(',').map(Number));
  return{poly:s,...b,cx:v.reduce((a,q)=>a+q[0],0)/v.length,cy:v.reduce((a,q)=>a+q[1],0)/v.length,lw:b.w*.8}}
 const b=PB[i],x0=Math.max(s[0],b.x),y0=Math.max(s[1],b.y),x1=Math.min(s[2],b.x+b.w),y1=Math.min(s[3],b.y+b.h);
 return{r:s,x:x0,y:y0,w:x1-x0,h:y1-y0,cx:(x0+x1)/2,cy:(y0+y1)/2,lw:x1-x0}});
const C=DATA.map((p,i)=>mkC(i));
function curveD(poly,cv){const v=poly.split(' ').map(q=>q.split(',').map(Number)),n=v.length;
 if(!cv||!cv.some(x=>x>0))return 'M'+v.map(a=>a[0]+' '+a[1]).join('L')+'Z';
 let d='';
 for(let k=0;k<n;k++){const p=v[k],a=v[(k+n-1)%n],b=v[(k+1)%n],r=Math.min(1,cv[k]||0);
  if(r<=0){d+=(d?'L':'M')+p[0]+' '+p[1];continue}
  const la=Math.hypot(a[0]-p[0],a[1]-p[1])||1,lb=Math.hypot(b[0]-p[0],b[1]-p[1])||1,dd=r*Math.min(la,lb)/2;
  const p1=[p[0]+(a[0]-p[0])/la*dd,p[1]+(a[1]-p[1])/la*dd],p2=[p[0]+(b[0]-p[0])/lb*dd,p[1]+(b[1]-p[1])/lb*dd];
  d+=(d?'L':'M')+p1[0].toFixed(2)+' '+p1[1].toFixed(2)+'Q'+p[0]+' '+p[1]+' '+p2[0].toFixed(2)+' '+p2[1].toFixed(2)}
 return d+'Z'}
function baseHtml(){const od=(i,k)=>curveD(OUT[i][k],CVR['o:'+i+':'+k]);
 let h='<defs>'+DATA.map((_,i)=>i>1?`<clipPath id="k${i}">${OUT[i].map((s,k)=>`<path d="${od(i,k)}"/>`).join('')}</clipPath>`:'').join('')+'</defs><g id="g">';
 [1,0,2,3,4,5,6,7,8,9,10,11,12,13].forEach(i=>{const p=DATA[i];
  h+=`<g class="p r${p.district-1}" data-i="${i}">`+OUT[i].map((s,k)=>`<path class="f" d="${od(i,k)}"/>`).join('')+
  C[i].map((c,j)=>c.poly?`<path class="c" data-i="${i}" data-j="${j}" d="${curveD(c.poly,CVR['c:'+i+':'+j])}"/>`:`<rect class="c" data-i="${i}" data-j="${j}" x="${c.r[0]}" y="${c.r[1]}" width="${c.r[2]-c.r[0]}" height="${c.r[3]-c.r[1]}" ${i>1?`clip-path="url(#k${i})"`:''}/>`).join('')+
  OUT[i].map((s,k)=>`<path class="ol" d="${od(i,k)}"/>`).join('')+'</g>'});
 return h+'</g>'}
function rebuildBase(){DATA.forEach((_,i)=>{PB[i]=bb(OUT[i]);C[i]=mkC(i)});const t=document.createElementNS(NS,'svg');t.innerHTML=baseHtml();
 const od=svg.querySelector('defs'),og=svg.querySelector('#g');if(od)od.replaceWith(t.querySelector('defs'));if(og)og.replaceWith(t.querySelector('#g'))}
svg.innerHTML=baseHtml()+'<g id="lb"></g>';

const DT=matchMedia('(min-width:900px)'),lb=$('#lb'),sh=$('#sh'),hd=$('#hd'),qi=$('#q'),grab=$('#grab');
C[12][0].cx=1175;C[12][0].cy=128;C[12][0].lw=110;
svg.insertAdjacentHTML('beforeend','<g id="ms"></g><g id="pl"></g><g id="gh" pointer-events="none"></g>');
const FULL={x:0,y:0,w:1380,h:750};
let fs=false,ms=false,mp=[],FV=[],vb={...FULL},sel={i:null,j:null},mode=0,anim,st=0,H=0,off=[0,0,0];
const I={star:'<svg class="i" viewBox="0 0 24 24" style="width:17px;height:17px"><path d="m12 3.5 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.9l6-.9z"/></svg>',starf:'<svg class="i" viewBox="0 0 24 24" style="width:17px;height:17px;fill:currentColor"><path d="m12 3.5 2.7 5.5 6 .9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 9.9l6-.9z"/></svg>',cp:'<svg class="i" viewBox="0 0 24 24" style="width:17px;height:17px"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15"/></svg>',link:'<svg class="i" viewBox="0 0 24 24" style="width:17px;height:17px"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',chev:'<svg class="i" viewBox="0 0 24 24" style="width:16px;height:16px"><path d="m9 6 6 6-6 6"/></svg>',back:'<svg class="i" viewBox="0 0 24 24" style="width:18px;height:18px"><path d="m15 6-6 6 6 6"/></svg>',pin:'<svg class="i" viewBox="0 0 24 24" style="color:var(--ac)"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',no:'<svg class="i" viewBox="0 0 24 24" style="width:32px;height:32px"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2M9 9l4 4m0-4-4 4"/></svg>',gridPlus:'<svg class="i" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/><circle cx="16" cy="16" r="5" fill="var(--sea)" stroke="none"/><path d="M16 13v6M13 16h6" stroke="var(--ac)" stroke-width="2"/></svg>'};
let RR=null;const R0=()=>RR||(RR=svg.getBoundingClientRect()),sc=()=>R0().width/vb.w;
function labels(){OCC=[];const s=sc(),o=[],E=(t,x,y,fs)=>{OCC.push([x-t.length*.3*fs,y-fs*.6,x+t.length*.3*fs,y+fs*.6]);return o.push(`<text x="${x}" y="${y}" font-size="${fs}" stroke-width="${3/s}">${t}</text>`)};
 const showAll=vb.w<460;
 DATA.forEach((p,i)=>{const b=PB[i],on=sel.i===i||showAll;
  if(on){C[i].forEach((c,j)=>{const x=c.cx,y=c.cy;if(x<vb.x-vb.w*.6||x>vb.x+vb.w*1.6||y<vb.y-vb.h*.6||y>vb.y+vb.h*1.6)return;
    const t=p.entries[j].name,fs=Math.min(11.5/s,c.lw*1.2/(t.length*.6));if(fs*s>=5)E(t,x,y,fs)})}
  if(sel.i!==i&&!showAll){const fs=(i>1?13:11)/s,w=p.provName.length*.6*fs;if(w<=b.w*1.05){const l=LP[i]||[b.x+b.w/2,b.y+b.h/2];E(p.provName,l[0],l[1],fs)}}});
 FV.forEach(c=>{const z=Z[c];if(!z)return;const[i,j]=z,l=j==null?(LP[i]||[PB[i].x+PB[i].w/2,PB[i].y+PB[i].h/2]):[C[i][j].cx,C[i][j].cy];o.push(`<text class="st" x="${l[0]}" y="${l[1]-15/s}" font-size="${16/s}" stroke-width="${3/s}">★</text>`)});
 lb.innerHTML=o.join('')}
/* ===== ระบบ render ลื่น: viewBox อัปเดตทันที (ถูกมาก) ส่วนงานหนักรวมเป็นเฟรมละครั้ง และข้ามได้ถ้ายังอยู่ในพื้นที่ที่วาดไว้แล้ว ===== */
let rqF=0,idleT=0,forceR=0,CV=null,lastUpd=0,QK=0,fullT=0;
const moving=()=>performance.now()-lastUpd<160;
const setCov=()=>CV={x0:vb.x-vb.w*.3,y0:vb.y-vb.h*.3,x1:vb.x+vb.w*1.3,y1:vb.y+vb.h*1.3,vw:vb.w};
const inCov=()=>CV&&vb.x>=CV.x0&&vb.y>=CV.y0&&vb.x+vb.w<=CV.x1&&vb.y+vb.h<=CV.y1&&Math.abs(Math.log(vb.w/CV.vw))<.22;
function heavy(){forceR=0;setCov();labels();if(mp.length)drawMs();
 if(PL.length||pin||ED.pts.length||(ADDONS.fataekts&&fataekRoutes.length)){
  clearTimeout(fullT);
  /* ข้อมูลเยอะ: วาดเฉพาะสิ่งสำคัญ (ถนนสายหลัก/จุดระดับใหญ่) ที่อยู่ในจอก่อน แล้วค่อยเติมรายละเอียดในเฟรมถัดไป ไม่ให้เบราว์เซอร์ค้าง */
  if(PL.length>90&&!(ED.on&&ED.auth)){QK=1;try{drawPl()}finally{QK=0}fullT=setTimeout(function fullDraw(){fullT=0;if(performance.now()-lastUpd<90){fullT=setTimeout(fullDraw,60);return}try{drawPl()}catch(_){}try{window.trNeed&&window.trNeed()}catch(_){}},50)}
  else drawPl()}
 try{window.trNeed&&window.trNeed()}catch(_){}}
function frame(){rqF=0;try{scaleBar()}catch(_){}if(forceR||!inCov()||gridOn())heavy()}
function reqR(f){if(f)forceR=1;if(!rqF)rqF=requestAnimationFrame(frame)}
function upd(){const r=R0();if(window.goScale)goScale();if(window.xScale)xScale();vb.h=vb.w*r.height/r.width;svg.setAttribute('viewBox',`${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
 svg.classList.toggle('showd',vb.w<740||mode==1);lastUpd=performance.now();document.body.classList.add('mv');reqR(0);
 clearTimeout(idleT);idleT=setTimeout(()=>{document.body.classList.remove('mv');reqR(1)},120)}
// bottom sheet
function geo(){H=Math.round(innerHeight*.86);sh.style.height=DT.matches?'':H+'px';off=[H-hd.offsetHeight,H-Math.round(innerHeight*.5),0]}
const vis=s=>H-off[s];
function setSt(s,inst){sh.style.transition=inst?'none':'';if(DT.matches){st=s?1:0;sh.classList.toggle('closed',!st);sh.style.transform=''}else{st=s;sh.classList.remove('closed');sh.style.transform=`translateY(${off[s]}px)`}}
function selBox(){return sel.i===null?FULL:sel.j===null?PB[sel.i]:C[sel.i][sel.j]}
function refit(){fit(selBox(),sel.i===null?1.04:sel.j===null?1.35:4)}
function fit(b,pad=1.35){const r=R0(),dt=DT.matches,ins=dt||fs?0:Math.min(vis(st),r.height*.55),il=dt&&st&&!fs?384:0,wv=r.width-il,hv=r.height-ins,wm=Math.max(b.w*pad,b.h*pad*wv/hv),k=wm/wv,w=k*r.width,ra=r.height/r.width,
 S={x:vb.x+vb.w/2,y:vb.y+vb.w*ra/2},T={x:b.x+b.w/2-(il+wv/2-r.width/2)*k,y:b.y+b.h/2-(hv/2-r.height/2)*k},w0=vb.w,t0=performance.now(),d=Math.abs(Math.log(w/w0))>.5?700:520;
 cancelAnimationFrame(anim);(function f(t){let e=Math.min(1,(t-t0)/d);e=e<.5?4*e*e*e:1-Math.pow(-2*e+2,3)/2;
  const ww=w0*Math.pow(w/w0,e),cx=S.x+(T.x-S.x)*e,cy=S.y+(T.y-S.y)*e;vb.w=ww;vb.x=cx-ww/2;vb.y=cy-ww*ra/2;upd();if(e<1)anim=requestAnimationFrame(f)})(t0)}
function zoomAt(f,px,py){const r=R0(),wx=vb.x+(px-r.left)/r.width*vb.w,wy=vb.y+(py-r.top)/r.height*vb.h,nw=Math.min(2400,Math.max(25,vb.w/f)),g=vb.w/nw;
 vb.x=wx-(wx-vb.x)/g;vb.y=wy-(wy-vb.y)/g;vb.w=nw;upd()}
function select(i,j=null,s){window.xClear&&xClear();FORM=null;hv=null;if(i!==null)tab=0;sel={i,j};
 svg.querySelectorAll('.p').forEach(g=>{g.classList.toggle('sel',+g.dataset.i===i);g.classList.toggle('dim',i!==null&&+g.dataset.i!==i)});
 svg.querySelectorAll('.c.on').forEach(e=>e.classList.remove('on'));
 if(i!==null&&j!==null)svg.querySelector(`.c[data-i="${i}"][data-j="${j}"]`).classList.add('on');
 if(s!==undefined)setSt(s);refit();if(sel.i!==null)addRc(codeOf());panel();$('#body').scrollTop=0;try{history.replaceState(null,'',codeOf()?HX()+codeOf():(PATHMODE?location.pathname+location.search:'#/map/'))}catch(_){}}
const codeOf=()=>sel.i===null?'':sel.j===null?DATA[sel.i].areaCode:DATA[sel.i].entries[sel.j].zip;
const linkOf=()=>{try{return baseUrl()+HX()+codeOf()}catch(_){return codeOf()}};
let tt;function toast(m){sbarToast(m)}
/* ===== Status Bar (แถบสถานะด้านบน): ดำ = ทั่วไป/บันทึก · แดง = ล้มเหลว · เขียว = กลับมาสำเร็จ — แสดงจากเหตุการณ์จริงของ API เท่านั้น ===== */
const SB={q:[],busy:0,el:null},APIST={},SVB={t:0,list:[]};
const sbTime=()=>new Date().toLocaleTimeString('th-TH',{hour12:false});
function sbEl(){if(!SB.el){const e=document.createElement('div');e.id='stbar';e.setAttribute('role','status');e.setAttribute('aria-live','polite');document.body.appendChild(e);SB.el=e}return SB.el}
function sbar(kind,parts){const text=parts.filter(x=>x!==''&&x!=null).concat([sbTime()]).join('·');
 if(SB.q.length&&SB.q[SB.q.length-1].text===text)return;SB.q.push({kind,text});if(SB.q.length>4)SB.q.shift();sbNext()}
function sbNext(){if(SB.busy||!SB.q.length)return;const m=SB.q.shift(),e=sbEl();SB.busy=1;e.className=m.kind;e.textContent=m.text;void e.offsetWidth;e.classList.add('on');
 setTimeout(()=>{e.classList.remove('on');setTimeout(()=>{SB.busy=0;sbNext()},200)},SB.q.length>1?900:1700)}
function sbarToast(m){m=String(m==null?'':m);sbar(/ไม่สำเร็จ|ไม่ได้|ผิดพลาด|ล้มเหลว|ไม่ถูกต้อง/.test(m)?'err':'info',[m])}
function apiFail(name,backup){const s=APIST[name]||(APIST[name]={fail:0,t:0}),now=Date.now();if(!s.fail||now-s.t>30000){sbar('err',['เชื่อมต่อไม่สำเร็จ',backup?'BACKUP':'กำลังดึง '+name]);s.t=now}s.fail=1}
function apiOk(name){const s=APIST[name];if(s&&s.fail){s.fail=0;sbar('ok',['ดึง '+name+' สำเร็จ'])}}
function apiSave(op,item,api,ok,err){SVB.list.push({op,item:item||{},api,ok:!!ok,err:err||''});clearTimeout(SVB.t);SVB.t=setTimeout(()=>{const L=SVB.list;SVB.list=[];const g={};L.forEach(x=>{const k=x.op+'|'+x.api+'|'+x.ok;(g[k]=g[k]||[]).push(x)});
  Object.values(g).forEach(a=>{const f=a[0],lbl=(f.item.name||'')+(f.item.id?' '+f.item.id:'')+(a.length>1?' +'+(a.length-1)+' รายการ':'');sbar(f.ok?'info':'err',[f.ok?f.op:f.op+'ไม่สำเร็จ',lbl.trim(),f.api,f.ok?'':String(f.err||'').slice(0,40)])})},350)}

function copy(v,m){const ok=()=>toast(m||'คัดลอก '+v+' แล้ว'),fb=()=>{const a=document.createElement('textarea');a.value=v;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(_){toast('คัดลอกไม่สำเร็จ')}a.remove()};
 navigator.clipboard?navigator.clipboard.writeText(v).then(ok,fb):fb()}
const Z={};DATA.forEach((p,i)=>{Z[p.areaCode]=[i,null];p.entries.forEach((e,j)=>Z[e.zip]=[i,j])});
function go(){if((forced||pageOf())!=='map')return;const h=(location.hash||'').replace(/^#\/?(map\/?|zip\/?|Add-ons\/?)?/i,''),kv={};let k='';h.split('&').forEach(t=>{const n=t.indexOf('=');if(n<0)k=t;else kv[t.slice(0,n)]=t.slice(n+1)});
 if(kv.ly&&window.lyApply)window.lyApply(kv.ly);
 const nm=a=>a?a.split(',').map(Number):null,v=nm(kv.v),p=nm(kv.p);
 if(Z[k])select(Z[k][0],Z[k][1],1);
 if(p&&p.length==2&&p.every(isFinite)){pin={x:p[0],y:p[1]};showPc();drawPl();if(!v)fit({x:p[0]-30,y:p[1]-30,w:60,h:60},1)}
 if(v&&v.length==3&&v.every(isFinite)){cancelAnimationFrame(anim);const r=R0();vb.w=v[2];vb.x=v[0]-v[2]/2;vb.y=v[1]-v[2]*r.height/r.width/2;upd()}}
const sv=()=>{try{localStorage.setItem('fv',JSON.stringify(FV))}catch(_){}};try{FV=JSON.parse(localStorage.getItem('fv')||'[]').filter(c=>Z[c])}catch(_){}
function toggleFav(){const c=codeOf(),n=FV.indexOf(c);if(n<0){FV.push(c);toast('ปักหมุดแล้ว ★')}else{FV.splice(n,1);toast('เอาหมุดออกแล้ว')}sv();panel();labels()}
const AREA=Object.keys(OUT).filter(k=>k!='0').reduce((a,k)=>a+OUT[k].reduce((b,p)=>{const v=p.split(' ').map(q=>q.split(',').map(Number));let t=0;v.forEach((q,n)=>{const w=v[(n+1)%v.length];t+=q[0]*w[1]-w[0]*q[1]});return b+Math.abs(t)/2},0),0),KM=Math.sqrt(25678/AREA);
const fmt=d=>(d<10?d.toFixed(2):d<100?d.toFixed(1):Math.round(d).toLocaleString('th'))+' กม.';
const inter=(a,b,c,d)=>{const r=[b[0]-a[0],b[1]-a[1]],q=[d[0]-c[0],d[1]-c[1]],den=r[0]*q[1]-r[1]*q[0];if(!den)return null;const t=((c[0]-a[0])*q[1]-(c[1]-a[1])*q[0])/den,u=((c[0]-a[0])*r[1]-(c[1]-a[1])*r[0])/den;return t>0&&t<1&&u>0&&u<1?[a[0]+t*r[0],a[1]+t*r[1]]:null};
const shoe=P=>Math.abs(P.reduce((a,p,i)=>{const q=P[(i+1)%P.length];return a+p[0]*q[1]-q[0]*p[1]},0))/2;
const fmtA=a=>(a<10?a.toFixed(2):a<1000?a.toFixed(1):Math.round(a).toLocaleString('th'))+' ตร.กม.';
function msPolys(){const P=mp,n=P.length,o=[];if(n>=4&&P[0][0]===P[n-1][0]&&P[0][1]===P[n-1][1])o.push(P.slice(0,n-1));else for(let i=0;i<n-1;i++)for(let j=i+2;j<n-1;j++){const X=inter(P[i],P[i+1],P[j],P[j+1]);if(X)o.push([X,...P.slice(i+1,j+1)])}return o}
function drawMs(){const s=sc(),g=$('#ms');let h='',tot=0,ar=0;
 if(mp.length){msPolys().forEach(P=>{const a=shoe(P)*KM*KM,cx=P.reduce((t,p)=>t+p[0],0)/P.length,cy=P.reduce((t,p)=>t+p[1],0)/P.length;ar+=a;h+=`<polygon points="${P.map(p=>p.join(',')).join(' ')}" fill="#e8590c" fill-opacity=".18" stroke="none"/><text x="${cx}" y="${cy}" font-size="${12/s}" stroke-width="${3/s}" style="fill:#e8590c">${fmtA(a)}</text>`});
  h+=`<polyline points="${mp.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#e8590c" stroke-width="${2.5/s}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${6/s} ${5/s}"/>`;
  mp.forEach((p,n)=>{if(n){const q=mp[n-1],d=Math.hypot(p[0]-q[0],p[1]-q[1])*KM;tot+=d;h+=`<text x="${(p[0]+q[0])/2}" y="${(p[1]+q[1])/2-10/s}" font-size="${11.5/s}" stroke-width="${3/s}" style="fill:#e8590c">${fmt(d)}</text>`}
   h+=`<circle cx="${p[0]}" cy="${p[1]}" r="${(n?5:7)/s}" fill="#fff" stroke="#e8590c" stroke-width="${2.5/s}"/>`})}
 g.innerHTML=h;if(ms)$('#mv').textContent=mp.length>1?'รวม '+fmt(tot)+(ar?' · พื้นที่ '+fmtA(ar):''):'แตะแผนที่เพื่อวางจุด'}
function openMore(){}
function setMeas(on){if(on)openMore();ms=on;if(!on)mp=[];svg.classList.toggle('svgm',on);$('#ru').classList.toggle('a',on);$('#mc').hidden=!on;drawMs()}
function setFs(on){if(on)openMore();fs=on;document.body.classList.toggle('fs',on);$('#fsb').innerHTML=FI[+on]+'<span>Full screen</span>';
 try{if(on&&document.documentElement.requestFullscreen)document.documentElement.requestFullscreen().catch(()=>{});else if(!on&&document.fullscreenElement)document.exitFullscreen()}catch(_){}refit()}
const FI=['<svg class="i" viewBox="0 0 24 24"><path d="M4 9V5.5A1.5 1.5 0 0 1 5.5 4H9M15 4h3.5A1.5 1.5 0 0 1 20 5.5V9M20 15v3.5a1.5 1.5 0 0 1-1.5 1.5H15M9 20H5.5A1.5 1.5 0 0 1 4 18.5V15"/></svg>','<svg class="i" viewBox="0 0 24 24"><path d="M9 4v3.5A1.5 1.5 0 0 1 7.5 9H4M15 4v3.5A1.5 1.5 0 0 0 16.5 9H20M20 15h-3.5a1.5 1.5 0 0 0-1.5 1.5V20M4 15h3.5A1.5 1.5 0 0 1 9 16.5V20"/></svg>'];
function shareView(){openShare()}

// ระบบ Add-ons State
let ADDONS = {
  mapPlaces: true,
  fataekts: false,
  carFMRFT: false,
  houses: false,
  traffic: false,
  fataekTypes: { train: true, bus: true, boat: true, toll: true },
  customApis: []
};
try {
  const savedAo = localStorage.getItem('ao_cfg');
  if(savedAo) ADDONS = {...ADDONS, ...JSON.parse(savedAo)};
}catch(_){}
function saveAo(){ try{ localStorage.setItem('ao_cfg', JSON.stringify(ADDONS)); }catch(_){} }
/* โหมดฝังจากหน้า /fataekts : #embed=1&ft=train|bus|boat|toll|all → เปิด Transit เฉพาะประเภทนั้น (ไม่บันทึกทับค่าที่ผู้ใช้ตั้งไว้) */
try{const m=(location.hash||'').match(/[#&]ft=(train|bus|boat|toll|all)\b/);if(m){window.FTEMB=m[1];ADDONS.fataekts=true;ADDONS.fataekTypes={train:false,bus:false,boat:false,toll:false};['train','bus','boat','toll'].forEach(k=>{ADDONS.fataekTypes[k]=(m[1]==='all'||m[1]===k)});saveAo=function(){}}}catch(_){}

function addonsHtml(){
  return `
  <div class="ao-box">
    <div class="sw-row">
      <b>Map Places</b>
      <label class="sw"><input type="checkbox" id="sw-mp" ${ADDONS.mapPlaces?'checked':''}><span class="sw-s"></span></label>
    </div>
    <small style="color:var(--mut)">แสดงข้อมูลสถานที่บนแผนที่หลัก</small>
  </div>

  <div class="ao-box">
    <div class="sw-row">
      <b>fataekts</b>
      <label class="sw"><input type="checkbox" id="sw-fts" ${ADDONS.fataekts?'checked':''}><span class="sw-s"></span></label>
    </div>
    <div id="fts-opts" style="${ADDONS.fataekts?'':'display:none;'}margin-top:10px;">
      <small style="color:var(--mut)">เลือกประเภทที่ต้องการแสดง:</small>
      <div class="chk-grp">
        <label><input type="checkbox" class="fts-t" data-type="train" ${ADDONS.fataekTypes.train?'checked':''}> train</label>
        <label><input type="checkbox" class="fts-t" data-type="bus" ${ADDONS.fataekTypes.bus?'checked':''}> bus</label>
        <label><input type="checkbox" class="fts-t" data-type="boat" ${ADDONS.fataekTypes.boat?'checked':''}> boat</label>
        <label><input type="checkbox" class="fts-t" data-type="toll" ${ADDONS.fataekTypes.toll?'checked':''}> toll</label>
      </div>
      <div style="margin-top:8px;">
        <a href="/fataekts" target="_blank" class="sb2" style="display:inline-block;padding:6px 12px;text-decoration:none;">ดูเว็บทางการ 🔗</a>
      </div>
    </div>
  </div>

  <div class="ao-box">
    <div class="sw-row">
      <b>CarFMRFT</b>
      <label class="sw"><input type="checkbox" id="sw-car" ${ADDONS.carFMRFT?'checked':''}><span class="sw-s"></span></label>
    </div>
    <small style="color:var(--mut)">แสดงรถของมูลนิธิ (FMRFT) ที่วิ่งตามถนนบนแผนที่ · ค่าเริ่มต้น: ปิด</small>
  </div>

  <div class="ao-box">
    <div class="sw-row">
      <b>houses</b>
      <label class="sw"><input type="checkbox" id="sw-hs" ${ADDONS.houses?'checked':''}><span class="sw-s"></span></label>
    </div>
    <small style="color:var(--mut)">แสดงบ้านทั้งหมดบนแผนที่ · ค่าเริ่มต้น: ปิด</small>
  </div>

  <div class="ao-box">
    <b>ลิงก์การตั้งค่า Add-ons</b>
    <small style="color:var(--mut);display:block;margin-top:2px">ลำดับ: Map Places, fataekts, CarFMRFT, houses (+ เปิด / − ปิด) เช่น ?++-- = เปิด Map Places, fataekts</small>
    <code id="ao-link">${window.aoUrl?aoUrl():''}</code>
    <div class="act" style="margin:0"><button class="sb2" id="ao-copy" style="height:36px;padding:0 14px">คัดลอกลิงก์</button><button class="sb2" id="ao-share" style="height:36px;padding:0 14px">แชร์ลิงก์</button></div>
  </div>

  <div class="ao-box">
    <b>เพิ่มเติม (เพิ่ม API เอง)</b>
    <div class="fm" style="margin-top:8px;">
      <input id="custom-api-input" placeholder="วาง URL Google Apps Script / API" autocomplete="off">
      <button class="sb2" id="add-api-btn" style="height:36px;margin-top:4px;">+ เพิ่ม API</button>
    </div>
    <div id="custom-api-list" style="margin-top:8px;">
      ${ADDONS.customApis.map((url, idx)=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-top:1px solid var(--bd);font-size:12px;"><span style="word-break:break-all;padding-right:8px">${esc(url)}</span><button class="sb2 o" onclick="delCustomApi(${idx})" style="padding:2px 8px;flex:none">ลบ</button></div>`).join('')}
    </div>
  </div>
  `;
}

function bindAddonsEvents(){
  const swMp = $('#sw-mp'), swFts = $('#sw-fts'), ftsOpts = $('#fts-opts');
  if(swMp) swMp.onchange = e => { ADDONS.mapPlaces = e.target.checked; saveAo(); if(!ADDONS.mapPlaces){ PL=[]; drawPl(); }else{ pull(); } };
  if(swFts) swFts.onchange = e => { 
    ADDONS.fataekts = e.target.checked; 
    ftsOpts.style.display = ADDONS.fataekts ? '' : 'none';
    saveAo(); 
    if(ADDONS.fataekts){ ftTxt=''; pullFataekRoutes(true); } else { fataekRoutes = []; ftTxt=''; drawPl(); }
  };
  document.querySelectorAll('.fts-t').forEach(chk=>{
    chk.onchange = e => {
      ADDONS.fataekTypes[e.target.dataset.type] = e.target.checked;
      saveAo();
      drawPl();
    };
  });
  const addBtn = $('#add-api-btn'), apiInput = $('#custom-api-input');
  if(addBtn && apiInput){
    addBtn.onclick = () => {
      const val = apiInput.value.trim();
      if(val && !ADDONS.customApis.includes(val)){
        ADDONS.customApis.push(val);
        saveAo();
        panel();
        toast('เพิ่ม API เรียบร้อยแล้ว');
      }
    };
  }
}
window.delCustomApi = idx => {
  ADDONS.customApis.splice(idx, 1);
  saveAo();
  panel();
  toast('ลบ API แล้ว');
};

function panel(){const B=$('#body'),qv=qi.value.trim().toLowerCase();if(!qi.value&&document.activeElement!==qi&&typeof setSearch==='function')setSearch(false);let h='';$('#cl').hidden=!qv;tabUI();syncEd();if(FORM){B.innerHTML=formHtml();return}if(ED.on&&ED.auth&&ED.msel&&!qv){B.innerHTML=mergeHtml();return}
 if(window.xPanel&&xPanel(B))return;
 if(curPage==='go'){$('#srow-main').style.display='none';$('#srow-addons').style.display='none';$('#srow-go').style.display='flex';if(window.goPanel)goPanel(B);return}
 if(curPage==='Add-ons'){
   $('#srow-main').style.display = 'none';
   $('#srow-addons').style.display = 'flex';
   $('#srow-go').style.display='none';B.innerHTML = addonsHtml();
   bindAddonsEvents();
   return;
 }else{
   $('#srow-main').style.display = 'flex';
   $('#srow-addons').style.display = 'none';$('#srow-go').style.display='none';
 }
 const row=window.__row=(i,j,t,sub,e,on)=>`<div class="it${on?' on':''}" data-i="${i}"${j!=null?` data-j="${j}"`:''}>${j!=null?I.pin:`<span class="dot r${DATA[i].district-1}"></span>`}<div class="t"><b>${t}${FV.includes(e)?' <span style="color:#f5b301">★</span>':''}</b>${sub?`<small>${sub}</small>`:''}</div><em>${e}</em>${j==null?I.chev:`<button class="cp" data-zip="${e}" aria-label="คัดลอกรหัส">${I.cp}</button>`}</div>`;
 if(qv){const m=[];PL.forEach(p=>{if(plText(p).toLowerCase().includes(qv))m.push(placeRow(p))});DATA.forEach((p,i)=>{const rg=REG[p.district-1];
  if((p.provName+p.areaCode+rg.ab+rg.f).toLowerCase().includes(qv))m.push(row(i,null,p.provName,rg.n+' '+rg.ab,p.areaCode));
  p.entries.forEach((e,j)=>{if((e.name+e.zip).toLowerCase().includes(qv))m.push(row(i,j,e.name,p.provName,e.zip))})});
  h=m.length?m.slice(0,40).join(''):`<div class="em">${I.no}<p>ไม่พบผลการค้นหา</p></div>`}
 else if(sel.i===null){h=homeHtml()}else if(false){if(FV.length)h+='<h3>★ โปรด</h3>'+FV.map(c=>{const[i,j]=Z[c];return j==null?row(i,null,DATA[i].provName,'',c):row(i,j,DATA[i].entries[j].name,DATA[i].provName,c)}).join('');REG.forEach((r,k)=>{h+=`<h3><span class="dot r${k}"></span>${r.n} · ${r.ab} <small>${r.f}</small></h3>`;DATA.forEach((p,i)=>{if(p.district-1===k)h+=row(i,null,p.provName,p.entries.length+' เขต',p.areaCode)})})}
 else{const p=DATA[sel.i],r=REG[p.district-1];h=`<div style="padding:0 4px"><span class="bk" data-back="1">${I.back}ทั้งหมด</span></div><h2>${p.provName}</h2><div class="chips"><span>รหัส ${p.areaCode}</span><span>${r.n} ${r.ab}</span><span>${p.entries.length} เขต</span></div><div class="act"><button data-cp="${codeOf()}">${I.cp}คัดลอก ${codeOf()}</button><button data-link="1">${I.link}คัดลอกลิงก์</button><button data-fav="1" style="${FV.includes(codeOf())?'color:#f5b301':''}">${FV.includes(codeOf())?I.starf:I.star}${FV.includes(codeOf())?'เอาหมุดออก':'ปักหมุด'}</button></div>`+
  p.entries.map((e,j)=>row(sel.i,j,e.name,'',e.zip,sel.j===j)).join('')}
 B.innerHTML=h;stag(B)}
$('#body').onclick=e=>{const hh=e.target.closest('[data-h]');if(hh){hv=hh.dataset.h;return panel()}if(e.target.closest('[data-hb]')){hv=null;return panel()}const pg=e.target.closest('[data-pg]');if(pg)return goPage(pg.dataset.pg);const ac=e.target.closest('[data-act]');if(ac)return homeAct(ac.dataset.act);
 if(e.target.closest('[data-fx]')){FORM=null;return panel()}if(e.target.closest('[data-fsave]'))return saveForm();if(e.target.closest('[data-fdel]'))return delForm(e.target.closest('[data-fdel]'));if(e.target.closest('[data-pcp]'))return copy(FORM.p.x+', '+FORM.p.y,'คัดลอกพิกัดแล้ว');if(e.target.closest('[data-psh]'))return shareLink(baseUrl()+HX()+'p='+FORM.p.x+','+FORM.p.y);if(e.target.closest('[data-fav]'))return toggleFav();const c=e.target.closest('[data-zip],[data-cp]');if(c)return copy(c.dataset.zip||c.dataset.cp);if(e.target.closest('[data-link]'))return copy(linkOf(),'คัดลอกลิงก์แล้ว');if(e.target.closest('[data-back]'))return select(null);const t=e.target.closest('.it');if(!t)return;if(t.dataset.pl){qi.value='';return showPlace(t.dataset.pl)}
 const i=+t.dataset.i,j=t.dataset.j===undefined?null:+t.dataset.j;qi.value='';select(i,j,1)};
qi.oninput=()=>{if(qi.value)FORM=null;panel()};qi.onfocus=()=>{if(st===0){setSt(1);}};
qi.onkeydown=e=>{if(e.key==='Enter'){const t=$('#body .it');if(t)t.click();qi.blur()}};
$('#cl').onclick=()=>{qi.value='';panel();qi.focus()};
$('#ao-back').onclick=()=>goPage('map');
// sheet drag
let dy=null;
grab.onpointerdown=e=>{grab.setPointerCapture(e.pointerId);sh.style.transition='none';dy={y:e.clientY,t:off[st],l:e.clientY,lt:performance.now(),v:0,m:0,c:off[st]}};
grab.onpointermove=e=>{if(!dy)return;const d=e.clientY-dy.y;if(Math.abs(d)>4)dy.m=1;dy.c=Math.min(off[0],Math.max(0,dy.t+d));sh.style.transform=`translateY(${dy.c}px)`;const n=performance.now();dy.v=(e.clientY-dy.l)/(n-dy.lt+1);dy.l=e.clientY;dy.lt=n};
grab.onpointerup=grab.onpointercancel=()=>{if(!dy)return;const d=dy;dy=null;let s;
 if(!d.m)s=st===0?1:0;else{const p=d.c+d.v*220;s=[0,1,2].reduce((a,k)=>Math.abs(off[k]-p)<Math.abs(off[a]-p)?k:a,0)}
 if(s!==0)qi.blur();setSt(s);if(sel.i!==null)refit()};
// map interaction
const ptr=new Map();let drag=false,pd;
svg.onpointerdown=e=>{const hn=e.target.closest&&e.target.closest('.hd');if(hn&&roadEditing()){hdr={i:+hn.dataset.i,m:0};drag=true;svg.setPointerCapture(e.pointerId);return}
 ptr.set(e.pointerId,[e.clientX,e.clientY]);drag=false;lpf=false;pd=[e.clientX,e.clientY];cancelAnimationFrame(anim);clearTimeout(lpT);
 if(ptr.size===1)lpT=setTimeout(()=>{if(!drag&&ptr.size===1&&!ms&&!ED.tool){drag=true;lpf=true;addPin(wpos(pd[0],pd[1]))}},550)};
svg.onpointermove=e=>{if(hdr){const w=wpos(e.clientX,e.clientY),st=gstep();FORM.p.pts[hdr.i]=[Math.round(w[0]/st)*st,Math.round(w[1]/st)*st];hdr.m=1;drawPl();return}if(MP.includes(ED.tool)&&!ptr.size)ghost(e);if(!ptr.has(e.pointerId)||lpf)return;const o=ptr.get(e.pointerId),n=[e.clientX,e.clientY],r=R0();
 if(ptr.size===1){if(!drag&&Math.hypot(n[0]-pd[0],n[1]-pd[1])<5)return;if(!drag)svg.setPointerCapture(e.pointerId);drag=true;
  vb.x-=(n[0]-o[0])/r.width*vb.w;vb.y-=(n[1]-o[1])/r.width*vb.w;ptr.set(e.pointerId,n);upd()}
 else{const d=a=>Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1]),d0=d([...ptr.values()]);ptr.set(e.pointerId,n);const ps=[...ptr.values()];
  zoomAt(d(ps)/d0,(ps[0][0]+ps[1][0])/2,(ps[0][1]+ps[1][1])/2);drag=true}};
svg.onpointerup=svg.onpointercancel=e=>{clearTimeout(lpT);if(hdr){const h=hdr;hdr=null;if(!h.m){const P=FORM.p.pts;if(P.length>minPts(FORM.p)){P.splice(h.i,1);toast('ลบจุดแล้ว')}else toast('ต้องเหลืออย่างน้อย '+minPts(FORM.p)+' จุด');syncForm();panel()}else drawPl();return}ptr.delete(e.pointerId)};
svg.onwheel=e=>{e.preventDefault();cancelAnimationFrame(anim);zoomAt(Math.exp(-e.deltaY*.0018),e.clientX,e.clientY)};
svg.onclick=e=>{if(drag){drag=false;return}if(curPage==='go'&&window.goTap&&goTap(e))return;qi.blur();if(!$('#hc').hidden){$('#hc').hidden=true;$('#hp').classList.remove('a')}$('#mo').hidden=true;$('#opt').classList.remove('a');const w=wpos(e.clientX,e.clientY);
 if(ms){const f=mp[0],l=mp[mp.length-1];if(mp.length>=3&&Math.hypot(w[0]-f[0],w[1]-f[1])*sc()<16&&!(l[0]===f[0]&&l[1]===f[1]))mp.push([f[0],f[1]]);else mp.push(w);drawMs();return}
 if(ED.on&&ED.tool){if(MP.includes(ED.tool)){const pv=ED.pts[ED.pts.length-1],q=snapPt(w,pv);if(!pv||q[0]!==pv[0]||q[1]!==pv[1]){ED.pts.push(q);drawPl()}}else openForm(ED.tool==='mountain'?{kind:'nature',nt:'mountain',lvl:'major',x:w[0],y:w[1]}:{kind:ED.tool,x:w[0],y:w[1]});return}
 if(roadEditing()){const md=e.target.closest('.md');if(md){const i=+md.dataset.i,P=FORM.p.pts,a=P[i],b=P[(i+1)%P.length];P.splice(i+1,0,snapPt([(a[0]+b[0])/2,(a[1]+b[1])/2],null));syncForm();panel();return}
  if(ED.ext){const P=FORM.p.pts,en=ED.ext==='end'?P[P.length-1]:P[0],q=snapPt(w,en);if(q[0]!==en[0]||q[1]!==en[1]){ED.ext==='end'?P.push(q):P.unshift(q);const c=$('#fcnt');if(c)c.textContent=P.length+' จุด';drawPl()}return}}
 if(ED.on&&ED.msel){const q=e.target.closest('.pm'),p=q&&PL.find(a=>a.id===q.dataset.id);if(p&&p.kind==='road'){const k=ED.sel.indexOf(p.id);k<0?ED.sel.push(p.id):ED.sel.splice(k,1);drawPl();setSt(st||1);panel()}return}
 const pm=e.target.closest('.pm');if(pm)return showPlace(pm.dataset.id);
 const now=performance.now();if(pend&&now-lt<320&&Math.hypot(e.clientX-lx,e.clientY-ly)<24){clearTimeout(pend);pend=0;addPin(w);return}
 lt=now;lx=e.clientX;ly=e.clientY;const c=e.target.closest('.c');
 pend=setTimeout(()=>{pend=0;if(!c)return select(null,null,DT.matches?undefined:0);const i=+c.dataset.i,j=+c.dataset.j;select(i,sel.i===i?j:null,1)},260)};
const zc=f=>{const r=R0();cancelAnimationFrame(anim);zoomAt(f,r.left+(DT.matches&&st&&!fs?384+(r.width-384)/2:r.width/2),r.top+(DT.matches||fs?r.height/2:(r.height-Math.min(vis(st),r.height*.55))/2))};
$('#ru').onclick=()=>setMeas(!ms);$('#mx').onclick=()=>setMeas(false);$('#mu').onclick=()=>{mp.pop();drawMs()};$('#fsb').onclick=()=>setFs(!fs);$('#shb').onclick=shareView;$('#fsb').innerHTML=FI[0]+'<span>Full screen</span>';document.onfullscreenchange=()=>{if(!document.fullscreenElement&&fs)setFs(false)};addEventListener('keydown',e=>{if(e.key==='Escape'){if(ms)setMeas(false);else if(fs)setFs(false)}});
$('#zi').onclick=()=>zc(1.6);$('#zo').onclick=()=>zc(1/1.6);$('#zr').onclick=()=>select(null);
$('#hp').onclick=()=>{const h=$('#hc');h.hidden=!h.hidden;$('#hp').classList.toggle('a',!h.hidden)};$('#fx').onclick=()=>setFs(false);$('#fx').innerHTML=FI[1];$('#tabs').onclick=e=>{const b=e.target.closest('button');if(b)setTab(+b.dataset.t)};
const rs=()=>{RR=null;geo();setSt(st,1);upd();reqR(1)};
addEventListener('resize',rs);DT.onchange=rs;addEventListener('hashchange',()=>{forced=null;route();go()});addEventListener('popstate',()=>{forced=null;route();go()});$('#mnb').onclick=()=>{setSt(st?0:1);if(sel.i!==null)refit()};new ResizeObserver(()=>{RR=null;upd();reqR(1)}).observe(svg);
// ===== สถานที่ / หมุด / โหมดแก้ไข =====
const API='https://script.google.com/macros/s/AKfycbxK8Dhu68g7uIqEnF9rVV-6alcExBWOEROCQM3tMpQTATIMQctfFkYGFtkQwA_KsPrX1w/exec';
const FATAEKTS_API='https://script.google.com/macros/s/AKfycbxFwVKpCbVcRWrTHOVnL56ghd_COKAhVx5XQZEz06d0j0hFSUIG2H23i1CcLty4z7UH/exec';

const PH='d903e4ea3ddfda42a12af1555221b32f47a2bf6b2ce15f1af42987d417a7d51a',KS={place:'สถานที่',road:'ถนน'};
const LV={national:{n:'ระดับประเทศ',r:15,f:14,w:2400,k:4},major:{n:'สำคัญขนาดใหญ่',r:12,f:12.5,w:900,k:3},local:{n:'ท้องถิ่น',r:9.5,f:11.5,w:450,k:2},poi:{n:'จุดสนใจทั่วไป',r:7.5,f:10.5,w:220,k:1}};
const RT={highway:{n:'ทางหลวง',w:9,k:4,vw:2400,c:'#f2a33a',cs:'#b5701a'},main:{n:'ถนนสายหลัก',w:7,k:3,vw:1100,c:'#ffd76a',cs:'#c9a227'},secondary:{n:'ถนนสายรอง',w:5.5,k:2,vw:700,c:'#ffffff',cs:'#9fb09f'},local:{n:'ถนนท้องถิ่น',w:3.8,k:1,vw:400,c:'#ffffff',cs:'#b9c4b9'}};
const CATS=[
['food','อาหารและเครื่องดื่ม','Food and Drink','#e8590c','🍽️',[['restaurant','ร้านอาหาร'],['cafe','คาเฟ่'],['bar','บาร์'],['bakery','เบเกอรี่'],['fast_food_restaurant','ฟาสต์ฟู้ด'],['ice_cream_shop','ร้านไอศกรีม'],['coffee_shop','ร้านกาแฟ']]],
['automotive','ยานพาหนะและเดินทาง','Automotive','#495057','🚗',[['gas_station','ปั๊มน้ำมัน'],['electric_vehicle_charging_station','สถานีชาร์จ EV'],['car_repair','อู่ซ่อมรถ'],['parking','ที่จอดรถ'],['car_rental','เช่ารถ']]],
['lodging','ที่พักและโรงแรม','Lodging','#7048e8','🏨',[['hotel','โรงแรม'],['resort_hotel','รีสอร์ท'],['hostel','โฮสเทล'],['campground','ลานกางเต็นท์'],['bed_and_breakfast','เบด แอนด์ เบรกฟาสต์']]],
['shopping','ร้านค้าและบริการ','Shopping & Services','#1c7ed6','🛍️',[['supermarket','ซูเปอร์มาร์เก็ต'],['shopping_mall','ห้างสรรพสินค้า'],['convenience_store','ร้านสะดวกซื้อ'],['clothing_store','ร้านเสื้อผ้า'],['laundry','ร้านซักรีด'],['hair_salon','ร้านทำผม']]],
['health','การแพทย์และสุขภาพ','Health and Wellness','#e03131','🏥',[['hospital','โรงพยาบาล'],['pharmacy','ร้านขายยา'],['dentist','ทันตแพทย์'],['doctor','คลินิก/แพทย์'],['spa','สปา'],['gym','ฟิตเนส']]],
['entertainment','บันเทิงและสันทนาการ','Entertainment & Recreation','#d6336c','🎡',[['amusement_park','สวนสนุก'],['movie_theater','โรงภาพยนตร์'],['park','สวนสาธารณะ'],['zoo','สวนสัตว์'],['aquarium','พิพิธภัณฑ์สัตว์น้ำ'],['night_club','ไนต์คลับ']]],
['culture','สถานที่ท่องเที่ยวและวัฒนธรรม','Culture & Attractions','#9c36b5','🖼️',[['museum','พิพิธภัณฑ์'],['art_gallery','หอศิลป์'],['tourist_attraction','สถานที่ท่องเที่ยว'],['historical_landmark','โบราณสถาน/จุดสำคัญ']]],
['education','การศึกษา','Education','#f08c00','🎓',[['primary_school','โรงเรียนประถม'],['secondary_school','โรงเรียนมัธยม'],['university','มหาวิทยาลัย'],['library','ห้องสมุด']]],
['finance','การเงิน','Finance','#2f9e44','🏦',[['bank','ธนาคาร'],['atm','ตู้ ATM'],['accounting','สำนักงานบัญชี']]],
['government','หน่วยงานรัฐและสาธารณูปโภค','Government & Facilities','#364fc7','🏛️',[['police','สถานีตำรวจ'],['post_office','ที่ทำการไปรษณีย์'],['fire_station','สถานีดับเพลิง'],['embassy','สถานทูต'],['city_hall','ศาลากลาง/ที่ว่าการ'],['public_bathroom','ห้องน้ำสาธารณะ']]],
['worship','ศาสนสถาน','Places of Worship','#c2a000','🛐',[['buddhist_temple','วัดพุทธ'],['church','โบสถ์'],['mosque','มัสยิด'],['hindu_temple','เทวสถานฮินดู']]],
['nature','ธรรมชาติ','Natural Features','#2b8a3e','🌿',[['beach','ชายหาด'],['mountain_peak','ยอดเขา'],['lake','ทะเลสาบ'],['river','แม่น้ำ'],['national_park','อุทยานแห่งชาติ']]],
['other','อื่นๆ','Other','#868e96','📍',[['general','ทั่วไป']]]];
const catOf=id=>CATS.find(c=>c[0]===id)||CATS[12];
const IC_PAL='😀 😍 🥰 😎 🤩 😇 🤔 😴 ❤️ 💛 💚 💙 💜 🔥 ✨ 🌟 ⭐ 💯 🏠 🏡 🏢 🏬 🏪 🏫 🏥 🏦 🏨 🏰 ⛪ 🕌 🛕 ⛩️ 🕍 🚗 🚌 🚕 🏍️ 🚲 🚆 ✈️ 🚢 ⛽ 🅿️ 🚏 🚉 🍜 🍚 🍔 🍕 🍟 🌮 🍣 🍰 🍩 🍦 ☕ 🍺 🍷 🥤 🍎 🍌 🍉 🥭 🌳 🌴 🌲 🌵 🌸 🌻 🌈 ⛰️ 🏝️ 🏖️ 🌊 💧 🐶 🐱 🐔 🐟 🐘 📦 📚 🎓 💼 💊 🔧 🔨 💡 📷 🎵 🎮 ⚽ 🏀 🏊 💈 🧺 🛒 🎁 🔔 🔑 🚻 🚰 ♿ ℹ️ ⚠️ ❗ ❓ ✅ ❌ 📍 🚩 🏁'.split(' ');
const icSeg=s=>{s=String(s||'');try{return Array.from(new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(s),x=>x.segment)}catch(_){return Array.from(s)}};
const icClip=s=>icSeg(String(s||'').trim()).slice(0,2).join('');
const icOf=p=>(p&&p.cat==='other'&&typeof p.sub==='string'&&p.sub.indexOf('c:')===0)?p.sub.slice(2):'';
const pinIc=p=>icOf(p)||catOf(p.cat)[4];
const EDIT=/\/edit(\/bridge)?\/?$/.test(location.pathname)||/[?&]edit\b/.test(location.search)||/^#\/?(map\/?)?edit/i.test(location.hash);
let FORM=null,pin=null,pend=0,lt=0,lx=0,ly=0,lpT=0,lpf=false,PL=[],rev=0,PW='',pulling=0,OCC=[],inflight=0,lastChg=0,hdr=null,tab=0,loaded=true;const ED={on:false,auth:false,tool:null,pts:[],curve:false,lock:true,ext:null,msel:false,sel:[]};

// ข้อมูลเส้นทาง FATAEKTS
let fataekRoutes = [];
const FATAEK_TYPES = {
  train: { n: 'รถไฟ/รถไฟฟ้า', c: '#015caf', s: 'สถานี', e: '🚆' },
  bus:   { n: 'รถประจำทาง',   c: '#f4901e', s: 'ป้ายรถ', e: '🚌' },
  boat:  { n: 'เรือประจำทาง',  c: '#018dda', s: 'ท่าเรือ', e: '⛴️' },
  toll:  { n: 'ทางด่วนช่อง E', c: '#ea0107', s: 'ด่าน', e: '🛣️' }
};

const normFataek = i => ({ no:'', fare:'', price:'', note:'', road:'', color:'', pts:[], stops:[], ...i });

let lastFt=0,ftTxt='';
let FTAPI=0,FTBK=0,FTBT=0;
async function ftBackup(){if(FTAPI||Date.now()-FTBT<8000)return;FTBT=Date.now();
  try{const r=await fetch(encodeURI(FT_CSV),{cache:'no-store'});if(!r.ok)return;const it=ftCsvItems(await r.text());if(!it.length||FTAPI)return;fataekRoutes=it.map(normFataek);FTBK=1;ftTxt='';reqR(1)}catch(_){}}
async function pullFataekRoutes(force) {
  if (!FATAEKTS_API || !ADDONS.fataekts || (!force && moving())) return;
  lastFt = Date.now();
  if (!FTAPI && !fataekRoutes.length) ftBackup();
  try {
    const res = await fetch(FATAEKTS_API + '?action=list', { cache: 'no-store' });
    const t = await res.text();
    const j = JSON.parse(t);
    if (!(j.ok && j.items)) throw new Error('bad');
    FTAPI = 1; FTBK = 0; apiOk('fataekts');
    if (t === ftTxt) return;
    ftTxt = t; fataekRoutes = j.items.map(normFataek); reqR(1);
  } catch (_) { apiFail('fataekts', !!FTBK); if (!FTAPI) ftBackup(); }
}

try{if(!API)PL=JSON.parse(localStorage.getItem('pl')||'[]')}catch(_){}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const wpos=(x,y)=>{const r=R0();return[+(vb.x+(x-r.left)/r.width*vb.w).toFixed(1),+(vb.y+(y-r.top)/r.height*vb.h).toFixed(1)]};
const pip=(s,x,y)=>{const v=s.split(' ').map(q=>q.split(',').map(Number));let c=false;for(let i=0,j=v.length-1;i<v.length;j=i++)if((v[i][1]>y)!=(v[j][1]>y)&&x<(v[j][0]-v[i][0])*(y-v[i][1])/(v[j][1]-v[i][1])+v[i][0])c=!c;return c};
function whereAt(x,y){for(const i of[0,1,2,3,4,5,6,7,8,9,10,11,12,13]){if(!OUT[i].some(s=>pip(s,x,y)))continue;const j=C[i].findIndex(c=>c.poly?pip(c.poly,x,y):(x>=c.r[0]&&x<=c.r[2]&&y>=c.r[1]&&y<=c.r[3]));return[i,j<0?null:j]}return null}
const SITE='https://postalcodeft.wasmer.app',baseUrl=()=>SITE+'/';
const viewQ=()=>'&v='+[vb.x+vb.w/2,vb.y+vb.h/2,vb.w].map(n=>Math.round(n*10)/10).join('')+(window.lyQ?window.lyQ():'');
function shareLink(l){if(navigator.share)navigator.share({title:document.title,url:l}).catch(e=>{if(e.name!=='AbortError')copy(l,'คัดลอกลิงก์แล้ว')});else copy(l,'คัดลอกลิงก์แล้ว')}
const NT={river:{n:'แม่น้ำ',e:'🏞️',w:9,k:2,vw:2400,c:'var(--wt)',cs:'var(--wtc)',tc:'#fff'},canal:{n:'คลอง',e:'〰️',w:4.5,k:1,vw:700,c:'var(--wt)',cs:'var(--wtc)',tc:'#fff'},bay:{n:'อ่าว/พื้นน้ำ',e:'🌊'},mountain:{n:'ภูเขา',e:'⛰️'}},MP=['road','river','bay'];
const hasPts=p=>p.kind==='road'||(p.kind==='nature'&&p.nt!=='mountain'),minPts=p=>p.kind==='nature'&&p.nt==='bay'?3:2,isLine=p=>p.kind==='road'||(p.kind==='nature'&&(p.nt==='river'||p.nt==='canal')),tOf=p=>p.kind==='road'?(RT[p.rt]||RT.local):NT[p.nt];
const roadEditing=()=>ED.on&&ED.auth&&!!FORM&&hasPts(FORM.p);
const gridOn=()=>ED.on&&ED.auth&&(MP.includes(ED.tool)||roadEditing());
function gstep(){const s=sc();return[1,5,10,20,40,80].find(t=>t*s>=22)||80}
function snapPt(w,prev){const st=gstep(),g=v=>+(Math.round(v/st)*st).toFixed(2);if(!prev||!ED.lock)return[g(w[0]),g(w[1])];
 const dx=w[0]-prev[0],dy=w[1]-prev[1],an=Math.round(Math.atan2(dy,dx)/(Math.PI/4))*Math.PI/4,c=Math.round(Math.cos(an)),n=Math.round(Math.sin(an));
 if(!c||!n)return c?[g(w[0]),prev[1]]:[prev[0],g(w[1])];const m=Math.max(st,Math.round(Math.hypot(dx,dy)*Math.SQRT1_2/st)*st);return[+(prev[0]+c*m).toFixed(2),+(prev[1]+n*m).toFixed(2)]}
const pathD=(P,cv)=>{if(!cv||P.length<3)return'M'+P.map(a=>a[0]+' '+a[1]).join('L');let d='M'+P[0][0]+' '+P[0][1];
 for(let i=0;i<P.length-1;i++){const a=P[i-1]||P[i],b=P[i],c=P[i+1],e=P[i+2]||c;d+=`C${b[0]+(c[0]-a[0])/6} ${b[1]+(c[1]-a[1])/6} ${c[0]-(e[0]-b[0])/6} ${c[1]-(e[1]-b[1])/6} ${c[0]} ${c[1]}`}return d};
const pathC=(P,cv)=>{const n=P.length;if(!cv||n<3)return'M'+P.map(a=>a[0]+' '+a[1]).join('L')+'Z';let d='M'+P[0][0]+' '+P[0][1];
 for(let i=0;i<n;i++){const a=P[(i-1+n)%n],b=P[i],c=P[(i+1)%n],e=P[(i+2)%n];d+=`C${b[0]+(c[0]-a[0])/6} ${b[1]+(c[1]-a[1])/6} ${c[0]-(e[0]-b[0])/6} ${c[1]-(e[1]-b[1])/6} ${c[0]} ${c[1]}`}return d+'Z'};
function ghost(e){const g=$('#gh');if(!g)return;const w=wpos(e.clientX,e.clientY),pv=ED.pts[ED.pts.length-1],q=snapPt(w,pv),s=sc();
 g.innerHTML=(pv?`<line x1="${pv[0]}" y1="${pv[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#1c7ed6" stroke-width="${2/s}" stroke-dasharray="${5/s} ${4/s}" opacity=".7"/>`:'')+`<circle cx="${q[0]}" cy="${q[1]}" r="${5/s}" fill="#1c7ed6" opacity=".85"/>`}
/* รับคำสั่งจากหน้า /fataekts (same-origin): ซูมไปที่เส้นทางที่เลือก */
addEventListener('message',e=>{try{if(e.origin!==location.origin)return;const d=e.data;if(!d||d.t!=='ft-fit'||!Array.isArray(d.pts)||!d.pts.length)return;
 let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;d.pts.forEach(p=>{x0=Math.min(x0,+p[0]);y0=Math.min(y0,+p[1]);x1=Math.max(x1,+p[0]);y1=Math.max(y1,+p[1])});
 if(!isFinite(x0+y0+x1+y1))return;fit({x:x0,y:y0,w:Math.max(40,x1-x0),h:Math.max(40,y1-y0)},1.5)}catch(_){}});
