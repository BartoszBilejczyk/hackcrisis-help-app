export default {
  async get() {
    return new Promise(resolve => setTimeout(() => {
      resolve({
        give: [
          {
            id: 1,
            name: 'John Brown',
            image: 'https://randomuser.me/api/portraits/men/25.jpg',
            phone: '111 222 333',
            note: 'I live near a drugstore so I can help bring some medicine :)',
            thanks: 12,
            distance: 0.2,
            categories: ['Medicine Shopping'],
          },
          {
            id: 2,
            name: 'Patricia Jimenez',
            image: 'https://randomuser.me/api/portraits/women/22.jpg',
            phone: '111 222 333',
            note: 'Hey everybody! I am a finance manager. I can help your company survive this difficult time.',
            thanks: 1,
            distance: 2,
            categories: ['Financial Advice'],
          },
          {
            id: 3,
            name: 'Ismael Lee',
            image: 'https://randomuser.me/api/portraits/men/0.jpg',
            phone: '111 222 333',
            note: 'I will help with small and big grocery shopping',
            thanks: 99,
            distance: 0.6,
            categories: ['Grocery Shopping'],
          },
        ],
        get: [
          {
            id: 4,
            name: 'Josh Hodges',
            image: 'https://randomuser.me/api/portraits/men/66.jpg',
            phone: '111 222 333',
            note: 'Pls can somebody walk my dog out? He is a cute cocker-spaniel',
            thanks: 12,
            distance: 0.1,
            categories: ['Dog walking'],
          },
          {
            id: 5,
            name: 'Isabel Lyons',
            image: 'https://randomuser.me/api/portraits/women/36.jpg',
            phone: '111 222 333',
            note: 'I need some help with my business... I dont want to lay off people',
            thanks: 1,
            distance: 0.3,
            categories: ['Legal advice'],
          },
          {
            id: 6,
            name: 'Olive Mccoy',
            image: 'https://randomuser.me/api/portraits/women/13.jpg',
            phone: '111 222 333',
            note: 'I need some help with small grocery shopping',
            thanks: 99,
            distance: 3,
            categories: ['Grocery Shopping'],
          },
        ]
      })
    }, 500));
  }
};
