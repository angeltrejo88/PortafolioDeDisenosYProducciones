/* ==========================================================
   MÓDULO FIESTAS PATRIAS — AT Design Studio
   Archivo temporal para el 15/16 de septiembre.
   Para quitarlo: borra este archivo, patrias.css, y las líneas
   marcadas <!-- EDITAR: PATRIAS --> en index.html. Nada de esto
   toca script.js ni style.css.
   ========================================================== */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------
  // 1) BANDERINES — cuelgan justo debajo del navbar y ondulan
  //    individualmente como una brisa (nunca se salen del marco)
  // ---------------------------------------------
  const banderinesWrap = document.getElementById('patriasBanderines');
  const cuerda = document.getElementById('patriasCuerda');

  if (cuerda) {
    const colores = ['bandera--verde', 'bandera--blanco', 'bandera--rojo'];
    const totalBanderines = Math.ceil(window.innerWidth / 36) + 4;
    for (let i = 0; i < totalBanderines; i++) {
      const f = document.createElement('div');
      f.className = 'bandera ' + colores[i % 3];
      cuerda.appendChild(f);
    }
    const banderas = Array.from(cuerda.querySelectorAll('.bandera'));

    if (!reduceMotion && banderas.length) {
      let scrollEnergy = 0; // "energía" acumulada por el scroll
      let targetEnergy = 0; // objetivo de energía al que transicionamos suavemente
      let lastY = window.scrollY;
      let isBanderinesMoving = false;

      function onScrollBrisa() {
        const y = window.scrollY;
        const delta = Math.abs(y - lastY);
        lastY = y;
        // Acumular energía proporcional a la velocidad del scroll, con un límite
        targetEnergy = Math.min(targetEnergy + delta * 0.08, 12);
      }
      window.addEventListener('scroll', onScrollBrisa, { passive: true });

      let t = 0;
      (function brisaLoop() {
        // Interpolación para suavizar el inicio y fin de la ondulación
        scrollEnergy += (targetEnergy - scrollEnergy) * 0.12;
        // Decaimiento rápido de la energía cuando se detiene el scroll
        targetEnergy *= 0.93;

        if (scrollEnergy > 0.04) {
          isBanderinesMoving = true;
          // El tiempo avanza según la energía, haciendo que se mueva más dinámicamente al scroll rápido
          t += 0.04 + scrollEnergy * 0.008;

          banderas.forEach((b, i) => {
            // Onda viajera progresiva de izquierda a derecha (t - i * 0.35)
            const fase = i * 0.35;
            const angulo = Math.sin(t - fase) * scrollEnergy * 1.3;
            b.style.transform = `rotate(${angulo.toFixed(2)}deg)`;
          });
        } else if (isBanderinesMoving) {
          // Cuando se detiene por completo el scroll, reseteamos la posición
          // a 0 (quietos 100%) y paramos de escribir en el DOM para optimizar CPU.
          isBanderinesMoving = false;
          banderas.forEach(b => {
            b.style.transform = '';
          });
        }

        requestAnimationFrame(brisaLoop);
      })();
    }
  }

  // ---------------------------------------------
  // 2) CONFETI + FUEGOS ARTIFICIALES — canvas de fondo
  // ---------------------------------------------
  const canvas = document.getElementById('patriasCanvas');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    const COLORES_MX = ['#1a7a43', '#f5f5f0', '#d4152e'];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // --- Confeti flotante (denso bajo, para no saturar el diseño) ---
    const CONFETI_TOTAL = window.innerWidth < 600 ? 22 : 42;
    const confeti = [];
    for (let i = 0; i < CONFETI_TOTAL; i++) {
      confeti.push(crearConfeti());
    }
    function crearConfeti(y) {
      return {
        x: Math.random() * canvas.width,
        y: y !== undefined ? y : Math.random() * canvas.height,
        size: 3 + Math.random() * 4,
        color: COLORES_MX[Math.floor(Math.random() * 3)],
        speedY: 0.4 + Math.random() * 0.8,
        speedX: (Math.random() - 0.5) * 0.6,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.08,
        opacity: 0.35 + Math.random() * 0.35
      };
    }

    // --- Fuegos artificiales (estallidos periódicos) ---
    let particulasFuego = [];
    function lanzarFuego() {
      const originX = canvas.width * (0.15 + Math.random() * 0.7);
      const originY = canvas.height * (0.12 + Math.random() * 0.28);
      const totalChispas = 26;
      for (let i = 0; i < totalChispas; i++) {
        const ang = (Math.PI * 2 * i) / totalChispas;
        const speed = 1.2 + Math.random() * 1.8;
        particulasFuego.push({
          x: originX,
          y: originY,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          color: COLORES_MX[Math.floor(Math.random() * 3)],
          life: 1,
          decay: 0.012 + Math.random() * 0.01
        });
      }
    }
    // Primer estallido con algo de retraso, luego cada 5-8s aprox.
    let fuegoTimer = setTimeout(function programarFuego() {
      lanzarFuego();
      fuegoTimer = setTimeout(programarFuego, 5000 + Math.random() * 3000);
    }, 2500);

    function dibujarConfeti(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
      ctx.restore();
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Confeti
      confeti.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.spin;
        if (p.y > canvas.height + 10) {
          Object.assign(p, crearConfeti(-10));
        }
        dibujarConfeti(p);
      });

      // Fuegos artificiales
      particulasFuego = particulasFuego.filter(f => f.life > 0);
      particulasFuego.forEach(f => {
        f.x += f.vx;
        f.y += f.vy;
        f.vy += 0.02; // gravedad leve
        f.life -= f.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(f.life, 0);
        ctx.fillStyle = f.color;
        ctx.beginPath();
        ctx.arc(f.x, f.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
})();
