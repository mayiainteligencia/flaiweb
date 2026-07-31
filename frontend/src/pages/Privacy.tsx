import { motion } from 'framer-motion';
import PageHeader, { reveal } from '@/components/ui/PageHeader';
import { CONTACT } from '@/data/contact';

// Correo de privacidad (deriva del dato central; mailto sin el prefijo para mostrarlo).
const PRIVACY_EMAIL = 'vviniegra@flainube.mx';
const SITE_URL = 'https://www.flainube.mx';
const UPDATED = '31 de julio de 2026';

// ponytail: aviso de privacidad conforme a la LFPDPPP. Contenido legal real.
// TODO(Legal): agregar el domicilio fiscal completo del responsable cuando se confirme.

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-base font-semibold text-text-primary">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-text-secondary">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-12">
      <PageHeader
        eyebrow="Legal"
        title="Aviso de Privacidad"
        subtitle="En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del Aviso de Privacidad vigentes en México."
      />

      <motion.article {...reveal} className="space-y-7">
        <Section title="1. Identidad y domicilio del responsable">
          <p>
            <strong className="text-text-primary">FLAI</strong>, marca operada por{' '}
            <strong className="text-text-primary">Edgenet Data Technologies</strong> (en adelante,
            “FLAI” o “el Responsable”), con domicilio en los Estados Unidos Mexicanos, es responsable
            del tratamiento y protección de sus datos personales conforme al presente Aviso de
            Privacidad.
          </p>
          <p>
            Para cualquier asunto relacionado con sus datos personales, el Responsable pone a su
            disposición el correo{' '}
            <a href={`mailto:${PRIVACY_EMAIL}`} className="font-medium text-accent hover:underline">
              {PRIVACY_EMAIL}
            </a>{' '}
            y el sitio{' '}
            <a href={SITE_URL} className="font-medium text-accent hover:underline">
              {SITE_URL}
            </a>
            .
          </p>
        </Section>

        <Section title="2. Datos personales que recabamos">
          <p>
            Para las finalidades señaladas en este Aviso, el Responsable puede recabar los siguientes
            datos personales que usted proporciona de forma directa, principalmente a través de
            nuestros formularios de contacto y canales de comunicación:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Nombre completo.</li>
            <li>Empresa u organización y cargo.</li>
            <li>Correo electrónico.</li>
            <li>Número telefónico.</li>
            <li>El contenido del mensaje o solicitud que usted decida enviarnos.</li>
          </ul>
          <p>
            FLAI <strong className="text-text-primary">no recaba datos personales sensibles</strong>{' '}
            (como origen racial o étnico, estado de salud, creencias, opiniones políticas o
            preferencia sexual) a través de este sitio.
          </p>
        </Section>

        <Section title="3. Finalidades del tratamiento">
          <p>
            <strong className="text-text-primary">Finalidades primarias</strong> (necesarias para la
            relación con usted):
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Atender sus solicitudes de información, cotizaciones, diagnósticos y soporte.</li>
            <li>Contactarle para dar seguimiento a su requerimiento y coordinar los servicios de nube.</li>
            <li>Gestionar la relación comercial, contractual y de facturación en su caso.</li>
            <li>Dar cumplimiento a obligaciones legales aplicables.</li>
          </ul>
          <p>
            <strong className="text-text-primary">Finalidades secundarias</strong> (no necesarias,
            requieren su consentimiento):
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Envío de comunicaciones comerciales, boletines, invitaciones a eventos y material informativo.</li>
            <li>Elaboración de estadísticas y mejora de nuestros productos y servicios.</li>
          </ul>
          <p>
            Si usted no desea que sus datos se traten para las finalidades secundarias, puede
            manifestarlo enviando un correo a{' '}
            <a href={`mailto:${PRIVACY_EMAIL}`} className="font-medium text-accent hover:underline">
              {PRIVACY_EMAIL}
            </a>
            . La negativa para estas finalidades no será motivo para negarle los servicios que solicita.
          </p>
        </Section>

        <Section title="4. Transferencias de datos">
          <p>
            FLAI <strong className="text-text-primary">no transfiere sus datos personales a terceros
            </strong> sin su consentimiento, salvo en los supuestos previstos en el artículo 37 de la
            LFPDPPP (por ejemplo, cuando la transferencia sea necesaria por virtud de una ley o
            requerida por autoridad competente).
          </p>
          <p>
            El Responsable puede apoyarse en proveedores que actúan como{' '}
            <em>encargados</em> del tratamiento (por ejemplo, infraestructura y servicios
            tecnológicos) que tratan los datos por cuenta y bajo las instrucciones de FLAI; conforme
            a la ley, dichas remisiones no constituyen transferencias. Sus datos se mantienen dentro
            de infraestructura soberana en México.
          </p>
        </Section>

        <Section title="5. Medios para ejercer los derechos ARCO">
          <p>
            Usted tiene derecho a <strong className="text-text-primary">Acceder</strong> a sus datos
            personales, <strong className="text-text-primary">Rectificarlos</strong> cuando sean
            inexactos, <strong className="text-text-primary">Cancelarlos</strong> cuando considere
            que no se requieren para las finalidades señaladas, y a{' '}
            <strong className="text-text-primary">Oponerse</strong> a su tratamiento (derechos ARCO).
          </p>
          <p>
            Para ejercerlos, envíe su solicitud al correo{' '}
            <a href={`mailto:${PRIVACY_EMAIL}`} className="font-medium text-accent hover:underline">
              {PRIVACY_EMAIL}
            </a>{' '}
            incluyendo: (i) su nombre y un medio para comunicarle la respuesta; (ii) los documentos
            que acrediten su identidad o, en su caso, la representación legal; (iii) la descripción
            clara de los datos respecto de los que busca ejercer algún derecho ARCO; y (iv) cualquier
            elemento que facilite la localización de los datos.
          </p>
          <p>
            El Responsable dará respuesta a su solicitud en un plazo máximo de{' '}
            <strong className="text-text-primary">20 días hábiles</strong> y, de resultar procedente,
            la hará efectiva dentro de los <strong className="text-text-primary">15 días hábiles</strong>{' '}
            siguientes. El ejercicio de estos derechos es gratuito.
          </p>
        </Section>

        <Section title="6. Revocación del consentimiento">
          <p>
            Usted puede revocar en cualquier momento el consentimiento que nos ha otorgado para el
            tratamiento de sus datos personales, así como limitar su uso o divulgación, enviando su
            solicitud a{' '}
            <a href={`mailto:${PRIVACY_EMAIL}`} className="font-medium text-accent hover:underline">
              {PRIVACY_EMAIL}
            </a>
            . En algunos casos, la revocación podría implicar que no podamos seguir prestándole el
            servicio solicitado, o concluir la relación con usted.
          </p>
        </Section>

        <Section title="7. Cambios al aviso de privacidad">
          <p>
            El presente Aviso de Privacidad puede sufrir modificaciones, cambios o actualizaciones
            derivadas de nuevos requerimientos legales, de nuestras propias necesidades, o por otras
            causas. Cualquier cambio será informado a través de{' '}
            <a
              href={`${SITE_URL}/aviso-de-privacidad`}
              className="font-medium text-accent hover:underline"
            >
              {SITE_URL}/aviso-de-privacidad
            </a>
            , por lo que le recomendamos revisarlo periódicamente.
          </p>
        </Section>

        <Section title="8. Aceptación">
          <p>
            Al proporcionarnos sus datos personales por cualquiera de nuestros medios de contacto,
            usted reconoce haber leído y entendido el presente Aviso de Privacidad y otorga su
            consentimiento para el tratamiento de sus datos conforme a lo aquí establecido.
          </p>
        </Section>
      </motion.article>

      <p className="border-t border-border-subtle pt-4 text-xs text-text-secondary">
        Última actualización: {UPDATED}. Correo de privacidad:{' '}
        <a href={CONTACT.email} className="font-medium text-accent hover:underline">
          {PRIVACY_EMAIL}
        </a>
        .
      </p>
    </div>
  );
}
