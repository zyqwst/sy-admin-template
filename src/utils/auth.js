const TOKEN = 'Authorization'
export function getToken() {
  return sessionStorage.getItem(TOKEN)
}
export function setToken(token) {
  sessionStorage.setItem(TOKEN, token)
}
export function removeToken() {
  sessionStorage.removeItem(TOKEN)
}
