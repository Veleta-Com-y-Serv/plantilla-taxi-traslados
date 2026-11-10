# Plantilla NoExpertise · Taxi y traslados

Web de señalética para taxis, VTC y traslados: tablero de precios cerrados, vehículos y reserva. Tema Wayfind (Hallmark).

- Sectores: taxi y VTC, traslados y transfers, microbuses y furgonetas con conductor, transporte adaptado. Estilo: wayfind. Plan mínimo: gratis. Orden 740.
- Secciones: hero, servicios, tarifas, flota (vehículos), reservar, empresas, zonas, opiniones, preguntas, contacto (+ `texto` para apartados nuevos).
- Campos propios: `hero.tablero` (cabecera del tablero de precios de la portada) y `hero.destacado {titulo, texto}` (placa ámbar);
  `servicios.items[].disponible` («Al momento» / «Con reserva»); `tarifas.tarifas[]` (`nombre, categoria, distancia, duracion, precio, detalle`),
  `tarifas.origen` (placa «Salidas desde …») y `tarifas.nota`; `flota.vehiculos[]` (`nombre, texto, plazas, maletas, imagen`);
  `reservar.items` (pasos), `reservar.nota`, `reservar.boton_formulario`; `empresas.items`, `empresas.imagen`, `empresas.cta`.
- Ejemplo: Taxi Campoo, Reinosa (Cantabria). Negocio y teléfonos ficticios.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD (`LocalBusiness`) y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas` (Tarifas, Vehículos, Reservar). Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente en `template.yaml`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Letra Chivo Mono (OFL-1.1) alojada en `public/fuentes/` (`LICENCIAS.md`). Fotos de `public/fotos/` generadas con IA para esta plantilla; imágenes de relleno (`public/placeholders/`) hechas para ella, sin licencias de terceros.

## Páginas propias
- Cada elemento de `secciones.servicios.items` con `detalle` tiene su página en `/servicios/<slug>/` y cada trayecto de `secciones.tarifas.tarifas` con `detalle`, en `/traslados/<slug>/` (`src/pages/[coleccion]/[slug].astro`).
- Cada zona de `secciones.zonas.items` con `texto` tiene su página en `/zonas/<slug>/` (`src/pages/zonas/[slug].astro`); en la sección, `titulo_pagina` y `texto_pagina` con {zona} y {negocio}.
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
