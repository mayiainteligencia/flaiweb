import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Cloud, Clouds } from '@react-three/drei';
import { MeshGradient } from '@paper-design/shaders-react';
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

function VolumetricCloud({ scale }: { scale: number }) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
  });

  return (
    <group ref={ref} scale={scale}>
      {/* Glow cálido interior, concentrado abajo-centro como en la referencia */}
      <pointLight position={[0, -0.7, 0.6]} intensity={14} distance={4.5} decay={2} color="#ffc878" />
      <pointLight position={[0, -0.2, 0]} intensity={5} distance={6} decay={2} color="#fff1d6" />
      <Clouds material={THREE.MeshLambertMaterial}>
        {/* Cuerpo principal: cúmulo ancho, base plana, puffs grandes y redondos */}
        <Cloud
          segments={40}
          bounds={[4.6, 1.2, 1.2]}
          volume={9}
          smallestVolume={0.7}
          concentrate="inside"
          growth={6}
          speed={0.1}
          opacity={0.98}
          color="#f6f1e9"
        />
        {/* Billows del borde: pelotas redondas tipo coliflor en el perímetro superior */}
        <Cloud
          segments={24}
          bounds={[4.4, 0.9, 0.9]}
          position={[0, 0.4, 0]}
          volume={6}
          smallestVolume={0.85}
          concentrate="outside"
          growth={5}
          speed={0.16}
          opacity={0.9}
          color="#fbf7f0"
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

  // En móvil la nube es mucho más chica para no saturar la pantalla.
  const [cloudScale, setCloudScale] = useState(0.22);
  useEffect(() => {
    const update = () => setCloudScale(window.innerWidth < 768 ? 0.12 : 0.22);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Pausa el render WebGL (nube + shader) cuando el Hero sale de vista (estás en el dashboard).
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
        {/* Fondo animado: gradiente shader oscuro con rojos y verdes profundos */}
        <MeshGradient
          className="hero__gradient"
          colors={['#000000', '#000000', '#1a0505', '#3a0a0a', '#06140d', '#0a2417']}
          speed={active ? 0.3 : 0}
          distortion={0.8}
          swirl={0.5}
          maxPixelCount={1280 * 720}
        />
        <div className="hero__canvas">
          <Canvas
            frameloop={active ? 'always' : 'never'}
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: 'high-performance' }}
            camera={{ position: [0, 0, 9], fov: 45 }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[1, 5, 2]} intensity={0.7} color="#fff6e8" />
            <VolumetricCloud scale={cloudScale} />
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
