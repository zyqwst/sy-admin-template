<template>
  <div class="dynamic-query">
    <el-row>
      <el-col :span="6">
        <el-input ref="input" v-model="x" placeholder="请输入"/>
      </el-col>
      <el-col :span="2">
        <el-button @click.native="click">开关</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      x: ''
    }
  },
  mounted() {
    console.info(this.$refs.input)
  },
  methods: {
    click() {
      this.$refs.input.placeholder = 'fdsafdsa'
    }
  }
}
</script>

