// ============================================================
// VACANTES DE EMPLEO DEL CEB 9/22 — se pintan en vacantes.html
// Publicar una vacante = pegar un objeto AL INICIO del arreglo.
// Al pasar su "vence" (AAAA-MM-DD) se retira sola.
//
// Campos: puesto, perfil (texto corto: formación requerida),
//         detalle (horas, turno, requisitos), vence (opcional, ISO)
//
// PLANTILLA (copiar, pegar al inicio, llenar):
// {
//   puesto: "",
//   perfil: "",
//   detalle: "",
//   vence: null,
// },
// ============================================================
window.VACANTES = [];

// Lista de documentos que se envían al correo de la Dirección
// para postular. La llena la Dirección; mientras esté vacía,
// la sección de documentos no se muestra en la página.
window.VACANTES_DOCS = [];
