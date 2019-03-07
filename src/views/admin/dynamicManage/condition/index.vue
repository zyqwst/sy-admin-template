<template>
  <div class="dynamic-condition">
    <el-form :inline="true">
      <el-form-item>
        <el-select v-model="selectComp" value-key="ele">
          <el-option
            v-for="option in options"
            :key="option.ele"
            :label="option.name"
            :value="option"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="!selectComp" type="primary" icon="el-icon-plus" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="comps"
      row-key="id"
      stripe
      max-height="300"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="类型"
        center/>
      <el-table-column
        prop="is"
        label="组件"
        center/>
      <el-table-column
        label="属性"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="editAttr(scope.row)">设置</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-tooltip content="预览" placement="top">
            <el-button icon="el-icon-search" circle type="success" @click="previewRow(scope.row)"/>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button icon="el-icon-delete" circle type="danger" @click="deleteRow(scope.row)"/>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="排序"
        width="80">
        <template slot-scope="scope">
          <svg-icon class="drag-handler" icon-class="drag"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="showAttrDialog"
      id="json-attr"
      :visible.sync="showAttrDialog"
    >
      <json-editor ref="jsonEditor" v-model="selectRow.attr"/>
    </el-dialog>
    <el-dialog :visible.sync="showPreviewDialog">
      <component :is="selectRow.is" v-bind="selectRow.attr" v-model="testVal"/>
    </el-dialog>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import { deepClone } from '@/utils'
import { elements } from '../template'
import JsonEditor from '@/components/JsonEditor'
export default {
  components: { JsonEditor, Sortable },
  data() {
    return {
      comps: [],
      newComps: [],
      selectComp: null,
      selectRow: {},
      showAttrDialog: false,
      showPreviewDialog: false,
      testVal: null
    }
  },
  computed: {
    options() {
      return elements
    },
    jsonValue() {
      return this.comps
    }
  },
  watch: {
    element: function() {
      console.info(this.element)
    }
  },
  mounted() {

  },
  methods: {
    add() {
      const comp = deepClone(this.selectComp)
      comp.id = Date.now()
      this.comps.push(comp)
      this.newComps.push(comp)
      this.$nextTick(() => {
        this.setSort()
      })
    },
    previewRow(row) {
      this.selectRow = row
      this.showPreviewDialog = true
    },
    editAttr(row) {
      this.selectRow = row
      this.showAttrDialog = true
    },
    deleteRow(row) {
      this.comps.splice(this.comps.findIndex(item => item === row), 1)
      this.newComps.splice(this.comps.findIndex(item => item === row), 1)
    },
    setSort() {
      const el = document.querySelectorAll('.dynamic-condition .el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        onEnd: evt => { // 监听end事件 手动维护列表
          const tempIndex = this.newComps.splice(evt.oldIndex, 1)[0]
          this.newComps.splice(evt.newIndex, 0, tempIndex)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dynamic-condition{
  .drag-handler{
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
#json-attr .el-dialog__body{
  padding:30px 0 0 0;
}
</style>
