module.exports = [
  {
    id: 1,
    name: 'Hokimiyat',
    phone: '+998711111111',
    username: 'authority',
    password: 'authority',
    image: 'https://www.pngmart.com/files/7/Government-PNG-Clipart.png',
    role: {
      connect: {
        id: 1,
      },
    },
  },
  {
    id: 2,
    name: 'Hokimiyat operatori',
    phone: '+998222222222',
    username: 'operator',
    password: 'operator',
    image: 'https://cdn.onlinewebfonts.com/svg/img_507427.png',
    role: {
      connect: {
        id: 2,
      },
    },
    manager: { connect: { id: 1 } }
  },
  {
    id: 3,
    name: 'Gaz Tashkilot',
    phone: '+9987333333333',
    username: 'gaz',
    password: 'gaz',
    image: 'https://pngimage.net/wp-content/uploads/2018/06/organization-people-png-7.png',
    role: {
      connect: {
        id: 3,
      },
    },
    manager: { connect: { id: 1 } }
  },
  {
    id: 4,
    name: 'Suv Tashkilot',
    phone: '+9987333333333',
    username: 'suv',
    password: 'suv',
    image: 'https://pngimage.net/wp-content/uploads/2018/06/organization-people-png-7.png',
    role: {
      connect: {
        id: 3,
      },
    },
    manager: { connect: { id: 1 } }
  },
  {
    id: 5,
    name: 'Gaz tashkilotning xodimi',
    phone: '+998444444444',
    username: 'gazxodim',
    password: 'gazxodim',
    image: 'https://pngimage.net/wp-content/uploads/2018/06/organization-people-png-7.png',
    role: {
      connect: {
        id: 4,
      },
    },
    manager: { connect: { id: 3 } }
  },
  {
    id: 6,
    name: 'Suv tashkilotning xodimi',
    phone: '+998444444444',
    username: 'suvxodim',
    password: 'suvxodim',
    image: 'https://pngimage.net/wp-content/uploads/2018/06/organization-people-png-7.png',
    role: {
      connect: {
        id: 4,
      },
    },
   manager: { connect: { id: 4 } }
  },
];
