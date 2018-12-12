<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="$store.getters.cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    keepAlive() {
      console.info(this.$route.fullPath, '===>', ...this.$store.getters.cachedViews)
      return this.$store.getters.cachedViews.includes(this.$route.name)
    },
    key() {
      return this.$route.name
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

