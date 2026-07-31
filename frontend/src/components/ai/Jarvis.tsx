import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import BrainCanvas from '@/components/ui/BrainCanvas';
import { ROUTES } from '@/constants/routes';
import { SERVICES } from '@/data/services';
import { INDUSTRIES } from '@/data/industries';

// ponytail: asistente de voz MAYIA (Web Speech API, sin deps). Navega por toda
// la página y responde datos puntuales de FLAI. Un solo overlay compartido vía contexto.

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const has = (s: string, ...ws: string[]) => ws.some((w) => s.includes(w));

// Comandos de navegación: palabra clave (en español) → ruta + etiqueta hablada.
// Cubre páginas generales y los 11 servicios por sus nombres coloquiales.
const COMMANDS: { to: string; label: string; keys: string[] }[] = [
  { to: ROUTES.DASHBOARD, label: 'Inicio', keys: ['inicio', 'dashboard', 'tablero', 'principal', 'home'] },
  { to: ROUTES.PRICING, label: 'Precios', keys: ['precio', 'plan', 'costo', 'cotiz', 'cuanto cuesta', 'tarifa'] },
  { to: ROUTES.CONTACT, label: 'Contacto', keys: ['contacto', 'contactar', 'diagnostico', 'agenda', 'ventas', 'hablar con alguien'] },
  { to: ROUTES.ADVISOR, label: 'Asesor Cloud', keys: ['asesor', 'recomend', 'que servicio necesito', 'calculadora'] },
  { to: ROUTES.MARKETPLACE, label: 'Marketplace', keys: ['marketplace', 'soluciones', 'partners software'] },
  { to: ROUTES.TRUST_CENTER, label: 'Trust Center', keys: ['trust', 'confianza', 'cumplimiento', 'certificacion', 'sla', 'soberan', 'residencia'] },
  { to: ROUTES.DOCS, label: 'Documentación', keys: ['documenta', 'docs', 'guia'] },
  { to: ROUTES.WHITEPAPERS, label: 'White Papers', keys: ['white paper', 'whitepaper', 'comparativ'] },
  { to: ROUTES.BLOG, label: 'Blog', keys: ['blog', 'articulo', 'noticias'] },
  { to: '/industries', label: 'Industrias', keys: ['industria', 'sector'] },
  // Servicios
  { to: ROUTES.COMPUTE, label: 'Cloud Compute', keys: ['computo', 'compute', 'servidor', 'maquina virtual', 'vm'] },
  { to: ROUTES.PRIVATE_CLOUD, label: 'Private Cloud', keys: ['nube privada', 'private cloud'] },
  { to: ROUTES.ON_PREM, label: 'On-Prem Cloud', keys: ['on prem', 'on-prem', 'en sitio', 'en mis instalaciones'] },
  { to: ROUTES.KUBERNETES, label: 'Kubernetes', keys: ['kubernetes', 'contenedor', 'k8s'] },
  { to: ROUTES.STORAGE, label: 'Storage', keys: ['almacenamiento', 'storage'] },
  { to: ROUTES.DATABASES, label: 'Bases de datos', keys: ['base de datos', 'bases de datos', 'database'] },
  { to: ROUTES.NETWORKING, label: 'Network', keys: ['redes', 'red', 'conectividad', 'network'] },
  { to: ROUTES.SECURITY, label: 'Security & Trust', keys: ['seguridad', 'security'] },
  { to: ROUTES.BACKUP_DRP, label: 'Backup y DRP', keys: ['respaldo', 'backup', 'recuperacion', 'drp', 'continuidad'] },
  { to: ROUTES.AI_CLOUD, label: 'AI Cloud', keys: ['inteligencia artificial', 'ai cloud', 'gpu', 'machine learning'] },
  { to: ROUTES.VIDEOVIGILANCIA, label: 'Videovigilancia', keys: ['videovigilancia', 'video vigilancia', 'camara', 'camaras', 'cctv'] },
];

// Encuentra ruta por palabra clave o por nombre de servicio/industria.
function matchRoute(said: string): { to: string; label: string } | null {
  const cmd = COMMANDS.find((c) => c.keys.some((k) => said.includes(k)));
  if (cmd) return cmd;
  const svc = SERVICES.find((s) => said.includes(norm(s.name)));
  if (svc) return { to: svc.to, label: svc.name };
  const ind = INDUSTRIES.find((i) => said.includes(norm(i.name)));
  if (ind) return { to: ind.to, label: ind.name };
  return null;
}

// Respuesta hablada + destino opcional. Si trae `to`, MAYIA navega ahí.
type Answer = { text: string; to?: string };

