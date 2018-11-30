<template>
  <div class="table">
    测试页面
    <el-row>
      <el-col :span="6">
        <el-input v-model="x"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Query',
  data() {
    return {
      x: null
    }
  },
  created() {
    console.info('table创建')
  },
  destroyed() {
    console.info('table销毁')
  }
}
</script>
<style lang="scss" scoped>
.table{
    font-size: 1rem;
}
</style>

