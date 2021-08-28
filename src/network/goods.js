import { request } from './request'

export function getCategories({ type, pagenum, pagesize }) {
  return request().get('categories', {
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

export function addCate({ cat_pid, cat_name, cat_level }) {
  return request().post('categories', {
    cat_pid,
    cat_name,
    cat_level
  })
}

export function searchCateById(id) {
  return request().get(`categories/${id}`)
}

export function editCate(id, cat_name) {
  return request().put(`categories/${id}`, {
    cat_name
  })
}

export function deleteCate(id) {
  return request().delete(`categories/${id}`)
}

export function getAttributes(id, sel) {
  return request().get(`categories/${id}/attributes`, {
    params: {
      sel
    }
  })
}

export function addAttr(id, attr_name, attr_sel, attr_vals) {
  return request().post(`categories/${id}/attributes`, {
    attr_name,
    attr_sel,
    attr_vals
  })
}

export function searchAttrById(id, attrId) {
  return request().get(`categories/${id}/attributes/${attrId}`)
}

export function editAttr(id, attrId, attr_name, attr_sel, attr_vals) {
  return request().put(`categories/${id}/attributes/${attrId}`, {
    attr_name,
    attr_sel,
    attr_vals
  })
}

export function deleteAttr(id, attrId) {
  return request().delete(`categories/${id}/attributes/${attrId}`)
}

export function getGoodsList(queryInfo) {
  return request().get('goods', {
    params: queryInfo
  })
}

export function deleteGoods(id) {
  return request().delete(`goods/${id}`)
}

export function addGoods(goodsInfo) {
  return request().post('goods', goodsInfo)
}