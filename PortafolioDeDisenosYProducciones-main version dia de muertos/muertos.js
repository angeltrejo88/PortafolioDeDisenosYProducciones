/* ==========================================================
   MÓDULO DÍA DE MUERTOS — AT Design Studio
   Archivo temporal para la temporada de Día de Muertos.
   Para quitarlo: borra este archivo, muertos.css, y las líneas
   marcadas <!-- EDITAR: ... --> en index.html. Nada de esto
   toca script.js ni style.css.
   ========================================================== */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  // ---------------------------------------------
  // 1. COLGANTES BAJO EL NAVBAR — OPTIMIZADOS (0% CPU EN REPOSO)
  //    Cempasúchil, calaverita y veladora que se mecen con el scroll
  // ---------------------------------------------
  const cuerda = document.getElementById('halloweenCuerda');

  if (cuerda) {
    const iconos = ['🌼', '💀', '🕯️'];
    const totalColgantes = Math.ceil(window.innerWidth / 34) + 4;
    for (let i = 0; i < totalColgantes; i++) {
      const c = document.createElement('div');
      c.className = 'colgante';
      c.textContent = iconos[i % iconos.length];
      cuerda.appendChild(c);
    }
    const colgantes = Array.from(cuerda.querySelectorAll('.colgante'));

    if (!reduceMotion && colgantes.length) {
      let scrollEnergy = 0;
      let targetEnergy = 0;
      let lastY = window.scrollY;
      let isColgantesMoving = false;
      let isBrisaRunning = false;
      let t = 0;

      function onScrollBrisa() {
        const y = window.scrollY;
        const delta = Math.abs(y - lastY);
        lastY = y;
        targetEnergy = Math.min(targetEnergy + delta * 0.08, 12);

        // Despertar el bucle solo cuando hay movimiento de scroll
        if (!isBrisaRunning) {
          isBrisaRunning = true;
          requestAnimationFrame(brisaLoop);
        }
      }
      window.addEventListener('scroll', onScrollBrisa, { passive: true });

      function brisaLoop() {
        scrollEnergy += (targetEnergy - scrollEnergy) * 0.12;
        targetEnergy *= 0.93;

        if (scrollEnergy > 0.04) {
          isColgantesMoving = true;
          t += 0.04 + scrollEnergy * 0.008;

          colgantes.forEach((c, i) => {
            const fase = i * 0.35;
            const angulo = Math.sin(t - fase) * scrollEnergy * 1.3;
            c.style.transform = `rotate(${angulo.toFixed(2)}deg)`;
          });
          requestAnimationFrame(brisaLoop);
        } else {
          // Detener el bucle y resetear para 0% consumo de batería en reposo
          if (isColgantesMoving) {
            isColgantesMoving = false;
            colgantes.forEach(c => {
              c.style.transform = '';
            });
          }
          isBrisaRunning = false;
        }
      }
    }
  }

  // ---------------------------------------------
  // 2. NIEBLA CÁLIDA INTERACTIVA + PÉTALOS DE CEMPASÚCHIL (HEADER / HERO)
  //    0 KB de descarga externa, partículas procedurales en memoria,
  //    reacciona al mouse y al tacto, se pausa fuera de pantalla.
  // ---------------------------------------------
  const fogCanvas = document.getElementById('halloweenFogCanvas');
  const heroSection = document.getElementById('inicio') || document.querySelector('.hero');

  if (fogCanvas && heroSection) {
    const ctx = fogCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animFrameId = null;
    let isHeroVisible = true;

    // Generar texturas de humo orgánico en memoria (Offscreen Canvas en 2ms)
    function createSmokeTexture(r, g, b) {
      const size = 180;
      const oc = document.createElement('canvas');
      oc.width = size;
      oc.height = size;
      const octx = oc.getContext('2d');
      const cx = size / 2;
      const cy = size / 2;
      const rad = size / 2;

      const grad = octx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grad.addColorStop(0, `rgba(${r},${g},${b},0.85)`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},0.45)`);
      grad.addColorStop(0.7, `rgba(${r},${g},${b},0.15)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

      octx.fillStyle = grad;
      octx.beginPath();
      octx.arc(cx, cy, rad, 0, Math.PI * 2);
      octx.fill();

      // Nódulos de humo irregulares para volumen realista
      const lobes = [
        { x: cx - 26, y: cy - 18, r: 46, a: 0.3 },
        { x: cx + 28, y: cy - 20, r: 52, a: 0.28 },
        { x: cx - 18, y: cy + 24, r: 50, a: 0.3 },
        { x: cx + 22, y: cy + 18, r: 54, a: 0.32 }
      ];
      lobes.forEach(l => {
        const lg = octx.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.r);
        lg.addColorStop(0, `rgba(${r},${g},${b},${l.a})`);
        lg.addColorStop(0.55, `rgba(${r},${g},${b},${l.a * 0.35})`);
        lg.addColorStop(1, `rgba(${r},${g},${b},0)`);
        octx.fillStyle = lg;
        octx.beginPath();
        octx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
        octx.fill();
      });

      return oc;
    }

    const spriteAmarillo = createSmokeTexture(255, 183, 3);   // Cempasúchil
    const spriteNaranja = createSmokeTexture(255, 106, 0);    // Fuego de veladora
    const spriteCalido = createSmokeTexture(255, 214, 120);   // Luz cálida / copal

    // Ajuste de densidad según pantalla
    const maxParticles = isMobile ? 14 : 26;
    const maxPetals = isMobile ? 8 : 16;
    const particles = [];
    const petals = [];

    // Estado del cursor para interacción con la niebla
    let mouse = { x: -9999, y: -9999, active: false };

    function resizeCanvas() {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      fogCanvas.width = width * dpr;
      fogCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initFogParticles() {
      particles.length = 0;
      for (let i = 0; i < maxParticles; i++) {
        const spriteChoice = Math.random();
        const sprite = spriteChoice < 0.45 ? spriteNaranja : (spriteChoice < 0.8 ? spriteAmarillo : spriteCalido);

        particles.push({
          x: Math.random() * (width + 300) - 150,
          y: height * 0.25 + Math.random() * (height * 0.75),
          baseSize: 220 + Math.random() * (isMobile ? 180 : 320),
          scale: 0.8 + Math.random() * 0.5,
          vx: 0.25 + Math.random() * 0.45,
          vyPhase: Math.random() * Math.PI * 2,
          vyAmp: 0.15 + Math.random() * 0.25,
          angle: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.003,
          alpha: 0.12 + Math.random() * 0.18,
          sprite: sprite
        });
      }

      // Pétalos de cempasúchil que suben y se mecen
      petals.length = 0;
      for (let i = 0; i < maxPetals; i++) {
        const colorChoice = Math.random();
        const w = 2.2 + Math.random() * 2.2; // medio ancho del pétalo
        petals.push({
          x: Math.random() * width,
          y: Math.random() * height,
          w: w,
          h: w * 2.1, // pétalo alargado
          vy: 0.35 + Math.random() * 0.6,
          vx: (Math.random() - 0.5) * 0.3,
          phase: Math.random() * Math.PI * 2,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.02,
          color: colorChoice < 0.5 ? 'rgba(255,183,3,' : (colorChoice < 0.8 ? 'rgba(255,106,0,' : 'rgba(255,214,90,')
        });
      }
    }

    resizeCanvas();
    initFogParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
    }, { passive: true });

    // Capturar interacción del cursor sobre el Hero
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      mouse.active = false;
    }, { passive: true });

    heroSection.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const rect = heroSection.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;
      }
    }, { passive: true });

    heroSection.addEventListener('touchend', () => {
      mouse.active = false;
    }, { passive: true });

    let tFog = 0;

    function renderFog() {
      if (!isHeroVisible) return;

      ctx.clearRect(0, 0, width, height);
      tFog += 0.012;

      // 1. Renderizar nubes de niebla volumétrica
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Desplazamiento horizontal continuo
        p.x += p.vx;
        p.y += Math.sin(tFog + p.vyPhase) * p.vyAmp;
        p.angle += p.vRot;

        // Reacción al cursor (la niebla se abre y arremolina orgánicamente)
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = isMobile ? 140 : 200;

          if (distSq < maxDist * maxDist && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / maxDist) * 1.5;
            p.x += (dx / dist) * force * 1.8;
            p.y += (dy / dist) * force * 1.8;
          }
        }

        // Loop continuo por los bordes del canvas
        const halfSize = (p.baseSize * p.scale) / 2;
        if (p.x - halfSize > width) {
          p.x = -halfSize - 40;
          p.y = height * 0.25 + Math.random() * (height * 0.75);
        }

        // Dibujar partícula con transformación y rotación suave
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        const curSize = p.baseSize * p.scale;
        ctx.drawImage(p.sprite, -curSize / 2, -curSize / 2, curSize, curSize);
        ctx.restore();
      }

      // 2. Renderizar pétalos de cempasúchil flotantes
      for (let j = 0; j < petals.length; j++) {
        const pt = petals[j];
        pt.y -= pt.vy;
        pt.x += pt.vx + Math.sin(tFog * 1.5 + pt.phase) * 0.35;
        pt.rot += pt.vRot;

        if (pt.y < -12) {
          pt.y = height + 12;
          pt.x = Math.random() * width;
        }

        const alphaPetalo = 0.55 + Math.sin(tFog * 2 + pt.phase) * 0.2;
        ctx.save();
        ctx.translate(pt.x, pt.y);
        // el pétalo se mece de lado a lado mientras sube
        ctx.rotate(pt.rot + Math.sin(tFog * 1.2 + pt.phase) * 0.6);
        ctx.fillStyle = pt.color + alphaPetalo.toFixed(2) + ')';
        ctx.beginPath();
        ctx.ellipse(0, 0, pt.w, pt.h, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(renderFog);
    }

    // IntersectionObserver: pausar animación cuando el hero no esté visible (ahorro total de batería)
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isHeroVisible = entry.isIntersecting;
          if (isHeroVisible && !animFrameId) {
            animFrameId = requestAnimationFrame(renderFog);
          } else if (!isHeroVisible && animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
          }
        });
      }, { threshold: 0.05 });

      heroObserver.observe(heroSection);
    } else {
      animFrameId = requestAnimationFrame(renderFog);
    }

    if (reduceMotion) {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    }
  }

  // ---------------------------------------------
  // 3. CONTADOR — HONRAR A NUESTROS FIELES DIFUNTOS
  //    Cuenta regresiva al 2 de noviembre a las 00:00
  // ---------------------------------------------
  const cdWrap = document.getElementById('muertos-countdown-section');
  if (cdWrap) {
    // EDITAR: DÍA DE MUERTOS — cambia el año si reutilizas esto en otra temporada
    const fechaMuertos = new Date(2026, 10, 2, 0, 0, 0);  // 2 de noviembre 00:00
    const fechaFin = new Date(2026, 10, 3, 0, 0, 0);      // 3 de noviembre 00:00 (se oculta el bloque)

    const ORNAMENTO = '💀🌼🕯️🌼💀';

    function mostrarMensajeFinal() {
      cdWrap.innerHTML = `
        <section class="muertos-countdown" aria-label="Hoy es Día de Muertos">
          <h2 class="countdown-title" style="margin-bottom:0">🌼 Hoy honramos su memoria · ¡Vivan nuestros muertos! 🌼</h2>
          <div class="countdown-ornamento" aria-hidden="true">${ORNAMENTO}</div>
        </section>
      `;
    }

    const ahoraInicial = new Date();

    if (ahoraInicial >= fechaFin) {
      // Ya pasó el Día de Muertos: no se muestra nada
      cdWrap.innerHTML = '';
    } else if (ahoraInicial >= fechaMuertos) {
      mostrarMensajeFinal();
    } else {
      cdWrap.innerHTML = `
        <section class="muertos-countdown" aria-label="Cuenta regresiva para Día de Muertos">
          <div class="countdown-warning">🕯️ Pronto volverán a casa quienes siempre nos acompañan 🕯️</div>
          <h2 class="countdown-title">🌼 Falta poco para honrarlos 🌼</h2>
          <div class="countdown-grid">
            <div class="countdown-unit"><span class="countdown-num" id="cdDias">00</span><span class="countdown-label">Días</span></div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit"><span class="countdown-num" id="cdHoras">00</span><span class="countdown-label">Horas</span></div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit"><span class="countdown-num" id="cdMin">00</span><span class="countdown-label">Min</span></div>
            <div class="countdown-sep">:</div>
            <div class="countdown-unit"><span class="countdown-num" id="cdSeg">00</span><span class="countdown-label">Seg</span></div>
          </div>
          <p class="countdown-cierre">Para Honrar a Nuestros Fieles Difuntos</p>
          <div class="countdown-ornamento" aria-hidden="true">${ORNAMENTO}</div>
        </section>
      `;

      const elDias = document.getElementById('cdDias');
      const elHoras = document.getElementById('cdHoras');
      const elMin = document.getElementById('cdMin');
      const elSeg = document.getElementById('cdSeg');

      const pad = n => String(n).padStart(2, '0');
      let intervalo;

      function actualizarContador() {
        const restante = fechaMuertos - new Date();

        if (restante <= 0) {
          mostrarMensajeFinal();
          clearInterval(intervalo);
          return;
        }

        elDias.textContent = pad(Math.floor(restante / 86400000));
        elHoras.textContent = pad(Math.floor((restante % 86400000) / 3600000));
        elMin.textContent = pad(Math.floor((restante % 3600000) / 60000));
        elSeg.textContent = pad(Math.floor((restante % 60000) / 1000));
      }

      actualizarContador();
      intervalo = setInterval(actualizarContador, 1000);
    }
  }

})();
