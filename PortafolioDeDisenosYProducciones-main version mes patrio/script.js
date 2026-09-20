// ---- AÑO FOOTER ----
document.getElementById('footer-year').textContent = new Date().getFullYear();

// ---- IMAGEN DE RESPALDO (si un link de ibb.co se cae o se borra) ----
const IMG_FALLBACK = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22250%22%3E%3Crect width=%22400%22 height=%22250%22 fill=%22%2316161f%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 fill=%22%238a8a9a%22 font-family=%22sans-serif%22 font-size=%2216%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImagen no disponible%3C/text%3E%3C/svg%3E';

// ==========================================
// 🎃 SECCIÓN DE TEMPORADA (EDITAR AQUÍ CADA TEMPORADA)
// ==========================================
// Agrega uno o más objetos a TEMPORADA_ITEMS para promocionar tus
// invitaciones de temporada (Halloween, Navidad, San Valentín, etc).
// Si TEMPORADA_ACTIVA es false, la sección completa se oculta.
//
// IMPORTANTE — cómo se comporta según cuántos ejemplos tengas:
//   • 0 ejemplos  → la sección se oculta sola.
//   • 1 ejemplo   → se muestra como tarjeta única (SIN carrusel).
//   • 2+ ejemplos → se arma automáticamente un carrusel infinito,
//                   igual al de la sección de promos de arriba.
// Así puedes dejar un solo ejemplo por ahora sin que corra ningún
// carrusel "vacío", y en cuanto agregues tu 2do y 3er ejemplo el
// carrusel se activa solo, sin tocar nada más.
const TEMPORADA_ACTIVA = true;
const TEMPORADA_ITEMS = [
  {
    emoji: '🎃',
    etiqueta: 'Edición especial de temporada',
    // USAMOS COMILLAS INVERTIDAS Y RECOMODAMOS EL TEXTO CON ENTER:
    titulo: `💀 Invitación Interactiva 
    de <br> Hall🎃ween 🕷🕸`,
    descripcion: 'Una invitación web con animaciones y ambientación 100% tenebrosa para tu fiesta de Halloween.',
    // EDITAR: TEMPORADA — pega aquí el link de tu imagen cuando la subas
    imagen: 'https://i.ibb.co/QvRX1W3V/Whats-App-Image-2026-08-25-at-6-07-24-PM.jpg',
    // EDITAR: TEMPORADA — pega aquí el link de la demo o del chat de WhatsApp
    link: 'https://invitacion-hallowen.vercel.app/',
    textoBoton: 'Ver invitación de Halloween'
  }
  // EDITAR: TEMPORADA — cuando tengas listos tus otros 2 ejemplos, copia el
  // bloque de arriba (entre { y }), pégalo aquí abajo separado por una coma,
  // y cambia emoji/titulo/descripcion/imagen/link/textoBoton. En cuanto haya
  // 2 o más objetos aquí, el carrusel se activa solo.
];

function renderTemporada() {
  const wrap = document.getElementById('temporada-section');
  if (!wrap) return;
  const items = TEMPORADA_ACTIVA ? TEMPORADA_ITEMS.filter(Boolean) : [];

  if (items.length === 0) {
    wrap.style.display = 'none';
    return;
  }

  // ---- Un solo ejemplo: tarjeta fija, sin carrusel ----
  if (items.length === 1) {
    const it = items[0];
    wrap.innerHTML = `
      <div class="temporada-card reveal">
        <div class="temporada-img">
          <img src="${it.imagen}" alt="${it.titulo}" loading="lazy" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
        </div>
        <div class="temporada-info">
          <div class="temporada-eyebrow">${it.emoji} ${it.etiqueta}</div>
          <h2 class="temporada-title">${it.titulo}</h2>
          <p class="temporada-desc">${it.descripcion}</p>
          <a href="${it.link}" target="_blank" class="btn-primary-tematico">
            <span>${it.textoBoton}</span> <span>→</span>
          </a>
        </div>
      </div>
    `;
    return;
  }

  // ---- 2 o más ejemplos: carrusel infinito (misma mecánica que "Promos") ----
  wrap.innerHTML = `
    <div class="section-header reveal" style="margin-bottom:32px">
      <div class="section-eyebrow">🎃 Edición especial de temporada</div>
      <h2 class="section-title">Invitaciones de Halloween</h2>
      <p class="section-desc">Diseños tan terroríficamente bonitos que dan miedo... de lo bien que quedan.</p>
    </div>
    <div class="promo-section reveal" id="temporada-track-wrap">
      <div class="promo-track" id="temporada-track">
        ${items.map(it => `
          <div class="promo-card" onclick="window.open('${it.link}','_blank')">
            <img src="${it.imagen}" alt="${it.titulo}" loading="lazy" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
            <div class="promo-overlay"><span class="promo-label">${it.emoji} ${it.titulo}</span></div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  initInfiniteCarousel(document.getElementById('temporada-track-wrap'), document.getElementById('temporada-track'), 0.5);
}

