<template>
  <div>
    {{ user.note }}
  </div>
</template>

<script>
  export default {
    name: 'MoreUserInfoModal',
    props: {
      user: {
        type: Object,
        default: () => ({})
      }
    }
  }
</script>

<style scoped>

</style>
