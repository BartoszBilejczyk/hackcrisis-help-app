import moment from 'moment';

export default {
  async get() {
    return new Promise(resolve => setTimeout(() => {
      resolve({
        id: '12389721789123',
        name: 'Gialdo GreatGuy',
        email: 'gialdo@greatguy.com',
        phone: '696 433 589',
        thanks: 23,
        level: 'Beginner',
        avatar: '',
        badges: 5,
        reviews: [
          {
            id: 1,
            author: 'John Snow',
            content: 'Gialdo is a very nice person. He helped me a lot with getting my groceries',
            datetime: moment().format('DD-MM-YYYY')
          },
          {
            id: 2,
            author: 'Jackie Chan',
            content: 'Mr Gialdo is an extremely helpful person. Thanks, mate!',
            datetime: moment().subtract('2', 'days').format('DD-MM-YYYY')
          }
        ]
      })
    }, 500));
  }
};
