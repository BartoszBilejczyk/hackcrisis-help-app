import { Machine } from 'xstate';

import * as actions from './actions';
import * as services from './services';

export const requestsMachine = Machine(
  {
    id: 'requests',
    context: {
      requests: []
    },
    initial: 'gettingRequestsData',
    states: {
      gettingRequestsData: {
        invoke: {
          src: 'getRequestsData',
          onDone: {
            actions: ['assignRequests'],
            target: 'ready'
          },
          onError: 'error'
        }
      },
      ready: {},
      error: {}
    }
  },
  {
    actions,
    services
  }
);
