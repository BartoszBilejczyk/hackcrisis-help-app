import { Machine } from 'xstate';

// This machine is completely decoupled from Vue
export const breakfastMachine = Machine({
  id: 'breakfast',
  context: {
    /* some data */
  },
  initial: 'inactive',
  states: {
    inactive: {
      on: { BREAKFAST: 'active' }
    },
    active: {
      on: { BREAKFAST: 'inactive' }
    }
  }
});

// This machine is completely decoupled from Vue
export const dinnerMachine = Machine({
  id: 'dinner',
  context: {
    /* some data */
  },
  initial: 'inactive',
  states: {
    inactive: {
      on: { DINNER: 'active' }
    },
    active: {
      on: { DINNER: 'inactive' }
    }
  }
});
