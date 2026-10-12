(()=>{const L=(window.RELACIONES||[]).slice(),PH="img/placeholder.svg",st=document.getElementById("stack");if(!st)return;
const vacio=!L.length;
if(vacio){L.push({nombre:"Aún no hay nadie",tipo:"vacío",foto:"",info:[{t:"Aviso",d:"Aún no hay nadie aquí. ¿Quieres aparecer? Manda mensajito, que hay pito para todos."}]});document.getElementById("rel-empty").style.display="block"}
const m=document.createElement("div");m.id="rm";m.innerHTML='<div class="rm-card"><img alt=""><h2></h2><p class="tp"></p><div class="bd"></div><button class="btn">Cerrar</button></div>';document.body.append(m);
const card=m.firstChild,close=()=>m.classList.remove("on");m.onclick=e=>{if(e.target===m)close()};card.querySelector(".btn").onclick=close;addEventListener("keydown",e=>{if(e.key==="Escape")close()});
function abre(r){const im=card.querySelector("img");im.src=r.foto||PH;im.onerror=()=>{im.onerror=null;im.src=PH};card.querySelector("h2").textContent=r.nombre;card.querySelector(".tp").textContent=r.tipo;
 const bd=card.querySelector(".bd");bd.innerHTML="";const inf=(r.info&&r.info.length)?r.info:[{t:"Información",d:"Aún no hay información."}];
 inf.forEach(x=>{const h=document.createElement("h3"),p=document.createElement("p");h.textContent=x.t;p.textContent=x.d;bd.append(h,p)});m.classList.add("on")}
L.forEach((r,i)=>{const b=document.createElement("button");b.className="folder "+(i%2?"cream right":"red");
 b.innerHTML='<span class="f-tab"></span><span class="f-body"></span><span class="f-name"></span><span class="f-stamp"></span><span class="f-pic"><img alt=""></span>';
 b.querySelector(".f-name").textContent=r.nombre;b.querySelector(".f-stamp").textContent=r.tipo;
 const im=b.querySelector("img");im.src=r.foto||PH;im.onerror=()=>{im.onerror=null;im.src=PH};b.onclick=()=>abre(r);st.append(b)})})();
