/* ================= CONFIG — edit these ================= */
const CONFIG = {
  birthdayDate: "2026-09-22T00:00:00", // his birthday — already set

  letterParagraphs: [
    "happy birthday, bebe! i hope you have the best day today because you deserve it so much. i'm really happy that i get to celebrate your birthday with you and i'm even happier that i get to be part of your life now. 𑣲",
    "i just want you to know that i'm always proud of you and i'll always be rooting for you. i hope you get to achieve everything you're working hard for and all the things you've been praying for. you deserve all the good things coming your way.",
    "thank you for always being you and for making me feel so loved and cared for. i'm really grateful for you and i know i've been saying this a lot but you really are a big wish come true for me. you're such a blessing in my life and your presence is something i could neveeerrr compare to anything else. you're so special to me and i treasure you more than you know. i love you so much."
  ],

  memories: [
    {
      num: "01",
      title: "01 — A Moment I'll Always Remember",
      photo: "moment.jpg",
      note: "august 9, 2026. this day was special because it was the day you asked me to let you court me. i remember seeing how excited you were and at the same time i could tell how nervous you were when you asked me. the whole day felt so wholesome because i had no idea what was going to happen. we originally just planned to swim, watch something, eat a lot, and even wrestle but somehow the day became so much more special than i expected. it was also our first time cuddling and it honestly felt surreal. i felt so safe that i was able to fall asleep easily on your chest. i loved how caring you were the entire time, always caressing my face and making sure i was enjoying myself and was happy. it's a day i'll always remember because it was the day we officially started becoming something more."
    },
    {
      num: "02",
      title: "02 — The Little Things",
      photo: "little-things.jpg",
      note: "i love everything about us, especially the little things. i love how something as simple as you waking me up when we were still friends because i had an exam turned into a routine. now, you wake me up just to say good morning, tell me you're about to go to school, and remind me to start preparing for my day. it means a lot to me because i get to hear your sweet voice first thing in the morning along with your snapchat school selfies. i don't know, it's just something small that makes me really happy."
    },
    {
      num: "03",
      title: "03 — My Favorite Photo of You",
      photo: "fav-pic.jpg",
      note: "every photo of you is my favorite but i chose this one because this was the first photo you sent that made me realize i really did have feelings for you. you had been drinking a lot but you still made sure to update me and then you sent this photo with that smile. my heart genuinely jumped when i saw it and i remember staring at it for a long time because it made me so happy. this was also around the time you confessed to me for the second time and i didn't know what to do. it made me nervous and confused because like maybe this time, i was starting to feel the same way."
    },
    {
      num: "04",
      title: "04 — Us, Right Now",
      photo: "us.jpg",
      note: "this is us right now (๑ᵔ⤙ᵔ๑)  i never imagined that we would get to this stage. i never thought that the person i kept avoiding and friendzoning would end up being the person i would fall in love with. i'm so grateful that i got the chance to know you and experience what real love feels like because to me, you are that love. from the very beginning, you have never made me feel alone and you've always been consistent with your words and actions. that consistency has made my heart feel so full and has made me appreciate what we have even more. i look forward to all the memories we still have to make, including the good days, the difficult days, and all the ups and downs we'll face together. most of all, i look forward to seeing you achieve all your dreams and i hope i get to be right there beside you while you do."
    }
  ]
};
/* ========================================================= */

const letterEl = document.getElementById('letter');
CONFIG.letterParagraphs.slice().reverse().forEach(txt => {
  const p = document.createElement('p');
  p.textContent = txt;
  letterEl.insertBefore(p, letterEl.firstChild);
});

const memoriesRoot = document.getElementById('memories');
CONFIG.memories.forEach(m => {
  const div = document.createElement('div');
  div.className = 'memory';
  const photoHTML = m.photo
    ? `<img class="memory-photo" src="${m.photo}" alt="${m.title}" onerror="this.outerHTML='<div class=&quot;memory-photo placeholder&quot;>photo not found: ${m.photo}</div>'">`
    : `<div class="memory-photo placeholder">PHOTO PLACEHOLDER</div>`;
  div.innerHTML = `
    <p class="memory-num">${m.num}</p>
    <h3>${m.title}</h3>
    ${photoHTML}
    <p class="memory-note">${m.note}</p>
  `;
  memoriesRoot.appendChild(div);
});

// ---------- countdown ----------
const target = new Date(CONFIG.birthdayDate).getTime();
const cdEl = document.getElementById('countdown');
function tickCountdown(){
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0){
    cdEl.classList.add('arrived');
    document.getElementById('cd-days').textContent = '⚓';
    document.getElementById('cd-hours').textContent = '';
    document.getElementById('cd-mins').textContent = '';
    document.getElementById('cd-secs').textContent = '';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent = d;
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-mins').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2,'0');
}
tickCountdown();
setInterval(tickCountdown, 1000);

// ---------- envelope / letter ----------
const envelope = document.getElementById('envelope');
function openLetter(){
  envelope.setAttribute('hidden','');
  letterEl.classList.add('show');
}
envelope.addEventListener('click', openLetter);
envelope.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') openLetter(); });
document.getElementById('closeLetter').addEventListener('click', () => {
  letterEl.classList.remove('show');
  setTimeout(() => envelope.removeAttribute('hidden'), 200);
});

// ---------- candles ----------
const candleEls = Array.from(document.querySelectorAll('.candle'));
const blowBtn = document.getElementById('blowBtn');
const finaleMsg = document.getElementById('finaleMessage');

function snuff(el){ if (!el.classList.contains('out')) el.classList.add('out'); }
function checkAllOut(){
  if (candleEls.every(c => c.classList.contains('out'))){
    finaleMsg.classList.add('show');
    launchConfetti();
  }
}
candleEls.forEach(c => c.addEventListener('click', () => { snuff(c); checkAllOut(); }));
blowBtn.addEventListener('click', () => {
  candleEls.forEach((c, i) => setTimeout(() => { snuff(c); if(i === candleEls.length-1) checkAllOut(); }, i * 120));
});

// ---------- confetti ----------
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resize();
window.addEventListener('resize', resize);

const colors = ['#4D0E12', '#F5EFC6', '#A5BCD6', '#231815', '#ffffff'];
let particles = [];
function launchConfetti(){
  particles = Array.from({length: 140}, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.3,
    r: 4 + Math.random() * 5,
    vy: 2 + Math.random() * 3,
    vx: -1.5 + Math.random() * 3,
    rot: Math.random() * 360,
    vr: -6 + Math.random() * 12,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: Math.random() > 0.5 ? 'rect' : 'circle'
  }));
  requestAnimationFrame(animateConfetti);
}
let lastT = null;
function animateConfetti(t){
  if(!lastT) lastT = t;
  const dt = Math.min((t - lastT) / 16, 2);
  lastT = t;
  ctx.clearRect(0,0,canvas.width, canvas.height);
  let alive = false;
  particles.forEach(p => {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rot += p.vr * dt;
    if (p.y < canvas.height + 20) alive = true;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot * Math.PI / 180);
    ctx.fillStyle = p.color;
    if (p.shape === 'rect') ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r * 0.6);
    else { ctx.beginPath(); ctx.arc(0,0,p.r/2,0,Math.PI*2); ctx.fill(); }
    ctx.restore();
  });
  if (alive) requestAnimationFrame(animateConfetti);
  else ctx.clearRect(0,0,canvas.width, canvas.height);
}