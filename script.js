
// ---- AÑO FOOTER ----
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ---- CURSOR ----
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cursor.style.left=mx+'px';cursor.style.top=my+'px';
});
function animRing(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a,button,.project-card,.promo-card,.cat-btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.width='20px';cursor.style.height='20px'});
  el.addEventListener('mouseleave',()=>{cursor.style.width='12px';cursor.style.height='12px'});
});

// ---- MOBILE NAV ----
function toggleMobileNav(){
  const mn=document.getElementById('mobile-nav');
  const hb=document.getElementById('hamburger');
  mn.classList.toggle('open');
  hb.classList.toggle('open');
}

// ---- FILTROS PORTFOLIO ----
function filterCat(cat){
  document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.project-card').forEach(c=>{
    const cats = c.dataset.cat ? c.dataset.cat.split(' ') : [];
    if(cat==='todo'){
      c.classList.add('visible');
    } else {
      if(cats.includes(cat)||cats.includes('add-placeholder')&&cat!=='todo'){
        // show add placeholder only if in that category
        if(cats.includes('add-placeholder')&&!cats.includes(cat)){
          c.classList.remove('visible');
        } else {
          c.classList.add('visible');
        }
      } else {
        c.classList.remove('visible');
      }
    }
  });
}

// ---- LIGHTBOX PROMOS ----
const promo1Src = 'https://i.ibb.co/S74bkzHR/Chat-GPT-Image-4-may-2026-07-05-21-p-m.png';
const promo2Src = 'https://i.ibb.co/5gCmqtFX/Chat-GPT-Image-4-may-2026-07-05-08-p-m.png';
const promo3Src = 'https://i.ibb.co/NgJqp5DW/Chat-GPT-Image-5-may-2026-08-29-55-p-m.png';
const promo4Src = 'https://i.ibb.co/1YrXtsjt/Captura-de-pantalla-20.png';
const promo5Src = 'https://i.ibb.co/ZpqwKC5D/Captura-de-pantalla-21.png';
const promo6Src = 'https://i.ibb.co/PGFD4zDp/Captura-de-pantalla-22.png';
const promo7Src = 'https://i.ibb.co/k60FbC8w/Captura-de-pantalla-23.png';
const promo8Src = 'https://i.ibb.co/YF8syQbH/Captura-de-pantalla-35.png';
const promo9Src = 'https://i.ibb.co/d4DmvpM9/Captura-de-pantalla-36.png';
const promo10Src = 'https://i.ibb.co/HL7x87gB/Lona-de-publicidad-Tratamiento-Capilar.jpg';
const promo11Src = 'https://i.ibb.co/ymshRjRT/Lona-Alejandra-Rubin-1.jpg';
const promo12Src = '';
const promo13Src = '';


function openLightbox(id){
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lb-content');
  if(id==='promo1'){
    content.innerHTML = `<img class="lb-img" src="${promo1Src}" alt="Paquete Impulso Redes">
      <div class="lb-title">Paquete Impulso Redes</div>
      <div class="lb-desc">5 posts + 2 videos + 2 historias animadas. Todo por $399 pesos. Diseños enfocados en atraer y convertir.</div>
      <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesa+el+Paquete+Impulso+Redes" target="_blank">💬 Quiero este paquete</a>`;
  } else if(id==='promo2'){
    content.innerHTML = `<img class="lb-img" src="${promo2Src}" alt="Invitaciones Digitales">
      <div class="lb-title">Invitaciones Digitales e Interactivas</div>
      <div class="lb-desc">Promo Primavera desde $249 pesos. Música, RSVP, diseño personalizado y entrega en 1 a 3 días.</div>
      <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesan+las+Invitaciones+Digitales" target="_blank">💬 Quiero mi invitación</a>`;
  }
  else if(id==='promo3'){
    content.innerHTML = `<img class="lb-img" src="${promo3Src}" alt="Flayers">
      <div class="lb-title">Flayers Publicitarios 100% Personalizados</div>
      <div class="lb-desc">Flayes Publicitarios a solo $99 pesos. Diseño personalizado y entrega en 1 a 3 días.</div>
      <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesa+un+flayer+como+este" target="_blank">💬 Quiero Este Flayer</a>`;
  }
  else if(id==='promo10'){
    content.innerHTML = `<img class="lb-img" src="${promo10Src}" alt="Flayers">
      <div class="lb-title">Lonas Publicitarias 100% Personalizadas</div>
      <div class="lb-desc">Lonas Publicitarios a solo $99 pesos. Diseño personalizado y entrega en 1 a 3 días.</div>
      <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesa+una+Imagen+como+esta" target="_blank">💬 Quiero Este Diseño</a>`;
  }
  else if(id==='promo11'){
    content.innerHTML = `<img class="lb-img" src="${promo11Src}" alt="Flayers">
      <div class="lb-title">Lonas Publicitarias 100% Personalizadas</div>
      <div class="lb-desc">Lonas Publicitarios a solo $99 pesos. Diseño personalizado y entrega en 1 a 3 días.</div>
      <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesa+una+Imagen+como+esta" target="_blank">💬 Quiero Este Diseño</a>`;
  }
  lb.classList.add('open');
  document.body.style.overflow='hidden';
}

