
<template>
  <!-- eslint-disable vue/require-component-is-->
  <component :is="''" v-bind="linkProps">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/utils'

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      required: false,
      default: undefined
    }
  },
  computed: {
    linkProps() {
      const url = this.to
      if (this.isExternalLink(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: { path: url, query: this.query }
      }
    }
  },
  methods: {
    isExternalLink(routePath) {
      return isExternal(routePath)
    }
  }
}
</script>
