import request from '@/utils/request'

// 获取所有表名
async function postFetchAll (postData) {
  return await request.post('/tables', postData)
}

// 获取单个表格结构
async function postFetchSchema (postData) {
  return await request.post('/schema', postData)
}

// 获取单个表格数据
async function postBrowse (postData) {
  return await request.post('/browse', postData)
}

// 插入
async function postCreate (postData) {
  request.post('/set', postData)
}

// 更新
async function postUpdate (postData) {
  await request.post('/update', postData)
}

// 删除
async function postDelete (postData) {
  await request.post('/delete', postData)
}

// 登录获取token
async function postLogin (postData) {
  return await request.post('/emc/admin/login', postData)
}

// 登出
async function postLogout (postData) {
  await request.post('/admin/user/logout', postData)
}

// token验证
async function postVerify (postData) {
  return await request.post('/admin/user/verify', postData)
}

// 管理员验证
async function postAdminVerift (postData) {
  return await request.post('/admin/user/verifyadm', postData)
}

export const emcRequest = {
  postFetchAll,
  postFetchSchema,
  postCreate,
  postUpdate,
  postDelete,
  postBrowse,
  postLogin,
  postLogout,
  postVerify,
  postAdminVerift
}
