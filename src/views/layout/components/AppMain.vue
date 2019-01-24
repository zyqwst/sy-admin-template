<template>
  <section class="app-main">
    <template v-if="keepAlive">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view :key="key"/>
        </keep-alive>
      </transition>
    </template>
    <template v-else>
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key"/>
      </transition>
    </template>
    <!-- <template v-else>
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="$store.getters.cachedViews">
          <router-view :key="key"/>
        </keep-alive>
      </transition>
    </template> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    keepAlive() {
      const r = this.$route.path.slice(0, 6) === '/query' || this.$route.meta.noCache === false
      return r
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
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>

