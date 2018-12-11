<template>
  <div class="query-container">
    <el-form ref="dynamicForm" :inline="true" :model="dynamicForm" label-width="100px">
      <el-form-item
        v-for="(domain,index) in dynamicForm.components"
        :key="domain.label+index"
      >
        <component :is="null" v-model="domain.value" v-bind="domain.component">
          <el-option
            v-for="item in domain.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </component>
      </el-form-item>
      <el-button type="primary">查询</el-button>
    </el-form>
    <el-row>
      <el-col :span="24">

        <el-table
          ref="dataTable"
          :data="table.data"
          :height="dataTableHeight"
          :summary-method="getSummaries"
          stripe
          border
          highlight-current-row
          show-summary
        >
          <el-table-column
            v-for="column in table.columns"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"/>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { loadForm, loadTable } from '@/api/query'
import { accAdd } from '@/utils/math'
import { ResizeMixin } from '../mixin'
export default {
  mixins: [ResizeMixin],
  data() {
    return {
      dynamicForm: {
        components: []
      },
      table: {}
    }
  },
  mounted() {
    console.info('创建' + Date.now())
    this.load()
  },
  methods: {
    async load() {
      const result = await loadForm(this.$route.query.type)
      this.dynamicForm.components = result.object
      const table = await loadTable(this.$route.query.type)
      this.table = table.object
    },
    getSummaries(param) {
      const sums = []
      const { columns, data } = param
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (index === 5) {
          sums[index] = values.reduce((prev, curr) => {
            return accAdd(prev, curr)
          }, 0)
          sums[index] += ' 元'
        }
      })
      return sums
    }
  }
}
</script>
<style lang="scss" scoped>
.query-container{
  padding-top:22px;
}
</style>

