/* ============================================================
   CEB 9/22 — motor del sitio
   - Inyecta encabezado y pie idénticos en todas las páginas
   - Pinta la franja de alerta según datos/estatus.js
   - Renderiza avisos (portada, lista con filtros, detalle)
   - Los avisos con "vence" en el pasado se ocultan solos
   ============================================================ */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var C = window.CONFIG || {};
  var ESTATUS = window.ESTATUS || { estado: "normal" };

  /* ---------- Catálogo de categorías (color fijo por categoría) ---------- */
  var CATS = {
    inscripciones: { nombre: "Inscripciones", color: "var(--cat-inscripciones)" },
    becas:         { nombre: "Becas",         color: "var(--cat-becas)" },
    academico:     { nombre: "Académico",     color: "var(--cat-academico)" },
    eventos:       { nombre: "Eventos",       color: "var(--cat-eventos)" },
    urgente:       { nombre: "Urgente",       color: "var(--cat-urgente)" },
    comunidad:     { nombre: "Comunidad",     color: "var(--cat-comunidad)" },
  };

  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  /* ---------- Escudo del plantel (SVG inline): antorcha, libro abierto y olas ---------- */
  var ESCUDO =
    '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Escudo CEB 9/22">' +
    '<path d="M32 2 58 10v22c0 15-11 25-26 30C17 57 6 47 6 32V10Z" fill="#1b2559"/>' +
    '<path d="M32 6.5 54 13.4v18.4c0 12.6-9.2 21.3-22 25.9-12.8-4.6-22-13.3-22-25.9V13.4Z" fill="none" stroke="#4cc2d6" stroke-width="2"/>' +
    '<path d="M32 11c3 3.4 4.6 5.8 4.6 8.2 0 2.9-2 4.8-4.6 4.8s-4.6-1.9-4.6-4.8c0-2.4 1.6-4.8 4.6-8.2Z" fill="#8fd8e4"/>' +
    '<path d="M29.3 25.2h5.4l-1.1 4h-3.2Z" fill="#ffffff"/>' +
    '<rect x="30.9" y="29.4" width="2.2" height="5.6" fill="#ffffff"/>' +
    '<path d="M32 40c-4.6-3-10.4-3.2-14-1.6v7.2c3.6-1.6 9.4-1.4 14 1.8Z" fill="#ffffff"/>' +
    '<path d="M32 40c4.6-3 10.4-3.2 14-1.6v7.2c-3.6-1.6-9.4-1.4-14 1.8Z" fill="#cdeef4"/>' +
    '<path d="M22 52.5c2.5-2 5-2 7.5 0s5 2 7.5 0c1.8-1.4 3.4-1.7 5-0.8" fill="none" stroke="#4cc2d6" stroke-width="1.8" stroke-linecap="round"/>' +
    '</svg>';

  /* ---------- Utilidades ---------- */
  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  var FECHA_ISO = /^\d{4}-\d{2}-\d{2}$/;

  function fechaLarga(iso) {
    if (!iso) return "";
    var p = iso.split("-");
    var mes = MESES[parseInt(p[1], 10) - 1];
    if (p.length !== 3 || !mes) return iso;
    return parseInt(p[2], 10) + " de " + mes + " de " + p[0];
  }

  function hoyISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var dia = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + dia;
  }

  /* Avisos vigentes: sin vencer, orden fijados-primero y fecha descendente.
     Un "vence" con formato inválido se ignora (el aviso se queda visible). */
  function avisosVigentes() {
    var hoy = hoyISO();
    var lista = (window.AVISOS || []).filter(function (a) {
      return a && a.id && a.titulo && (!a.vence || !FECHA_ISO.test(a.vence) || a.vence >= hoy);
    });
    lista.sort(function (a, b) {
      if (!!b.fijado !== !!a.fijado) return b.fijado ? 1 : -1;
      return (b.fecha || "").localeCompare(a.fecha || "");
    });
    return lista;
  }

  /* ---------- Encabezado ---------- */
  function pintarEncabezado() {
    var sitio = document.getElementById("encabezado");
    if (!sitio) return;

    var pagina = document.body.getAttribute("data-pagina") || "";
    var enlaces = [
      { url: "index.html", texto: "Inicio", id: "inicio" },
      { url: "conocenos.html", texto: "Conócenos", id: "conocenos" },
      { url: "oferta.html", texto: "Oferta educativa", id: "oferta" },
      { url: "comunidad.html", texto: "Estudiantes y familias", id: "comunidad" },
      { url: "avisos.html", texto: "Avisos", id: "avisos" },
      { url: "contacto.html", texto: "Contacto", id: "contacto" },
    ];

    var franja = "";
    if (ESTATUS.estado === "aviso" || ESTATUS.estado === "emergencia") {
      var clase = ESTATUS.estado === "emergencia" ? "franja-alerta--emergencia" : "franja-alerta--aviso";
      var rol = ESTATUS.estado === "emergencia" ? "alert" : "status";
      franja =
        '<div class="franja-alerta ' + clase + '" role="' + rol + '">' +
        "<strong>" + esc(ESTATUS.titulo) + "</strong>" +
        (ESTATUS.mensaje ? " — " + esc(ESTATUS.mensaje) : "") +
        ' <a href="estatus.html">Ver detalle</a>' +
        (ESTATUS.actualizado ? '<span class="franja-hora">Actualizado: ' + esc(ESTATUS.actualizado) + " h</span>" : "") +
        "</div>";
    }

    var utilDerecha = C.telefono
      ? '<a href="tel:+52' + esc(String(C.telefono).replace(/\D/g, "")) + '">📞 ' + esc(C.telefono) + "</a>"
      : "<span>" + esc(C.subsistema || "") + "</span>";

    var html =
      '<a class="salto" href="#contenido">Ir al contenido</a>' +
      franja +
      '<div class="barra-util"><div class="contenedor">' +
      '<nav class="util-enlaces" aria-label="Enlaces de acceso rápido">' +
      '<a href="estatus.html">¿Hay clases hoy?</a>' +
      '<a href="comunidad.html#calendario">Calendario escolar</a>' +
      (C.facebook ? '<a href="' + esc(C.facebook) + '" target="_blank" rel="noopener">Facebook</a>' : "") +
      "</nav>" +
      "<div>" + utilDerecha + "</div>" +
      "</div></div>" +
      '<div class="nav-principal"><div class="contenedor">' +
      '<a class="marca" href="index.html">' + ESCUDO +
      '<span class="marca-texto"><span class="marca-nombre">' + esc(C.nombreCorto || "CEB 9/22") + "</span>" +
      '<span class="marca-lugar">' + esc(C.eponimo ? "«" + C.eponimo + "»" : (C.ciudad || "") + " · DGB · SEP") + "</span></span></a>" +
      '<button class="nav-hamburguesa" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menú">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
      "</button>" +
      '<ul class="nav-enlaces" id="menu-principal">' +
      enlaces.map(function (e) {
        var actual = e.id === pagina ? ' aria-current="page"' : "";
        return '<li><a href="' + e.url + '"' + actual + ">" + e.texto + "</a></li>";
      }).join("") +
      '<li class="nav-cta-movil"><a href="inscripciones.html">Inscripciones ' + esc(C.ciclo || "") + "</a></li>" +
      "</ul>" +
      '<div class="nav-cta"><a class="btn btn-acento" href="inscripciones.html">Inscripciones</a></div>' +
      "</div></div>";

    sitio.innerHTML = html;

    var boton = sitio.querySelector(".nav-hamburguesa");
    var menu = sitio.querySelector(".nav-enlaces");
    if (boton && menu) {
      boton.addEventListener("click", function () {
        var abierto = menu.classList.toggle("abierto");
        boton.setAttribute("aria-expanded", abierto ? "true" : "false");
        boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
      });
    }
  }

  /* ---------- Pie de página ---------- */
  function pintarPie() {
    var sitio = document.getElementById("pie");
    if (!sitio) return;

    var contacto = "";
    contacto += "<li>" + esc(C.sede || "") + "</li>";
    contacto += '<li><a href="' + esc(C.mapsUrl || "#") + '" target="_blank" rel="noopener">' + esc(C.direccion || "") + "</a></li>";
    if (C.turno) contacto += "<li>Turno " + esc(C.turno.toLowerCase()) + (C.horarioAtencion ? " · " + esc(C.horarioAtencion) : "") + "</li>";
    if (C.telefono) contacto += '<li><a href="tel:+52' + esc(String(C.telefono).replace(/\D/g, "")) + '">' + esc(C.telefono) + "</a></li>";
    if (C.correo) contacto += '<li><a href="mailto:' + esc(C.correo) + '">' + esc(C.correo) + "</a></li>";

    sitio.innerHTML =
      '<footer class="pie">' +
      '<div class="pie-marca-agua" aria-hidden="true">' + ESCUDO + "</div>" +
      '<div class="contenedor">' +
      '<div class="pie-rejilla">' +
      "<div>" +
      '<div class="pie-marca">' + ESCUDO + '<span class="pie-marca-nombre">' + esc(C.nombre || "") + "</span></div>" +
      "<p>Plantel federal de la " + esc(C.subsistema || "") + ". Educación media superior pública y gratuita en " + esc(C.ciudad || "") + "." +
      (C.cct ? "<br>CCT: " + esc(C.cct) : "") + "</p>" +
      "</div>" +
      "<div><h2>Contacto</h2><ul>" + contacto + "</ul></div>" +
      "<div><h2>Accesos rápidos</h2><ul>" +
      '<li><a href="inscripciones.html">Inscripciones</a></li>' +
      '<li><a href="avisos.html">Avisos y comunicados</a></li>' +
      '<li><a href="estatus.html">¿Hay clases hoy?</a></li>' +
      '<li><a href="comunidad.html">Estudiantes y familias</a></li>' +
      '<li><a href="oferta.html">Oferta educativa</a></li>' +
      "</ul></div>" +
      "<div><h2>Canales oficiales</h2>" +
      "<p>La información oficial del plantel es únicamente la publicada en este sitio" +
      (C.facebook ? ' y en nuestra <a href="' + esc(C.facebook) + '" target="_blank" rel="noopener">página de Facebook</a>' : "") +
      ".</p><ul>" +
      (C.facebook ? '<li><a href="' + esc(C.facebook) + '" target="_blank" rel="noopener">Facebook</a></li>' : "") +
      (C.instagram ? '<li><a href="' + esc(C.instagram) + '" target="_blank" rel="noopener">Instagram</a></li>' : "") +
      '<li><a href="https://www.gob.mx/sep" target="_blank" rel="noopener">SEP · gob.mx</a></li>' +
      '<li><a href="privacidad.html">Aviso de privacidad</a></li>' +
      "</ul></div>" +
      "</div>" +
      '<div class="pie-legal">' +
      "<span>© 2026 " + esc(C.nombre || "") + " · " + esc(C.ciudad || "") + "</span>" +
      "<span>" + esc(C.subsistema || "") + "</span>" +
      "</div>" +
      "</div></footer>";
  }

  /* ---------- Tarjeta de aviso ---------- */
  function tarjetaAviso(a) {
    var cat = CATS[a.tipo] || { nombre: a.tipo || "Aviso", color: "var(--guinda-700)" };
    return (
      '<article class="aviso-tarjeta" style="--cat-color:' + cat.color + '">' +
      '<div class="aviso-meta">' +
      '<span class="aviso-cat">' + esc(cat.nombre) + "</span>" +
      '<time class="aviso-fecha" datetime="' + esc(a.fecha) + '">' + fechaLarga(a.fecha) + "</time>" +
      (a.fijado ? '<span class="aviso-fijado">📌 Fijado</span>' : "") +
      "</div>" +
      '<h3><a href="aviso.html?id=' + encodeURIComponent(a.id) + '">' + esc(a.titulo) + "</a></h3>" +
      '<p class="aviso-resumen">' + esc(a.resumen || "") + "</p>" +
      "</article>"
    );
  }

  /* ---------- Portada: últimos 3 avisos ---------- */
  function pintarAvisosPortada() {
    var caja = document.getElementById("avisos-portada");
    if (!caja) return;
    try {
      var lista = avisosVigentes().slice(0, 3);
      caja.innerHTML = lista.length
        ? lista.map(tarjetaAviso).join("")
        : '<p class="sin-resultados">Por el momento no hay avisos publicados.</p>';
    } catch (e) {
      caja.innerHTML = '<p class="sin-resultados">Avisos temporalmente no disponibles.</p>';
    }
  }

  /* ---------- Página de avisos: lista completa con filtros ---------- */
  function pintarListaAvisos() {
    var caja = document.getElementById("lista-avisos");
    if (!caja) return;

    var selCat = document.getElementById("filtro-categoria");
    var selMes = document.getElementById("filtro-mes");
    var busca = document.getElementById("filtro-busqueda");

    var todos;
    try { todos = avisosVigentes(); } catch (e) { todos = []; }

    /* Texto buscable por aviso, con el HTML del cuerpo despojado (una sola vez) */
    var despojador = document.createElement("div");
    todos.forEach(function (a) {
      despojador.innerHTML = a.cuerpo || "";
      a._texto = (a.titulo + " " + (a.resumen || "") + " " + despojador.textContent).toLowerCase();
    });

    /* poblar el filtro de meses con los meses que existen */
    if (selMes) {
      var meses = {};
      todos.forEach(function (a) {
        var clave = (a.fecha || "").slice(0, 7);
        var nombreMes = MESES[parseInt(clave.slice(5), 10) - 1];
        if (clave && nombreMes) meses[clave] = nombreMes + " " + clave.slice(0, 4);
      });
      Object.keys(meses).sort().reverse().forEach(function (clave) {
        var op = document.createElement("option");
        op.value = clave;
        op.textContent = meses[clave].charAt(0).toUpperCase() + meses[clave].slice(1);
        selMes.appendChild(op);
      });
    }

    function aplicar() {
      var cat = selCat ? selCat.value : "";
      var mes = selMes ? selMes.value : "";
      var q = busca ? busca.value.trim().toLowerCase() : "";
      var lista = todos.filter(function (a) {
        if (cat && a.tipo !== cat) return false;
        if (mes && (a.fecha || "").slice(0, 7) !== mes) return false;
        if (q && (a._texto || "").indexOf(q) === -1) return false;
        return true;
      });
      caja.innerHTML = lista.length
        ? lista.map(tarjetaAviso).join("")
        : '<p class="sin-resultados">No hay avisos que coincidan con el filtro.</p>';
    }

    [selCat, selMes].forEach(function (el) { if (el) el.addEventListener("change", aplicar); });
    if (busca) busca.addEventListener("input", aplicar);
    aplicar();
  }

  /* ---------- Página de aviso individual ---------- */
  function pintarAvisoDetalle() {
    var caja = document.getElementById("aviso-detalle");
    if (!caja) return;

    var id = new URLSearchParams(location.search).get("id");
    var aviso = (window.AVISOS || []).filter(function (a) { return a && a.id === id; })[0];

    if (!aviso) {
      caja.innerHTML =
        '<div class="aviso-cuerpo centrado"><h1>Aviso no encontrado</h1>' +
        '<p>Es posible que el enlace esté incompleto o que el aviso ya no esté disponible.</p>' +
        '<a class="btn btn-azul" href="avisos.html">Ver todos los avisos</a></div>';
      return;
    }

    document.title = aviso.titulo + " · " + (C.nombreCorto || "CEB 9/22");
    var cat = CATS[aviso.tipo] || { nombre: aviso.tipo || "Aviso", color: "var(--guinda-700)" };
    var urlCompartir = location.href;
    var textoWa = encodeURIComponent(aviso.titulo + " — " + (C.nombreCorto || "CEB 9/22") + "\n" + urlCompartir);

    caja.innerHTML =
      '<div class="aviso-cuerpo">' +
      '<div class="aviso-meta" style="margin-bottom:16px">' +
      '<span class="aviso-cat" style="background:' + cat.color + '">' + esc(cat.nombre) + "</span>" +
      '<time class="aviso-fecha" datetime="' + esc(aviso.fecha) + '">Publicado el ' + fechaLarga(aviso.fecha) + "</time>" +
      (aviso.vence ? '<span class="aviso-fecha">· Vigente hasta el ' + fechaLarga(aviso.vence) + "</span>" : "") +
      "</div>" +
      "<h1>" + esc(aviso.titulo) + "</h1>" +
      (aviso.cuerpo || "<p>" + esc(aviso.resumen || "") + "</p>") +
      (aviso.enlace
        ? '<a class="aviso-adjunto" href="' + esc(aviso.enlace) + '" target="_blank" rel="noopener">📄 ' + esc(aviso.enlaceTexto || "Ver documento adjunto") + "</a>"
        : "") +
      '<div class="aviso-compartir">' +
      '<a class="btn btn-azul" href="https://wa.me/?text=' + textoWa + '" target="_blank" rel="noopener">Compartir por WhatsApp</a>' +
      '<button class="btn btn-contorno" id="btn-copiar">Copiar enlace</button>' +
      "</div></div>";

    var btnCopiar = document.getElementById("btn-copiar");
    if (btnCopiar) {
      btnCopiar.addEventListener("click", function () {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(urlCompartir).then(function () {
            btnCopiar.textContent = "✓ Enlace copiado";
            setTimeout(function () { btnCopiar.textContent = "Copiar enlace"; }, 2500);
          });
        }
      });
    }
  }

  /* ---------- Página de estatus ---------- */
  function pintarEstatus() {
    var caja = document.getElementById("estatus-hoy");
    if (!caja) return;

    var estilos = {
      normal:     { color: "#1e7d4f", icono: "✅", titulo: "Clases con normalidad" },
      aviso:      { color: "#1c5fa8", icono: "ℹ️", titulo: ESTATUS.titulo || "Aviso" },
      emergencia: { color: "#b3261e", icono: "⚠️", titulo: ESTATUS.titulo || "Atención" },
    };
    var e = estilos[ESTATUS.estado] || estilos.normal;

    caja.innerHTML =
      '<div class="estatus-caja" style="--est-color:' + e.color + '" role="status">' +
      '<div class="estatus-icono" aria-hidden="true">' + e.icono + "</div>" +
      '<h2 style="color:' + e.color + '">' + esc(ESTATUS.estado === "normal" ? "Clases con normalidad" : e.titulo) + "</h2>" +
      (ESTATUS.estado !== "normal" && ESTATUS.mensaje ? "<p>" + esc(ESTATUS.mensaje) + "</p>" : "") +
      (ESTATUS.estado === "normal" ? "<p>El plantel opera hoy en su horario habitual del turno " + esc((C.turno || "vespertino").toLowerCase()) + ".</p>" : "") +
      (ESTATUS.actualizado ? '<p class="estatus-hora">Última actualización: ' + esc(ESTATUS.actualizado) + " h</p>" : "") +
      "</div>";
  }

  /* ---------- Animación de aparición al hacer scroll ---------- */
  function animarAparicion() {
    if (!("IntersectionObserver" in window)) return;
    var objetivos = document.querySelectorAll(".rev, .tarjeta, .paso, .cifra, .info-item, .aviso-tarjeta, .cita");
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visto"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    objetivos.forEach(function (el, i) {
      el.classList.add("rev");
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      obs.observe(el);
    });
  }

  /* ---------- Arranque ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    try { pintarEncabezado(); } catch (e) { /* nunca tumbar la página */ }
    try { pintarPie(); } catch (e) {}
    try { pintarAvisosPortada(); } catch (e) {}
    try { pintarListaAvisos(); } catch (e) {}
    try { pintarAvisoDetalle(); } catch (e) {}
    try { pintarEstatus(); } catch (e) {}
    try { animarAparicion(); } catch (e) {}
  });
})();