// ==========================================
// 🌟 BASE DE DATOS DE PROYECTOS (PORTAFOLIO)
// ==========================================
// ¡Añadir un nuevo ejemplo aquí es súper fácil!
// Solo copia un bloque de proyecto, agrégalo a la lista y cambia sus datos.
const portfolioProjects = [
  {
    title: 'Invitaciónes digitales web o en video',
    cardTitle: 'Invitaciones WEB a tu gusto y necesidad',
    desc: 'Invitaciones web o en video con confirmacion de asistencia, musica de fondo carrusel de imagenes y contador de fecha.',
    cardDesc: 'Diseño para invitacion web basica desde $249 pesos.',
    cat: 'invitaciones',
    badge: 'Invitación Web',
    isNew: false,
    tags: ['Elegante', 'Interactiva'],
    lightboxTags: ['Invitacion WEB', 'Digital', 'Sorprende desde el incicio'],
    img: 'https://i.ibb.co/35py9nXS/Chat-GPT-Image-11-ago-2026-07-57-14-p-m-1.png',
    type: 'image'
  },
  {
    title: 'Invitación XV Años · María Guadalupe',
    cardTitle: 'XV Años · María Guadalupe',
    desc: 'Invitación digital elegante con tema de rosas con detalle en dorado, código de vestimenta, contador regresivo, ubicación, música de fondo y confirmación de asistencia RSVP.',
    cardDesc: 'Tema mariposas rosa pastel. Contador, RSVP, mapa y programa del evento.',
    cat: 'invitaciones',
    badge: 'Invitación Web',
    isNew: false,
    tags: ['Elegante', 'Interactiva'],
    lightboxTags: ['HTML', 'Interactiva', 'Mariposas', 'Música de fondo'],
    url: 'https://invitacionxvdigital.netlify.app/',
    img: 'https://i.ibb.co/1YrXtsjt/Captura-de-pantalla-20.png',
    type: 'image'
  },
  {
    title: 'Invitación XV Años · Paola Guadalupe',
    cardTitle: 'XV Años · Paola Guadalupe',
    desc: 'Invitación digital elegante con tema de mariposas, código de vestimenta, contador regresivo, ubicación, con tickets personalizables para la entrada del salón y confirmación de asistencia RSVP.',
    cardDesc: 'Tema Rosas Detalles en dorados. Contador, RSVP, Ticket personalizable mapa y programa.',
    cat: 'invitaciones',
    badge: 'Invitación Web',
    isNew: false,
    tags: ['Elegante', 'Interactiva', 'Musical', 'Con Tickets'],
    lightboxTags: ['HTML', 'Interactiva', 'Ticket', 'Personalizable'],
    url: 'https://ejemplo-de-invitacion-xv-tickets.vercel.app/',
    img: 'https://i.ibb.co/YF8syQbH/Captura-de-pantalla-35.png',
    type: 'image'
  },

  {
    title: 'Invitación XV Años · Janeth Alexandra',
    cardTitle: 'XV Años · Janeth Alexandra',
    desc: 'Invitación digital elegante con tema de Rapunzel, código de vestimenta, contador regresivo, ubicación, con tickets personalizables para la entrada del salón y confirmación de asistencia RSVP.',
    cardDesc: 'Tema Rapunzel. Contador, RSVP, Ticket personalizable mapa y programa.',
    cat: 'invitaciones',
    badge: 'Invitación Web',
    isNew: false,
    tags: ['Elegante', 'Interactiva', 'Musical', 'Con Tickets'],
    lightboxTags: ['HTML', 'Interactiva', 'Ticket', 'Personalizable'],
    url: 'https://ejemploxvrapunzel.vercel.app/',
    img: 'https://i.ibb.co/20CMQCrs/Captura-de-pantalla-64.png',
    type: 'image'
  },


  {
    title: 'Invitación Baby Shower · Azalia',
    cardTitle: 'Baby Shower · Azalia',
    desc: 'Invitación digital para Baby Shower, contador regresivo, ubicación, con personalizacion de la invitacion para cada invitado y confirmación de asistencia RSVP.',
    cardDesc: 'Baby Shower Niña, Contador, RSVP, Invitacion personalizable.',
    cat: 'invitaciones',
    badge: 'Invitación Web',
    isNew: false,
    tags: ['Elegante', 'Interactiva', 'Musical', 'persolalizada'],
    lightboxTags: ['HTML', 'Interactiva', 'Ticket', 'Personalizable'],
    url: 'https://ejemplo-baby-shower.vercel.app/',
    img: 'https://i.ibb.co/G3F9W0Nq/Captura-de-pantalla-67.png',
    type: 'image'
  },

  {
    title: 'Invitación Boda · Alejandra & Rodrigo',
    cardTitle: 'Boda · Alejandra & Rodrigo',
    desc: 'Invitación digital para Una Boda, contador regresivo, ubicación, con ticket de entrada dentro de la invitacion para cada invitado y confirmación de asistencia RSVP.',
    cardDesc: 'Boda elegante blanco y negro, Contador, RSVP, Invitacion personalizable.',
    cat: 'invitaciones',
    badge: 'Invitación Web',
    isNew: false,
    tags: ['Elegante', 'Interactiva', 'Musical', 'persolalizada'],
    lightboxTags: ['HTML', 'Interactiva', 'Ticket', 'Personalizable'],
    url: 'https://ejemplo-invitacion-boda-negro-y-bla.vercel.app/',
    img: 'https://i.ibb.co/67k74TYX/Captura-de-pantalla-68.png',
    type: 'image'
  },


  {
    title: 'Invitación Cumpleaños · Adrián Spiderman',
    cardTitle: 'Cumpleaños Adrián · Spiderman',
    desc: 'Invitación interactiva con telarañas animadas, rasca y descubre el número, flip cards de fecha, zona de disparo y confirmación épica.',
    cardDesc: 'Telarañas al tocar, rasca y descubre la edad, flip cards de fecha y más.',
    cat: 'invitaciones',
    badge: 'Invitación Web',
    isNew: false,
    tags: ['Infantil', 'Interactiva'],
    lightboxTags: ['HTML', 'Interactiva', 'Spiderman'],
    url: 'https://invitacionspidermaninteractive.netlify.app/',
    img: 'https://i.ibb.co/ZpqwKC5D/Captura-de-pantalla-21.png',
    type: 'image'
  },
  {
    title: 'Invitación Cumpleaños · Fernanda Abejita Chiquitita',
    cardTitle: 'Cumpleaños Fernanda · Abejita',
    desc: 'Invitación interactiva Abejita Chiquitita Plin Plin, Abejitas te siguen, Abeja baila, Zona de POLINIZACIÓN con flores que giran.',
    cardDesc: 'Invitación interactiva Abejita Plin Plin, Abejitas te siguen, Abeja baila y más.',
    cat: 'invitaciones',
    badge: 'Invitación Web',
    isNew: true,
    tags: ['Infantil', 'Interactiva'],
    lightboxTags: ['HTML', 'Interactiva', 'Abejita Chiquitita Plin Plin'],
    url: 'https://abejita-chiquitita.vercel.app/',
    img: 'https://i.ibb.co/d4DmvpM9/Captura-de-pantalla-36.png',
    type: 'image'
  },
  {
    title: 'Invitación Graduación Preescolar · Maria Tema Bluey',
    cardTitle: 'Graduación Maria · Tema Bluey',
    desc: 'Invitación en video, Temática de Bluey, incluye 2 fotografías dentro del video.',
    cardDesc: 'Invitación Digital Tema Bluey. Incluye tema de la caricatura y fotos de la festejada.',
    cat: 'invitaciones',
    badge: 'Invitación en video',
    isNew: true,
    tags: ['Infantil', 'Digital'],
    lightboxTags: ['Video', 'HD', 'Tema Bluey'],
    url: 'https://www.tiktok.com/@eduardo_at_design_studio/video/7645173206613052689?is_from_webapp=1&sender_device=pc&web_id=7630303453944563218',
    img: 'https://i.ibb.co/HpVDNHn7/Captura-de-pantalla-54.png',
    type: 'image'
  },
  {
    title: 'Invitación 1 añito · Juan Antonio Goku Bebe',
    cardTitle: '1 añito Juan Antonio · Goku Bebe',
    desc: 'Invitación en video, Temática de Goku Bebe, incluye 1 fotografía dentro del video.',
    cardDesc: 'Invitación Digital Tema Goku Bebe. Incluye tema, fotografía del festejado y más.',
    cat: 'invitaciones',
    badge: 'Invitación en video',
    isNew: true,
    tags: ['Infantil', 'Digital'],
    lightboxTags: ['Video', 'HD', 'Tema Goku Bebe'],
    url: 'https://www.tiktok.com/@eduardo_at_design_studio/video/7645183516325563656?is_from_webapp=1&sender_device=pc&web_id=7630303453944563218',
    img: 'https://i.ibb.co/XfCQmsG7/Captura-de-pantalla-58.png',
    type: 'image'
  },
  {
    title: 'Invitación Graduación Preescolar · Velia Tema Gabby',
    cardTitle: 'Graduación Velia · Casa de Gabby',
    desc: 'Invitación en video, Temática de La Casa de las Muñecas de Gabby, incluye 2 fotografías dentro del video, música de alta calidad y video HD.',
    cardDesc: 'Invitación Digital Tema La Casa de las Muñecas de Gabby con fotografías y música.',
    cat: 'invitaciones',
    badge: 'Invitación en video',
    isNew: true,
    tags: ['Infantil', 'Digital'],
    lightboxTags: ['Video', 'HD', 'Tema La Casa de las Muñecas de Gabby'],
    url: 'https://www.tiktok.com/@eduardo_at_design_studio/video/7645191849308589320?is_from_webapp=1&sender_device=pc&web_id=7630303453944563218',
    img: 'https://i.ibb.co/BmzkGf8/Captura-de-pantalla-56.png',
    type: 'image'
  },
  {
    title: 'Flyer · Paquete Visualizer',
    cardTitle: 'Paquete Visualizer + caratula',
    desc: 'Creacion de Visualizer dinamicos para tu disco, incluye la caratula del disco, dirigido para youtube o tiktok.',
    cardDesc: 'Diseño 7 Visualizer + caratula. $300 pesos.',
    cat: 'video',
    badge: 'Edición de Video',
    isNew: false,
    tags: ['Edición', 'Video'],
    lightboxTags: ['Video', 'Edición', 'Visualizer', 'Publicidad'],
    img: 'https://i.ibb.co/PsRMkfLv/Whats-App-Image-2026-08-25-at-4-06-38-PM.png',
    type: 'image'
  },
  {
    title: 'Flyer · Invitaciones Digitales',
    cardTitle: 'Promo Invitaciones Digitales',
    desc: 'Flyer promocional para servicio de invitaciones digitales e interactivas. Promoción de invitaciones web desde $249 pesos.',
    cardDesc: 'Flyer para invitaciones digitales e interactivas para fiestas.',
    cat: 'flyers',
    badge: 'Flyer',
    isNew: false,
    tags: ['Eventos', 'Promo'],
    lightboxTags: ['Canva', 'Eventos', 'Promoción'],
    img: 'https://i.ibb.co/sdc7TMnk/Chat-GPT-Image-18-ago-2026-09-33-56-p-m-1.png',
    type: 'image'
  },
  {
    title: 'Creación de Elementos Web · Páginas Web',
    cardTitle: 'Creamos tu página web a tu medida',
    desc: 'Creamos tu página web ajustada a tus necesidades y diseño moderno.',
    cardDesc: 'Creación completa desde frontend hasta el backend.',
    cat: 'web',
    badge: 'Página Web',
    isNew: false,
    tags: ['Web', 'Elementos'],
    lightboxTags: ['Web', 'Creación', 'Frontend'],
    url: 'https://la-troje-salon-de-eventos.netlify.app/',
    img: 'https://i.ibb.co/k60FbC8w/Captura-de-pantalla-23.png',
    type: 'image'
  },
  {
    title: 'Lona de Publicidad · Tratamiento para el Cabello',
    cardTitle: 'Diseño de Lona · Estilo Cabello',
    desc: 'Diseñamos la lona de publicidad que necesitas para que tu marca proyete lo que imaginas. Diseño moderno y adaptado.',
    cardDesc: 'Diseñamos tu lona de publicidad desde $99 pesos.',
    cat: 'fotos',
    badge: 'Lona de Publicidad',
    isNew: false,
    tags: ['Lona', 'Marketing'],
    lightboxTags: ['Canva', 'Lona', 'Publicidad'],
    img: 'https://i.ibb.co/HL7x87gB/Lona-de-publicidad-Tratamiento-Capilar.jpg',
    type: 'image'
  },
  {
    title: 'Lona de Publicidad · Tratamiento de Uñas',
    cardTitle: 'Diseño de Lona · Estilo Uñas',
    desc: 'Diseñamos la lona de publicidad que necesitas para que tu marca proyete lo que imaginas. Diseño moderno y adaptado.',
    cardDesc: 'Diseñamos tu lona de publicidad desde $99 pesos.',
    cat: 'fotos',
    badge: 'Lona de Publicidad',
    isNew: false,
    tags: ['Lona', 'Marketing'],
    lightboxTags: ['Canva', 'Lona', 'Publicidad'],
    img: 'https://i.ibb.co/ymshRjRT/Lona-Alejandra-Rubin-1.jpg',
    type: 'image'
  },
  {
    title: 'Edición de Video · Visualizer',
    cardTitle: 'Editamos tu video a tu gusto',
    desc: 'Edición de un video de música Visualizer con animaciones y efectos especiales.',
    cardDesc: 'Edición de Visualizer musical e interacción visual.',
    cat: 'video',
    badge: 'Edición de Video',
    isNew: false,
    tags: ['Edición', 'Video'],
    lightboxTags: ['Video', 'Edición', 'Visualizer', 'Publicidad'],
    url: 'https://www.youtube.com/watch?v=TT9qH5nSXx4&list=PLR4Zgwc32WNf3AMnBKuahu5pm4Dl2oQuw',
    img: 'https://i.ibb.co/PGFD4zDp/Captura-de-pantalla-22.png',
    type: 'image'
  }
];

