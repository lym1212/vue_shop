# 一些问题

```
keyup 和 blur 绑定同一个事件重复触发
解决：
@keyup.enter.native = "$event.target.blur()"
@blur = "func"
```





# 路由规则

```javascript
const routes = [
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home, redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users }
  ]}
]
```

#### 全局前置守卫

```javascript
router.beforeEach((to, from, next) => {
  // 访问 login 页面，直接 next()
  if (to.path === '/login') return next()
  // 获取 token 值
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    // 没有 token, 跳转到登录页面
    next('/login')
  } else {
    next()
  }
})
```

# Login.vue

#### 表单结构

```html
<!-- model 属性绑定表单数据对象, rules 属性绑定表单验证规则 -->
<el-form ref="loginRef" :model="loginInfo" :rules="loginRules">
    <!-- prop 属性绑定验证规则对象的一条规则 -->
	<el-form-item prop="username">
        <!-- v-model 绑定值 -->
        <!-- 密码框 type="password" -->
		<el-input v-model="loginInfo.username"></el-input>
	</el-form-item>
	<el-form-item>
		<el-button @click="login"></el-button>
	</el-form-item>
</el-form>	
```

#### 表单数据验证

```javascript
loginRules: {
    username: [
        // trigger 表示在什么时候触发验证
        // message 验证未通过时的提示信息
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 12, message: '用户名长度2-12位', trigger: 'blur' }
    ]
}
```

#### 发起登录请求之前的预验证

```javascript
// validate 函数会对整个表单进行验证，参数为回调函数
// 回调函数的两个参数：是否验证成功、未通过验证的字段
// 不传回调函数会返回一个 promise
this.$ref.loginRef.validate(valid => {    
})
```

#### 登录方法

```javascript
this.$refs.loginRef.validate(async valid => {
    if (!valid) return
    const { data: res } = await loginRequest(this.loginInfo)
    if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
    } else {
        this.$msg.success('登录成功！')
        // 设置 token
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
    }
})
```

#### 重置表单

```javascript
// resetFields 函数会把整个表单重置为 初始值 并移除验证结果
this.$refs.loginRef.resetFields()
```

# Home.vue

### 页面结构

```html
<el-container>
    <el-header><el-button @click="logout">退出</el-button></el-header>
    <el-container>
    	<el-aside>
            <!-- mode 属性表示菜单模式，默认为 vertical 
                 collapse 是否折叠菜单 
                 unique-opened 是否只保持一个子菜单展开 
                 ollapse-transition 是否开启 
				 default-active 当前激活菜单的index（高亮效果 
				 router 是否使用 vue-router 模式，开启后会以 index 作为 path 进行路由跳转 -->
            <el-menu :collapse="isCollaspe" 
                     unique-opened
                     :collapse-transition="false"
                     :default-active="activePath"
                     router></el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
    </el-container>
</el-container>
```

### 功能实现

#### 获取菜单数据并展示

- 获取菜单数据

```javascript
async getMenuList() {
    const { data: res } = await getMenu()
    if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
    } else {
        this.menuList = res.data
    }
}
```

- v-for 循环

```html
<!-- 一级菜单  index 是 String 类型且是唯一值 -->
<el-submenu v-for="item in menuList" :key="item.id" :index="item.id + ''" >
    <template slot="title">
        <i class="iconfont" :class="menuIcons[item.id]"></i>
        <span>{{ item.authName }}</span>
    </template>
    <!-- 二级菜单 -->
    <el-menu-item v-for="item in item.children" :key="item.id" :index="'/' + item.path"
        @click="saveNavState('/' + item.path)">
        <template slot="title">
            <span>{{ item.authName }}</span>
        </template>
    </el-menu-item>
</el-submenu>
```

- 字体图标对象对象

```javascript
// id 对应的字体图标
menuIcons: {
    '125': 'icon-users',
    '103': 'icon-tijikongjian',
    '101': 'icon-shangpin',
    '102': 'icon-danju-tianchong',
    '145': 'icon-baobiao'
}
```

#### 打开/折叠菜单

```html
<el-aside :width="isCollaspe ? '64px' : '200px'">
    <div @click="toggleClick">
        <span class="el-icon-d-arrow-right" v-show="isCollaspe"></span>
        <span class="el-icon-d-arrow-left" v-show="!isCollaspe"></span>
    </div>
</el-aside>
```