function openProject(p){
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lb-content');
  let mediaHTML = '';
  if(p.type==='image'&&p.img){
    const sources = {
        'PROMO1_SRC': promo1Src,
        'PROMO2_SRC': promo2Src,
        'PROMO3_SRC': promo3Src,
        'PROMO4_SRC': promo4Src,
        'PROMO5_SRC': promo5Src,
        'PROMO6_SRC': promo6Src, 
        'PROMO7_SRC': promo7Src,
        'PROMO8_SRC': promo8Src,
        'PROMO9_SRC': promo9Src,
        'PROMO10_SRC': promo10Src,
        'PROMO11_SRC': promo11Src,
        'PROMO12_SRC': promo12Src,
        'PROMO13_SRC': promo13Src
          // <-- Nueva línea
    };
    const imgSrc = sources[p.img] || promo1Src; // promo1Src como respaldo
    mediaHTML = `<img class="lb-img" src="${imgSrc}" alt="${p.title}">`;

  } else if(p.type==='url'&&p.url&&p.url!=='#'){
    mediaHTML = `<iframe class="lb-iframe" src="${p.url}" allowfullscreen></iframe>`;
  } else {
    mediaHTML = `<div style="height:200px;display:flex;align-items:center;justify-content:center;font-size:64px;margin-bottom:24px;">${p.icon||'🎨'}</div>`;
  }
  const tagsHTML = (p.tags||[]).map(t=>`<span style="background:rgba(232,23,93,0.15);border:1px solid rgba(232,23,93,0.3);border-radius:50px;padding:4px 14px;font-size:12px;color:#e8175d;">${t}</span>`).join('');
  const linkHTML = p.url&&p.url!=='#' ? `<a class="lb-link" href="${p.url}" target="_blank">🔗 Ver proyecto completo</a>` :
    `<a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Vi+el+proyecto+${encodeURIComponent(p.title)}+y+me+interesa+algo+similar" target="_blank">💬 Quiero algo así</a>`;
  content.innerHTML = `
    ${mediaHTML}
    <div style="margin-bottom:8px;font-size:12px;color:var(--acento);letter-spacing:2px;text-transform:uppercase">${p.cat||''}</div>
    <div class="lb-title">${p.title}</div>
    <div class="lb-desc">${p.desc}</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:24px;">${tagsHTML}</div>
    ${linkHTML}`;
  lb.classList.add('open');
  document.body.style.overflow='hidden';
}

function showAddPrompt(cat){
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lb-content');
  content.innerHTML = `
    <div style="font-size:64px;margin-bottom:24px;">🚀</div>
    <div class="lb-title">¡Próximamente aquí!</div>
    <div class="lb-desc">Esta categoría está creciendo. ¿Tienes un proyecto en mente? ¡Hablemos y lo creamos juntos!</div>
    <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesa+un+proyecto+de+${encodeURIComponent(cat)}" target="_blank">💬 Cotizar proyecto</a>`;
  lb.classList.add('open');
  document.body.style.overflow='hidden';
}

function closeLightbox(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow='';
}
function closeLightboxOutside(e){
  if(e.target===document.getElementById('lightbox')) closeLightbox();
}
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeLightbox(); });

// ---- PROMO TRACK LOOP ----
const track = document.getElementById('promo-track');
track.innerHTML += track.innerHTML;

// ---- REVEAL ON SCROLL ----
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.08});
reveals.forEach(el=>obs.observe(el));

// ---- NAVBAR shrink ----
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  nav.style.padding = window.scrollY>60 ? '10px 32px' : '16px 32px';
});


// Botón scroll to top
const btnTop = document.getElementById('btn-top');
window.addEventListener('scroll', () => {
  btnTop.classList.toggle('visible', window.scrollY > 400);
});
