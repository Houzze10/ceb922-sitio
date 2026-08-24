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

  /* ---------- Escudo oficial del plantel (imagen) ---------- */
  var ESCUDO = '<img class="escudo-img" src="img/escudo-min.webp" alt="Escudo del CEB 9/22" width="88" height="140">';

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
      { url: "vida.html", texto: "Vida estudiantil", id: "vida" },
      { url: "comunidad.html", texto: "Familias", id: "comunidad" },
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
      (C.instagram ? '<a href="' + esc(C.instagram) + '" target="_blank" rel="noopener">Instagram</a>' : "") +
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
      '<li><a href="vida.html">Vida estudiantil</a></li>' +
      '<li><a href="comunidad.html">Horarios y calendario</a></li>' +
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
      (aviso.imagen ? '<p><img src="' + esc(aviso.imagen) + '" alt="' + esc(aviso.imagenAlt || aviso.titulo) + '" style="border-radius:12px;box-shadow:var(--sombra)" loading="lazy"></p>' : "") +
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

  /* ---------- Vida estudiantil (vida.html) ---------- */
  function pintarVida() {
    var caja = document.getElementById("vida-eventos");
    if (!caja || !window.EVENTOS) return;

    caja.innerHTML = window.EVENTOS.map(function (ev) {
      if (!ev || !ev.titulo || !ev.fotos || !ev.fotos.length) return "";
      return (
        '<article class="evento-bloque" id="' + esc(ev.id || "") + '">' +
        '<div class="evento-cabeza rev"><h2>' + esc(ev.titulo) + "</h2>" +
        (ev.descripcion ? "<p>" + esc(ev.descripcion) + "</p>" : "") +
        "</div>" +
        '<div class="evento-fotos">' +
        ev.fotos.map(function (f) {
          return (
            '<figure tabindex="0" role="button" aria-label="Ampliar: ' + esc(f.pie || f.alt) + '" data-src="' + esc(f.src) + '" data-pie="' + esc(f.pie || "") + '">' +
            '<img src="' + esc(f.src) + '" alt="' + esc(f.alt || "") + '" loading="lazy">' +
            (f.pie ? "<figcaption>" + esc(f.pie) + "</figcaption>" : "") +
            "</figure>"
          );
        }).join("") +
        "</div></article>"
      );
    }).join("");

    /* Visor (lightbox) */
    var visor = document.getElementById("visor");
    var visorImg = document.getElementById("visor-img");
    var visorPie = document.getElementById("visor-pie");
    var visorCerrar = document.getElementById("visor-cerrar");
    if (!visor || !visorImg) return;

    function abrir(fig) {
      visorImg.src = fig.getAttribute("data-src");
      visorImg.alt = fig.querySelector("img") ? fig.querySelector("img").alt : "";
      visorPie.textContent = fig.getAttribute("data-pie") || "";
      visor.hidden = false;
      document.body.style.overflow = "hidden";
      visorCerrar.focus();
    }
    function cerrar() {
      visor.hidden = true;
      visorImg.src = "";
      document.body.style.overflow = "";
    }
    caja.querySelectorAll("figure").forEach(function (fig) {
      fig.addEventListener("click", function () { abrir(fig); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrir(fig); }
      });
    });
    visor.addEventListener("click", function (e) { if (e.target === visor) cerrar(); });
    visorCerrar.addEventListener("click", cerrar);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !visor.hidden) cerrar(); });
  }

  /* ---------- Horarios de grupo (comunidad.html) ---------- */
  function pintarHorarios() {
    var tabs = document.getElementById("horario-tabs");
    var caja = document.getElementById("horario-tabla");
    if (!tabs || !caja || !window.HORARIOS) return;
    var DIAS = ["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    function colorMateria(nombre) {
      var h = 0;
      for (var i = 0; i < nombre.length; i++) h = (h * 31 + nombre.charCodeAt(i)) % 360;
      return {
        fondo: "hsl(" + h + ", 70%, 93%)",
        borde: "hsl(" + h + ", 45%, 52%)",
        texto: "hsl(" + h + ", 60%, 20%)",
      };
    }

    function pintarGrupo(g) {
      var html = '<div class="tabla-scroll"><table class="horario"><caption class="sr-only">Horario del grupo ' + esc(g.grupo) + "</caption><thead><tr>";
      DIAS.forEach(function (d) { html += "<th>" + d + "</th>"; });
      html += "</tr></thead><tbody>";
      g.filas.forEach(function (fila) {
        html += '<tr><th scope="row">' + esc(fila[0]) + "</th>";
        for (var i = 1; i <= 5; i++) {
          var m = fila[i];
          if (m === "RECESO") {
            html += '<td class="celda-receso">Receso</td>';
          } else if (!m) {
            html += '<td class="celda-libre">—</td>';
          } else {
            var c = colorMateria(m);
            html += '<td class="celda-materia" style="background:' + c.fondo + ";border-left:4px solid " + c.borde + ";color:" + c.texto + '">' + esc(m) + "</td>";
          }
        }
        html += "</tr>";
      });
      html += "</tbody></table></div>" +
        '<div class="horario-pie"><span class="texto-suave">' + esc(g.semestre) + " · turno vespertino · " + esc(window.HORARIOS.ciclo) + "</span>" +
        '<a class="btn btn-contorno" href="' + esc(g.pdf) + '" target="_blank" rel="noopener">📄 Descargar en PDF</a></div>';
      caja.innerHTML = html;
    }

    window.HORARIOS.grupos.forEach(function (g, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "horario-tab" + (i === 0 ? " activo" : "");
      b.setAttribute("role", "tab");
      b.textContent = "Grupo " + g.grupo;
      b.addEventListener("click", function () {
        tabs.querySelectorAll(".horario-tab").forEach(function (x) { x.classList.remove("activo"); });
        b.classList.add("activo");
        pintarGrupo(g);
      });
      tabs.appendChild(b);
    });
    pintarGrupo(window.HORARIOS.grupos[0]);
  }

  /* ---------- Calendario de actividades (comunidad.html) ---------- */
  function pintarCalendario() {
    var caja = document.getElementById("calendario-lista");
    if (!caja || !window.CALENDARIO) return;
    var hoy = hoyISO();
    var lista = window.CALENDARIO.filter(function (c) {
      return c && c.evento && (!c.vence || !FECHA_ISO.test(c.vence) || c.vence >= hoy);
    });
    if (!lista.length) {
      caja.innerHTML = '<p class="sin-resultados">Las próximas fechas del plantel se publicarán aquí.</p>';
      return;
    }
    caja.innerHTML = lista.map(function (c, i) {
      return '<div class="fecha-tarjeta fecha-tono-' + (i % 6) + '">' +
        "<strong>" + esc(c.evento) + "</strong>" +
        '<span class="fecha-cuando">' + esc(c.fecha) + "</span>" +
        (c.detalle ? "<p>" + esc(c.detalle) + "</p>" : "") +
        "</div>";
    }).join("");
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
    try { pintarVida(); } catch (e) {}
    try { pintarHorarios(); } catch (e) {}
    try { pintarCalendario(); } catch (e) {}
    try { animarAparicion(); } catch (e) {}
  });
})();
