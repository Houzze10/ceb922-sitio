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
    descripcion: "El deporte enseña lo que ningún pizarrón: que el punto se gana en equipo y que levantarse es parte del juego.",
    fotos: [
      { src: "img/ev-voleibol-2.webp", alt: "Partido de voleibol con el balón sobre la red en la cancha techada del plantel", pie: "El balón en el aire y el punto en disputa" },
      { src: "img/ev-voleibol-1.webp", alt: "Estudiante saltando a rematar durante un partido de voleibol en la cancha techada", pie: "El remate, con todo" },
    ],
  },
  {
    id: "convivios",
    titulo: "Sabor de casa",
    descripcion: "Compartir la mesa también forma: quien aprende a servir a los demás, aprendió la primera lección de comunidad.",
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
    descripcion: "El altar se montó a mano, con cempasúchil, papel picado y catrinas hechas en casa. Las tradiciones no se heredan solas: se trabajan, y al trabajarlas se vuelven propias.",
    fotos: [
      { src: "img/ev-altar-grupo.webp", alt: "Grupo de estudiantes sonriendo frente al altar de Día de Muertos del plantel", pie: "La generación y su altar" },
      { src: "img/ev-catrina.webp", alt: "Catrina artesanal con vestido negro rodeada de papel picado y velas en el altar", pie: "Detalle de catrina, hecha a mano" },
      { src: "img/ev-altar-montaje.webp", alt: "Estudiante montando el altar de Día de Muertos en la escalera del plantel", pie: "El montaje, pieza por pieza" },
    ],
  },
  {
    id: "cultura-paz",
    titulo: "Cultura de paz",
    descripcion: "La paz no se decreta: se construye. A veces con un círculo en el patio, a veces con un pincel en la pared.",
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
    descripcion: "Mirar de frente lo que a otros les duele también es educación. El 25N y el 8M aquí se conversan, se pintan y se toman en serio.",
    fotos: [
      { src: "img/ev-25n-marco.webp", alt: "Integrantes de la comunidad del plantel con el marco morado del 25 de noviembre contra la violencia hacia las mujeres", pie: "25N: nos tomamos la foto y la palabra" },
      { src: "img/ev-8m-huellas.webp", alt: "Alumnas estampando sus huellas con pintura sobre cartulina morada por el 8 de marzo", pie: "Huellas del 8 de marzo" },
      { src: "img/ev-25n-lienzo.webp", alt: "Lienzo con una huella de mano morada y la leyenda No más violencia contra las mujeres", pie: "El mensaje, claro" },
    ],
  },
  {
    id: "empatia",
    titulo: "Bastón Blanco",
    descripcion: "Con los ojos vendados y un bastón por guía, aprendimos la lección más difícil del programa: ponernos en el lugar del otro.",
    fotos: [
      { src: "img/vida-baston-blanco.webp", alt: "Estudiante con los ojos vendados avanza con bastón blanco mientras una compañera le tiende la mano", pie: "Una mano que guía" },
    ],
  },
  {
    id: "talleres",
    titulo: "Talleres y brigadas",
    descripcion: "Hay aprendizajes que valen más que una calificación: saber cuidar una vida, empezando por la propia.",
    fotos: [
      { src: "img/ev-rcp.webp", alt: "Práctica de reanimación con maniquíes durante el curso de primeros auxilios", pie: "Primeros auxilios: práctica real" },
      { src: "img/ev-yodecido.webp", alt: "El taller ¡Yo Decido! en el aula, con el grupo atento a la exposición", pie: "Taller «¡Yo Decido!»" },
    ],
  },
  {
    id: "salidas",
    titulo: "Salidas educativas",
    descripcion: "El aula también está allá afuera: conocer de cerca el mundo del trabajo es el primer paso para elegir el propio.",
    fotos: [
      { src: "img/ev-bimbo.webp", alt: "Seis estudiantes sonrientes durante la visita educativa a la planta de Bimbo", pie: "Visita a Bimbo" },
    ],
  },
  {
    id: "navidad",
    titulo: "Dibujemos la Navidad",
    descripcion: "Cientos de manos, un solo tapiz: nadie construye nada grande solo.",
    fotos: [
      { src: "img/ev-navidad-mural.webp", alt: "Mural navideño hecho con cientos de dibujos coloreados por la comunidad escolar", pie: "El tapiz completo" },
      { src: "img/ev-navidad-manos.webp", alt: "Manos de estudiantes coloreando figuras navideñas con plumones", pie: "Plumón por plumón" },
    ],
  },
];
