import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request.post('/login/login', data)
}

export function logout() {
  return request.get('/login/logout')
}

export function getUserInfo() {
  return request.get('/user/info')
}

