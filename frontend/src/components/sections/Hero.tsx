import { useEffect, useRef, useState } from 'react';
import { ClientOnly } from 'vite-react-ssg';
import { MeshGradient } from '@paper-design/shaders-react';
import logoFlai from '@/assets/images/logos/logo-FLAI.png';
import logoMayia from '@/assets/images/logos/mayiaLogoBlanco.png';
import hechoEnMexico from '@/assets/images/logos/hechoEnMexico.svg';
import nubeFlai from '@/assets/images/logos/nubeFlaiP.png';
import './Hero.css';

// Progreso de scroll dentro de la sección (0 = arriba, 1 = fondo). Independiente de la altura.
function scrollProgress(section: HTMLElement | null) {
  if (!section) return 0;
  const total = section.offsetHeight - window.innerHeight;
  if (total <= 0) return 0;
  return Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total));
}

/* ────────────────────────────────────────────────────────────────────
   smoothScrollTo — scroll programático robusto que usa rAF.
   Reemplaza scrollIntoView({ behavior:'smooth' }) que se traba en
   algunos browsers cuando hay listeners de scroll concurrentes.
   ──────────────────────────────────────────────────────────────────── */
function smoothScrollTo(targetY: number, duration: number, onDone?: () => void) {
  const from = window.scrollY;
  const dist = targetY - from;
  if (Math.abs(dist) < 2) {
    window.scrollTo(0, targetY);
    onDone?.();
    return 0;
  }
  const t0 = performance.now();
  let raf = 0;
  const tick = (now: number) => {
    const k = Math.min(1, (now - t0) / duration);
    const eased = k * k * (3 - 2 * k); // smoothstep
    window.scrollTo(0, from + dist * eased);
    if (k < 1) {
      raf = requestAnimationFrame(tick);
    } else {
      onDone?.();
    }
  };
  raf = requestAnimationFrame(tick);
  return raf;
}

