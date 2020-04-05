<template>
  <main class="all-courses">
    <header>
      <h1>All Courses</h1>
      <input
        type="text"
        v-model="searchText"
        placeholder="Search"
        class="input-dark"
      />
    </header>
    <section class="all-courses__grid">
      <div class="courses-card" v-for="course in courses" :key="course.id">
        <img
          src="https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=600"
          alt="course image"
        />
        <div class="courses-card-content">
          <div class="courses-card-content-top">
            <router-link
              :to="{ name: 'Course', params: { id: course.courseId } }"
            >
              <h2>{{ course.courseTitle }}</h2></router-link
            >
            <p class="pt-1 pb-1">{{ course.courseDescription }}</p>
            <p class="pb-1">
              {{ course.totalDuration }}
            </p>
            <p>{{ course.publishedAt }}</p>
          </div>
          <div class="courses-card-content-footer">
            <router-link
              :to="{ name: 'Course', params: { id: course.courseId } }"
              ><baseButton round>Watch course</baseButton></router-link
            >
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "allCourses",
  computed: {
    courses() {
      return this.$store.getters.get_courses;
    }
  },
  data() {
    return {
      searchText: ""
    };
  },
  async mounted() {
    await this.$store.dispatch("fetch_courses");
  }
};
</script>

<style lang="scss">
.all-courses {
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  header {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem 0;
    font-size: 16px;
  }

  &__grid {
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: auto;
    grid-gap: 1.5rem;
    .courses-card {
      border-bottom: 4px darken($grey-extra-dark, 10%) solid;
      border-radius: 3px;
      position: relative;
      height: 100%;
      width: 100%;
      img {
        border-radius: 3px;
        width: 100%;
        height: 100%;
        filter: brightness(60%);
      }
      &-content {
        border-radius: 3px;
        position: absolute;
        top: 0;
        right: 0;
        width: 80%;
        height: 100%;
        padding: 1.5rem;
        background: radial-gradient(
          circle at left,
          rgba(0, 0, 0, 0.6) 0,
          #000 35%
        );
        display: flex;
        flex-direction: column;
        &-top {
          flex: 1 1 auto;
          h2 {
            font-size: 2em;
            font-weight: 400;
            color: #dd625e;
          }
        }
        &-footer {
        }
      }
    }
    .card:hover {
      img {
        filter: brightness(100%);
        transition: filter 0.5s ease-in-out;
        &-content {
          transition: background 0.3s ease-in-out;
          background: radial-gradient(
            circle at left,
            rgba(0, 0, 0, 1) 0,
            #000 35%
          );
        }
      }
    }
  }
}
</style>