// ---- PAGINACIÓN DEL GRID (para que no cargue todo de un jalón al escalar) ----
const PAGE_SIZE = 6;
let visibleCount = PAGE_SIZE;

// ---- RENDERIZAR PORTAFOLIO DINÁMICO ----
function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  let html = '';

  // Renderizar proyectos de la base de datos
  portfolioProjects.forEach((p, index) => {
    const isNewHTML = p.isNew ? `<div class="card-new">NUEVO</div>` : '';
    const tagsHTML = (p.tags || []).map(t => `<span class="card-tag">${t}</span>`).join('');
    
    html += `
      <div class="project-card" data-cat="${p.cat}" data-index="${index}">
        <div class="card-thumb">
          <img src="${p.img}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover" loading="lazy" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
          <div class="card-badge">${p.badge}</div>
          ${isNewHTML}
        </div>
        <div class="card-body">
          <div class="card-cat">${p.badge}</div>
          <div class="card-title">${p.cardTitle || p.title}</div>
          <div class="card-desc">${p.cardDesc || p.desc}</div>
          <div class="card-footer">
            <div class="card-tags">${tagsHTML}</div>
            <div class="card-arrow">→</div>
          </div>
        </div>
      </div>
    `;
  });

  // Renderizar los placeholders de "Próximamente más ejemplos" para cada categoría
  const placeholders = [
    { cat: 'invitaciones', icon: '🎉', text: 'Próximamente más invitaciones' },
    { cat: 'flyers', icon: '📢', text: 'Próximamente más flyers' },
    { cat: 'web', icon: '🌐', text: 'Próximos proyectos web' },
    { cat: 'fotos', icon: '📷', text: 'Próximos trabajos de edición' },
    { cat: 'video', icon: '🎬', text: 'Próximos proyectos de video' },
    { cat: 'campanas', icon: '🚀', text: 'Próximas campañas' }
  ];

  placeholders.forEach(pl => {
    html += `
      <div class="project-card" data-cat="${pl.cat} add-placeholder" data-placeholder-cat="${pl.cat}">
        <div class="add-card">
          <div class="add-icon">${pl.icon}</div>
          <div class="add-text">${pl.text}</div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;

  // Los placeholders siempre son visibles en la vista "Todo" (comportamiento original)
  // grid.querySelectorAll('.project-card[data-placeholder-cat]').forEach(c => c.classList.add('visible'));

  // Aplicar paginación a los proyectos reales
  applyPagination();

  // Registrar listeners de clic para abrir proyectos o placeholders
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const index = card.getAttribute('data-index');
      if (index !== null) {
        openProject(portfolioProjects[index]);
      } else {
        const placeholderCat = card.getAttribute('data-placeholder-cat');
        if (placeholderCat) {
          showAddPrompt(placeholderCat);
        }
      }
    });
  });
}

// ---- APLICAR VISIBILIDAD SEGÚN PÁGINA ACTUAL (solo vista "Todo") ----
function applyPagination() {
  const cards = document.querySelectorAll('#portfolio-grid .project-card[data-index]');
  cards.forEach((c, i) => {
    c.classList.toggle('visible', i < visibleCount);
  });

  const allLoaded = visibleCount >= cards.length;

  document.querySelectorAll('#portfolio-grid .project-card[data-placeholder-cat]').forEach(c => {
    c.classList.toggle('visible', allLoaded);
  });

  const loadMoreWrap = document.getElementById('load-more-wrap');
  if (loadMoreWrap) {
    loadMoreWrap.style.display = allLoaded ? 'none' : 'flex';
  }
}

function loadMoreProjects() {
  visibleCount = portfolioProjects.length;
  applyPagination();
}

// ---- BOTÓN "CARGAR MÁS" ----
function loadMoreProjects() {
  visibleCount += PAGE_SIZE;
  applyPagination();
}

// Inicializar el renderizado del portafolio
renderPortfolio();
renderTemporada();

// ---- CURSOR PERSONALIZADO (DESACTIVADO EN MÓVILES) ----
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let isTouchDevice = false;

// Detección robusta de dispositivos táctiles o móviles
if (window.matchMedia('(hover: none) and (pointer: coarse)').matches || 
    'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    window.innerWidth <= 1024) {
  isTouchDevice = true;
  if (cursor) cursor.style.display = 'none';
  if (ring) ring.style.display = 'none';
}

if (!isTouchDevice && cursor && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animRing() {
    if (isTouchDevice) return;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  // Delegación de eventos para efectos hover interactivos (soporta elementos estáticos y dinámicos)
  document.addEventListener('mouseover', e => {
    if (isTouchDevice) return;
    const target = e.target.closest('a, button, .project-card, .promo-card, .cat-btn, .service-card, .btn-primary, .btn-secondary, .nav-logo');
    if (target) {
      cursor.style.width = '24px';
      cursor.style.height = '24px';
      cursor.style.backgroundColor = 'rgba(232, 23, 93, 0.3)';
      ring.style.width = '48px';
      ring.style.height = '48px';
      ring.style.borderColor = 'rgba(255, 107, 53, 0.8)';
    }
  });

  document.addEventListener('mouseout', e => {
    if (isTouchDevice) return;
    const target = e.target.closest('a, button, .project-card, .promo-card, .cat-btn, .service-card, .btn-primary, .btn-secondary, .nav-logo');
    if (target) {
      cursor.style.width = '12px';
      cursor.style.height = '12px';
      cursor.style.backgroundColor = 'var(--acento)';
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(232, 23, 93, 0.5)';
    }
  });
}

// ---- MOBILE NAV (MENÚ HAMBURGUESA) ----
function toggleMobileNav() {
  const mn = document.getElementById('mobile-nav');
  const hb = document.getElementById('hamburger');
  if (mn && hb) {
    mn.classList.toggle('open');
    hb.classList.toggle('open');
    hb.setAttribute('aria-expanded', mn.classList.contains('open') ? 'true' : 'false');
  }
}

// ---- FILTROS PORTFOLIO ----
function filterCat(cat, btnEl) {
  // Quitar la clase activa de todos los botones de categoría
  document.querySelectorAll('.cat-nav .cat-btn').forEach(b => b.classList.remove('active'));
  
  // Asignar clase activa al botón actual
  if (btnEl) {
    btnEl.classList.add('active');
  } else {
    // Si se llama desde inline HTML sin parámetro 'this'
    const evt = window.event;
    if (evt && evt.target) {
      evt.target.classList.add('active');
    }
  }

  // Filtrar tarjetas
  if (cat === 'todo') {
    // En "Todo": placeholders siempre visibles, proyectos reales respetan la paginación
    // document.querySelectorAll('#portfolio-grid .project-card[data-placeholder-cat]').forEach(c => c.classList.add('visible'));
    applyPagination();
  } else {
    const loadMoreWrap = document.getElementById('load-more-wrap');
    if (loadMoreWrap) loadMoreWrap.style.display = 'none';
    document.querySelectorAll('#portfolio-grid .project-card').forEach(c => {
      const cats = c.dataset.cat ? c.dataset.cat.split(' ') : [];
      if (cats.includes(cat) || (cats.includes('add-placeholder') && cat !== 'todo')) {
        // Mostrar placeholder de agregar solo si corresponde a la categoría activa
        if (cats.includes('add-placeholder') && !cats.includes(cat)) {
          c.classList.remove('visible');
        } else {
          c.classList.add('visible');
        }
      } else {
        c.classList.remove('visible');
      }
    });
  }
}

// ---- LIGHTBOX PROMOS (SLIDER SUPERIOR) ----
// EDITAR: PROMO VISUALIZER — pega aquí el link de tu nueva imagen cuando la subas
const promo1Src = 'https://i.ibb.co/PsRMkfLv/Whats-App-Image-2026-08-25-at-4-06-38-PM.png';
const promo2Src = 'https://i.ibb.co/5gCmqtFX/Chat-GPT-Image-4-may-2026-07-05-08-p-m.png';
const promo3Src = 'https://i.ibb.co/NgJqp5DW/Chat-GPT-Image-5-may-2026-08-29-55-p-m.png';

function openLightbox(id) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lb-content');
  if (!lb || !content) return;

  if (id === 'promo1') {
    content.innerHTML = `
      <img class="lb-img" src="${promo1Src}" alt="Paquete 7 Visualizers + caratula" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
      <div class="lb-title">Paquete de 7 Visualizers + 1 carátula para tu disco</div>
      <div class="lb-desc">7 videos Visualizer + 1 imagen de carátula para tu disco. Todo por $300 pesos. Diseños enfocados en que se vea lo que tu cantas.</div>
      <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesa+el+Paquete+de+7+Visualizers+mas+caratula" target="_blank">💬 Quiero este paquete</a>`;
  } else if (id === 'promo2') {
    content.innerHTML = `
      <img class="lb-img" src="${promo2Src}" alt="Invitaciones Digitales" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
      <div class="lb-title">Invitaciones Digitales e Interactivas</div>
      <div class="lb-desc">Promo Primavera desde $249 pesos. Música, RSVP, diseño personalizado y entrega en 1 a 3 días.</div>
      <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesan+las+Invitaciones+Digitales" target="_blank">💬 Quiero mi invitación</a>`;
  } else if (id === 'promo3') {
    content.innerHTML = `
      <img class="lb-img" src="${promo3Src}" alt="Flyers" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
      <div class="lb-title">Flyers Publicitarios 100% Personalizados</div>
      <div class="lb-desc">Flyers Publicitarios a solo $99 pesos. Diseño personalizado y entrega en 1 a 3 días.</div>
      <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesa+un+flyer+como+este" target="_blank">💬 Quiero Este Flyer</a>`;
  }
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ---- DETECCIÓN DE PLATAFORMA DE VIDEO (TikTok / YouTube) ----
// EDITAR: si algún día cambian los formatos de URL de estas plataformas, ajustar aquí
function getTikTokId(url) {
  if (!url) return null;
  const match = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
  return match ? match[1] : null;
}

function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.slice(1).split('/')[0] || null;
    }
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/shorts/')) {
        return u.pathname.split('/shorts/')[1].split('/')[0];
      }
      if (u.pathname.startsWith('/embed/')) {
        return u.pathname.split('/embed/')[1].split('/')[0];
      }
      if (u.searchParams.get('v')) {
        return u.searchParams.get('v');
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

// ---- DETALLE DE PROYECTOS (PORTAFOLIO) ----
function openProject(p) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lb-content');
  if (!lb || !content) return;

  let mediaHTML = '';
  const tiktokId = getTikTokId(p.url);
  const youtubeId = !tiktokId ? getYouTubeId(p.url) : null;
  const isDemoWeb = !tiktokId && !youtubeId && p.url && p.url !== '#' && (p.badge === 'Invitación Web' || p.cat === 'web');

  if (tiktokId) {
    // El iframe de TikTok no cargaba de forma confiable, así que se usa una
    // vista previa en imagen que lleva directo al video real en TikTok.
    mediaHTML = `
      <a href="${p.url}" target="_blank" style="position:relative;display:inline-block;max-width:100%;max-height:45vh;margin-bottom:20px;border-radius:12px;overflow:hidden;">
        <img class="lb-img" src="${p.img || IMG_FALLBACK}" alt="${p.title}" style="margin-bottom:0;display:block;" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:70px;height:70px;background:rgba(232,23,93,0.9);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(232,23,93,0.6);pointer-events:none;">
          <span style="font-size:28px;margin-left:4px;color:white;">▶</span>
        </div>
      </a>
    `;
  } else if (youtubeId) {
    // Preview inmersivo del video de YouTube (Visualizer, etc.) en 16:9
    mediaHTML = `
      <div class="youtube-embed-container">
        <iframe src="https://www.youtube.com/embed/${youtubeId}" title="${p.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
  } else if (isDemoWeb) {
    mediaHTML = `
      <div class="phone-mockup">
        <div class="phone-screen">
          <div class="phone-loader" id="phone-loader">
            <div class="spinner"></div>
            <div style="margin-top:12px;font-size:13px;color:var(--gris-claro);">Cargando demo en vivo...</div>
          </div>
          <iframe class="phone-iframe" src="${p.url}" allowfullscreen onload="document.getElementById('phone-loader').style.display='none'"></iframe>
        </div>
      </div>
    `;
  } else if (p.type === 'image' && p.img) {
    const isVideoInvitation = p.badge === 'Invitación en video' || p.cat === 'video';
    const playOverlay = isVideoInvitation ? `
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:70px;height:70px;background:rgba(232,23,93,0.9);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(232,23,93,0.6);pointer-events:none;">
        <span style="font-size:28px;margin-left:4px;color:white;">▶</span>
      </div>
    ` : '';

    mediaHTML = `
      <div style="position:relative;display:inline-block;max-width:100%;max-height:45vh;margin-bottom:20px;border-radius:12px;overflow:hidden;">
        <img class="lb-img" src="${p.img}" alt="${p.title}" style="margin-bottom:0;display:block;" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
        ${playOverlay}
      </div>
    `;
  } else {
    mediaHTML = `<div style="height:200px;display:flex;align-items:center;justify-content:center;font-size:64px;margin-bottom:24px;">${p.icon || '🎨'}</div>`;
  }

  const tagsHTML = (p.lightboxTags || p.tags || []).map(t => `
    <span style="background:rgba(232,23,93,0.15);border:1px solid rgba(232,23,93,0.3);border-radius:50px;padding:4px 14px;font-size:12px;color:#e8175d;">${t}</span>
  `).join('');

  let linkHTML = '';
  if (p.url && p.url !== '#') {
    if (tiktokId) {
      linkHTML = `<a class="lb-link" href="${p.url}" target="_blank">🎬 Ver en TikTok</a>`;
    } else if (youtubeId) {
      linkHTML = `<a class="lb-link" href="${p.url}" target="_blank">▶️ Ver en YouTube</a>`;
    } else if (p.badge === 'Invitación en video') {
      linkHTML = `<a class="lb-link" href="${p.url}" target="_blank">🎬 Ver video en TikTok</a>`;
    } else if (p.cat === 'video') {
      linkHTML = `<a class="lb-link" href="${p.url}" target="_blank">🎬 Ver video completo</a>`;
    } else {
      linkHTML = `<a class="lb-link" href="${p.url}" target="_blank">🔗 Abrir en pantalla completa</a>`;
    }
  } else {
    linkHTML = `<a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Vi+el+proyecto+${encodeURIComponent(p.title)}+y+me+interesa+algo+similar" target="_blank">💬 Quiero algo así</a>`;
  }

  content.innerHTML = `
    ${mediaHTML}
    <div style="margin-top:16px;margin-bottom:8px;font-size:12px;color:var(--acento);letter-spacing:2px;text-transform:uppercase">${p.badge || ''}</div>
    <div class="lb-title">${p.title}</div>
    <div class="lb-desc">${p.desc}</div>
    <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:24px;">${tagsHTML}</div>
    ${linkHTML}
  `;
  
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ---- PROMPT DE "PRÓXIMAMENTE" ----
function showAddPrompt(cat) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lb-content');
  if (!lb || !content) return;

  content.innerHTML = `
    <div style="font-size:64px;margin-bottom:24px;">🚀</div>
    <div class="lb-title">¡Próximamente aquí!</div>
    <div class="lb-desc">Esta categoría está creciendo. ¿Tienes un proyecto en mente? ¡Hablemos y lo creamos juntos!</div>
    <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Me+interesa+un+proyecto+de+${encodeURIComponent(cat)}" target="_blank">💬 Cotizar proyecto</a>`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ---- CERRAR LIGHTBOX ----
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lb-content');
  if (lb) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  // Vaciar el contenido (incluye iframes de TikTok/YouTube/demos web) para que
  // dejen de reproducirse en segundo plano en cuanto se cierra el lightbox.
  if (content) {
    setTimeout(() => { content.innerHTML = ''; }, 300); // espera a que termine la transición de opacidad
  }
}

