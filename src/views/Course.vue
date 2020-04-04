<template>
  <main class="course-page">
    <section class="course-page__video">
      <div class="course-page__video-content">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/HXV3zeQKqGY"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="course-page__video-description p-1">
        {{ course.courseDescription }}
      </div>
    </section>
    <section class="course-page__notes">
      <div><h1>Notes</h1></div>
      <div></div>
      <div></div>
    </section>
  </main>
</template>

<script>
export default {
  name: "course",
  data() {
    return {
      course: {
        courseId: 3,
        courseTitle: "Relations",
        courseDescription:
          "This is a first course. This is a first course. This is a first course. This is a first course. This is a first course. ",
        totalDuration: 300,
        publishedAt: "2020-12-12 00:00:00.000"
      }
    };
  }
};
</script>

<style lang="scss">
.course-page {
  height: calc(100% - 50px);
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 1fr;
  &__video {
    height: 100%;
    display: flex;
    flex-direction: column;
    &-content {
      flex: 5;
    }
    &-description {
      flex: 1;
    }
  }
  &__notes {
    background: $theme-primary-shade-up;
    height: 100%;
    display: flex;
    flex-direction: column;
    div:first-child {
      padding: 1rem;
      background: lighten($theme-primary, 15%);
      flex: 0 1 3rem;
    }
    div:nth-child(2) {
      flex: 1 1 auto;
    }
    div:nth-child(3) {
      flex: 0 1 8rem;
      background: lighten($theme-primary, 15%);
    }
  }
}
</style>
