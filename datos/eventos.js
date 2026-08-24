// ============================================================
// LA VIDA DEL CEB 9/22 — eventos y sus fotos (vida.html)
//
// Para agregar un evento nuevo: pegar un objeto AL INICIO del
// arreglo y subir sus fotos optimizadas a img/ (WebP, <200 KB).
// Cada foto: src, alt (describe la imagen) y pie (opcional).
// ============================================================
window.EVENTOS = [
  {
    id: "deportes",
    titulo: "La cancha habla",
    descripcion: "Voleibol bajo la techumbre: el deporte también es materia de todos los días. Aquí nadie se queda en la banca.",
    fotos: [
      { src: "img/ev-voleibol-2.webp", alt: "Partido de voleibol con el balón sobre la red en la cancha techada del plantel", pie: "El balón en el aire y el punto en disputa" },
      { src: "img/ev-voleibol-1.webp", alt: "Estudiante saltando a rematar durante un partido de voleibol en la cancha techada", pie: "El remate, con todo" },
    ],
  },
  {
    id: "convivios",
    titulo: "Sabor de casa",
    descripcion: "Cazuelas de barro, rosca de reyes y cocina entre compañeros: los convivios donde la escuela se vuelve familia.",
    fotos: [
      { src: "img/ev-cazuelas.webp", alt: "Cazuelas de barro con guisados y salsas servidas sobre un mantel azul durante un convivio escolar", pie: "Las cazuelas del convivio" },
      { src: "img/ev-rosca.webp", alt: "Estudiantes partiendo la rosca de reyes", pie: "La primera rosca de reyes" },
      { src: "img/ev-cocina.webp", alt: "Estudiantes preparando alimentos en equipo sobre una mesa del aula", pie: "Manos a la obra" },
      { src: "img/ev-fila.webp", alt: "Estudiantes formados en el patio esperando su plato en el convivio", pie: "La fila más contenta del semestre" },
    ],
  },
  {
    id: "tradiciones",
    titulo: "Nuestro primer Día de Muertos",
    descripcion: "El altar se montó a mano, con cempasúchil, papel picado y catrinas hechas en casa. Las tradiciones no se memorizan: se viven.",
    fotos: [
      { src: "img/ev-altar-grupo.webp", alt: "Grupo de estudiantes sonriendo frente al altar de Día de Muertos del plantel", pie: "La generación y su altar" },
      { src: "img/ev-catrina.webp", alt: "Catrina artesanal con vestido negro rodeada de papel picado y velas en el altar", pie: "Detalle de catrina, hecha a mano" },
      { src: "img/ev-altar-montaje.webp", alt: "Estudiante montando el altar de Día de Muertos en la escalera del plantel", pie: "El montaje, pieza por pieza" },
    ],
  },
  {
    id: "cultura-paz",
    titulo: "Cultura de paz",
    descripcion: "Del círculo en el patio al mural de Entornos Seguros: la convivencia se construye, se pinta y se practica.",
    fotos: [
      { src: "img/ev-circulo.webp", alt: "Círculo de estudiantes en el patio del plantel visto desde el aire con luz de atardecer", pie: "El círculo de paz, desde el aire" },
      { src: "img/ev-mural.webp", alt: "Mural colorido de Entornos Seguros con mensajes de paz, respeto, igualdad e inclusión", pie: "El mural terminado" },
      { src: "img/ev-mural-pintando.webp", alt: "Estudiantes pintando el mural colaborativo de Entornos Seguros", pie: "Así empezó: pincel en mano" },
      { src: "img/ev-abc-equipo.webp", alt: "Equipo de estudiantes dibujando en cartulina durante la actividad ABC de las emociones", pie: "ABC de las emociones, en equipo" },
    ],
  },
  {
    id: "conciencia",
    titulo: "Fechas que nos importan",
    descripcion: "El 25N y el 8M no pasan de largo por esta escuela: se pintan, se conversan y se toman en serio.",
    fotos: [
      { src: "img/ev-25n-marco.webp", alt: "El director y tres estudiantes con el marco morado del 25 de noviembre contra la violencia hacia las mujeres", pie: "25N: nos tomamos la foto y la palabra" },
      { src: "img/ev-8m-huellas.webp", alt: "Alumnas estampando sus huellas con pintura sobre cartulina morada por el 8 de marzo", pie: "Huellas del 8 de marzo" },
      { src: "img/ev-25n-lienzo.webp", alt: "Lienzo con una huella de mano morada y la leyenda No más violencia contra las mujeres", pie: "El mensaje, claro" },
    ],
  },
  {
    id: "empatia",
    titulo: "Bastón Blanco",
    descripcion: "Con los ojos vendados y un bastón por guía, aprendimos lo que no se aprende en el pizarrón: ponernos en el lugar del otro.",
    fotos: [
      { src: "img/ev-baston-guia.webp", alt: "Estudiante con los ojos vendados avanza con bastón blanco mientras una compañera le tiende la mano", pie: "Una mano que guía" },
    ],
  },
  {
    id: "talleres",
    titulo: "Talleres y brigadas",
    descripcion: "Primeros auxilios, prevención y decisiones informadas: lo que se aprende aquí también salva y cuida.",
    fotos: [
      { src: "img/ev-rcp.webp", alt: "Práctica de reanimación con maniquíes durante el curso de primeros auxilios", pie: "Primeros auxilios: práctica real" },
      { src: "img/ev-yodecido.webp", alt: "Instructor del taller Yo Decido exponiendo frente al grupo en un aula iluminada", pie: "Taller «¡Yo Decido!»" },
    ],
  },
  {
    id: "salidas",
    titulo: "Salidas educativas",
    descripcion: "El aula también está allá afuera: visitas a empresas de la región para ver cómo funciona el mundo del trabajo.",
    fotos: [
      { src: "img/ev-bimbo.webp", alt: "Seis estudiantes sonrientes durante la visita educativa a la planta de Bimbo", pie: "Visita a Bimbo" },
    ],
  },
  {
    id: "navidad",
    titulo: "Dibujemos la Navidad",
    descripcion: "Cientos de figuras coloreadas por toda la comunidad se volvieron un solo tapiz. Diciembre también se estrena.",
    fotos: [
      { src: "img/ev-navidad-mural.webp", alt: "Mural navideño hecho con cientos de dibujos coloreados por la comunidad escolar", pie: "El tapiz completo" },
      { src: "img/ev-navidad-manos.webp", alt: "Manos de estudiantes coloreando figuras navideñas con plumones", pie: "Plumón por plumón" },
    ],
  },
];
