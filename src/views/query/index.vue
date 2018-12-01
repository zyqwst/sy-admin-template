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
import { loadForm } from '@/api/query'
export default {
  name: 'Query1',
  data() {
    return {
      dynamicForm: {
        components: []
      }
    }
  },
  created() {
    console.info('创建页面')
    // this.loadForm()
  },
  methods: {
    async loadForm() {
      const result = await loadForm(this.$route.query.type)
      this.dynamicForm.components = result.object
    }
  }
}
</script>
<style lang="scss" scoped>
.query-container{
}
</style>

