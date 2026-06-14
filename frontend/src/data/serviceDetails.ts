import type { ServiceSlug } from './services';

// Ficha de cada servicio (estructura del Documento guía, sección 12).
export type ServiceDetail = {
  problem: string; // para qué sirve
  includes: string[]; // qué incluye (componentes técnicos)
  useCases: string[]; // casos de uso
  benefits: string[]; // beneficios de negocio
  security: string[]; // seguridad y cumplimiento
  pricingNote: string; // modelo de precio
};

export const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  compute: {
    problem:
      'Ejecuta aplicaciones, ERPs, portales, APIs y workloads críticos sobre infraestructura mexicana, con la potencia y elasticidad que tu negocio necesita.',
    includes: ['VMs Linux y Windows', 'Bare metal dedicado', 'Instancias high-CPU y high-memory', 'GPU servers', 'Autoescalado', 'Imágenes y snapshots'],
    useCases: ['Migración de aplicaciones y ERPs', 'Portales y APIs de alto tráfico', 'Entornos de desarrollo y pruebas', 'Workloads críticos de negocio'],
    benefits: ['Cómputo y datos dentro de México', 'Escala según la demanda real', 'Sin dependencia tecnológica innecesaria', 'Soporte experto en español'],
    security: ['Aislamiento por proyecto y red', 'IAM, MFA y RBAC', 'Cifrado en reposo y en tránsito', 'Logs y auditoría'],
    pricingNote: 'Por vCPU, RAM, almacenamiento y red. Paquetes y cotización a medida.',
  },
  'private-cloud': {
    problem:
      'Una nube privada dedicada para sectores regulados que requieren aislamiento, control y cumplimiento sin renunciar a la agilidad cloud.',
    includes: ['Nube privada dedicada', 'VMware, Nutanix u OpenStack', 'Kubernetes gestionado', 'Redes y almacenamiento dedicados', 'Operación administrada'],
    useCases: ['Banca, seguros y fintech', 'Salud y datos clínicos', 'Gobierno y sector público', 'Manufactura y retail enterprise'],
    benefits: ['Aislamiento físico y lógico', 'Arquitectura validada por industria', 'Cumplimiento y residencia de datos', 'Continuidad y soporte 24/7'],
    security: ['Tenencia dedicada', 'Cifrado y gestión de llaves', 'Microsegmentación de red', 'Auditoría y trazabilidad'],
    pricingNote: 'Arquitectura dedicada bajo cotización según workload y SLA.',
  },
  'on-prem': {
    problem:
      'Lleva una plataforma cloud completa a tus instalaciones o a un sitio EdgeNet dedicado, para datos y cargas que no pueden salir de tu control.',
    includes: [
      'FLAI Core: cómputo, storage, red y virtualización',
      'FLAI Landing Zone: proyectos, IAM, cuotas y políticas',
      'FLAI Cloud Store: servicios desplegables con un clic',
      'Observabilidad y FinOps',
      'Operación administrada 24/7 (NOC/SOC)',
    ],
    useCases: ['Gobierno con residencia nacional', 'Banca con control contractual', 'Salud con datos sensibles', 'Manufactura y retail con baja latencia', 'Repatriación de cargas de nube pública'],
    benefits: ['Control físico y local de tus datos', 'Portal de autoservicio y catálogo', 'Gobierno, cuotas y trazabilidad', 'Operación experta sin perder soberanía'],
    security: ['Datos siempre en tu entorno', 'IAM, SSO, RBAC y MFA', 'Auditoría, logs y métricas', 'Gestión de cambios y parches'],
    pricingNote: 'Plataforma en sitio bajo workshop y cotización por capacidad.',
  },
  kubernetes: {
    problem:
      'Despliega y opera contenedores a escala con un Kubernetes gestionado, listo para equipos de plataforma y modernización aplicativa.',
    includes: ['Managed Kubernetes', 'Container registry', 'Service mesh', 'CI/CD integrado', 'Platform engineering'],
    useCases: ['Equipos DevOps y SRE', 'Productos SaaS', 'Fábricas de software', 'Modernización de aplicaciones'],
    benefits: ['Menos carga operativa', 'Despliegues seguros y gobernados', 'Escalabilidad automática', 'Portabilidad sin lock-in'],
    security: ['RBAC y políticas de admisión', 'Aislamiento de namespaces', 'Escaneo de imágenes', 'Secretos cifrados'],
    pricingNote: 'Por nodos y servicios gestionados; cotización por escala.',
  },
  storage: {
    problem:
      'Almacena documentos, logs, multimedia y respaldos con durabilidad, escalabilidad e inmutabilidad, sobre infraestructura mexicana.',
    includes: ['Object storage compatible con S3', 'Block y file storage', 'Archive y cold storage', 'Snapshots', 'Backup inmutable'],
    useCases: ['Respaldos y archivado', 'Data lakes y analítica', 'Multimedia y contenidos', 'Logs y cumplimiento'],
    benefits: ['Residencia de datos en México', 'Escala sin sobreprovisionar', 'Protección ante ransomware (inmutabilidad)', 'Costos predecibles'],
    security: ['Cifrado en reposo', 'Inmutabilidad y retención', 'IAM por bucket', 'Versionado y auditoría'],
    pricingNote: 'Por GB, tier de performance, IOPS y retención.',
  },
  databases: {
    problem:
      'Operamos tus bases de datos por ti: alta disponibilidad, respaldos y parches, para que tu equipo se enfoque en el producto.',
    includes: ['PostgreSQL y MySQL', 'SQL Server', 'MongoDB', 'Redis / Valkey', 'OpenSearch', 'DBaaS administrado'],
    useCases: ['Aplicaciones transaccionales', 'Analítica y reporting', 'Portales y e-commerce', 'Backends de IA'],
    benefits: ['Menos carga operativa', 'Alta disponibilidad y respaldos', 'Escalado vertical y horizontal', 'Soporte experto'],
    security: ['Cifrado y gestión de llaves', 'Accesos por IAM', 'Backups y point-in-time recovery', 'Auditoría'],
    pricingNote: 'Por instancia, memoria, almacenamiento y alta disponibilidad.',
  },
  networking: {
    problem:
      'Conecta tus sedes, nubes y usuarios con redes privadas, baja latencia nacional y seguridad integrada.',
    includes: ['VPC y redes privadas', 'Load balancer', 'VPN y SD-WAN', 'Direct Connect', 'Firewall', 'CDN nacional'],
    useCases: ['Empresas multisede', 'Retail e industria', 'Gobierno', 'Apps de baja latencia'],
    benefits: ['Baja latencia dentro de México', 'Conectividad privada y segura', 'Alta disponibilidad', 'Optimización de tráfico'],
    security: ['Microsegmentación', 'Firewall y WAF', 'Cifrado de túneles', 'Monitoreo de tráfico'],
    pricingNote: 'Por ancho de banda, componentes y conectividad dedicada.',
  },
  security: {
    problem:
      'Protege identidades, datos y cargas con controles integrados, monitoreo y respuesta, alineados a sectores regulados.',
    includes: ['IAM, SSO, MFA y RBAC', 'KMS y HSM', 'WAF y protección DDoS', 'SIEM y SOC 24/7', 'Logs y auditoría'],
    useCases: ['CISO y áreas de riesgo', 'Cumplimiento regulatorio', 'Gobierno y banca', 'Sectores regulados'],
    benefits: ['Postura de seguridad consistente', 'Detección y respuesta 24/7', 'Cumplimiento demostrable', 'Reducción de riesgo'],
    security: ['Gestión de llaves y secretos', 'Detección y respuesta (SOC)', 'Auditoría y trazabilidad', 'Modelo de responsabilidad compartida'],
    pricingNote: 'Por módulos de seguridad y servicios administrados.',
  },
  'backup-drp': {
    problem:
      'Protege tu operación ante incidentes con respaldos, replicación y planes de recuperación probados, con RPO/RTO claros.',
    includes: ['Backup as a Service (BaaS)', 'Disaster Recovery (DRaaS)', 'Replicación multi-sitio', 'Pruebas de DR y runbooks', 'Objetivos RPO/RTO'],
    useCases: ['Cargas críticas', 'Continuidad operativa', 'Cumplimiento y auditoría', 'Protección ante ransomware'],
    benefits: ['Continuidad dentro de México', 'Recuperación predecible (RPO/RTO)', 'Respaldos inmutables', 'Pruebas periódicas'],
    security: ['Backups inmutables', 'Cifrado de respaldos', 'Aislamiento de copias', 'Validación y reportes'],
    pricingNote: 'Por volumen protegido, retención y nivel de DR.',
  },
  'ai-cloud': {
    problem:
      'Entrena, despliega y opera IA con tus datos protegidos: GPU, data lakehouse y MLOps, más agentes MAYIA listos para el negocio.',
    includes: ['GPU on-demand y notebooks', 'Data lakehouse', 'MLOps y LLMOps', 'RAG y vector databases', 'Agentes MAYIA por industria'],
    useCases: ['IA con datos sensibles', 'Asistentes y agentes de negocio', 'Analítica avanzada', 'Modelos propios y RAG'],
    benefits: ['Datos y modelos en México', 'IA sobre nube soberana', 'Del piloto a producción (MLOps)', 'Agentes listos por industria'],
    security: ['Aislamiento de datos y modelos', 'Gobierno de accesos', 'Trazabilidad de prompts y datos', 'Cumplimiento por industria'],
    pricingNote: 'Por GPU, almacenamiento de datos y servicios gestionados.',
  },
};
