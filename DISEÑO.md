# Taxi y traslados: brief de diseño

Plantilla `taxi-traslados` creada el 10/11/2026 a partir de `transporte-mudanzas` con `php artisan plantillas:nueva` y
rediseñada entera con el tema **Wayfind** de la skill Hallmark (género modern-minimal). De la base solo queda la estructura
técnica. Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: taxistas rurales y de ciudad pequeña, VTC, empresas de traslados y microbuses (sectores `taxi`, `traslados`,
  `microbus`, `transporte-adaptado`): taxi 24 horas, traslados a aeropuertos y estaciones, a pistas de esquí, hospitales y
  bodas, senderistas y bicis, coches de 7 y 9 plazas, servicio adaptado, precios cerrados por trayecto. Su cliente entra
  desde el móvil (a menudo turista) y quiere llamar o escribir ya, saber cuánto cuesta su trayecto y reservar con antelación.
- **Qué tiene que conseguir la web**: que **llamen** y que **reserven**. «Llamar ahora» (cobalto) y «Reservar un traslado» en la
  portada; teléfono y «Reservar» en la cabecera; en móvil, barra fija con «Llamar» y «WhatsApp». El precio del trayecto se ve
  en la primera pantalla (el tablero).
- **Tono**: señalética de estación: se lee de un vistazo, a tres metros, de día. Frases cortas e imperativas, de tú.
  Sí: un panel de salidas de una estación de tren de provincias. No: una app de VTC en negro con neones, ni la plantilla
  amarilla «de taxi» con cuadros de bandera.

## Tema Hallmark y cómo se ha traducido

Wayfind (`references/themes/wayfind.md`, colorway `platform`): papel gris frío, tinta azul casi negra, Chivo Mono en todo
(también para leer), bordes cuadrados de tinta de 2 px, placas de tinta, cobalto para lo que está vivo (la acción) y ámbar
para las cifras sobre tinta. Radio 0, sin degradados ni texturas, movimiento de panel: cambios de color en `steps(1)`, sin
animaciones de entrada.

- **Cuatro colores** → `fondo` = papel (`#edf0f4`), `texto` = tinta (`#0b0e15`: letra, bordes, banda de tarifas, cartel del
  teléfono y pie), `acento` = cobalto (`#2055e1`: botón principal, foco, enlaces), `primario` = ámbar (`#f4b522`: placas y
  cifras sobre la tinta). El tema tiene dos acentos (cobalto y ámbar); el «color fuerte de las bandas» del contrato es aquí
  la tinta (el propio `texto`), y el primario hace de ámbar porque es el color de marca de un taxi.
- **Derivados** (`src/styles/global.css`): `--papel-2` (bandas claras), `--papel-3` (pozos, campos, placas de papel),
  `--tinta-2`, `--apagado`, `--filete`, `--filete-tinta`, `--sobre-tinta(-2)`, `--acento-legible` (cobalto como texto,
  nunca más claro que L 0,52), `--sobre-acento` y `--sobre-primario` (letra clara u oscura según el color del cliente) y
  `--cifra` (ámbar sobre tinta, nunca más oscuro que L 0,76). Probado con primario verde oscuro `#14532d` y acento naranja
  `#f97316`: botón naranja con letra oscura, placa verde con letra clara, precios en verde claro sobre la tinta; legible.
  Supuesto: la tinta (`texto`) es oscura; con un `texto` claro y un `fondo` oscuro la banda de tarifas se invierte, pero
  las cifras siguen siendo claras.
- **Material**: cabeza de sección con filete de tinta de 2 px a todo el ancho; filas a todo el ancho con icono en celda con
  borde y estado a la derecha (servicios); tabla con filetes en la banda de tinta (tarifas); fotos cuadradas dentro del
  marco de tinta con la cifra en placa ámbar (vehículos); placas numeradas unidas por un filete como un cartel de pasillo
  (reservar); celdas cuadradas unidas por sus bordes como un selector de estaciones (zonas); el teléfono como cartel de
  tinta con el número en ámbar (contacto). Tratamiento de foto del tema por CSS: `saturate(.88) contrast(1.1)`.
- **Firma**: el tablero de precios cerrados. En la portada, una tarjeta que asoma sobre el borde izquierdo de la foto con
  los tres primeros trayectos y su precio en ámbar sobre tinta, y la placa «Servicio 24 horas»; en la sección `tarifas`,
  el panel de salidas entero (destino, tipo, distancia, tiempo y precio grande).

## Tipografías y licencias

Chivo Mono 400, 500 y 800 (Omnibus-Type), **OFL-1.1**, woff2 `latin` de Fontsource en `public/fuentes/` (36 KB en total),
`font-display: swap`, respaldo `ui-monospace, Menlo, Consolas…` y `preload` solo del 800 (titulares). Una sola familia, como
pide el tema. Detalle en `public/fuentes/LICENCIAS.md`.

