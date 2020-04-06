<template>
  <ul class="notesList">
    <li v-for="note in notes" :key="note.noteId" class="notesList__item clickable">
      <div @click="$emit('noteClicked', note)">
        <p>{{note.noteText}}</p>
        <div class="notesList__item-time">
          <span>{{note.videoTimePoint}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "notesList",
  props: {
    notes: Array
  }
};
</script>

<style lang="scss">
.notesList {
  &__item {
    display: block;
    background: $theme-blue;
    margin: 1rem 0;
    padding: 0.5rem;
    border-radius: 5px;
    p {
      word-break: break-all;
    }
    &-time {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      span {
        font-size: 0.8em;
        color: $grey-medium;
      }
    }
  }
}
</style>