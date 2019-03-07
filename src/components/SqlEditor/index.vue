<template>
  <div class="sql-editor">
    <textarea ref="textarea"/>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/abcdef.css'
import 'codemirror/mode/sql/sql'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/display/autorefresh'

export default {
  name: 'SqlEditor',
  /* eslint-disable vue/require-prop-types */
  props: ['value'],
  data() {
    return {
      sqlEditor: false
    }
  },
  mounted() {
    this.sqlEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'text/x-sql',
      theme: 'abcdef',
      lint: true,
      autoRefresh: true
    })

    this.sqlEditor.setValue(this.value, null, 2)
    this.sqlEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.sqlEditor.getValue()
    }
  }
}
</script>

<style scoped>
.sql-editor{
  height: 100%;
  position: relative;
}
.sql-editor >>> .CodeMirror {
  height: auto;
  height: 300px;
}
.sql-editor >>> .CodeMirror-scroll{
  height: 300px;
  overflow-y:auto;
}
.sql-editor >>> .cm-s-rubyblue span.cm-string {
  color: #F08047;
}
</style>
