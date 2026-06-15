import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import PageHeader, { reveal } from '@/components/ui/PageHeader';

const INTERESTS = [
  'Diagnóstico cloud',
  'Cotización',
  'Agenda con arquitecto',
  'PoC / prueba de concepto',
  'Workshop on-prem',
] as const;

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-8">
      <PageHeader
        eyebrow="Contacto"
        title="Hablemos de tu nube"
        subtitle="Agenda un diagnóstico, solicita una cotización o habla con un arquitecto. Te respondemos en español por un equipo experto en México."
      />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <motion.section {...reveal} className="rounded-xl border border-border-subtle bg-white p-6">
          {sent ? (
            <div className="flex flex-col items-center py-12 text-center">
              <CheckCircle2 size={40} className="text-status-ok" />
              <h2 className="mt-4 text-xl font-semibold text-text-primary">¡Gracias! Recibimos tu mensaje</h2>
              <p className="mt-2 max-w-sm text-sm text-text-secondary">
                Un arquitecto FLAI te contactará en breve para coordinar los siguientes pasos.
              </p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre" name="nombre" required />
                <Field label="Empresa" name="empresa" required />
                <Field label="Correo" name="correo" type="email" required />
                <Field label="Teléfono" name="telefono" type="tel" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-text-primary">Me interesa</label>
                <select
                  name="interes"
                  className="w-full rounded-md border border-border-subtle bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent"
                  defaultValue={INTERESTS[0]}
                >
                  {INTERESTS.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-text-primary">Mensaje</label>
                <textarea
                  name="mensaje"
                  rows={4}
                  className="w-full resize-none rounded-md border border-border-subtle bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent"
                  placeholder="Cuéntanos sobre tu proyecto, cargas de trabajo o requisitos de cumplimiento."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Enviar
              </button>
            </form>
          )}
        </motion.section>

        <motion.aside {...reveal} className="space-y-4">
          <InfoCard icon={Mail} title="Correo" value="contacto@flai.mx" />
          <InfoCard icon={Phone} title="Teléfono" value="+52 55 0000 0000" />
          <InfoCard icon={MapPin} title="Datos en México" value="Infraestructura y soporte nacional" />
        </motion.aside>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text-primary">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-border-subtle bg-white px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, title, value }: { icon: typeof Mail; title: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border-subtle bg-white p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-xs text-text-secondary">{title}</p>
        <p className="text-sm font-medium text-text-primary">{value}</p>
      </div>
    </div>
  );
}
