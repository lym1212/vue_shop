<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <tree-table
        :data="categories"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-row-hover="false"
        show-index
        border
      >
        <template slot="isValid" slot-scope="scope">
          <i
            v-if="scope.row.cat_deleted"
            class="el-icon-error"
            style="color: red"
          ></i>
          <i v-else class="el-icon-success" style="color: green"></i>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
          <el-tag v-if="scope.row.cat_level === 1" type="success" size="mini"
            >二级</el-tag
          >
          <el-tag v-if="scope.row.cat_level === 2" type="warning" size="mini"
            >三级</el-tag
          >
        </template>
        <template slot="handle" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditCateDialog(scope.row.cat_id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteCate(scope.row.cat_id)"
            >删除</el-button
          >
        </template>
      </tree-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCate"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      width="30%"
      :visible.sync="addCateDialogVisible"
      @close="addCateDialogClose"
    >
      <el-form :model="newCate" label-width="70px" ref="addCateFormRef">
        <el-form-item label="分类名称">
          <el-input v-model="newCate.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="currentCate"
            :options="parentCate"
            :props="defaultProps"
            @change="handleCateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑分类"
      width="30%"
      :visible.sync="editCateDialogVisible"
      @close="editCateDialogClose"
    >
      <el-form :model="editCateData" label-width="70px" ref="editCateFormRef">
        <el-form-item label="分类名称">
          <el-input v-model="editCateData.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCategories, addCate, searchCateById, editCate, deleteCate } from 'network/goods.js'

export default {
  name: 'Category',
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 4
      },
      categories: [],
      parentCate: [],
      totalCate: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isValid'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'handle'
        }
      ],
      addCateDialogVisible: false,
      editCateDialogVisible: false,
      newCate: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      defaultProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        checkStrictly: true
      },
      currentCate: [],
      editCateData: {}
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      const { data: res } = await getCategories(this.queryInfo)
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        this.categories = res.data.result
        this.totalCate = res.data.total
      }
    },
    async getParentCate() {
      const { data: res } = await getCategories({ type: 2 })
      console.log(res.data)
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        this.parentCate = res.data
      }
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.queryInfo.pagenum = 1
      this.getCategories()
    },
    // 监听页码改变事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCategories()
    },
    showAddCateDialog() {
      this.getParentCate()
      this.addCateDialogVisible = true
    },
    handleCateChange() {
      if (this.currentCate.length > 0) {
        const length = this.currentCate.length
        this.newCate.cat_level = length
        this.newCate.cat_pid = this.currentCate[length - 1]
      } else {
        this.newCate.cat_pid = 0
        this.newCate.cat_level = 0
      }
    },
    async addCate() {
      const { data: res } = await addCate(this.newCate)
      if (res.meta.status !== 201) {
        this.$msg.error(res.meta.msg)
      } else {
        this.$msg.success(res.meta.msg)
        // this.queryInfo.pagenum = 1
        this.getCategories()
        this.addCateDialogVisible = false
      }
    },
    addCateDialogClose() {
      this.$refs.addCateFormRef.resetFields()
      this.currentCate = []
      this.newCate.cat_pid = 0
      this.newCate.cat_level = 0
    },
    async showEditCateDialog(id) {
      const { data: res } = await searchCateById(id)
      this.editCateData = res.data
      this.editCateDialogVisible = true
    },
    async editCate() {
      const { data: res } = await editCate(this.editCateData.cat_id, this.editCateData.cat_name)
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        this.$msg.success(res.meta.msg)
        this.getCategories()
        this.editCateDialogVisible = false
      }
    },
    editCateDialogClose() {
      this.$refs.editCateFormRef.resetFields()
    },
    deleteCate(id) {
      this.$confirm('是否删除此分类？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await deleteCate(id)
        if (res.meta.status !== 200) {
          this.$msg.error(res.meta.msg)
        } else {
          this.$msg({
            type: 'success',
            message: '删除成功!'
          })
          this.getCategories()
        }
      }).catch(() => {
        this.$msg({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.zk-table {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>