```javascript
// 点击按钮切换 collapse 属性的值，改变 <el-aside> 的宽度
toggleClick() {
    this.isCollaspe = !this.isCollaspe
}
```

#### ? 保存激活的二级菜单的 path

```javascript
created() {
    this.activePath = window.sessionStorage.getItem('activePath')
}
saveNavState(activePath) {
    window.sessionStorage.setItem('activePath', activePath)
    this.activePath = activePath
}
// or ?
:default-active="$route.path"
```

#### 退出

```javascript
logout() {
    // 清空 token
    window.sessionStorage.clear()
    this.$router.push('/login')
}
```

# User.vue

### 页面结构

```html
<!-- 面包屑导航  separator-class 图标分隔符 -->
<el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- to 路由跳转对象 -->
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
	<el-row></el-row>
    <el-table></el-table>
    <el-pagination></el-pagination>
</el-card>
```

##### 搜索框

```html
<!-- gutter 每一列的间隔 -->
<el-row :gutter="20">
    <!-- span 占的列数 -->
    <el-col :span="8">
        <!-- clearable 是否可清空（最右边会显示一个×的按钮 
			 clear事件：点击清空按钮时触发 -->
        <el-input v-model="queryInfo.query" @clear="getUserList" clearable>
            <!-- slot 指定前置还是后置内容 -->
            <el-button slot="append" @click="searchUser">
            </el-button>
        </el-input>
    </el-col>
    <el-col :span="4">
        <el-button @click="addDialogVisible = true">添加用户</el-button>
    </el-col>
</el-row>
```

##### 表格


```html
<!-- data 要显示的数据的数组
	 border 是否带有纵向边框
	 stripe 表格是否隔行变色 -->
<el-table :data="userList" border stripe>
    <!-- type 设置了 index 显示每一行的索引，从1开始 
		 prop 对应内容的属性名 label 表头 -->
    <el-table-column label="#" type="index"></el-table-column>
    <el-table-column label="姓名" prop="username"></el-table-column>
    <el-table-column label="邮箱" prop="email"></el-table-column>
    <el-table-column label="联系方式" prop="mobile"></el-table-column>
    <el-table-column label="权限" prop="role_name"></el-table-column>
    <el-table-column label="状态"></el-table-column>
    <el-table-column label="操作"></el-table-column>
</el-table>

<!-- 作用域插槽 -->
<!-- 状态列 -->
<!-- scope.row 是当前这一行的数据 
	 change 事件，switch 状态发生变化时触发 -->
<template v-slot="scope">
    <el-switch v-model="scope.row.mg_state" @change="stateChange(scope.row)">
    </el-switch>
</template>

<!-- 操作列 -->
<template v-slot="scope">
    <el-button @click="showEditDialog(scope.row.id)"></el-button>
    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
    <!-- content 提示内容
		 placement 文字提示出现的位置 
		 enterable 鼠标是否可以进入文字提示标签内 -->
    <el-tooltip content="分配权限" placement="top" :enterable="false">
        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
    </el-tooltip>
</template>
```

##### 分页

```html
<!-- current-page 当前页数 page-size 每页显示个数 
	 page-sizes 每页显示个数的选项 total 总数 
	 layout 组件布局 -->
<!-- size-change 事件，page-size 改变时触发
	 current-change 事件，current-page 改变时触发 -->
<el-pagination
	@size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[1, 2, 4, 8]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalUser">
</el-pagination>
```

##### 添加用户的对话框

```html
<!-- visible 是否显示对话框，close 事件，关闭对话框时触发 
	 status-icon 是否在输入框中显示校验结果反馈图标 -->
<el-dialog :visible.sync="addDialogVisible" @close="addDialogClose">
	<el-form :model="newUser" :rules="addFormRules" ref="addFormRef" status-icon>
    </el-form>
    <!-- footer 插槽，按钮区域 -->
	<span slot="footer">
		<el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="addUser">添 加</el-button>
    </span>
</el-dialog>
```

##### 修改用户的对话框

```html
<el-dialog :visible.sync="editDialogVisible">
	<el-form :model="editUserData" :rules="editFormRules" ref="editFormRef" status-icon>
    </el-form>
    <span slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button @click="editUser">修 改</el-button>
    </span>
</el-dialog>
```

### 邮箱和手机的验证规则