function answerAbout(said: string, pathname: string): Answer | null {
  if (has(said, 'que es flai', 'quien eres', 'que eres', 'que haces', 'hola', 'buenas'))
    return { text: 'Soy MAYIA, la asistente de FLAI, la nube soberana mexicana. Puedo llevarte a cualquier sección o resolver tus dudas. ¿Qué necesitas?' };

  if (has(said, 'precio', 'cuesta', 'cuanto', 'plan', 'costo', 'tarifa')) {
    return { text: 'Cada solución FLAI se cotiza a la medida. Te abro contacto para pedir tu cotización.', to: ROUTES.CONTACT };
  }
  if (has(said, 'servicio', 'que ofrecen', 'que tienen', 'productos'))
    return { text: `FLAI ofrece ${SERVICES.length} servicios de nube: cómputo, almacenamiento, bases de datos, Kubernetes, seguridad, respaldo, inteligencia artificial y más. Dime cuál quieres ver.` };
  if (has(said, 'industria', 'sector'))
    return { text: `Atendemos ${INDUSTRIES.length} industrias, entre ellas ${INDUSTRIES.slice(0, 3).map((i) => i.name).join(', ')}. Te abro Industrias.`, to: '/industries' };
  if (has(said, 'contacto', 'ventas', 'correo', 'telefono', 'whatsapp'))
    return { text: 'Te abro la página de contacto para que hablemos.', to: ROUTES.CONTACT };
  if (has(said, 'soberan', 'segur', 'datos en mexico', 'residencia', 'cumplimiento'))
    return { text: 'FLAI mantiene tus datos en México, con cifrado y cumplimiento para cargas reguladas. Te abro el Trust Center.', to: ROUTES.TRUST_CENTER };

  if (has(said, 'donde estoy', 'que seccion', 'donde me encuentro')) {
    if (pathname === ROUTES.HOME || pathname === ROUTES.DASHBOARD) return { text: 'Estás en el Inicio de FLAI.' };
    if (pathname.includes('/services')) return { text: 'Estás viendo un servicio de nube.' };
    if (pathname.includes('/industries')) return { text: 'Estás en la sección de Industrias.' };
    if (pathname.includes('precios')) return { text: 'Estás en la página de Precios.' };
    if (pathname.includes('contacto')) return { text: 'Estás en Contacto.' };
    return { text: 'Estás explorando la nube FLAI.' };
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SR: any = typeof window !== 'undefined' && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

function speak(text: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-MX';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch { /* speechSynthesis no disponible */ }
}

function useVoiceAssistant() {
  const navigate = useNavigate();
  const location = useLocation();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recRef = useRef<any>(null);

  const stop = useCallback(() => {
    recRef.current?.stop();
    recRef.current = null;
    setListening(false);
  }, []);

  const start = useCallback(() => {
    if (!SR) { setReply('Tu navegador no soporta reconocimiento de voz.'); return; }
    if (recRef.current) { recRef.current.stop(); return; }

    const rec = new SR();
    rec.lang = 'es-MX';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    recRef.current = rec;
    setTranscript(''); setReply(''); setListening(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      const said = norm(e.results[0][0].transcript.trim());
      setTranscript(e.results[0][0].transcript.trim());

      const answer = answerAbout(said, location.pathname);
      const route = matchRoute(said);

      if (answer) {
        setReply(answer.text); speak(answer.text);
        if (answer.to) navigate(answer.to);
      } else if (route) {
        const msg = `Te llevo a ${route.label}.`;
        setReply(msg); speak(msg);
        navigate(route.to);
      } else {
        const msg = 'No te entendí. Prueba: "llévame a precios", "abre videovigilancia" o "¿qué es FLAI?".';
        setReply(msg); speak(msg);
      }
    };
    rec.onerror = () => setReply('No se pudo escuchar. Revisa el micrófono.');
    rec.onend = () => { setListening(false); recRef.current = null; };
    rec.start();
  }, [navigate, location.pathname]);

  return { supported: !!SR, listening, transcript, reply, start, stop };
}

// ── Contexto: cualquier trigger abre el mismo overlay ──────────────────
const JarvisCtx = createContext<{ open: () => void } | null>(null);
export const useJarvis = () => {
  const ctx = useContext(JarvisCtx);
  if (!ctx) throw new Error('useJarvis fuera de <JarvisProvider>');
  return ctx;
};

export function JarvisProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { supported, listening, transcript, reply, start, stop } = useVoiceAssistant();
  const location = useLocation();

  const handleOpen = useCallback(() => { setOpen(true); start(); }, [start]);
  const handleClose = useCallback(() => { stop(); setOpen(false); }, [stop]);

  // Cierra el overlay al navegar a otra ruta.
  useEffect(() => { if (open) setOpen(false); /* eslint-disable-next-line */ }, [location.pathname]);

  return (
    <JarvisCtx.Provider value={{ open: handleOpen }}>
      {children}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="jarvis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center px-5"
              style={{ background: 'rgba(5,6,8,0.6)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <button
                onClick={handleClose}
                aria-label="Cerrar MAYIA"
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="w-full max-w-xl text-center"
              >
                <div className="relative mx-auto h-56 w-56 sm:h-72 sm:w-72">
                  <span
                    className="absolute inset-[-14px] rounded-full border-2 transition-opacity"
                    style={{
                      borderColor: 'var(--color-red)',
                      opacity: listening ? 0.8 : 0.12,
                      animation: listening ? 'pulse 1.4s ease-in-out infinite' : 'none',
                    }}
                  />
                  <BrainCanvas height={288} active={listening} />
                </div>

                <div className="mt-8 min-h-[96px]">
                  {transcript ? (
                    <p className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">“{transcript}”</p>
                  ) : (
                    <p className="text-lg font-medium text-white/45 sm:text-xl">
                      {listening ? 'Escuchando…' : 'Dime, ¿en qué te puedo ayudar?'}
                    </p>
                  )}
                  {reply && <p className="mx-auto mt-3 max-w-md text-base text-white/70">{reply}</p>}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={listening ? stop : start}
                    disabled={!supported}
                    className="cta-glow rounded-full bg-accent px-7 py-3 text-base font-bold text-white disabled:opacity-50"
                  >
                    {listening ? 'Detener' : supported ? 'Hablar con MAYIA' : 'Voz no disponible'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </JarvisCtx.Provider>
  );
}
