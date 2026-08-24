// ============================================================
// AVISOS Y NOTICIAS DEL CEB 9/22
//
// Para publicar un aviso: pegar un objeto NUEVO AL INICIO del
// arreglo, guardar, y hacer git push. En ~1 minuto está en vivo.
//
// Campos:
//   id        → único, en-minusculas-con-guiones (forma la URL compartible)
//   fecha     → "AAAA-MM-DD" (fecha de publicación)
//   tipo      → "inscripciones" | "becas" | "academico" | "eventos" | "urgente" | "comunidad"
//   titulo    → corto y claro
//   resumen   → 1-2 líneas (aparece en las tarjetas)
//   cuerpo    → HTML simple: <p>, <ul>, <li>, <strong>, <a>
//   fijado    → true = se queda arriba de la lista (usar en 1-2 máximo)
//   vence     → "AAAA-MM-DD" o null. Al vencer, sale solo de la portada
//               y de la lista (queda en el archivo). Cero limpieza manual.
//   enlace    → ruta a un PDF en docs/ o URL externa, o null
//   enlaceTexto → texto del botón del enlace (ej. "Descargar convocatoria (PDF)")
//
// PLANTILLA (copiar, pegar al inicio, llenar):
// {
//   id: "titulo-corto-unico",
//   fecha: "2026-08-31",
//   tipo: "academico",
//   titulo: "",
//   resumen: "",
//   cuerpo: "<p></p>",
//   fijado: false,
//   vence: null,
//   enlace: null,
//   enlaceTexto: null,
// },
// ============================================================
window.AVISOS = [
  {
    id: "estrenamos-sitio-oficial",
    fecha: "2026-08-24",
    tipo: "comunidad",
    titulo: "Estrenamos sitio oficial",
    resumen: "A partir de hoy, este sitio es el canal oficial de avisos y comunicados del CEB 9/22. Guárdalo en tu teléfono.",
    cuerpo: "<p>Le damos la bienvenida a la comunidad del <strong>Centro de Estudios de Bachillerato 9/22</strong> a nuestro sitio oficial.</p><p>Aquí publicaremos los avisos del plantel: inscripciones y reinscripciones, becas, calendario, eventos y cualquier cambio que afecte las clases. Cada aviso lleva su fecha de publicación, para que siempre sepas qué está vigente.</p><ul><li>La sección <strong>Avisos</strong> concentra todos los comunicados.</li><li>La página <strong><a href='estatus.html'>¿Hay clases hoy?</a></strong> muestra siempre el estado del día: consúltala ante mal tiempo o contingencias.</li></ul><p>Te recomendamos guardar esta página en la pantalla de inicio de tu teléfono. La información publicada aquí es la información oficial del plantel.</p><p>— La Dirección</p>",
    fijado: true,
    vence: null,
    enlace: null,
    enlaceTexto: null,
  },
];
