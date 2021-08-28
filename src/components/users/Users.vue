<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUser"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="联系方式" prop="mobile"></el-table-column>
        <el-table-column label="权限" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <!-- 状态切换 -->
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="stateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作" width="200px">
          <template v-slot="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteUser(scope.row.id)"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip content="分配角色" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="showSetRoleDialog(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 4, 8]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalUser"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <el-form
        :model="newUser"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="newUser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="newUser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="newUser.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="newUser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息的对话框 -->
    <el-dialog
      title="修改用户信息"
      width="50%"
      :visible.sync="editDialogVisible"
      @close="editDialogClose"
    >
      <el-form
        :model="editUserData"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
        status-icon
      >
        <el-form-item label="用户名">
          <el-input v-model="editUserData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog
      title="分配角色"
      width="30%"
      :visible.sync="setRoleDialogVisible"
      @close="setRoleDialogClose"
    >
      <div>
        <p>当前用户：{{ currentUser.username }}</p>
        <p>当前角色：{{ currentUser.role_name }}</p>
        <el-select v-model="defaultRoleId" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, stateChange, addUser, searchUserById, editUser, deleteUser, getRoleList, setRole } from 'network/home'

export default {
  name: 'Users',
  data() {
    // 邮箱验证规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9-_])+@([a-zA-Z0-9-_])+(\.[a-zA-Z0-9-_])+/
      if (regEmail.test(value)) {
        callback()
      } else {
        callback(new Error('邮箱格式不正确，请重新输入'))
      }
    }
    // 手机验证规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regMobile.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不正确，请重新输入'))
      }
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      userList: [],
      totalUser: 0,
      // 控制对话框的显示和隐藏
      addDialogVisible: false,
      editDialogVisible: false,
      setRoleDialogVisible: false,
      newUser: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserData: {},
      defaultRoleId: '',
      roleList: [],
      currentUser: {},
      // 添加新用户的验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 12, message: '用户名长度2-12位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '密码长度6-20位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
    this.getRoleList()
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await getUserList(this.queryInfo)
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        this.userList = res.data.users
        this.totalUser = res.data.total
      }
    },
    async getRoleList() {
      const { data: res } = await getRoleList()
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        this.roleList = res.data
      }
    },
    // 一页显示多少条数据
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.queryInfo.pagenum = 1
      this.getUserList()
    },
    // 监听页码改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 改变用户状态
    async stateChange(userInfo) {
      const { data: res } = await stateChange(userInfo.id, userInfo.mg_state)
      if (res.meta.status !== 200) {
        return this.$msg.error('修改失败')
      }
      this.$msg.success('修改成功')
    },
    // 用户名搜索
    searchUser() {
      this.queryInfo.pagenum = 1
      this.getUserList()
    },
    // 对话框关闭时重置表单
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    setRoleDialogClose() {
      this.currentUser = {}
      this.defaultRoleId = ''
    },
    // 添加用户
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
            this.addDialogVisible = false
            this.getUserList()
          }
        }
      })
    },
    // 显示修改用户信息的对话框
    async showEditDialog(id) {
      const { data: res } = await searchUserById(id)
      if (res.meta.status !== 200) {
        this.$msg.error('查询用户信息失败')
      } else {
        this.editUserData = res.data
        this.editDialogVisible = true
      }
    },
    async editUser() {
      const { data: res } = await editUser(this.editUserData.id, this.editUserData.email, this.editUserData.mobile)
      if (res.meta.status !== 200) {
        this.$msg.error('修改用户信息失败')
      } else {
        this.getUserList()
        this.$msg.success('修改成功')
        this.editDialogVisible = false
      }
    },
    deleteUser(id) {
      this.$confirm('确认删除此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(id)
        this.queryInfo.pagenum = 1
        this.getUserList()
        this.$msg({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$msg({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    showSetRoleDialog(user) {
      this.currentUser = user
      this.setRoleDialogVisible = true
    },
    async setRole() {
      const { data: res } = await setRole(this.currentUser.id, this.defaultRoleId)
      console.log(res)
      if (res.meta.status !== 200) {
        this.$msg.error('设置失败！')
      } else {
        this.$msg.success(res.meta.msg)
        this.getUserList()
        this.setRoleDialogVisible = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 15px;
}
.el-table {
  font-size: 12px;
}
/deep/ .el-form-item.is-success .el-input__inner {
  border-color: green;
}
/deep/ .el-form-item.is-success .el-input__validateIcon {
  color: green;
}
</style>