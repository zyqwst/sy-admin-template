<template>
  <div class="query-container">
    <el-form ref="dynamicForm" :inline="true" :model="dynamicForm" label-width="100px">
      <el-form-item
        v-for="(domain,index) in dynamicForm.components"
        :label="domain.label"
        :key="domain.label+index"
        :rules="{
          required: true, message: '域名不能为空', trigger: 'blur'
        }"
      >
        <component :is="null" v-model="domain.value" v-bind="domain.component">
          <el-option
            v-for="item in domain.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </component>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="22" :offset="1">

        <el-table
          :data="table.data"
          :height="dataTableHeight"
          :summary-method="getSummaries"
          stripe
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
import ResizeMixin from '../mixin/ResizeHandler'
export default {
  name: 'Query1',
  mixins: [ResizeMixin],
  data() {
    return {
      dynamicForm: {
        components: []
      },
      table: {}
    }
  },
  created() {
    this.loadForm()
    this.loadTable()
    console.info('创建页面')
  },
  methods: {
    async loadForm() {
      const result = await loadForm(this.$route.query.type)
      this.dynamicForm.components = result.object
    },
    async loadTable() {
      const result = await loadTable(this.$route.query.type)
      this.table = result.object
      console.info(this.table)
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
}
</style>

