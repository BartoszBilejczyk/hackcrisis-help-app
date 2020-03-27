import moment from 'moment';

export default {
  async get() {
    return new Promise(resolve => setTimeout(() => {
      resolve([
        // {
        //   id: 1,
        //   mode: 'get',
        //   dateStarted: moment().format('DD-MM-YYYY'),
        //   dateEnded: '', // optional or can be null
        //   user: {
        //     name: 'Joe Black',
        //     phone: '111 222 333',
        //     thanks: 20,
        //     help: ['Grocery Shopping'],
        //   },
        //   status: 'active',
        //   thanks: '',
        //   task: {
        //     category: 'Grocery Shopping',
        //     // probably some more keys
        //   }
        // },
        // {
        //   id: 2,
        //   mode: 'give',
        //   dateStarted: moment().format('DD-MM-YYYY'),
        //   dateEnded: '', // optional or can be null
        //   user: {
        //     name: 'Joe White',
        //     phone: '111 222 333',
        //     thanks: 30,
        //     help: ['Doradztwo finansowe'],
        //   },
        //   status: 'active',
        //   thanks: '',
        //   task: {
        //     category: 'Doradztwo finansowe',
        //     // probably some more keys
        //   }
        // },
        // {
        //   id: 3,
        //   mode: 'give',
        //   dateStarted: moment().format('DD-MM-YYYY'),
        //   dateEnded: '', // optional or can be null
        //   user: {
        //     name: 'Joe Red',
        //     phone: '111 222 333',
        //     thanks: 10,
        //     help: ['Doradztwo finansowe'],
        //   },
        //   status: 'finished',
        //   thanks: '',
        //   task: {
        //     category: 'Doradztwo finansowe',
        //     // probably some more keys
        //   },
        //   review: {
        //     thanks: 3,
        //     note: 'Joe to bardzo miły chłopak!'
        //   }
        // }
      ])
    }, 500));
  }
};
