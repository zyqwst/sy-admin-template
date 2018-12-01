import request from '@/utils/request'

export function loadForm(type) {
  return request.get('/query/form', { 'type': type })
}
