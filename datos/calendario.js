// ============================================================
// CALENDARIO DE ACTIVIDADES DEL CEB 9/22
// Cada entrada es una tarjeta en la sección "Calendario de
// actividades" (calendario.html). Se muestran en el orden del
// arreglo. Al pasar una fecha, la tarjeta se retira sola si
// tiene "vence" (AAAA-MM-DD).
//
// Fuente: Programa de actividades académico-administrativas,
// ciclo 2026-2027, CEB en planteles de reconversión (DGB).
// Aquí van solo las fechas que interesan a estudiantes y
// familias; las gestiones internas no se publican.
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
  {
    evento: "Inicio de clases · Semestre A",
    fecha: "Lunes 31 de agosto",
    detalle: "Todos los grupos, de 14:00 a 20:00 h.",
    vence: "2026-08-31",
  },
  {
    evento: "Diagnóstico de los Aprendizajes",
    fecha: "31 de agosto al 4 de septiembre",
    detalle: "Primera semana del semestre, dentro del horario de clases.",
    vence: "2026-09-04",
  },
  {
    evento: "Suspensión de clases",
    fecha: "Miércoles 16 de septiembre",
    detalle: "Día festivo oficial.",
    vence: "2026-09-16",
  },
  {
    evento: "Evaluación extraordinaria intrasemestral",
    fecha: "26 al 30 de octubre",
    detalle: "Primer periodo de evaluación extraordinaria del semestre A.",
    vence: "2026-10-30",
  },
  {
    evento: "Suspensión de clases",
    fecha: "Lunes 2 de noviembre",
    detalle: "Día festivo oficial.",
    vence: "2026-11-02",
  },
  {
    evento: "Suspensión de clases",
    fecha: "Lunes 16 de noviembre",
    detalle: "En conmemoración del 20 de noviembre.",
    vence: "2026-11-16",
  },
  {
    evento: "Fin de clases · Semestre A",
    fecha: "Viernes 18 de diciembre",
    detalle: null,
    vence: "2026-12-18",
  },
  {
    evento: "Vacaciones de invierno",
    fecha: "21 de diciembre al 5 de enero",
    detalle: "Regreso a actividades: 6 de enero de 2027.",
    vence: "2027-01-05",
  },
  {
    evento: "Evaluación final · Semestre A",
    fecha: "11 al 15 de enero de 2027",
    detalle: null,
    vence: "2027-01-15",
  },
  {
    evento: "Evaluación extraordinaria intersemestral",
    fecha: "18 al 22 de enero de 2027",
    detalle: null,
    vence: "2027-01-22",
  },
  {
    evento: "Reinscripciones · Semestre B",
    fecha: "25 al 29 de enero de 2027",
    detalle: "En el plantel, de lunes a viernes de 14:00 a 20:00 h.",
    vence: "2027-01-29",
  },
  {
    evento: "Suspensión de clases",
    fecha: "Lunes 1 de febrero de 2027",
    detalle: "En conmemoración del 5 de febrero.",
    vence: "2027-02-01",
  },
  {
    evento: "Inicio de clases · Semestre B",
    fecha: "Lunes 8 de febrero de 2027",
    detalle: "Todos los grupos, de 14:00 a 20:00 h.",
    vence: "2027-02-08",
  },
  {
    evento: "Vacaciones de primavera",
    fecha: "22 de marzo al 2 de abril de 2027",
    detalle: null,
    vence: "2027-04-02",
  },
  {
    evento: "Fin de clases · Semestre B",
    fecha: "Viernes 11 de junio de 2027",
    detalle: "Con evaluación final del 7 al 11 de junio.",
    vence: "2027-06-11",
  },
];
