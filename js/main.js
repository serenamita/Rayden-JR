(function(){
const PRIMARY_PAGES=[["index.html","Inicio"],["basicos.html","Datos básicos"],["fisicos.html","Datos físicos"],["historia.html","Historia"],["motivacion.html","Motivación y miedos"],["heroicos.html","Datos heroicos"]];
const MENU_PAGES=[["psicologicos.html","Datos psicológicos"],["stats.html","Stats y más"],["relaciones.html","Relaciones"],["playlist.html","Playlist"],["juego.html","Mini juego"],["galeria.html","Galería"],["404.html","No presiones"]];
const here=location.pathname.split("/").pop()||"index.html";
const calm=here==="juego.html"; // sin pop-ups durante el mini juego
const FRASES=["¿Alguien trajo chocolate? Es una emergencia.","Tengo un plan, muy etsupido pero servira","Solo fue un rasguñito tontos (Es una costilla.)","Papá, deja de usar mi nombre en carteles.","No estoy llorando, es el polvo de la explosión.","Deja de buscarme bronca y mejor unos besotes ¿si o que?"," Puta canela "," POR DIOS, soy Hellmouth, NO GAGPOOL","Escribí un poema a medianoche, no lo leas.","Mi cámara lo vio todo, TODO."," HOLA MI AMORR"];
const DP=["Ola looosers","Uy, qué miedo… ah no, es tu cara","¿Sigues aquí? Qué valiente","Pásame un chocolate y quizá te perdone","Hola, bebé hermoso","¿Me extrañaste? JA Yo no.","Tengo una espada y cero paciencia","Cuidado, que muerdo y fuerte ","¿Quién necesita matemáticas teniendo explosivos?","Deja de mirarme, me pones nervioso","Papá me dijo: pega primero","Este sitio es mío, tú solo estás de visita","Guauuu ¿por que estas tan obsesionado conmigo?","Ni se te ocurra mencionar la canela","Soy el hijo de Deadpool, no un chiste, estas jodido ","¡Sonríe, perdedor!","¿Dónde está mi chocolate?","Si lees esto, eres gay","Psst… el botón rojo no hace nada. PENDEJO NO HAY BOTON ROJO JAJA"];
const deck=a=>{let d=[];return()=>{if(!d.length)d=a.slice().sort(()=>Math.random()-.5);return d.pop()}};
const nextF=deck(FRASES),nextD=deck(DP);
document.title=document.title.replace(/\s*\|.*/,"")+" | Succesorrs";
const head=document.createElement("header");head.className="top";
// ★ El logo del sitio está en img/poolimages/minipool.png; las fotos se configuran en js/imagenes.js.
head.innerHTML='<div class="brand"><a href="index.html" data-t="SUCCESORRS"><img src="img/poolimages/minipool.png" alt="" aria-hidden="true">SUCCESORRS</a><small>ARCHIVO: RAYDEN POOLITO JR.</small>'+
 '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Abrir menú"><span></span><span></span><span></span></button></div>'+
 '<nav class="primary-menu" aria-label="Secciones principales">'+PRIMARY_PAGES.map(p=>'<a href="'+p[0]+'" class="'+(p[0]===here?"on ":"")+'">'+p[1]+"</a>").join("")+'</nav>'+
 '<nav class="menu collapsed" id="site-menu" aria-label="Más secciones">'+MENU_PAGES.map(p=>'<a href="'+p[0]+'" class="'+(p[0]===here?"on ":"")+(p[0]==="404.html"?"trap":"")+'">'+p[1]+"</a>").join("")+"</nav>";
document.body.prepend(head);
const menuToggle=head.querySelector(".menu-toggle"),siteMenu=head.querySelector(".menu");
menuToggle.addEventListener("click",()=>{
 const open=menuToggle.getAttribute("aria-expanded")!=="true";
 menuToggle.setAttribute("aria-expanded",String(open));
 menuToggle.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú");
 siteMenu.classList.toggle("collapsed",!open);
});
document.addEventListener("click",event=>{
 if(!head.contains(event.target)){
  menuToggle.setAttribute("aria-expanded","false");
  menuToggle.setAttribute("aria-label","Abrir menú");
  siteMenu.classList.add("collapsed");
 }
});
document.addEventListener("keydown",event=>{
 if(event.key==="Escape"){
  menuToggle.setAttribute("aria-expanded","false");
  menuToggle.setAttribute("aria-label","Abrir menú");
  siteMenu.classList.add("collapsed");
 }
});
const foot=document.createElement("footer");foot.innerHTML="SUCCESORS · UNA ACADEMIA DE LOCOS<br>OSHH ¿QUE TANTO LEES? · NO SOMOS NUESTROS PADRES";document.body.append(foot);
// cursor ligero
const cur=document.createElement("div");cur.id="cur";document.body.append(cur);
let mx=0,my=0,tick=false;
addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;if(!tick){tick=true;requestAnimationFrame(()=>{cur.style.transform="translate("+mx+"px,"+my+"px)";tick=false})}},{passive:true});
document.addEventListener("mouseover",e=>cur.classList.toggle("hot",!!e.target.closest("a,button,.btn,.spoiler,#mail,input,label")));
addEventListener("click",e=>{const s=document.createElement("div");s.className="shot";s.style.left=e.clientX-5+"px";s.style.top=e.clientY-5+"px";document.body.append(s);setTimeout(()=>s.remove(),500)});
// ★ Para cambiar las imágenes de retrato, edita las rutas indicadas en js/imagenes.js.
// Imagotipo vectorial de un ojo y una sonrisa, sin líneas de dientes.
window.IMAGO='<svg class="imago" viewBox="0 0 200 200"><path d="M100 12C152 12 180 56 174 110c-5 47-36 80-74 80S31 157 26 110C20 56 48 12 100 12Z" fill="#ff3f7f"/><g transform="translate(124 84) rotate(-14)"><ellipse rx="34" ry="22" fill="#0a0306"/><polygon fill="#fff" transform="scale(.8)" points="0,-20 5,-7 19,-6 8,3 12,17 0,9 -12,17 -8,3 -19,-6 -5,-7"/></g><path d="M48 130Q100 180 152 130" fill="none" stroke="#0a0306" stroke-width="9" stroke-linecap="round"/></svg>';
const im=document.getElementById('imago');if(im)im.innerHTML=IMAGO;
const imageData=window.IMAGENES||{},placeholder="img/placeholder.svg";
document.querySelectorAll("[data-image-group]").forEach(image=>{
 const values=imageData[image.dataset.imageGroup],index=Number(image.dataset.imageIndex),src=Array.isArray(values)?values[index]:"";
 image.src=typeof src==="string"&&src.trim()?src.trim():placeholder;
 image.onerror=()=>{image.onerror=null;image.src=placeholder};
});
document.querySelectorAll("[data-image-source]").forEach(image=>{
 const source=imageData[image.dataset.imageSource];
 image.src=typeof source==="string"&&source.trim()?source.trim():placeholder;
 image.onerror=()=>{image.onerror=null;image.src=placeholder};
});
const memories=document.getElementById("sobre-grid");
if(memories){
 const photos=Array.isArray(imageData.sobre)?imageData.sobre:Array(8).fill("");
 photos.forEach((src,index)=>{
  const figure=document.createElement("figure"),photo=document.createElement("img");
  photo.alt="Recuerdo "+(index+1);
  photo.src=typeof src==="string"&&src.trim()?src.trim():placeholder;
  photo.onerror=()=>{photo.onerror=null;photo.src=placeholder};
  figure.append(photo);memories.append(figure);
 });
}
document.querySelectorAll("[data-image-gallery]").forEach(gallery=>{
 const photos=imageData[gallery.dataset.imageGallery];
 if(!Array.isArray(photos))return;
 photos.forEach((src,index)=>{
  const figure=document.createElement("figure"),photo=document.createElement("img");
  photo.alt="Imagen "+(index+1);
  photo.src=typeof src==="string"&&src.trim()?src.trim():placeholder;
  photo.loading="lazy";
  photo.onerror=()=>{photo.onerror=null;photo.src=placeholder};
  figure.append(photo);gallery.append(figure);
 });
});
function el(id){const d=document.createElement("div");d.id=id;document.body.append(d);return d}
if(!calm){
const bub=el("bubble");
const frase=t=>{bub.textContent=t||nextF();bub.classList.add("show");setTimeout(()=>bub.classList.remove("show"),4200)};
setTimeout(frase,5000);setInterval(frase,24000);
const dp=el("dp");dp.className="l";dp.innerHTML='<div class="say"></div><img class="mascot" src="img/poolimages/minipool.png" alt="">';
const asoma=()=>{dp.className=Math.random()<.5?"l":"r";dp.querySelector(".say").textContent=nextD();void dp.offsetWidth;dp.classList.add("in");setTimeout(()=>dp.classList.remove("in"),3600)};
setTimeout(asoma,10000);setInterval(asoma,22000);
dp.addEventListener("click",()=>{dp.querySelector(".say").textContent=nextD()});
const fin=el("fin");fin.innerHTML='<img class="hand" src="img/poolimages/JA.png" alt="Dedo medio"> <p>¡Sorpresa! La carta era para ti, cariño.</p><p style="font-size:1rem;color:#fff">(clic para cerrar)</p>';fin.onclick=()=>fin.classList.remove("on");
const carta=()=>{const m=document.createElement("div");m.id="mail";m.textContent="✉️";m.style.left=10+Math.random()*80+"vw";document.body.append(m);m.onclick=()=>{m.remove();fin.classList.add("on")};setTimeout(()=>m.remove(),6000)};
setTimeout(carta,20000);setInterval(carta,55000);
}
// transiciones: sangre (principal), explosión, cuchillos
const boom=el("boom");
function burst(){let pts="";for(let i=0;i<24;i++){const a=i/24*6.283,r=i%2?22:48;pts+=(50+Math.cos(a)*r)+","+(50+Math.sin(a)*r)+" "}return '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:100%"><polygon points="'+pts+'" fill="#ffb000" stroke="#0a0306" stroke-width="1.2"/><polygon points="'+pts+'" fill="#e0143c" transform="translate(50 50) scale(.65) translate(-50 -50)"/></svg>'}
function slash(){let s="";for(let i=0;i<5;i++){const y=10+i*20;s+='<line x1="-10" y1="'+(y+15)+'" x2="110" y2="'+(y-15)+'" stroke="#f6ecec" stroke-width="3"/><line x1="-10" y1="'+(y+18)+'" x2="110" y2="'+(y-12)+'" stroke="#e0143c" stroke-width="1.4"/>'}return '<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="width:100%;height:100%">'+s+"</svg>"}
document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||a.target||/^(http|#|mailto)/.test(a.getAttribute("href")))return;e.preventDefault();
 const r=Math.random(),url=a.getAttribute("href"),k=r<.65,words=k?["PEW!","SPLASH!","POW!","BANG!"]:["¡CHAS!","SLASH!","¡ZAS!"];
 boom.innerHTML=(k?burst():slash())+'<div class="word">'+words[Math.floor(Math.random()*words.length)]+"</div>";boom.classList.add("on");setTimeout(()=>location.href=url,600)});
document.querySelectorAll(".bar[data-v]").forEach(b=>{const v=+b.dataset.v;for(let i=0;i<10;i++){const c=document.createElement("i");b.append(c);if(i<v)setTimeout(()=>c.classList.add("f"),300+i*100)}});
document.querySelectorAll(".spoiler").forEach(s=>s.addEventListener("click",()=>s.classList.toggle("open")));
})();
