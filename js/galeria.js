(()=>{
const images=[
 ["asss.jpg","Rayden / Pool"],
 ["bueno.jpg","Rayden / Pool"],
 ["ccd3e5d99081fdc7ce51f1051b557036.jpg","Rayden / Pool"],
 ["Dios.png","Rayden / Pool"],
 ["ESSTTETIK.jpg","Estética"],
 ["ESTETIKA.jpg","Estética"],
 ["ESTETIKKKK.jpg","Estética"],
 ["eye.jpg","Rayden / Pool"],
 ["Finn.jpg","Rayden / Pool"],
 ["fm.jpg","Rayden / Pool"],
 ["hueno.jpg","Rayden / Pool"],
 ["iu.jpg","Rayden / Pool"],
 ["iuiyi.jpg","Rayden / Pool"],
 ["jdrrr.jpg","Rayden / Pool"],
 ["jhkjhk.jpg","Rayden / Pool"],
 ["jiii.jpg","Rayden / Pool"],
 ["jjkj.jpg","Rayden / Pool"],
 ["mikkkk.jpg","Rayden / Pool"],
 ["musiiiii.jpg","Música"],
 ["musiiiik.jpg","Música"],
 ["MUSIIIK.jpg","Música"],
 ["MUSIIIKaas.jpg","Música"],
 ["MUSIIIKSSS.jpg","Música"],
 ["MUSIKAA.jpg","Música"],
 ["MUSISIS.jpg","Música"],
 ["muuusiiiik.jpg","Música"],
 ["ooo.jpg","Rayden / Pool"],
 ["oooo.jpg","Rayden / Pool"],
 ["oooooo.jpg","Rayden / Pool"],
 ["oyeah jj.jpg","Rayden / Pool"],
 ["oyeah.jpg","Rayden / Pool"],
 ["pool.jpg","Rayden / Pool"],
 ["poool.jpg","Rayden / Pool"],
 ["pooool.jpg","Rayden / Pool"],
 ["pooooooool.jpg","Rayden / Pool"],
 ["pooooooooool.jpg","Rayden / Pool"],
 ["popll.jpg","Rayden / Pool"],
 ["siisis.jpg","Rayden / Pool"],
 ["STETIK.jpg","Estética"],
 ["STETIKK.jpg","Estética"],
 ["STTTTEEETIK.jpg","Estética"],
 ["uhum.jpg","Rayden / Pool"],
 ["uyyyy.jpg","Rayden / Pool"],
 ["wkias.jpg","Rayden / Pool"]
];
const grid=document.getElementById("gallery-grid"),filters=document.getElementById("gallery-filters");
if(!grid||!filters)return;
const cards=images.map(([name,category])=>{
 const figure=document.createElement("figure"),image=document.createElement("img"),caption=document.createElement("figcaption");
 figure.className="gallery-card";
 figure.dataset.category=category;
 image.src="img/poolimages/"+encodeURIComponent(name).replace(/%2F/gi,"/");
 image.alt="OLA IDIOTAS";
 image.loading="lazy";
 image.onerror=()=>{image.onerror=null;image.src="img/placeholder.svg"};
 caption.textContent="OLA IDIOTAS";
 figure.append(image,caption);grid.append(figure);
 return figure;
});
filters.addEventListener("click",event=>{
 const button=event.target.closest("button[data-filter]");
 if(!button)return;
 filters.querySelectorAll("button").forEach(filter=>{
  const selected=filter===button;
  filter.classList.toggle("on",selected);
  filter.setAttribute("aria-pressed",String(selected));
 });
 cards.forEach(card=>{
  card.hidden=button.dataset.filter!=="Todo"&&card.dataset.category!==button.dataset.filter;
 });
});
})();
