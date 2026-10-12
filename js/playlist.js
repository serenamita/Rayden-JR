// ===== EDITA AQUÍ TUS CANCIONES =====
// ★ Para cambiar las portadas, reemplaza cada valor "cover" por otra ruta dentro de /img.
// Pon las canciones en /audio y actualiza el valor "src" de cada canción.
const TRACKS=[
 {title:"Livin' on a Prayer",artist:"Bon Jovi",src:"audio/Bon Jovi - Livin' On A Prayer.mp3",cover:"img/poolimages/MUSIIIK.jpg"},
 {title:"Supermassive Black Hole",artist:"Muse",src:"audio/Muse - Supermassive Black Hole [Official Music Video].mp3",cover:"img/poolimages/MUSIIIKaas.jpg"},
 {title:"Custer",artist:"Slipknot",src:"audio/Slipknot - Custer (Audio).mp3",cover:"img/poolimages/MUSIIIKSSS.jpg"},
 {title:"Animal I Have Become",artist:"Three Days Grace",src:"audio/Three Days Grace - Animal I Have Become (Lyrics).mp3",cover:"img/poolimages/MUSIKAA.jpg"},
 {title:"Aoi, Koi, Daidaiiro no Hi",artist:"Mass of the Fermenting Dregs",src:"audio/aoi, koi, daidaiiro no hi - mass of the fermenting dregs (sub.español).mp3",cover:"img/poolimages/MUSISIS.jpg"}
];
const $=id=>document.getElementById(id),au=new Audio();let idx=0,recent=[];
const fmt=t=>isFinite(t)?Math.floor(t/60)+":"+String(Math.floor(t%60)).padStart(2,"0"):"0:00";
const bars=[...document.querySelectorAll("#wave i")];
function rows(box,list,fn){box.innerHTML="";list.forEach(i=>{const t=TRACKS[i],b=document.createElement("button");b.className="s-row"+(i===idx?" on":"");b.innerHTML='<img src="'+t.cover+'" alt=""><span>'+t.title+" — "+t.artist+"</span>";b.onclick=()=>play(i);box.append(b)})}
function draw(){const t=TRACKS[idx];$("cv").src=t.cover;$("ti").textContent=t.title;$("ar").textContent=t.artist;$("lab").style.backgroundImage="url("+t.cover+")";
 rows($("all"),TRACKS.map((_,i)=>i));const n=(idx+1)%TRACKS.length;rows($("up"),[n]);
 const r=$("rec");r.innerHTML="";recent.slice(0,4).forEach(i=>{const im=document.createElement("img");im.src=TRACKS[i].cover;im.alt=TRACKS[i].title;im.title=TRACKS[i].title;im.onclick=()=>play(i);r.append(im)});if(!recent.length)r.innerHTML="<span>Aún nada. Dale play.</span>"}
function play(i){idx=i;au.src=TRACKS[i].src;$("msg").textContent="";au.play().catch(()=>{});recent=[i,...recent.filter(x=>x!==i)];draw()}
au.onerror=()=>{$("msg").textContent="No encuentro "+TRACKS[idx].src+" (revisa el nombre en js/playlist.js)"};
au.onplay=()=>{$("play").textContent="⏸";$("vin").classList.add("go")};
au.onpause=()=>{$("play").textContent="▶";$("vin").classList.remove("go")};
au.onended=()=>play((idx+1)%TRACKS.length);
au.ontimeupdate=()=>{$("pg").value=au.duration?au.currentTime/au.duration*1000:0;$("t1").textContent=fmt(au.currentTime);$("t2").textContent=fmt(au.duration)};
$("pg").oninput=e=>{if(au.duration)au.currentTime=e.target.value/1000*au.duration};
$("play").onclick=()=>{if(!au.src)play(idx);else au.paused?au.play():au.pause()};
$("next").onclick=()=>play((idx+1)%TRACKS.length);$("prev").onclick=()=>play((idx-1+TRACKS.length)%TRACKS.length);
setInterval(()=>{const on=!au.paused;if(on||bars[0].dataset.z!=="1"){bars.forEach(b=>b.style.height=(on?14+Math.random()*90:14)+"px");bars[0].dataset.z=on?"0":"1"}},180);
draw();
