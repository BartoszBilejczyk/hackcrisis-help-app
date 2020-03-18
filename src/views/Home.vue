<template>
  <div class="home">
    <button @click="onSend('BREAKFAST')">Test button</button>
    <div>{{ breakfastState.value }}</div>
    <div>{{ breakfastContext }}</div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  computed: {
    breakfastState() {
      return this.$breakfastMachine.current;
    },
    breakfastContext() {
      return this.$breakfastMachine.context;
    }
  },
  methods: {
    onSend(type) {
      this.$breakfastMachine.send({type});
    }
  }
}
</script>
