<template>
  <div class="home">
    <button @click="onSend('DINNER')">Test button</button>
    <div>{{ dinnerState.value }}</div>
    <div>{{ dinnerContext }}</div>
  </div>
</template>

<script>
  export default {
  name: 'About',
  components: {},
  computed: {
    dinnerState() {
      return this.$dinnerMachine.current;
    },
    dinnerContext() {
      return this.$dinnerMachine.context;
    }
  },
  methods: {
    onSend(type) {
      this.$dinnerMachine.send({type});
    }
  }
}
</script>
