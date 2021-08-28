<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置参数！"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <el-row>
        <span>选择商品分类：</span>
        <!-- 选择器 -->
        <el-cascader
          v-model="currentCateIds"
          :options="cateList"
          :props="defaultProps"
          @change="handleCateChange"
        ></el-cascader>
      </el-row>
      <!-- Tab 标签页 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isDisabled"
            @click="addDialogVisible = true"
            >添加参数</el-button
          >
          <el-table :data="manyList" border stripe>
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="deleteTag(scope.row, index)"
                  >{{ item }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model.trim="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="$event.target.blur()"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteAttr(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 静态属性 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isDisabled"
            @click="addDialogVisible = true"
            >添加属性</el-button
          >
          <el-table :data="onlyList" border stripe>
            <el-table-column type="expand">
              <template v-slot="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="deleteTag(scope.row, index)"
                  >{{ item }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model.trim="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="$event.target.blur()"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="showEditDialog(scope.row.attr_id)"
                  >修改</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="deleteAttr(scope.row.attr_id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addDialogVisible"
      width="30%"
    >
      <el-form :model="newAttr" label-width="100px" ref="addFormRef">
        <el-form-item :label="titleText + '名称'">
          <el-input v-model="newAttr.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAttr">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="editDialogVisible"
      width="30%"
    >
      <el-form :model="editAttrData" label-width="100px" ref="addFormRef">
        <el-form-item :label="titleText + '名称'">
          <el-input v-model="editAttrData.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAttr">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategories, getAttributes, addAttr, searchAttrById, editAttr, deleteAttr } from 'network/goods.js'

export default {
  name: 'Params',
  data() {
    return {
      cateList: [],
      manyList: [],
      onlyList: [],
      defaultProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id'
      },
      currentCateIds: [],
      activeName: 'many',
      addDialogVisible: false,
      editDialogVisible: false,
      newAttr: {
        attr_name: ''
      },
      editAttrData: {}
    }
  },
  computed: {
    cateId() {
      if (this.currentCateIds.length === 3) {
        return this.currentCateIds[2]
      }
      return null
    },
    isDisabled() {
      if (this.currentCateIds.length !== 3) {
        return true
      }
      return false
    },
    titleText() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await getCategories({})
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        this.cateList = res.data
      }
    },
    async getAttributes() {
      if (this.currentCateIds.length !== 3) {
        this.currentCateIds = []
        this.manyList = []
        this.onlyList = []
        this.$msg.error('请选择三级分类！')
        return
      }
      const { data: res } = await getAttributes(this.cateId, this.activeName)
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          item.inputVisible = false
          item.inputValue = ''
        })
        if (this.activeName === 'many') {
          this.manyList = res.data
        } else {
          this.onlyList = res.data
        }
      }
    },
    handleCateChange() {
      this.getAttributes()
    },
    handleTabClick() {
      this.getAttributes()
    },
    async addAttr() {
      const { data: res } = await addAttr(this.cateId, this.newAttr.attr_name, this.activeName)
      console.log(res)
      if (res.meta.status !== 201) {
        this.$msg.error(res.meta.msg)
      } else {
        this.$msg.success('添加成功！')
        this.getAttributes()
        this.addDialogVisible = false
      }
    },
    async showEditDialog(attrId) {
      const { data: res } = await searchAttrById(this.cateId, attrId)
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        this.editAttrData = res.data
        this.editDialogVisible = true
      }
    },
    async editAttr() {
      const { data: res } = await editAttr(this.cateId, this.editAttrData.attr_id, this.editAttrData.attr_name, this.activeName)
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        this.$msg.success('修改成功！')
        this.getAttributes()
        this.editDialogVisible = false
      }
    },
    deleteAttr(attrId) {
      this.$confirm('是否删除此参数？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await deleteAttr(this.cateId, attrId)
        if (res.meta.status !== 200) {
          this.$msg.error(res.meta.msg)
        } else {
          this.$msg.success('删除成功!')
          this.getAttributes()
        }
      }).catch(() => {
        this.$msg({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加参数 tag 请求
    async saveTag(row) {
      const vals = row.attr_vals.join(' ')
      const { data: res } = await editAttr(this.cateId, row.attr_id, row.attr_name, row.attr_sel, vals)
      if (res.meta.status !== 200) return this.$msg.error(res.meta.msg)
      this.$msg.success('修改成功！')
    },
    async handleInputConfirm(row) {
      if (row.inputValue.length === 0) {
        row.inputVisible = false
        row.inputValue = ''
        this.$msg.error('error.')
        return
      }
      row.attr_vals.push(row.inputValue)
      row.inputValue = ''
      row.inputVisible = false
      this.saveTag(row)
    },
    showInput(row) {
      row.inputVisible = true
      this.$nextTick(() => {
        // 自动获取焦点
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    deleteTag(row, index) {
      row.attr_vals.splice(index, 1)
      this.saveTag(row)
    }
  }
}
</script>

<style lang="less" scoped>
.el-alert {
  margin-bottom: 15px;
}
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin: 5px;
}
.button-new-tag {
  margin: 5px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin: 5px;
  vertical-align: bottom;
}
</style>