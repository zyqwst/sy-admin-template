// 基础信息api
import { success } from './RestEntity'
const store = [
  { id: 1, name: '一号门店' },
  { id: 2, name: '二号门店' },
  { id: 3, name: '三号门店' }
]
export default {
  fetchStore: () => {
    return success(store)
  }
}
