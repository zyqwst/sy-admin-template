<template>
  <section class="app-main">
    <transition v-if="cached" name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key"/>
      </keep-alive>
    </transition>
    <transition v-else name="fade-transform" mode="out-in">
      <router-view :key="key"/>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cached() {
      return this.$store.state.tagsView.cachedViews.includes(this.$route.fullPath)
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