```javascript
// rule 验证规则  value 要验证的值  callback 验证成功的回调 
var checkEmail = (rule, value, callback) => {
    const regEmail = /^([a-zA-Z0-9-_])+@([a-zA-Z0-9-_])+(\.[a-zA-Z0-9-_])+/
    if (regEmail.test(value)) {
        callback()
    } else {
        // 验证失败要传入一个错误对象
        callback(new Error('邮箱格式不正确，请重新输入'))
    }
}
var checkMobile = (rule, value, callback) => {
    const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if (regMobile.test(value)) {
        callback()
    } else {
        callback(new Error('手机格式不正确，请重新输入'))
    }
}
```

### 功能实现

##### 获取用户列表

```javascript
async getUserList() {
    const { data: res } = await getUserList(this.queryInfo)
    if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
    } else {
        this.userList = res.data.users
        this.totalUser = res.data.total
    }
}
```

##### 监听分页器事件

```javascript
// newSize 每页显示个数
handleSizeChange(newSize) {
    this.queryInfo.pagesize = newSize
    this.queryInfo.pagenum = 1
    this.getUserList()
}
// 监听页码改变事件，newPage 新的页码
handleCurrentChange(newPage) {
    this.queryInfo.pagenum = newPage
    this.getUserList()
}
```

##### 修改用户状态

```javascript
async stateChange(userInfo) {
    const { data: res } = await stateChange(userInfo.id, userInfo.mg_state)
    if (res.meta.status !== 200) return this.$msg.error('修改失败')
    this.$msg.success('修改成功')
}
```

##### 搜索用户

```javascript
// queryInfo.query 查询参数和搜索框绑定，直接调用 getUserList 方法就可以
searchUser() {
    this.queryInfo.pagenum = 1
    this.getUserList()
}
```

##### 重置对话框的表单

```javascript
// 监听 close 事件
addDialogClose() {
	this.$refs.addFormRef.resetFields()
}
```

##### 添加用户

```javascript
addUser() {
    this.$refs.addFormRef.validate(async val => {
        if (!val) {
        	this.$msg.error('添加失败')
        } else {
            const { data: res } = await addUser(this.newUser)
            if (res.meta.status !== 201) {
            	this.$msg.error(res.meta.msg)
            } else {
                this.$msg.success('添加成功')
                // 关闭对话框
                this.addDialogVisible = false
                // 重新获取用户列表
                this.getUserList()
            }
        }
    })
}
```

##### 修改用户

```javascript
// 显示对话框
async showEditDialog(id) {
    const { data: res } = await searchUserById(id)
    if (res.meta.status !== 200) {
        this.$msg.error('查询用户信息失败')
    } else {
        this.editUserData = res.data
        // 显示对话框
        this.editDialogVisible = true
    }
}
// 提交请求
```



# axios 封装

#### request.js

```javascript
import axios from 'axios'

export function request() {
  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    timeout: 5000
  })
  instance.interceptors.request.use(config => {
    // 给 headers 请求头对象添加 token，才能获取数据
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }, err => {
    console.log(err)
  })
  return instance
}
```

#### 方法封装

##### 登录请求

```javascript
export function loginRequest({ username, password }) {
  return request().post('/login', {
    username,
    password
  })
}
```

##### 请求菜单数据

```javascript
export function getMenu() {
  return request().get('/menus')
}
```

##### 请求用户列表

```javascript
export function getUserList({ query, pagenum, pagesize }) {
  return request().get('/users', {
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
```

##### 修改用户状态

```javascript
export function stateChange(uId, type) {
  return request().put(`users/${uId}/state/${type}`, {
    uId,
    type
  })
}
```

##### 添加用户请求

```javascript
export function addUser({ username, password, email, mobile }) {
  return request().post('/users', {
    username,
    password,
    email,
    mobile
  })
}
```

##### 根据id查询用户

```javascript
export function searchUserById(id) {
  return request().get(`users/${id}`)
}
```

##### 修改用户请求

```javascript
export function editUser(id, email, mobile) {
  return request().put(`users/${id}`, {
    id,
    email,
    mobile
  })
}
```







# 弹窗提示

```javascript
Vue.prototype.$msg = Message
// 使用
this.$msg.success()
this.$msg.error()
```









# 导入字体图标

- main.js

  ```javascript
  import 'assets/fonts/iconfont.css'
  ```

- 使用

  ```html
  <i class="iconfont icon-xxxx"></i>
  <!-- input 中 -->
  <el-input prefix-icon="iconfont icon-xxxx"></el-input>
  ```

  

