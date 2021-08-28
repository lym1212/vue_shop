<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="roleList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="scope">
            <!-- 遍历一级权限 -->
            <el-row
              :class="['bottom-border']"
              v-for="item in scope.row.children"
              :key="item.id"
            >
              <el-col :span="5">
                <el-tag closable @close="deleteRightById(scope.row, item.id)">{{
                  item.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!-- 遍历二级权限 -->
                <el-row
                  :class="[index === 0 ? '' : 'top-border']"
                  v-for="(item, index) in item.children"
                  :key="item.id"
                >
                  <el-col :span="5">
                    <el-tag
                      type="success"
                      closable
                      @close="deleteRightById(scope.row, item.id)"
                      >{{ item.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="19">
                    <!-- 遍历三级权限 -->
                    <el-tag
                      type="warning"
                      v-for="item in item.children"
                      :key="item.id"
                      closable
                      @close="deleteRightById(scope.row, item.id)"
                      >{{ item.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditRoleDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="deleteRole(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="newRole" ref="addFormRef" label-width="70px" status-icon>
        <el-form-item label="角色名称">
          <el-input v-model="newRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="newRole.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="添加角色" :visible.sync="editDialogVisible" width="30%">
      <el-form
        :model="editRoleData"
        ref="editFormRef"
        label-width="70px"
        status-icon
      >
        <el-form-item label="角色名称">
          <el-input v-model="editRoleData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRoleData.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="rightDialogVisible"
      width="50%"
      @close="setRightDialogClose"
    >
      <el-tree
        ref="tree"
        node-key="id"
        :data="rightList"
        :props="defaultProps"
        default-expand-all
        show-checkbox
        :default-checked-keys="checkedKeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, addRole, searchRoleById, editRole, deleteRole, deleteRightById, getRightList, setRight } from 'network/home.js'

export default {
  name: 'Roles',
  data() {
    return {
      roleList: [],
      rightList: [],
      defaultProps: {
        label: 'authName'
      },
      addDialogVisible: false,
      editDialogVisible: false,
      rightDialogVisible: false,
      newRole: {
        roleName: '',
        roleDesc: ''
      },
      editRoleData: {},
      checkedKeys: [],
      setRole: ''
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: res } = await getRoleList()
      if (res.meta.status !== 200) {
        this.$msg.error('获取数据失败！')
      } else {
        this.roleList = res.data
      }
    },
    async getRightList() {
      const { data: res } = await getRightList('tree')
      if (res.meta.status !== 200) {
        this.$msg.error('获取数据失败！')
      } else {
        this.rightList = res.data
      }
    },
    addRole() {
      this.$refs.addFormRef.validate(async val => {
        if (!val) {
          this.$msg.error('添加失败')
        } else {
          const { data: res } = await addRole(this.newRole)
          if (res.meta.status !== 201) {
            this.$msg.error(res.meta.msg)
          } else {
            this.$msg.success('添加成功')
            this.addDialogVisible = false
            this.getRoleList()
          }
        }
      })
    },
    async showEditRoleDialog(id) {
      const { data: res } = await searchRoleById(id)
      if (res.meta.status !== 200) {
        this.$msg.error('查询角色信息失败!')
      } else {
        this.editRoleData = res.data
        this.editDialogVisible = true
      }
    },
    async editRole() {
      const { data: res } = await editRole(this.editRoleData)
      if (res.meta.status !== 200) {
        this.$msg.error('修改角色信息失败!')
      } else {
        this.getRoleList()
        this.editDialogVisible = false
      }

    },
    deleteRole(id) {
      this.$confirm('确认删除此角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(id)
        this.getRoleList()
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
    deleteRightById(role, rightId) {
      this.$confirm('确认删除此权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await deleteRightById(role.id, rightId)
        role.children = res.data
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
    showSetRightDialog(role) {
      this.getRightList()
      this.setRole = role.id
      this.getCheckedKeys(role, this.checkedKeys)
      console.log(this.checkedKeys)
      this.rightDialogVisible = true
    },
    // 递归获取 id
    getCheckedKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getCheckedKeys(item, arr)
      })
    },
    setRightDialogClose() {
      this.checkedKeys = []
    },
    setRight() {
      const keys = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
      setRight(this.setRole, keys.join(','))
      this.rightDialogVisible = false
      this.getRoleList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin: 7px;
}
.top-border {
  border-top: 1px solid #eee;
}
.bottom-border {
  border-bottom: 1px solid #eee;
}
</style>