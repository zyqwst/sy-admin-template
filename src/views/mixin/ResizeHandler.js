// 表格高度根据窗口大小动态改变
export default{
  data() {
    return {
      dataTableOffset: 160,
      windowHeight: 0,
      dataTableHeight: 200
    }
  },
  watch: {
    windowHeight() {
      this.dataTableHeight = (this.windowHeight - this.dataTableOffset) < 200 ? 200 : this.windowHeight - this.dataTableOffset
      console.info('windowHeight改变', this.windowHeight, this.dataTableHeight)
    }
  },
  mounted() {
    this.dataTableOffset = this.$refs.dataTable ? this.$refs.dataTable.$el.getBoundingClientRect().top + 40 : 160
    this.dataTableHeight = (this.windowHeight - this.dataTableOffset) < 200 ? 200 : this.windowHeight - this.dataTableOffset
    window.onresize = () => {
      this.windowHeight = window.innerHeight
    }
  }
}
