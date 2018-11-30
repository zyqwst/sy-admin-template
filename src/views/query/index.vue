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
  </div>
</template>
<script>
export default {
  name: 'Query',
  data() {
    return {
      dynamicForm: {
        components: []
      }
    }
  },
  mounted() {
    this.dynamicForm.components.push(
      {
        component: {
          is: 'el-input',
          placeholder: '请输入员工姓名'
        },
        label: '输入框',
        value: ''
      },
      {
        component: {
          is: 'el-date-picker',
          type: 'daterange',
          'value-format': 'yyyy-MM-dd',
          'start-placeholder': '开始日期',
          'end-placeholder': '结束日期',
          'range-separator': '至'
        },
        label: '日期',
        value: []
      },
      {
        component: {
          is: 'el-select',
          placeholder: '请选择公司'
        },
        label: '公司',
        value: '',
        options: [
          { value: 1, label: '湖州双翼信息技术有限公司' },
          { value: 2, label: '湖州华数有限公司' }
        ]
      },
    )
  },
  created() {
    console.info('table创建' + this.$route.query.type, this.$store.state.tagsView.cachedViews)
  },
  destroyed() {
    console.info('table销毁' + this.$route.query.type)
  }
}
</script>
<style lang="scss" scoped>
.query-container{
}
</style>