// ── Capa VISUAL ────────────────────────────────────────────────────────────
// WebGL (MeshGradient), scroll, rAF e IntersectionObserver. Solo en cliente.
// El Hero es splash puro: el h1/contenido SEO vive en la sección que sigue
// al whiteout (Overview), en el HTML estático.
function HeroVisual() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  // Pausa el shader animado cuando el Hero sale de vista (estás en el dashboard).
  const [active, setActive] = useState(true);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Refs de control ──────────────────────────────────────────────
  const snappedRef = useRef(false);       // ¿ya hicimos snap al dashboard?
  const snappingRef = useRef(false);      // ¿el snap está en progreso?
  const autoRafRef = useRef<number>(0);   // rAF del auto-zoom
  const snapRafRef = useRef<number>(0);   // rAF del snap al dashboard
  const autoCancelledRef = useRef(false); // usuario tomó el control

  const cancelAuto = () => {
    autoCancelledRef.current = true;
    if (autoRafRef.current) {
      cancelAnimationFrame(autoRafRef.current);
      autoRafRef.current = 0;
    }
  };

  // Cancela TODOS los scrolls programáticos (auto-zoom + snap)
  const cancelAll = () => {
    cancelAuto();
    if (snapRafRef.current) {
      cancelAnimationFrame(snapRafRef.current);
      snapRafRef.current = 0;
    }
    snappingRef.current = false;
  };

  // ── Scroll visual updates ────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const p = scrollProgress(sectionRef.current);

      // Actualizar capas visuales
      if (overlayRef.current) overlayRef.current.style.opacity = String(1 - p * 1.6);
      // La nube se acerca (zoom) conforme bajas, hasta envolver la pantalla.
      if (cloudRef.current) cloudRef.current.style.transform = `scale(${1 + p * 5})`;
      // El blanco entra en el último tramo del zoom (0.5 -> 0.85).
      if (fogRef.current) fogRef.current.style.opacity = String(Math.max(0, (p - 0.5) / 0.35));

      // Whiteout completo → entregamos al dashboard de inmediato (una sola vez).
      if (p >= 0.85 && !snappedRef.current && !snappingRef.current) {
        snappedRef.current = true;
        snappingRef.current = true;
        cancelAuto(); // que el tween no pelee con el snap

        const dash = document.querySelector('.dashboard');
        if (dash) {
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          const dashTop = dash.getBoundingClientRect().top + window.scrollY;

          if (reduce) {
            // Accesibilidad: salto inmediato
            window.scrollTo(0, dashTop);
            snappingRef.current = false;
          } else {
            // Scroll suave programático (no scrollIntoView que se traba)
            snapRafRef.current = smoothScrollTo(dashTop, 600, () => {
              snappingRef.current = false;
              snapRafRef.current = 0;
            });
          }
        } else {
          snappingRef.current = false;
        }
      }

      // Solo rearmar cuando estamos bien arriba Y no hay snap en curso
      if (p < 0.3 && !snappingRef.current) {
        snappedRef.current = false;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Auto-zoom ────────────────────────────────────────────────────
  // Sin pedir scroll. Tras una pausa la nube se acerca sola y entra al
  // dashboard. Si el usuario toma el control (clic en el logo, rueda, touch) se cancela.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // accesibilidad: no animamos scroll, dejamos que decida

    const start = () => {
      const section = sectionRef.current;
      if (!section || autoCancelledRef.current) return;

      // Recalcular justo antes de arrancar (no antes del timeout).
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      // Offset real del Hero en el documento: incluye lo que haya ARRIBA (barra de
      // migración, etc.). Sin esto, target sería un Y absoluto erróneo y el zoom se
      // quedaba a medias (p < 0.85) sin disparar el snap al dashboard.
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const from = window.scrollY;
      const target = sectionTop + total * 0.9; // Y absoluto que corresponde a p = 0.9

      // Si ya estamos pasado el target, no hacer nada
      if (from >= target) return;

      const dur = 1700;
      const t0 = performance.now();
      const tick = (now: number) => {
        if (autoCancelledRef.current) return;
        const k = Math.min(1, (now - t0) / dur);
        const eased = k * k * (3 - 2 * k); // smoothstep
        window.scrollTo(0, from + (target - from) * eased);
        if (k < 1) {
          autoRafRef.current = requestAnimationFrame(tick);
        } else {
          autoRafRef.current = 0;
        }
      };
      autoRafRef.current = requestAnimationFrame(tick);
    };

    const timer = window.setTimeout(start, 1100);
    const opts = { passive: true } as const;

    // Cancelar auto-zoom si el usuario interactúa
    window.addEventListener('wheel', cancelAll, opts);
    window.addEventListener('touchstart', cancelAll, opts);
    window.addEventListener('keydown', cancelAll);

    return () => {
      clearTimeout(timer);
      cancelAll();
      window.removeEventListener('wheel', cancelAll);
      window.removeEventListener('touchstart', cancelAll);
      window.removeEventListener('keydown', cancelAll);
    };
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero__sticky">
        {/* Fondo animado: gradiente shader oscuro con rojos y verdes profundos */}
        <MeshGradient
          className="hero__gradient"
          colors={['#000000', '#000000', '#1a0505', '#3a0a0a', '#06140d', '#0a2417']}
          speed={active ? 0.3 : 0}
          distortion={0.8}
          swirl={0.5}
          maxPixelCount={1280 * 720}
        />
        <div className="hero__canvas" ref={cloudRef}>
          {/* Copia borrosa detrás: difumina el contorno para un borde espumoso de nube real */}
          <img src={nubeFlai} alt="" aria-hidden className="hero__cloud hero__cloud--foam" />
          <img src={nubeFlai} alt="" aria-hidden className="hero__cloud hero__cloud--main" />
          {/* Niebla animada recortada con la silueta de la nube: movimiento interno */}
          <div className="hero__cloud hero__cloud-fx" aria-hidden />
        </div>

        <div className="hero__overlay" ref={overlayRef}>
          <div className="hero__brands">
            <img src={hechoEnMexico} alt="Hecho en México" className="hero__brand hero__brand--hem" />
            <img src={logoMayia} alt="MAYIA" className="hero__brand hero__brand--mayia" />
          </div>

          <img
            className="hero__logo"
            src={logoFlai}
            alt="FLAI"
            onClick={cancelAuto}
          />
          <div className="hero__hint">
            <span className="hero__hint-label">Desliza para conocer más sobre esta nube soberana</span>
            <span className="hero__hint-track" aria-hidden>
              <span className="hero__hint-beam" />
            </span>
          </div>
        </div>

        {/* Whiteout: la nube nos envuelve al final del zoom y entrega a la siguiente sección */}
        <div className="hero__fog" ref={fogRef} aria-hidden />
      </div>
    </section>
  );
}

export default function Hero() {
  // fallback = placeholder de la misma altura/fondo que .hero → sin salto de layout.
  return (
    <ClientOnly fallback={<div className="hero-fallback" aria-hidden />}>
      {() => <HeroVisual />}
    </ClientOnly>
  );
}
