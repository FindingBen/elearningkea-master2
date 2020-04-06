<template>
  <button @click="$emit('click')" type="submit" class="baseButton" :class="{ round: round }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "baseButton",
  props: {
    isLoading: Boolean,
    round: Boolean
  }
};
</script>

<style lang="scss" scoped>
button:disabled,
button[disabled] {
  opacity: 0.5;

  &:hover {
    cursor: not-allowed;
  }
}
button {
  cursor: pointer;
  border: none;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 2px;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  height: 36px;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  font-size: 14px;
  font-weight: 500;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0;
  padding: 0 15px;
  min-width: 88px;
  outline: 0;
  text-decoration: none;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms;
  position: relative;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: $red;
  color: $white;

  &:hover {
    background-color: lighten($red, 3%);
  }
  &.round {
    border-radius: 1rem;
  }
}
</style>
