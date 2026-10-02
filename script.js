/* ✏️ EDIT THESE ✏️ */
const BF="My Love", YOU="Your baby";
const LETTER=`Hey ${BF}, 💗

Happy Boyfriend's Day, my favourite person in the whole world.

I wanted to tell you something I don't say enough: you are the best thing that ever happened to me. You turned my ordinary days into my favourite memories, and you make even the hardest days feel soft.

Thank you for loving me when I'm silly, when I'm moody, and when I'm tired. Thank you for being my safe place, my best friend and my person.

I don't need a perfect life. I just need you next to me in it.

I fall for you a little more every single day. 🥹

Forever yours,
${YOU} 💋`;
const REASONS=["Your smile can fix my worst day ☀️","Your hugs feel like home 🏡","You make me laugh like nobody else 😂","You're kind to everyone, and to me most of all 🌷","You believe in me, even when I don't 🌟","You're my best friend and my safe place 💞","Your voice is my favourite sound 🎧","You love me exactly as I am 🥰","Being with you feels easy and magical ✨","Simply because you're you, and I love you 💖"];
const DEDI=`This one is for you, ${BF}. Every time you hear it, I want you to remember how loved you are. 💞`;
const FINAL=`I love you more than words can say.\nThank you for being mine. 💖\n\n— ${YOU}`;

const $=s=>document.querySelector(s);
$('#cn').textContent=BF;$('#yn').textContent=YOU;$('#dd').textContent=DEDI;

/* hearts canvas */
const cv=$('#bg'),cx=cv.getContext('2d');let W,H,hs=[];
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
const E=['💗','💖','💕','🌸','✨','💘'];
function mk(x,y,b){return{x:x??Math.random()*W,y:y??H+20,s:12+Math.random()*22,v:b?-(2+Math.random()*4):.4+Math.random()*1.1,dx:b?(Math.random()-.5)*8:0,e:E[Math.random()*E.length|0],a:b?1:.25+Math.random()*.4,b,ph:Math.random()*6}}
for(let i=0;i<20;i++){const h=mk();h.y=Math.random()*H;hs.push(h)}
(function loop(){cx.clearRect(0,0,W,H);if(hs.length<24&&Math.random()<.04)hs.push(mk());
 hs=hs.filter(h=>h.y>-40&&h.y<H+60&&h.a>0);
 for(const h of hs){if(h.b){h.y+=h.v;h.x+=h.dx;h.v+=.07;h.a-=.008}else{h.y-=h.v;h.x+=Math.sin(h.ph+=.02)*.5}
 cx.globalAlpha=Math.max(h.a,0);cx.font=h.s+'px serif';cx.fillText(h.e,h.x,h.y)}requestAnimationFrame(loop)})();
function burst(x=W/2,y=H/2,n=50){for(let i=0;i<n;i++){const h=mk(x,y,true);h.v=-(Math.random()*9);h.s=16+Math.random()*24;hs.push(h)}}
addEventListener('pointerdown',e=>burst(e.clientX,e.clientY,5));

/* flow */
let cur=0;
function go(n){document.getElementById('s'+cur).classList.remove('on');cur=n;const s=$('#s'+n);s.classList.add('on');s.scrollTop=0;burst(W/2,H*.7,30);
 if(n==1)typeLetter();if(n==5)reasons()}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>go(+b.dataset.go));

/* envelope */
$('#env').onclick=function(){this.classList.add('open');$('#tap').style.display='none';$('#hb').classList.add('show');burst(W/2,H/2,60)};

/* letter */
let typed=false,skip=false;function typeLetter(){if(typed)return;typed=true;const el=$('#letter');let i=0;el.onclick=()=>{skip=true};(function n(){if(skip)i=LETTER.length;el.textContent=LETTER.slice(0,i++);el.parentElement.parentElement.scrollTop=1e5;if(i<=LETTER.length)setTimeout(n,32);else $('#b1').style.display='inline-block'})()}

/* certificate kiss */
$('#kiss').onclick=e=>{const c=$('#cert');const m=document.createElement('div');m.className='stamp';m.textContent='💋';m.style.left=(10+Math.random()*60)+'%';m.style.top=(15+Math.random()*60)+'%';c.appendChild(m);$('#kh').textContent='mwaaah! again? 😘';const r=e.target.getBoundingClientRect();burst(r.left+20,r.top,25)};

/* song: your own file, or a built-in music-box melody */
const au=$('#au'),vn=$('#vn'),eq=$('#eq');let useFile=false,playing=false,ac,timer,step=0;
eq.innerHTML='<i></i>'.repeat(9);
const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46,523.25,659.25,783.99,1046.5,880,783.99,659.25,587.33];
function beep(f){const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=f;g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.22,ac.currentTime+.02);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+1.4);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+1.5)}
function bars(){eq.querySelectorAll('i').forEach(b=>b.style.height=playing?(6+Math.random()*24)+'px':'6px')}
setInterval(()=>playing&&bars(),180);
function start(){playing=true;vn.classList.add('p');$('#play').textContent='⏸ Pause';$('#st').textContent='now playing: for you 💗';
 if(useFile)au.play();else{ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();timer=setInterval(()=>beep(notes[step++%notes.length]),420)}}
function stop(){playing=false;vn.classList.remove('p');$('#play').textContent='▶ Play our song';bars();useFile?au.pause():clearInterval(timer)}
$('#play').onclick=()=>playing?stop():start();
$('#up').onclick=()=>{const f=document.createElement('input');f.type='file';f.accept='audio/*';f.onchange=()=>{if(!f.files[0])return;if(playing)stop();au.src=URL.createObjectURL(f.files[0]);useFile=true;$('#st').textContent='your song is ready 💞';start()};f.click()};

/* reasons */
let shown=false;function reasons(){if(shown)return;shown=true;const L=$('#rl');
 REASONS.forEach((r,i)=>{L.insertAdjacentHTML('beforeend',`<div class="rs"><b>${i+1}</b><span>${r}</span></div>`);setTimeout(()=>{const e=L.children[i];e.classList.add('in2');e.scrollIntoView({behavior:'smooth',block:'center'});burst(W/2,H*.6,10)},900+i*1500)});
 setTimeout(()=>{const f=$('#fin');f.textContent=FINAL;f.classList.add('show');f.scrollIntoView({behavior:'smooth',block:'center'});let k=0;const t=setInterval(()=>{burst(Math.random()*W,H*.8,35);if(++k>8)clearInterval(t)},350)},900+REASONS.length*1500)}

/* optional: drop "song.mp3" in this folder and it plays automatically */
au.preload='auto';au.src='song.mp3';au.addEventListener('loadeddata',()=>{useFile=true});