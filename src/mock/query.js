import { success } from './RestEntity'
import { param2Obj } from '@/utils'
const form1 = [
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
  }
]
const table = {
  data: [
    {
      date: '2018-09-09',
      name: '诸葛建国'
    }
  ]
}
const array = [form1, form1]
export default {
  loadForm: (config) => {
    const { type } = param2Obj(config.url)
    return success(array[type - 1])
  },
  loadTable: (config) => {
    return success(table)
  }
}
