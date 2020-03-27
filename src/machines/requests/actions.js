import { assign } from 'xstate';

export const assignRequests = assign((context, event) => {
  return {
    requests: event.data
  };
});
