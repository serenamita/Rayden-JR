# Succesorrs

Sitio multipágina con el archivo de Rayden Poolito Jr. (Hellmouth / Gagpool). HTML, CSS y JS puros, sin instalar nada.

## Probarlo en VS Code
Abre la carpeta `succesorrs` y usa la extensión **Live Server** (clic derecho en `index.html` > *Open with Live Server*).

## Subirlo a GitHub Pages
1. Crea un repositorio llamado `succesorrs` y sube todo el contenido de la carpeta (`index.html` debe quedar en la raíz).
2. En el repo: *Settings > Pages > Deploy from a branch > main / (root)*.
3. El link será `https://TU-USUARIO.github.io/succesorrs/`. El nombre del repo es lo que aparece en el link (no tu IP). Si quieres que sea solo `succesorrs.github.io`, crea una cuenta/organización llamada `succesorrs` y un repo `succesorrs.github.io`.

## Agregar música
Los MP3 actuales están en `audio/` y sus títulos, artistas, portadas y rutas se configuran en `js/playlist.js`.

## Editar textos
Cada página es un `.html` independiente: busca el texto y cámbialo. El inventario (en `stats.html`) está pendiente del Staff.

## Editar imágenes y relaciones
Los botones de Inicio, Datos básicos, Datos físicos, Historia, Motivación y miedos y Datos heroicos siempre están visibles. El botón de tres rayas también aparece en todas las páginas y despliega Datos psicológicos, Stats y más, Relaciones, Playlist, Mini juego, Galería y No presiones.

Los archivos de imagen están en `img/poolimages/`. Para elegir qué archivo aparece en cada sección, abre `js/imagenes.js` y cambia las rutas dentro de `fisico`, `sobre`, `historia`, `motivacion` o `psicologicos`; las líneas marcadas con `★` señalan cada grupo. Para cambiar las portadas de canciones, abre `js/playlist.js`. `galeria.html` muestra todos los recursos; su lista y categorías se editan en `js/galeria.js`.

Los nombres, etiquetas, fotos y descripciones de las relaciones se editan en `js/relaciones.js`: cambia `nombre`, `tipo`, `foto` o el texto dentro de `info` en la ficha que quieras actualizar.

Los enlaces de navegación de cada página están al final del HTML dentro de `<div class="pager">`; cambia el texto o el `href` ahí. El menú permanente se configura en `js/main.js`. Por ejemplo, la galería está enlazada desde `playlist.html` y también desde el menú de tres rayas.

La hoja de `fisicos.html` tiene el texto de ejemplo `Text text`: reemplázalo directamente en ese archivo cuando quieras escribir tu propio mensaje. La playlist no permite cargar archivos locales desde la página; agrega las canciones en `audio/` y configura sus rutas en `js/playlist.js`.
