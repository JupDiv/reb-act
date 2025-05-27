const complectCategories = [
  {
    id: 1,
    nameCategory: 'Вставка кулерів (radiator_cover)',
    image: 'https://example.com/electronics.jpg',
  },
  {
    id: 2,
    nameCategory: 'Вставка кришки для кулерів(cover)',
    image: 'https://example.com/books.jpg',
  },
  {
    id: 3,
    nameCategory: 'Вставка модулей (module)',
    image: 'https://example.com/clothing.jpg',
  },
  {
    id: 4,
    nameCategory: 'Розпаювання (electrical)',
    image: 'https://example.com/home-appliances.jpg',
  },
  {
    id: 5,
    nameCategory: 'Вставка коннекторів (N-type)',
    image: 'https://example.com/sports.jpg',
  },
  {
    id: 6,
    nameCategory: 'Прозвонка (multimetr)',
    image: 'https://example.com/toys.jpg',
  },
  {
    id: 7,
    nameCategory: 'Закручування задньої кришки (back_cover)',
    image: 'https://example.com/beauty-products.jpg',
  },
  {
    id: 8,
    nameCategory: 'Закручування магнітів (magnet)',
    image: 'https://example.com/beauty-products.jpg',
  },
];

const setupDevices = [
  { id: 1, nameCategory: '280', description: 'This is a description for dev.' },
  { id: 2, nameCategory: '390', description: 'This is a description for dev.' },
  { id: 3, nameCategory: '480', description: 'This is a description for dev.' },
  { id: 4, nameCategory: '550', description: 'This is a description for dev.' },
  { id: 5, nameCategory: '640', description: 'This is a description for dev.' },
  { id: 6, nameCategory: '720', description: 'This is a description for dev.' },
  { id: 7, nameCategory: '820', description: 'This is a description for dev.' },
  { id: 8, nameCategory: '920', description: 'This is a description for dev.' },
  { id: 9, nameCategory: '2.4', description: 'This is a description for dev.' },
  {
    id: 10,
    nameCategory: '5.8',
    description: 'This is a description for dev.',
  },
];

const nameDevices = {
  m1: {
    id: 1,
    name: 'm1',
    image: 'https://example.com/electronics.jpg',
    description: 'This is a description for m1.',
  },
  molot: {
    id: 2,
    name: 'molot',
    image: 'https://example.com/books.jpg',
    description: 'This is a description for m2.',
  },
  thor: {
    id: 3,
    name: 'thor',
    image: 'https://example.com/clothing.jpg',
    description: 'This is a description for m3.',
  },
  m3: {
    id: 4,
    name: 'm3',
    image: 'https://example.com/beauty-products.jpg',
    description: 'This is a description for m9.',
  },
  m4: {
    id: 5,
    name: 'm4',
    image: 'https://example.com/home-appliances.jpg',
    description: 'This is a description for m4.',
  },
  m5: {
    id: 6,
    name: 'm5',
    image: 'https://example.com/sports.jpg',
    description: 'This is a description for m5.',
  },
  m1x: {
    id: 7,
    name: 'm1x',
    image: 'https://example.com/toys.jpg',
    description: 'This is a description for m6.',
  },
  m3x: {
    id: 8,
    name: 'm3x',
    image: 'https://example.com/beauty-products.jpg',
    description: 'This is a description for m7.',
  },
  m4x: {
    id: 9,
    name: 'm4x',
    image: 'https://example.com/beauty-products.jpg',
    description: 'This is a description for m8.',
  },
};

const userData = JSON.parse(process.env.NEXT_PUBLIC_USERS_DATA || '[]');

export { complectCategories, nameDevices, userData, setupDevices };
