import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Clouds } from '@react-three/drei';
import * as THREE from 'three';
import type { Group } from 'three';
import logoFlai from '@/assets/images/logos/logo-FLAI.png';
import logoMayia from '@/assets/images/logos/mayiaLogoBlanco.png';
import hechoEnMexico from '@/assets/images/logos/hechoEnMexicoRed.png';
import './Hero.css';

// Progreso de scroll dentro de la sección (0 = arriba, 1 = fondo). Independiente de la altura.
function scrollProgress(section: HTMLElement | null) {
  if (!section) return 0;
  const total = section.offsetHeight - window.innerHeight;
  if (total <= 0) return 0;
  return Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total));
}

function VolumetricCloud() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  return (
    <group ref={ref} scale={0.32}>
      <pointLight position={[0, -0.6, 0]} intensity={8} distance={5} color="#ffca7a" />
      <Clouds material={THREE.MeshLambertMaterial}>
        <Cloud
          segments={60}
          bounds={[5, 1.6, 1.6]}
          volume={7}
          smallestVolume={0.3}
          concentrate="inside"
          growth={3}
          speed={0.15}
          opacity={0.9}
          color="#f4efe6"
        />
      </Clouds>
    </group>
  );
}

// Acerca la cámara hacia la nube conforme se hace scroll.
function CameraRig({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) {
  useFrame((state) => {
    const target = 9 - scrollProgress(sectionRef.current) * 8.2; // 9 (lejos) -> 0.8 (dentro)
    state.camera.position.z += (target - state.camera.position.z) * 0.1;
  });
  return null;
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);

  // Logo/hint se desvanecen al entrar; al final la nube nos envuelve (whiteout).
  useEffect(() => {
    const onScroll = () => {
      const p = scrollProgress(sectionRef.current);
      if (overlayRef.current) overlayRef.current.style.opacity = String(1 - p * 1.4);
      // El blanco entra en el último tramo del zoom (0.6 -> 1).
      if (fogRef.current) fogRef.current.style.opacity = String(Math.max(0, (p - 0.6) / 0.4));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero__sticky">
        <div className="hero__canvas">
          <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[2, 4, 3]} intensity={0.6} />
            <VolumetricCloud />
            <CameraRig sectionRef={sectionRef} />
          </Canvas>
        </div>

        <div className="hero__overlay" ref={overlayRef}>
          <div className="hero__brands">
            <img src={hechoEnMexico} alt="Hecho en México" className="hero__brand hero__brand--hem" />
            <img src={logoMayia} alt="MAYIA" className="hero__brand hero__brand--mayia" />
          </div>

          <img className="hero__logo" src={logoFlai} alt="FLAI" />
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
