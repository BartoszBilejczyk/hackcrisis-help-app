export default {
  async get() {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        {
          name: 'Patricia Jimenez',
          thanks: 200,
          place: 1,
          avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
          bestCategories: ['Dog walking']
        },
        {
          name: 'Merle Sullivan',
          thanks: 100,
          place: 2,
          avatar: 'https://randomuser.me/api/portraits/women/40.jpg',
          bestCategories: ['Grocery Shopping']
        },
        {
          name: 'Jerome Barnett',
          thanks: 50,
          place: 3,
          avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
          bestCategories: ['Grocery Shopping']
        },
        {
          name: 'Ismael Lee',
          thanks: 25,
          place: 4,
          avatar: 'https://randomuser.me/api/portraits/men/0.jpg',
          bestCategories: ['Medicine Shopping']
        },
        {
          name: 'Josh Hodges',
          thanks: 25,
          place: 5,
          avatar: 'https://randomuser.me/api/portraits/men/66.jpg',
          bestCategories: ['Grocery Shopping']
        },
        {
          name: 'Isabel Lyons',
          thanks: 25,
          place: 6,
          avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
          bestCategories: ['Medicine Shopping']
        },
        {
          name: 'Georgia Harvey',
          thanks: 20,
          place: 7,
          avatar: 'https://randomuser.me/api/portraits/women/20.jpg',
          bestCategories: ['Legal advice']
        },
        {
          name: 'Olive Mccoy',
          thanks: 24,
          place: 8,
          avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
          bestCategories: ['Grocery Shopping']
        },
        {
          name: 'You!',
          thanks: 23,
          place: 9,
          avatar: 'https://s14422.pcdn.co/wp-content/uploads/2016/10/being-cool-1.jpg',
          bestCategories: ['Grocery Shopping']
        },
        {
          name: 'Kim Burns',
          thanks: 15,
          place: 10,
          avatar: 'https://randomuser.me/api/portraits/women/26.jpg',
          bestCategories: ['Medicine Shopping']
        }
      ])
    }, 500));
  }
};