function closeLightboxOutside(e) {
  if (e.target === document.getElementById('lightbox')) {
    closeLightbox();
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ---- CARRUSEL INFINITO REUTILIZABLE (ARRASTRE + AUTO-SCROLL) ----
// Misma mecánica de siempre (loop infinito + drag + auto-scroll), ahora
// como función reutilizable: la usa la sección de "Promos" de arriba y,
// cuando hay 2+ ejemplos, también la sección de temporada (Halloween, etc).
function initInfiniteCarousel(wrapEl, trackEl, speed) {
  if (!wrapEl || !trackEl) return;

  // Duplicar contenido para loop infinito
  trackEl.innerHTML += trackEl.innerHTML;

  let isDown = false;
  let startX;
  let scrollLeftStart;
  let autoScrollActive = true;
  const autoScrollSpeed = speed || 1.55; // píxeles por frame
  let resumeTimer = null;
  let moved = false;
  let currentScroll = 0;

  // Inicializar posición de inicio en la mitad del track (evita topes iniciales)
  setTimeout(() => {
    const halfWidth = trackEl.scrollWidth / 2;
    wrapEl.scrollLeft = halfWidth;
    currentScroll = halfWidth;
  }, 100);

  // Interceptar clics en las tarjetas (evitar clic al arrastrar)
  const cards = trackEl.querySelectorAll('.promo-card');
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }, true); // Usar capturing phase
  });

  // Reajuste continuo (scroll wrapping) bidireccional y suave para infinito real
  wrapEl.addEventListener('scroll', () => {
    const halfWidth = trackEl.scrollWidth / 2;
    if (halfWidth <= 0) return;
    const current = wrapEl.scrollLeft;

    // Rango seguro: [halfWidth / 2, halfWidth * 1.5]
    if (current < halfWidth / 2) {
      wrapEl.scrollLeft = current + halfWidth;
      currentScroll = wrapEl.scrollLeft;
    } else if (current > halfWidth * 1.5) {
      wrapEl.scrollLeft = current - halfWidth;
      currentScroll = wrapEl.scrollLeft;
    }
  }, { passive: true });

  // Eventos de ratón para drag en escritorio
  wrapEl.addEventListener('mousedown', (e) => {
    isDown = true;
    moved = false;
    wrapEl.classList.add('active');
    startX = e.pageX - wrapEl.offsetLeft;
    scrollLeftStart = wrapEl.scrollLeft;
    autoScrollActive = false;
    clearTimeout(resumeTimer);
  });

  wrapEl.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      wrapEl.classList.remove('active');
      resumeAutoScroll();
    }
  });

  wrapEl.addEventListener('mouseup', () => {
    isDown = false;
    wrapEl.classList.remove('active');
    resumeAutoScroll();
  });

  wrapEl.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapEl.offsetLeft;
    const walk = (x - startX) * 1.5; // velocidad del drag
    if (Math.abs(walk) > 5) {
      moved = true;
    }
    wrapEl.scrollLeft = scrollLeftStart - walk;
  });

  // Eventos touch para móviles
  wrapEl.addEventListener('touchstart', () => {
    autoScrollActive = false;
    clearTimeout(resumeTimer);
  }, { passive: true });

  wrapEl.addEventListener('touchend', () => {
    resumeAutoScroll();
  }, { passive: true });

  function resumeAutoScroll() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      autoScrollActive = true;
      currentScroll = wrapEl.scrollLeft; // Sincronizar posición actual al reanudar
    }, 1500); // 1.5s antes de retomar el auto-scroll
  }

  // Bucle de animación por frames
  function autoScrollStepGeneric() {
    if (autoScrollActive && !isDown) {
      currentScroll += autoScrollSpeed;
      wrapEl.scrollLeft = currentScroll;
      currentScroll = wrapEl.scrollLeft; // Re-leer para mantener sincronía
    }
    requestAnimationFrame(autoScrollStepGeneric);
  }
  requestAnimationFrame(autoScrollStepGeneric);
}

