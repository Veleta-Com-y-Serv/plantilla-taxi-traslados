// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
/** Elemento genérico: servicios (con `disponible`, «Al momento» / «Con reserva»), pasos, ventajas de empresa, zonas. */
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string; disponible?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/** Vehículo (sección `flota`): nombre, para qué sirve, plazas («7»), equipaje («5 maletas») y foto. */
export interface Vehiculo { nombre: string; texto?: string; plazas?: string; maletas?: string; imagen?: string }
/** Trayecto con precio (sección `tarifas`): destino, tipo de destino, distancia, tiempo y precio cerrado («95 €»). */
export interface Tarifa { nombre: string; categoria?: string; distancia?: string; duracion?: string; precio?: string; imagen?: string }
/** Placa destacada de la portada («Servicio 24 horas»). */
export interface Destacado { titulo?: string; texto?: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  nota?: string;
  destacado?: Destacado;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  vehiculos: Vehiculo[];
  tarifas: Tarifa[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter((x) => x && typeof x === 'object') as T[]) : [];
}
export const texto = (v: unknown) => (v == null ? '' : String(v).trim());

function normalizar(s: Crudo = {}): Seccion {
  const dest = s.destacado && typeof s.destacado === 'object' ? (s.destacado as Destacado) : undefined;
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    nota: texto(s.nota),
    destacado: dest && (texto(dest.titulo) || texto(dest.texto)) ? dest : undefined,
    cta: s.cta?.url && s.cta?.texto ? (s.cta as Enlace) : undefined,
    cta_secundario: s.cta_secundario?.url && s.cta_secundario?.texto ? (s.cta_secundario as Enlace) : undefined,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Testimonio>(s.testimonios),
    galeria: (Array.isArray(s.galeria) ? s.galeria : []).map(texto).filter(Boolean),
    horario: lista<Horario>(s.horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    vehiculos: lista<Vehiculo>(s.vehiculos),
    tarifas: lista<Tarifa>(s.tarifas),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: {
    primario: texto(d.colores?.primario) || '#f4b522',
    acento: texto(d.colores?.acento) || '#2055e1',
    fondo: texto(d.colores?.fondo) || '#edf0f4',
    texto: texto(d.colores?.texto) || '#0b0e15',
  },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu).filter((e) => e.url && e.texto),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'LocalBusiness',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url && d.boton_cabecera?.texto ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Cadena con «;» o saltos de línea → lista de textos. */
export const separar = (v: unknown): string[] =>
  texto(v)
    .split(/\s*(?:;|\n)\s*/)
    .map((x) => x.trim())
    .filter(Boolean);

/** Trayectos con nombre de la sección `tarifas` activa (los primeros salen también en el tablero de la portada). */
export function trayectos(): Tarifa[] {
  const s = seccion('tarifas');
  return s ? s.tarifas.filter((t) => texto(t.nombre)) : [];
}

/** Localidades de la sección `zonas` activa (las repite el pie). */
export function zonasDeTrabajo(): string[] {
  const s = seccion('zonas');
  return s ? s.items.map((it) => texto(it.titulo)).filter(Boolean) : [];
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
