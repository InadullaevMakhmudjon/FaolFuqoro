module.exports = [
  {
    lat: 41.311081,
    lng: 69.240562,
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Street_in_old_city.jpg',
    creator: {
      connect: { id: 1 },
    },
    status: {
      connect: { id: 1 },
    },
    comments: {
      create: {
        comment: 'People commented',
        status: {
          connect: { id: 1 },
        },
        to: {
          connect: {
            id: 1,
          },
        },
      },
    },
  },
  {
    lat: 41.301081,
    lng: 69.230562,
    image: 'https://thumbnails.trvl-media.com/btpNvqUwAb4rvjr4qCbdLkyMA_s=/773x530/smart/filters:quality(60)/images.trvl-media.com/hotels/39000000/38930000/38929900/38929866/0c98d43d_z.jpg',
    creator: {
      connect: {
        id: 3,
      },
    },
    status: {
      connect: {
	   id: 1,
      },
    },
    comments: {
      create: {
        comment: 'People commented',
        status: {
          connect: {
            id: 1,
          },
        },
        to: {
          connect: {
            id: 1,
          },
        },
      },
    },
  },
  {
    lat: 41.321081,
    lng: 69.250562,
    image: 'https://static.readytotrip.com/upload/information_system_24/1/6/4/item_1640681/information_items_property_14973537.jpg',
    creator: { connect: { id: 4 } },
    status: { connect: { id: 2 } },
    comments: {
      create: [
        {
          comment: 'User send to Government',
          to: { connect: { id: 1 } },
          status: { connect: { id: 1 } },
        },
        {
          comment: 'Government send to Organization',
          to: { connect: { id: 3 } },
          status: { connect: { id: 2 } },
        },
      ],
    },
  },
  {
    lat: 41.301081,
    lng: 69.260562,
    image: 'https://whc.unesco.org/uploads/thumbs/site_0385_0018-1200-630-20151105162902.jpg',
    creator: { connect: { id: 5 } },
    status: { connect: { id: 2 } },
    comments: {
      create: [
        {
          comment: 'User send to Government',
          to: { connect: { id: 1 } },
          status: { connect: { id: 1 } },
        },
        {
          comment: 'Government send to Organization',
          to: { connect: { id: 3 } },
          status: { connect: { id: 2 } },
        },
      ],
    },
  },
  {
    lat: 41.311081,
    lng: 69.270562,
    image: 'https://cdn.ostrovok.ru/t/640x400/content/7f/9f/7f9f4aba32fbd1bf6595b041b4713f068369fc49.jpeg',
    creator: { connect: { id: 5 } },
    status: { connect: { id: 2 } },
    comments: {
      create: [
        {
          comment: 'User send to Government',
          to: { connect: { id: 1 } },
          status: { connect: { id: 1 } },
        },
        {
          comment: 'Government send to Organization',
          to: { connect: { id: 3 } },
          status: { connect: { id: 2 } },
        },
      ],
    },
  },
  {
    lat: 41.351081,
    lng: 69.260562,
    image: 'https://www.advantour.com/img/uzbekistan/restaurants/old-city.jpg',
    creator: { connect: { id: 4 } },
    status: { connect: { id: 4 } },
    comments: {
      create: [
        {
          comment: 'User send to Government',
          to: { connect: { id: 1 } },
          status: { connect: { id: 1 } },
        },
        {
          comment: 'Government send to Organization',
          to: { connect: { id: 3 } },
          status: { connect: { id: 2 } },
        },
        {
          comment: 'Organization send to Employee',
          to: { connect: { id: 5 } },
          status: { connect: { id: 3 } },
        },
        {
          comment: 'Finished',
          to: { connect: { id: 5 } },
          status: { connect: { id: 4 } },
        }
      ],
    },
  },
  {
    lat: 41.231081,
    lng: 69.230562,
    image: 'https://previews.123rf.com/images/perekotypole/perekotypole1712/perekotypole171200013/92158325-view-of-the-old-city-jerusalem-from-the-walls-israel.jpg',
    creator: { connect: { id: 3 } },
    status: { connect: { id: 4 } },
    comments: {
      create: [
        {
          comment: 'User send to Government',
          to: { connect: { id: 1 } },
          status: { connect: { id: 1 } },
        },
        {
          comment: 'Government send to Organization',
          to: { connect: { id: 3 } },
          status: { connect: { id: 2 } },
        },
        {
          comment: 'Organization send to Employee',
          to: { connect: { id: 5 } },
          status: { connect: { id: 3 } },
        },
        {
          comment: 'Employee Closed The report',
          to: { connect: { id: 5 } },
          status: { connect: { id: 4 } },
        },
      ],
    },
  },
  {
    lat: 41.361081,
    lng: 69.260562,
    image: 'https://www.touristisrael.com/wp-content/uploads/Tower-of-David.jpg',
    creator: { connect: { id: 2 } },
    status: { connect: { id: 4 } },
    comments: {
      create: [
        {
          comment: 'User send to Government',
          to: { connect: { id: 1 } },
          status: { connect: { id: 1 } },
        },
        {
          comment: 'Government send to Organization',
          to: { connect: { id: 4 } },
          status: { connect: { id: 2 } },
        },
        {
          comment: 'Organization send to Employee',
          to: { connect: { id: 6 } },
          status: { connect: { id: 3 } },
        },
        {
          comment: 'Employee Closed The report',
          to: { connect: { id: 6 } },
          status: { connect: { id: 4 } },
        },
      ],
    },
  },
];
