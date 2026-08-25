// ============================================================
// ESTATUS DEL PLANTEL — controla la franja de alerta del sitio
// y la página "¿Hay clases hoy?" (estatus.html).
//
// estado:
//   "normal"      → sin franja; la página de estatus dice "Clases con normalidad"
//   "aviso"       → franja azul informativa en TODAS las páginas
//   "emergencia"  → franja roja sobria en TODAS las páginas (suspensión, contingencia)
//
// Regla de la casa: al pasar la contingencia, regresar estado a "normal".
// Una franja vieja mata la credibilidad del canal.
//
// actualizado: escribirlo como se lee, ej. "24 de agosto de 2026, 20:00"
// (el sitio añade la "h" al pintarlo).
// ============================================================
window.ESTATUS = {
  estado: "normal",
  titulo: "Clases con normalidad",
  mensaje: "",
  actualizado: "24 de agosto de 2026, 20:00",
};
