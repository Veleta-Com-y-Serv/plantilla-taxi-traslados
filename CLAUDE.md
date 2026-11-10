# Plantilla «Taxi y traslados» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **wayfind** (tema Wayfind
de Hallmark: señalética pública hecha página; papel gris frío, tinta azul casi negra, Chivo Mono en todo, bordes cuadrados de
tinta de 2 px, placas de tinta y de ámbar, cobalto para la acción, ámbar para las cifras sobre tinta; sin radios ni degradados).
Todo en castellano de España, frases cortas, sin jerga, de tú.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores`. `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…).
  - `fondo` = papel; `texto` = tinta: letra, bordes de 2 px y las bandas oscuras (tarifas, pie, cartel del teléfono).
  - `acento` = cobalto: botón principal, subrayado del menú al pasar, enlaces y foco. La letra encima se elige sola (clara u oscura).
  - `primario` = ámbar: placas («Servicio 24 horas», plazas de cada vehículo, «Salidas desde…»), precios del tablero y el teléfono grande sobre la tinta. La letra de las placas se elige sola; las cifras sobre la tinta nunca bajan de L 0,76.
  - Todos los demás tonos (papel 2 y 3, apagado, filetes) se derivan en `src/styles/global.css` con `color-mix()` / `oklch(from …)`.
- **Tipografía**: Chivo Mono 400, 500 y 800 en `public/fuentes/` (OFL, `LICENCIAS.md`). No añadas fuentes ni servicios externos.
- **Aspecto general**: `src/styles/global.css` (sello y «waivers» de Hallmark arriba; bandas `.banda--papel|clara|tinta`, `.cabeza`, `.btn`/`.btn-sec`, `.placa`, `.marco`, `.foto`, `.tablero`, `.salidas`, `.lineas`, `.celdas`, `.ruta`, `.cartel`, cabecera `.cabecera--anden`, pie `.pie--anden` y barra fija de móvil).
- **Imágenes**: en `public/fotos/` (lista y descripción en `fotos.json`); respaldo con el mismo nombre en `public/placeholders/`. En `site.yaml` con ruta absoluta (`/fotos/hero.jpg`).
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = el nombre en Chivo Mono 800.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `hero.astro`: «Stage». Texto a la izquierda (`antetitulo`, `titulo` h1, `texto`, `cta` llamar en cobalto, `cta_secundario` con borde); `imagen` a la derecha en un marco de tinta que llega al borde. Encima de la foto, el **tablero**: los tres primeros trayectos de `tarifas` con precio (cabecera `tablero`) y `destacado {titulo, texto}` en placa ámbar. Los `items` de la portada no se usan (la plataforma los trata como cifras).
- `servicios` → `servicios.astro`: filas a todo el ancho: icono en celda con borde, `titulo`, `texto` y `disponible` a la derecha («Al momento» en placa de tinta). `items: [{titulo, texto, icono, disponible, imagen, detalle}]`.
- `tarifas` → `tarifas.astro`: banda de tinta con el tablero de salidas (la firma): `origen` en placa ámbar y la tabla `tarifas: [{nombre, categoria, distancia, duracion, precio, detalle}]` con el precio en ámbar grande. Columnas sin datos no salen; en móvil cada trayecto es un bloque. `nota` debajo. **No inventes precios.**
- `flota` → `flota.astro`: fotos cuadradas en marco de tinta con las plazas en placa ámbar. `vehiculos: [{nombre, texto, plazas, maletas, imagen}]`; `plazas` «7» se lee «7 plazas», otro texto («4 + silla») sale tal cual (máx. 10 caracteres).
- `reservar` → `reservar.astro`: banda clara; pasos (`items: [{titulo, texto}]`) como placas numeradas unidas por un filete; `nota` en placa ámbar, teléfono grande, WhatsApp y el formulario de reserva (`boton_formulario`).
- `empresas` → `empresas.astro`: mitad foto a sangre (`imagen`) y mitad texto con `items` en filas y `cta`.
- `zonas` → `zonas.astro`: cabeza y las localidades en celdas cuadradas unidas por sus bordes (`items: [{titulo, texto}]`); las que tienen `texto` enlazan a su página. `imagen`, `titulo_pagina`, `texto_pagina`: para las páginas por zona.
- `opiniones` → `opiniones.astro`: `testimonios: [{texto, autor, nota}]`; la primera, grande. No inventes opiniones.
- `preguntas` → `preguntas.astro`: `preguntas: [{pregunta, respuesta}]` en `details/summary`, dos columnas en escritorio.
- `contacto` → `contacto.astro`: vías en filas (WhatsApp, correo, dirección) y el teléfono como cartel de tinta con el número en ámbar. Si `reservar` no está activa, aquí sale el formulario de reserva.
- `texto` → `texto.astro`: apartado genérico (párrafos, `imagen`, `items`, `cta`). Para apartados nuevos: `tipo: texto`.

