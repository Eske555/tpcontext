// Datos de ejemplo que simulan la respuesta de una API.
export const USERS = [
  { username: 'nacho', password: '1234', name: 'Nacho Eskenazi', bio: 'Estudiante de EFSI 💻', avatar: 'https://i.pravatar.cc/150?img=12' },
  { username: 'demo', password: 'demo', name: 'Usuario Demo', bio: 'Cuenta de prueba', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export const INITIAL_POSTS = [
  {
    id: '1',
    author: 'viajeros.ar',
    authorAvatar: 'https://i.pravatar.cc/150?img=32',
    image: 'https://picsum.photos/id/1018/600/600',
    caption: 'Montañas del sur 🏔️',
    likes: 128,
    comments: [{ id: 'c1', author: 'sofi', text: '¡Qué lugar!' }],
  },
  {
    id: '2',
    author: 'cafe.porteño',
    authorAvatar: 'https://i.pravatar.cc/150?img=47',
    image: 'https://picsum.photos/id/1060/600/600',
    caption: 'El primer café del día ☕',
    likes: 87,
    comments: [],
  },
  {
    id: '3',
    author: 'ort.argentina',
    authorAvatar: 'https://i.pravatar.cc/150?img=60',
    image: 'https://picsum.photos/id/0/600/600',
    caption: 'Programando el TP de React Context 👨‍💻',
    likes: 342,
    comments: [{ id: 'c2', author: 'profe', text: 'Muy bien 👏' }],
  },
  {
    id: '4',
    author: 'naturaleza',
    authorAvatar: 'https://i.pravatar.cc/150?img=15',
    image: 'https://picsum.photos/id/1043/600/600',
    caption: 'Atardecer en el bosque 🌲',
    likes: 59,
    comments: [],
  },
  {
    id: '5',
    author: 'mascotas.felices',
    authorAvatar: 'https://i.pravatar.cc/150?img=25',
    image: 'https://picsum.photos/id/237/600/600',
    caption: 'Les presento a Toby 🐶',
    likes: 501,
    comments: [{ id: 'c3', author: 'juli', text: '¡Hermoso!' }],
  },
];
