<template>
  <div class="card">
    <span class="card__close-mark" v-if="isRemovable" @click="emitClose"
      >✖</span
    >
    <div class="card__img-wrapper">
      <img :src="image" :alt="title" class="card__img" />
    </div>
    <h4 class="card__title">{{ title }}</h4>
    <p class="card__description">{{ description }}</p>
    <p class="card__price">Price: {{ price }} $ each</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isRemovable: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
    },
  },
  methods: {
    emitClose() {
      this.$emit('onClose');
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0;
  min-width: 320px;
  max-width: 320px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 32px 16px 16px 16px;
  overflow: hidden;
  background: white;

  &__title {
    margin: 16px 0;
  }

  &__description {
    min-height: 80px;
  }

  &__img-wrapper {
    display: flex;
    justify-content: center;
    height: 200px;
  }

  &__img {
    height: 100%;
  }

  &__close-mark {
    display: block;
    position: absolute;
    top: 6px;
    right: 6px;
    color: #4d4d4d;
    cursor: pointer;
  }

  :deep(.button) {
    width: 100%;
    margin: auto auto 0;
  }

  :deep(.cart-list__input) {
    margin: auto 0 0;
  }
}
</style>
