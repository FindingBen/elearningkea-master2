<template>
  <section class="app-topbar">
    <div class="wrapper">
      <h3>TBDCOTP</h3>
      <ul>
        <li>
          <router-link to="/courses">Courses</router-link>
        </li>
        <li>
          <router-link to="/account">My Account</router-link>
        </li>
        <li>
          <router-link to="/login">Login</router-link>
          <baseButton @click="$emit('logout')" v-if="false">Logout</baseButton>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "topBar",
};
</script>

<style lang="scss">
.app-topbar {
  width: 100%;
  background-color: $theme-dark;
  height: 50px;
  .wrapper {
    height: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    ul {
      margin-left: auto;
      display: flex;
      align-items: center;
      li {
        margin: 0 1rem;
        a:hover {
          color: $grey-medium;
        }
      }
      li:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