// ---- PROMO TRACK (arriba del todo) usando el carrusel reutilizable ----
initInfiniteCarousel(document.querySelector('.promo-section'), document.getElementById('promo-track'), 1.55);

// ---- CARRUSEL DE TESTIMONIOS (CAPTURAS) ----
const testimonialsWrap = document.querySelector('.testimonials-carousel-wrap');
const testimonialsTrack = document.getElementById('testimonials-track');
let testimonialShotSrcs = [];

if (testimonialsWrap && testimonialsTrack) {
  // Guardar los src originales (los 6 reales) antes de duplicar para el loop infinito
  testimonialShotSrcs = Array.from(testimonialsTrack.querySelectorAll('img')).map(img => img.getAttribute('src') || '');
  testimonialsTrack.innerHTML += testimonialsTrack.innerHTML;

  let isDown = false;
  let startX;
  let scrollLeftStart;
  let autoScrollActive = true;
  let autoScrollSpeed = 1.5; // píxeles por frame
  let resumeTimer = null;
  let moved = false;
  let currentScroll = 0;

  // Inicializar posición de inicio en la mitad del track (evita topes iniciales)
  setTimeout(() => {
    const halfWidth = testimonialsTrack.scrollWidth / 2;
    testimonialsWrap.scrollLeft = halfWidth;
    currentScroll = halfWidth;
  }, 100);

  // Registrar clics individuales (solo si no se arrastró)
  testimonialsTrack.querySelectorAll('.testimonial-shot').forEach((shot, i) => {
    shot.addEventListener('click', (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
      } else {
        openTestimonialImage(i % testimonialShotSrcs.length);
      }
    });
  });

  // Reajuste continuo (scroll wrapping) bidireccional y suave para infinito real
  testimonialsWrap.addEventListener('scroll', () => {
    const halfWidth = testimonialsTrack.scrollWidth / 2;
    if (halfWidth <= 0) return;
    const current = testimonialsWrap.scrollLeft;
    
    // Rango seguro: [halfWidth / 2, halfWidth * 1.5]
    if (current < halfWidth / 2) {
      testimonialsWrap.scrollLeft = current + halfWidth;
      currentScroll = testimonialsWrap.scrollLeft;
    } else if (current > halfWidth * 1.5) {
      testimonialsWrap.scrollLeft = current - halfWidth;
      currentScroll = testimonialsWrap.scrollLeft;
    }
  }, { passive: true });

  // Eventos de ratón para drag & drop en escritorio
  testimonialsWrap.addEventListener('mousedown', (e) => {
    isDown = true;
    moved = false;
    testimonialsWrap.classList.add('active');
    startX = e.pageX - testimonialsWrap.offsetLeft;
    scrollLeftStart = testimonialsWrap.scrollLeft;
    autoScrollActive = false;
    clearTimeout(resumeTimer);
  });

  testimonialsWrap.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      testimonialsWrap.classList.remove('active');
      resumeAutoScroll();
    }
  });

  testimonialsWrap.addEventListener('mouseup', () => {
    isDown = false;
    testimonialsWrap.classList.remove('active');
    resumeAutoScroll();
  });

  testimonialsWrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialsWrap.offsetLeft;
    const walk = (x - startX) * 1.5; // velocidad del drag
    if (Math.abs(walk) > 5) {
      moved = true;
    }
    testimonialsWrap.scrollLeft = scrollLeftStart - walk;
  });

  // Eventos touch (móviles) para pausar y reanudar el auto-scroll
  testimonialsWrap.addEventListener('touchstart', () => {
    autoScrollActive = false;
    clearTimeout(resumeTimer);
  }, { passive: true });

  testimonialsWrap.addEventListener('touchend', () => {
    resumeAutoScroll();
  }, { passive: true });

  function resumeAutoScroll() {
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      autoScrollActive = true;
      currentScroll = testimonialsWrap.scrollLeft; // Sincronizar posición actual al reanudar
    }, 1500); // 1.5s antes de retomar el auto-scroll
  }

  // Bucle de animación por frames
  function autoScrollStep() {
    if (autoScrollActive && !isDown) {
      currentScroll += autoScrollSpeed;
      testimonialsWrap.scrollLeft = currentScroll;
      currentScroll = testimonialsWrap.scrollLeft; // Re-leer para mantener sincronía
    }
    requestAnimationFrame(autoScrollStep);
  }
  requestAnimationFrame(autoScrollStep);
}

// ---- ABRIR CAPTURA DE TESTIMONIO EN GRANDE (LIGHTBOX) ----
function openTestimonialImage(i) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lb-content');
  if (!lb || !content) return;
  const src = testimonialShotSrcs[i] || '';
  content.innerHTML = `
    <img class="lb-img" src="${src}" alt="Captura de reseña de cliente" onerror="this.onerror=null;this.src='${IMG_FALLBACK}'">
    <a class="lb-link" href="https://wa.me/526182530067?text=Hola+Angel!+Vi+tu+portafolio+y+me+interesa+un+proyecto" target="_blank">💬 Contactar por Whatsapp</a>`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ---- REVEAL ON SCROLL ----
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });
reveals.forEach(el => obs.observe(el));

// ---- NAVBAR shrink (REDUCIR AL BAJAR SCROLL) ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.style.padding = window.scrollY > 60 ? '10px 32px' : '16px 32px';
  }
}, { passive: true });

// ---- BOTÓN SCROLL TO TOP ----
const btnTop = document.getElementById('btn-top');
window.addEventListener('scroll', () => {
  if (btnTop) {
    btnTop.classList.toggle('visible', window.scrollY > 400);
  }
}, { passive: true });
