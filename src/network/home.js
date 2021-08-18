import { request } from './request'

export function getMenu() {
  return request().get('/menus')
}

export function getUserList({ query, pagenum, pagesize }) {
  return request().get('/users', {
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

export function stateChange(uId, type) {
  return request().put(`users/${uId}/state/${type}`)
}

export function addUser({ username, password, email, mobile }) {
  return request().post('/users', {
    username,
    password,
    email,
    mobile
  })
}

export function searchUserById(id) {
  return request().get(`users/${id}`)
}

export function editUser(id, email, mobile) {
  return request().put(`users/${id}`, {
    email,
    mobile
  })
}

export function deleteUser(id) {
  return request().delete(`users/${id}`)
}