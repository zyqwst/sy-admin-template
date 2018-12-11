// 表格高度根据窗口大小动态改变
export default{
  data() {
    return {
      dataTableHeight: null
    }
  },
  mounted() {
    window.onresize = () => {
      this.calcTableHeight()
    }
  },
  beforeRouterEnter() {
    this.calcTableHeight()
  },
  methods: {
    calcTableHeight() {
      const windowHeight = window.innerHeight
      const dataTableOffset = this.$refs.dataTable.$el.getBoundingClientRect().top + 20
      this.dataTableHeight = (windowHeight - dataTableOffset)
    }
  }
}
