import { request } from './request'

export function getMenu() {
  return request().get('menus')
}

export function getUserList({ query, pagenum, pagesize }) {
  return request().get('users', {
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
  return request().post('users', {
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

export function setRole(id, rid) {
  return request().put(`users/${id}/role`, {
    rid
  })
}


export function getRightList(type) {
  return request().get(`rights/${type}`)
}

export function getRoleList() {
  return request().get('roles')
}

export function addRole({ roleName, roleDesc }) {
  return request().post('roles', {
    roleName,
    roleDesc
  })
}

export function editRole({ roleId, roleName, roleDesc }) {
  return request().put(`roles/${roleId}`, {
    roleName,
    roleDesc
  })
}

export function searchRoleById(id) {
  return request().get(`roles/${id}`)
}

export function deleteRole(id) {
  return request().delete(`roles/${id}`)
}

export function deleteRightById(roleId, rightId) {
  return request().delete(`roles/${roleId}/rights/${rightId}`)
}

export function setRight(roleId, rids) {
  return request().post(`roles/${roleId}/rights`, {
    rids
  })
}
