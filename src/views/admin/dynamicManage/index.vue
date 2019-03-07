<template>
  <div class="dynamic-manage">
    <el-row>
      <el-col :span="24">
        <el-tabs >
          <el-tab-pane label="SQL语句">
            <column v-model="columnData"/>
          </el-tab-pane>
          <el-tab-pane :disabled="disableCondition">
            <span slot="label">查询条件</span>
            <condition/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import condition from './condition'
import column from './column'

export default {
  components: { condition, column },
  data() {
    return {
      columnData: { sql: '', columns: [] },
      disableCondition: true
    }
  },
  watch: {
    columnData: {
      handler: function(arg1, arg2) {
        if (arg1.columns.length > 0) {
          this.disableCondition = false
        } else {
          this.disableCondition = true
        }
        console.info(this.columnData.columns)
      },
      deep: true
    }
  }

}
</script>

<style lang="scss" scoped>
.dynamic-manage{
  @extend .m-3;

}
</style>
