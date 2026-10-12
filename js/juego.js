(()=>{
const cv=document.getElementById("cv"),ctx=cv.getContext("2d"),res=document.getElementById("res"),screen=document.getElementById("game-screen"),screenTitle=document.getElementById("screen-title"),screenMessage=document.getElementById("screen-message"),controls=document.getElementById("game-controls"),W=cv.width,H=cv.height,TARGET=30;
const keys={},random=Math.random;
let game=null,frame=0,last=0;
const insults=["Eres un grandísimo pendejo.","Hasta mi papá atraparía más chocolates, pendejo.","Dejaste chocolate tirado. Imperdonable, grandísimo pendejo.","Bonito combate, pero eres un pendejo sin hambre."];

addEventListener("keydown",event=>{
 const key=event.key.toLowerCase();
 if(key.startsWith("arrow")||key===" ")event.preventDefault();
 keys[key]=true;
 if((key===" "||key==="j")&&game)attack();
 if((key==="enter"||key===" ")&&game&&game.state!=="playing")start();
});
addEventListener("keyup",event=>{keys[event.key.toLowerCase()]=false});
document.querySelectorAll("[data-k]").forEach(button=>{
 const key=button.dataset.k;
 button.onpointerdown=event=>{event.preventDefault();keys[key]=true;if(key==="atk")attack()};
 button.onpointerup=button.onpointerleave=()=>{keys[key]=false};
});
cv.addEventListener("pointerdown",attack);

function addSparks(x,y,count,color){
 for(let i=0;i<count;i++){
  const angle=random()*Math.PI*2,speed=35+random()*115;
  game.particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:.25+random()*.35,color});
 }
}
function spawnChocolate(){
 let x,y,tries=0;
 do{x=24+random()*(W-48);y=34+random()*(H-58);tries++}
 while(Math.hypot(x-game.player.x,y-game.player.y)<70&&tries<12);
 game.chocolates.push({x,y});
}
function start(){
 game={player:{x:W/2,y:H/2,hp:100,fx:1,fy:0,cooldown:0,slash:0,invulnerable:0},enemies:[],chocolates:[],particles:[],got:0,elapsed:0,enemyTimer:1,chocolateTimer:0,state:"playing"};
 for(let i=0;i<5;i++)spawnChocolate();
 res.textContent="";
 screen.hidden=true;
 controls.hidden=false;
 last=performance.now();
 cancelAnimationFrame(frame);
 frame=requestAnimationFrame(loop);
}
function attack(){
 if(!game||game.state!=="playing"||game.player.cooldown>0)return;
 const player=game.player;
 player.cooldown=.32;
 player.slash=.16;
 game.enemies.forEach(enemy=>{
  const dx=enemy.x-player.x,dy=enemy.y-player.y,distance=Math.hypot(dx,dy);
  if(distance<72&&(dx*player.fx+dy*player.fy)/(distance||1)>-.25){
   enemy.hp--;
   enemy.flash=.12;
   enemy.x+=dx/(distance||1)*18;
   enemy.y+=dy/(distance||1)*18;
   addSparks(enemy.x,enemy.y,7,"#ffb000");
   if(enemy.hp<=0){enemy.dead=true;addSparks(enemy.x,enemy.y,10,"#ff2e88")}
  }
 });
}
function spawnEnemy(level){
 const side=random()*4|0;
 let x,y;
 if(side===0){x=-16;y=random()*H}
 else if(side===1){x=W+16;y=random()*H}
 else if(side===2){x=random()*W;y=-16}
 else{x=random()*W;y=H+16}
 game.enemies.push({x,y,hp:1+Math.floor(level/6),speed:48+Math.min(100,level*7),flash:0});
}
function update(dt){
 const player=game.player;
 game.elapsed+=dt;
 const level=1+Math.floor(game.got/5)+Math.floor(game.elapsed/35);
 const spawnInterval=Math.max(.38,1.55-level*.1);
 const enemyLimit=Math.min(4+Math.floor(level/2),14);
 let dx=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0);
 let dy=(keys.arrowdown||keys.s?1:0)-(keys.arrowup||keys.w?1:0);
 if(dx||dy){
  const magnitude=Math.hypot(dx,dy);dx/=magnitude;dy/=magnitude;
  player.fx=dx;player.fy=dy;
  player.x=Math.max(14,Math.min(W-14,player.x+dx*190*dt));
  player.y=Math.max(14,Math.min(H-14,player.y+dy*190*dt));
 }
 player.cooldown=Math.max(0,player.cooldown-dt);
 player.slash=Math.max(0,player.slash-dt);
 player.invulnerable=Math.max(0,player.invulnerable-dt);

 game.enemyTimer-=dt;
 if(game.enemyTimer<=0){
  if(game.enemies.length<enemyLimit)spawnEnemy(level);
  game.enemyTimer=spawnInterval;
 }
 game.chocolateTimer-=dt;
 if(game.chocolateTimer<=0){
  if(game.chocolates.length<5)spawnChocolate();
  game.chocolateTimer=.85;
 }
 game.enemies.forEach(enemy=>{
  const ex=player.x-enemy.x,ey=player.y-enemy.y,distance=Math.hypot(ex,ey)||1;
  enemy.x+=ex/distance*enemy.speed*dt;
  enemy.y+=ey/distance*enemy.speed*dt;
  enemy.flash=Math.max(0,enemy.flash-dt);
  if(distance<24&&player.invulnerable<=0){
   player.hp=Math.max(0,player.hp-(12+Math.floor(level/4)));
   player.invulnerable=.72;
   addSparks(player.x,player.y,9,"#ff2e88");
  }
 });
 game.enemies=game.enemies.filter(enemy=>!enemy.dead);
 game.chocolates=game.chocolates.filter(chocolate=>{
  if(Math.hypot(chocolate.x-player.x,chocolate.y-player.y)<24){
   game.got++;
   addSparks(chocolate.x,chocolate.y,8,"#ffb000");
   if(game.got>=TARGET){game.state="won";return false}
   return false;
  }
  return true;
 });
 game.particles.forEach(particle=>{
  particle.x+=particle.vx*dt;particle.y+=particle.vy*dt;particle.life-=dt;
 });
 game.particles=game.particles.filter(particle=>particle.life>0);
 if(player.hp<=0)game.state="gameover";
}
function draw(){
 ctx.fillStyle="#0a0306";ctx.fillRect(0,0,W,H);
 ctx.strokeStyle="#2a0f1a";ctx.lineWidth=1;ctx.beginPath();
 for(let x=0;x<=W;x+=40){ctx.moveTo(x,0);ctx.lineTo(x,H)}
 for(let y=0;y<=H;y+=40){ctx.moveTo(0,y);ctx.lineTo(W,y)}
 ctx.stroke();
 if(!game||game.state!=="playing")return;
 game.chocolates.forEach(chocolate=>{
  ctx.fillStyle="#5b0f24";ctx.fillRect(chocolate.x-12,chocolate.y-8,24,16);
  ctx.fillStyle="#ffb000";ctx.fillRect(chocolate.x-12,chocolate.y-3,24,6);
 });
 game.enemies.forEach(enemy=>{
  ctx.fillStyle=enemy.flash>0?"#fff":"#4a2a6a";
  ctx.fillRect(enemy.x-13,enemy.y-13,26,26);
  ctx.fillStyle="#ff2e88";ctx.fillRect(enemy.x-8,enemy.y-5,5,4);ctx.fillRect(enemy.x+3,enemy.y-5,5,4);
 });
 const player=game.player;
 if(player.invulnerable>0&&Math.floor(player.invulnerable*20)%2)ctx.globalAlpha=.4;
 ctx.fillStyle="#c4122f";ctx.fillRect(player.x-12,player.y-14,24,28);
 ctx.fillStyle="#0a0306";ctx.fillRect(player.x-9,player.y-9,18,9);
 ctx.fillStyle="#ffb000";ctx.fillRect(player.x-7,player.y-7,5,4);ctx.fillRect(player.x+2,player.y-7,5,4);
 ctx.globalAlpha=1;
 if(player.slash>0){
  ctx.strokeStyle="#f6ecec";ctx.lineWidth=5;ctx.beginPath();
  const angle=Math.atan2(player.fy,player.fx);ctx.arc(player.x,player.y,48,angle-1.1,angle+1.1);ctx.stroke();
 }
 game.particles.forEach(particle=>{
  ctx.globalAlpha=Math.min(1,particle.life*3);ctx.fillStyle=particle.color;ctx.fillRect(particle.x,particle.y,4,4);
 });
 ctx.globalAlpha=1;
 ctx.fillStyle="#1d0b12";ctx.fillRect(8,8,154,16);
 ctx.fillStyle="#ff2e88";ctx.fillRect(10,10,Math.max(0,player.hp)*1.5,12);
 const level=1+Math.floor(game.got/5)+Math.floor(game.elapsed/35);
 ctx.fillStyle="#f6ecec";ctx.font="14px sans-serif";
 ctx.fillText("VIDA",12,39);
 ctx.fillText("NIVEL "+level+"   🍫 "+game.got+"/"+TARGET, W-174,20);
 ctx.fillText("ENEMIGOS: "+game.enemies.length,W-174,39);
}
function finish(){
 const won=game.state==="won";
 controls.hidden=true;
 screen.hidden=false;
 screenTitle.textContent=won?"¡Victoria!":"Game over";
 screenMessage.textContent=won?"¡Reuniste los 30 chocolates! Hellmouth se ganó un descanso.":"Se acabó la vida. Esquiva a los villanos y vuelve a intentarlo.";
 document.getElementById("go").textContent="Jugar otra vez";
 res.textContent=won?"¡Objetivo cumplido!":insults[random()*insults.length|0];
}
function loop(time){
 const dt=Math.min(.05,(time-last)/1000);last=time;
 update(dt);draw();
 if(game.state!=="playing"){finish();return}
 frame=requestAnimationFrame(loop);
}
document.getElementById("go").onclick=start;
draw();
})();
