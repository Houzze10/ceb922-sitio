// ============================================================
// CALENDARIO DE ACTIVIDADES DEL CEB 9/22
// Cada entrada es una tarjeta en la sección "Calendario de
// actividades" (calendario.html). Se muestran en el orden del
// arreglo. Al pasar una fecha, la tarjeta se retira sola si
// tiene "vence" (AAAA-MM-DD).
//
// Campos: evento, fecha (texto tal como debe leerse),
//         detalle (opcional), vence (opcional, ISO)
// ============================================================
window.CALENDARIO = [
  {
    evento: "Inscripciones y reinscripciones · Ciclo 2026-2027",
    fecha: "Desde el 17 de agosto",
    detalle: "En el plantel, de lunes a viernes de 14:00 a 20:00 h.",
    vence: null,
  },
  {
    evento: "Curso propedéutico EDIEMS · Grupos 101 y 102",
    fecha: "Inicia el lunes 24 de agosto",
    detalle: "Jornada de 14:00 a 18:00 h. Consulta el horario completo en Estudiantes y familias → Horarios de grupo.",
    vence: "2026-08-28",
  },
];
