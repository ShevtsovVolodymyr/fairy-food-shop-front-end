<template>
  <button class="button" @click="$emit('buttonClick', itemId)">
    <slot> </slot>
  </button>
</template>

<script>
export default {
  props: {
    itemId: {
      type: String,
      default: '',
    },
  },
};
</script>
