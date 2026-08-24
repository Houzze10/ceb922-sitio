# Sitio oficial · CEB 9/22 Mazatlán

Sitio web del **Centro de Estudios de Bachillerato 9/22** (DGB · SEP), Mazatlán, Sinaloa.
HTML/CSS/JS puro, sin compiladores ni dependencias — publicado con GitHub Pages.

## Cómo se administra (sin entrar a GitHub)

Todo el contenido variable vive en `datos/`:

| Archivo | Qué controla |
|---|---|
| `datos/avisos.js` | Avisos y comunicados. Publicar uno = pegar un objeto al inicio del arreglo y hacer push. |
| `datos/estatus.js` | La franja de alerta del sitio y la página "¿Hay clases hoy?". |
| `datos/config.js` | Datos del plantel: dirección, teléfono, correo, Facebook, CCT. Campo vacío = no se muestra. |

Flujo de publicación:

```
(editar el archivo de datos)
git add -A
git commit -m "aviso: ..."
git push
```

En ~1 minuto el cambio está en vivo. Los avisos con campo `vence` caducan solos.

## Estructura

- `index.html` — portada
- `conocenos.html`, `oferta.html`, `inscripciones.html`, `comunidad.html`, `contacto.html` — páginas de contenido
- `avisos.html` — lista de avisos con filtros · `aviso.html?id=...` — aviso individual (URL compartible)
- `estatus.html` — "¿Hay clases hoy?"
- `privacidad.html` — aviso de privacidad
- `css/estilos.css` — sistema de diseño (guinda SEP + oro, escala 8px)
- `js/app.js` — encabezado/pie compartidos y renderizado de avisos
- `docs/` — PDFs adjuntos de avisos (convocatorias, calendarios)
- `img/` — fotografías del plantel

## Reglas de la casa

- **Jamás** subir datos personales (listas de alumnos, CURPs, calificaciones, teléfonos de padres): el repositorio es público y git no olvida.
- PDFs < 5 MB, fotos comprimidas (< 300 KB).
- Al pasar una contingencia, regresar `estatus.js` a `estado: "normal"`.
