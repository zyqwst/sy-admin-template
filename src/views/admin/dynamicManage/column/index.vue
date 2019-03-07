<template>
  <div class="dynamic-table">
    <el-row>
      <el-col :span="12">
        <el-card shadow="never">
          <div slot="header">
            <el-button>输入SQL</el-button>
            <el-button class="fr" type="success" icon="fa fa-send fa-fw" @click.native="queryColumns">点击运行</el-button>
          </div>
          <sql-editor ref="sqlEditor" v-model="value_.sql"/>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="never">
          <div slot="header">
            <el-button>列信息</el-button>
          </div>
          <el-table
            ref="dataTable"
            :data="value_.columns"
            stripe
            border
            highlight-current-row
            height="300"
            row-key="alias"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              prop="alias"
              label="列名" />
            <el-table-column
              prop="className"
              label="类型" />
            <el-table-column align="center" label="排序" width="80">
              <template slot-scope="{}">
                <svg-icon class="drag-handler" icon-class="drag"/>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SqlEditor from '@/components/SqlEditor'
import { fetchColumns } from '@/api/query'
import { deepClone } from '@/utils'
import Sortable from 'sortablejs'
import { mapActions } from 'vuex'
export default {
  components: { SqlEditor },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      value_: deepClone(this.value),
      sortable: null
    }
  },
  watch: {
    value_: {
      handler: function(newVal, oldVal) {
        this.$emit('input', newVal)
        this.setVal(newVal)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('dynamicManage', ['setVal']),
    async queryColumns() {
      const { result } = await fetchColumns(this.value_.sql)
      this.value_.columns = result
      this.$nextTick(() => {
        this.setSort()
      })
    },
    handleSelectionChange(val) {
      const { columns } = this.value_
      columns.forEach(item => {
        this.$set(item, 'select', val.includes(item))
      })
    },
    setSort() {
      const { columns } = this.value_
      const el = document.querySelectorAll('.dynamic-table .el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = columns.splice(evt.oldIndex, 1)[0]
          columns.splice(evt.newIndex, 0, targetRow)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.dynamic-table {
  .el-card__body {
    padding:0
  }
}
</style>

