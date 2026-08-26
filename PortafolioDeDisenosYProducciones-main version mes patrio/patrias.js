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

  // NOTA: se quitó el canvas de confeti + fuegos artificiales (consumía
  // CPU/batería de forma continua en todas las páginas). Solo quedan
  // el banner de arriba y los banderines colgando.
})();
