// ============================================================
// CONVOCATORIAS DEL CEB 9/22 — se pintan en convocatorias.html
// Publicar una convocatoria = pegar un objeto AL INICIO del
// arreglo. Al pasar su "vence" (AAAA-MM-DD) se retira sola.
//
// Campos: titulo, fecha (texto tal como debe leerse),
//         detalle (texto plano), vence (opcional, ISO)
// Regla de la casa: el contenido completo va en "detalle";
// nada de PDFs ni enlaces externos.
//
// PLANTILLA (copiar, pegar al inicio, llenar):
// {
//   titulo: "",
//   fecha: "",
//   detalle: "",
//   vence: null,
// },
// ============================================================
window.CONVOCATORIAS = [];