## Reglas para órdenes
1. **Activar o quitar una sección**: `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar**: mueve el bloque dentro de `secciones:`. Procura no poner seguidas dos secciones con foto grande (`flota`, `empresas`) ni dos bandas claras (`reservar`, `zonas`, `preguntas`).
3. **Textos, teléfonos, precios, fotos**: solo en `site.yaml`. Entre comillas si llevan comas o dos puntos dentro de `{ … }`.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Precios, plazas, distancias y tiempos siempre como texto entre comillas (`"95 €"`, `"75 km"`, `"1 h 15 min"`). Máximo 24 elementos por lista.
5. **Página nueva**: `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor un apartado con `tipo:` (`tipo: texto`, `tipo: servicios`, `tipo: tarifas`…) y su propio id. Si hace falta un diseño nuevo, `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)` y `Titular`, como banda a todo el ancho. `src/pages/index.astro` la recoge sola: no lo toques.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/[...pagina].astro`, `tailwind.config.mjs`, `src/styles/comun.css`, `src/lib/*.ts`, `src/pages/robots.txt.ts`, `sitemap.xml.ts` ni `llms.txt.ts` salvo orden explícita de diseño (son el SEO de base y los comunes de todas las plantillas). `seo.url` y `seo.indexable` los pone la plataforma. Los ids `hero` y `contacto` son obligatorios.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro`, sin JavaScript nuevo salvo necesidad real, 16 px de margen lateral en móvil, sin scroll horizontal a 375 px, botones de 44 px o más, barra fija de móvil («Llamar» / «WhatsApp»). Titulares sin palabras partidas: se miden contra su columna (`cqi`); no les quites `overflow-wrap: normal`. Alt sacado del contenido (`altHero`, `altFicha`, `altSeccion`); decorativas, `alt=""`.
9. Formularios sin servidor (`mailto` con el email de `site.yaml`); no cambies su marcado (la plataforma los conecta al publicar).
10. Iconos: `src/components/ui/Icono.astro` (de taxi: `taxi, avion, tren, nieve, hospital, anillo, silla, maleta, bici, montana, ruta, furgoneta`; y `telefono, whatsapp, correo, mapa, reloj, calendario, euro, escudo, usuarios`…).
11. Nada de «contenedor», «Docker», «IA» ni términos técnicos en los textos de la web. Sin emojis, sin palabras en mayúsculas espaciadas, sin puntos medios entre datos.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento y páginas por zona)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.servicios.items` → `/servicios/<slug>/` y `secciones.tarifas.tarifas` → `/traslados/<slug>/` (`TaxiService`, con oferta si el precio es un importe).
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página. Opcionales: `slug` (no lo pongas sin motivo) e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
- Zonas: cada elemento de `secciones.zonas.items` **con `texto`** (60-150 palabras) tiene su página en `/zonas/<slug>/` («Taxi en {zona}»).
- Una orden «añade una página para X» = escribir su `detalle` (o el `texto` de la zona) en site.yaml. Nunca crees a mano páginas en `src/pages/servicios/`, `src/pages/traslados/` ni `src/pages/zonas/`.

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "tarifas; zonas" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Sin ella, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
