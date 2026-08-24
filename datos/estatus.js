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
// ============================================================
window.ESTATUS = {
  estado: "normal",
  titulo: "Clases con normalidad",
  mensaje: "",
  actualizado: "2026-08-24 20:00",
};
