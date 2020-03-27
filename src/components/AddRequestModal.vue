<template>
  <div class="add-request-modal">
    <p class="copy">Category</p>
    <AntSelect
      v-model="category"
      :options="options"
    ></AntSelect>
    <p class="copy">Note</p>
    <AntTextarea
      v-model="note"
      rows="5"
    ></AntTextarea>
    <AntButton
      type="primary"
      @click="submit"
    >
      Add
    </AntButton>
  </div>
</template>

<script>
  import {
    Button as AntButton,
    Input as AntInput,
    Select as AntSelect,
  } from 'ant-design-vue';

  export default {
    name: "Add-Request-Modal",
    components: {
      AntButton,
      AntTextarea: AntInput.TextArea,
      AntSelect
    },
    data() {
      return {
        category: null,
        note: null,
        options: [
          { label: 'Dog walking', value: 'Dog walking' },
          { label: 'Grocery Shopping', value: 'Grocery Shopping' },
          { label: 'Financial advice', value: 'Financial advice' },
          { label: 'Legal advice', value: 'Legal advice' },
          { label: 'Medicine Shopping', value: 'Medicine Shopping' },
          { label: 'Cleaning', value: 'Cleaning' },
          { label: 'Other', value: 'Other' },
        ]
      }
    },
    methods: {
      submit() {
        if (this.note && this.category) {
          this.$emit('add', {
            category: this.category,
            note: this.note
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .add-request-modal {
    p {
      margin-bottom: 0;
    }

    .ant-btn {
      margin-top: globalVars(ui-default-measure2x);
    }
  }
</style>
