/* ==========================================================
   MÓDULO HALLOWEEN — AT Design Studio
   Archivo temporal para la temporada de Halloween.
   Para quitarlo: borra este archivo, halloween.css, y las líneas
   marcadas <!-- EDITAR: HALLOWEEN --> en index.html. Nada de esto
   toca script.js ni style.css.
   ========================================================== */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------
  // COLGANTES — cuelgan justo debajo del navbar y se mecen
  // individualmente como una brisa (nunca se salen del marco)
  // ---------------------------------------------
  const cuerda = document.getElementById('halloweenCuerda');

  if (cuerda) {
    const iconos = ['🎃', '🦇', '👻'];
    const totalColgantes = Math.ceil(window.innerWidth / 34) + 4;
    for (let i = 0; i < totalColgantes; i++) {
      const c = document.createElement('div');
      c.className = 'colgante';
      c.textContent = iconos[i % iconos.length];
      cuerda.appendChild(c);
    }
    const colgantes = Array.from(cuerda.querySelectorAll('.colgante'));

    if (!reduceMotion && colgantes.length) {
      let scrollEnergy = 0; // "energía" acumulada por el scroll
      let targetEnergy = 0; // objetivo de energía al que transicionamos suavemente
      let lastY = window.scrollY;
      let isColgantesMoving = false;

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
        // Interpolación para suavizar el inicio y fin del vaivén
        scrollEnergy += (targetEnergy - scrollEnergy) * 0.12;
        // Decaimiento rápido de la energía cuando se detiene el scroll
        targetEnergy *= 0.93;

        if (scrollEnergy > 0.04) {
          isColgantesMoving = true;
          // El tiempo avanza según la energía, haciendo que se muevan más al scroll rápido
          t += 0.04 + scrollEnergy * 0.008;

          colgantes.forEach((c, i) => {
            // Onda viajera progresiva de izquierda a derecha (t - i * 0.35)
            const fase = i * 0.35;
            const angulo = Math.sin(t - fase) * scrollEnergy * 1.3;
            c.style.transform = `rotate(${angulo.toFixed(2)}deg)`;
          });
        } else if (isColgantesMoving) {
          // Cuando se detiene por completo el scroll, reseteamos la posición
          // a 0 (quietos 100%) y paramos de escribir en el DOM para optimizar CPU.
          isColgantesMoving = false;
          colgantes.forEach(c => {
            c.style.transform = '';
          });
        }

        requestAnimationFrame(brisaLoop);
      })();
    }
  }
})();