Legibilidad de la mono: cuerpo a 16 px con interlineado 1,62 y líneas de 64 caracteres como mucho; letra menuda a 13-14 px
en 500. Titulares sin palabras partidas: `overflow-wrap: normal`, `hyphens: manual`, y el tamaño se mide contra la propia
columna con `cqi` (en Chivo Mono 800 con −0,03 em una palabra de 20 letras mide 11,4 em): `h1` `clamp(1.75rem, 8.4cqi, 4.75rem)`
y `h2` `clamp(1.5rem, 8.2cqi, 3.25rem)` con `max-width: 20ch` / `22ch`. Probado con «Impermeabilizaciones» en el `h1`, los `h2`,
un trayecto y el nombre del pie a 375 y 1440: sin desbordes.

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| 1 | `hero` | papel | Stage: texto en seis columnas, foto en marco de tinta a sangre a la derecha y el tablero asomando sobre ella |
| 2 | `servicios` | papel | filas de estado a todo el ancho |
| 3 | `tarifas` | tinta | panel de salidas (firma) |
| 4 | `flota` | papel | rejilla de fotos cuadradas en marco con las plazas en placa |
| 5 | `reservar` | clara | placas numeradas unidas por un filete y el formulario en un pozo |
| 6 | `empresas` | papel | mitad foto a sangre y mitad texto con filas |
| 7 | `zonas` | clara | celdas cuadradas unidas por sus bordes |
| 8 | `opiniones` | papel | la primera como frase grande |
| 9 | `preguntas` | clara | filas `details` en dos columnas |
| 10 | `contacto` | papel | vías en filas y el teléfono como cartel de tinta |
| — | pie | tinta | nombre como mástil, cuatro columnas, barra fija de móvil |

Se alternan bandas guiadas por foto (portada, vehículos, empresas) con bandas que solo hace el material (filas, tabla en
tinta, placas, celdas, cartel). Cabecera fija siempre sólida (z-index 50, la portada no la tapa).

## Listas propias y páginas

- `servicios.items` {titulo, texto, icono, disponible, imagen, detalle}, `tarifas.tarifas` {nombre, categoria, distancia,
  duracion, precio, detalle}, `flota.vehiculos` {nombre, texto, plazas, maletas, imagen}, `reservar.items`, `empresas.items`,
  `zonas.items` {titulo, texto}.
- Fichas: cada servicio con `detalle` en `/servicios/<slug>/` y cada trayecto con `detalle` en `/traslados/<slug>/`
  (`TaxiService`); zonas con `texto` en `/zonas/<slug>/` («Taxi en Reinosa»). La demo debe ir en Reinosa para enseñar las zonas.
- Varias páginas recomendadas: Tarifas (tarifas, zonas), Vehículos (flota, empresas), Reservar (reservar, preguntas, contacto).

## Fotos

11 fotos generadas con IA (nanobanana) a partir de `fotos.json`: berlina blanca de perfil en una plaza de pueblo de montaña
al amanecer (portada), zona de llegadas de un aeropuerto, monovolumen con portaesquís en la nieve, puerta de coche de boda
ante una iglesia románica, furgoneta con bicis al inicio de un sendero, cuatro vehículos (berlina, monovolumen de 7,
furgoneta de 9 ante una estación, furgoneta adaptada con rampa), entrada de hotel rural con maleta y un valle con carretera
y embalse (páginas por zona). Sin texto legible, sin matrículas ni personas. Tres se repitieron: la portada y la furgoneta
(salían emblemas en la parrilla) y el valle (salía como cuadro en una pared). El generador da 1024 px: la portada va
cuadrada a 1400 px (el marco de escritorio es casi cuadrado y en móvil se recorta a 4:3) y el resto a 1200-1365 px.

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como letra menuda en caja normal (Hallmark prohíbe el antetítulo).
- `opiniones` lleva ejemplos ficticios en el `site.yaml` de muestra (Hallmark prohíbe inventarlos); la plataforma deja la
  sección desmarcada y vacía al crear una web. Los precios del ejemplo son de muestra; al crear una web salen vacíos.
- Los `items` de la portada la plataforma los trata como cifras: esta plantilla no los usa (el tablero sale de `tarifas`).
- El sello de Hallmark no queda en la primera línea del CSS servido (Tailwind antepone su cabecera) y `comun.css` (común a
  todas las plantillas) trae una sombra con color literal y la etiqueta del pie en mayúsculas espaciadas, que aquí se anula;
  sloplint los marca (20, 48, 67) y quedan como «waivers» en la cabecera de `global.css`.
- sloplint da por «dos botones llenos» el par de la portada (el segundo es transparente con borde) y avisa de más de 450
  palabras: una web de taxi necesita sus tarifas, servicios y preguntas enteros.
- La mono pide titulares más pequeños que una sans a igualdad de columna: el `h1` de escritorio queda en unos 58 px para
  que quepa una palabra de 20 letras.
