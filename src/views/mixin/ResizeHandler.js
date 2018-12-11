// 表格高度根据窗口大小动态改变
export default{
  data() {
    return {
      windowHeight: window.innerHeight,
      dataTableHeight: null
    }
  },
  mounted() {
    window.onresize = () => {
      this.calcTableHeight()
    }
  },
  activated() {
    this.$nextTick(() => this.calcTableHeight())
  },
  methods: {
    calcTableHeight() {
      this.windowHeight = window.innerHeight
      const dataTableOffset = this.$refs.dataTable.$el.getBoundingClientRect().top + 20
      this.dataTableHeight = (this.windowHeight - dataTableOffset)
      console.info('offset', dataTableOffset, 'height', this.dataTableHeight)
    }
  }
}
