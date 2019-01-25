<template>
  <div class="dynamic-manage">
    <el-tabs type="card">
      <el-tab-pane label="条件">
        <condition/>
      </el-tab-pane>
      <el-tab-pane label="表格列">
        查询报表列维护
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import condition from './condition'
export default {
  components: { condition }
}
</script>

<style lang="scss" scoped>
.dynamic-manage{
  @extend .m-3;

}
</style>
