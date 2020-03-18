const mixin = {
  computed: {
    isDeepRouterView() {
      return this.$route.fullPath.split('/').filter(Boolean).length >= 3
    }
  },
}

export default [mixin]
