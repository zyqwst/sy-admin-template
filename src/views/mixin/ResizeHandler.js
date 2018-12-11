export default{
  data() {
    return {
      dataTableOffset: 160,
      windowHeight: window.innerHeight
    }
  },
  computed: {
    dataTableHeight() {
      return (this.windowHeight - this.dataTableOffset) < 200 ? 150 : this.windowHeight - this.dataTableOffset
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowHeight = window.innerHeight
    }
  }
}
