<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="newGoodData" label-position="top" ref="addFormRef">
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTabLeave"
          @tab-click="tabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品分类">
              <el-cascader
                v-model="newGoodData.goods_cat"
                :options="cateList"
                :props="cateProps"
                @change="handleCateChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-input v-model="newGoodData.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input v-model="newGoodData.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input v-model="newGoodData.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="newGoodData.goods_number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              v-for="item in manyList"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  v-for="(item, index) in item.attr_vals"
                  :key="index"
                  :label="item"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              v-for="item in onlyList"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :action="uploadUrl"
              list-type="picture"
              :headers="headersOpt"
              :on-success="handlePicSuccess"
              :on-remove="handleRemovePic"
              :on-preview="handlePicPreview"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="newGoodData.goods_introduce"></quill-editor>
            <el-button type="primary" @click="addGoods">添加</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog title="图片预览" :visible.sync="preDialogVisible" width="50%">
      <img :src="previewPath" class="preview-img" />
    </el-dialog>
  </div>
</template>

<script>
import { getCategories, getAttributes, addGoods } from 'network/goods'
import _ from 'lodash'

export default {
  name: 'Add',
  data() {
    return {
      activeIndex: '0',
      newGoodData: {
        goods_name: 'ceshiceshi',
        goods_price: 1,
        goods_weight: 1,
        goods_number: 1,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      cateList: [],
      cateProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id'
      },
      manyList: [],
      onlyList: [],
      checkedAttr: true,
      uploadUrl: 'https://lianghj.top:8888/api/private/v1/upload',
      headersOpt: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath: '',
      preDialogVisible: false
    }
  },
  computed: {
    currentCateId() {
      if (this.newGoodData.goods_cat.length === 3) return this.newGoodData.goods_cat[2]
      return null
    }
  },
  created() {
    this.getCategories()
  },
  methods: {
    async getCategories() {
      const { data: res } = await getCategories({})
      if (res.meta.status !== 200) return this.$msg.error(res.meta.msg)
      this.cateList = res.data
    },
    async getAttributes(sel) {
      const { data: res } = await getAttributes(this.currentCateId, sel)
      if (res.meta.status !== 200) return this.$msg.error(res.meta.msg)
      if (sel === 'many') {
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        })
        this.manyList = res.data
      } else {
        this.onlyList = res.data
      }
    },
    handleCateChange() {
      if (this.newGoodData.goods_cat.length !== 3) {
        this.$msg.error('请选择三级分类！')
        return this.currentCateId = []
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === '0' && this.newGoodData.goods_cat.length !== 3) {
        this.$msg.error('请选择商品分类！')
        return false
      }
      return true
    },
    tabClick() {
      if (this.activeIndex === '1') {
        this.getAttributes('many')
      } else if (this.activeIndex === '2') {
        this.getAttributes('only')
      }
    },
    handlePicSuccess(res) {
      if (res.meta.status !== 200) return this.$msg.error(res.meta.msg)
      const picInfo = { pic: res.data.tmp_path }
      this.newGoodData.pics.push(picInfo)
    },
    handleRemovePic(file) {
      const filePath = file.response.data.tmp_path
      const index = this.newGoodData.pics.findIndex(item => {
        item.pic === filePath
      })
      this.newGoodData.pics.splice(index, 1)
    },
    handlePicPreview(file) {
      this.previewPath = 'https://lianghj.top:8888/' + file.response.data.tmp_path
      this.preDialogVisible = true
    },
    async addGoods() {
      const newData = _.cloneDeep(this.newGoodData)
      newData.goods_cat = this.newGoodData.goods_cat.join(',')
      this.manyList.forEach(item => {
        const info = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(' ')
        }
        this.newGoodData.attrs.push(info)
      })
      this.onlyList.forEach(item => {
        const info = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
        this.newGoodData.attrs.push(info)
      })
      newData.attrs = this.newGoodData.attrs
      // console.log(newData)
      const { data: res } = await addGoods(newData)
      // console.log(res)
      if (res.meta.status !== 201) return this.$msg.error(res.meta.msg)
      this.$router.push('/goods')
    }
  }
}
</script>

<style lang="less" scoped>
.el-steps {
  margin: 15px 0;
}
/deep/ .el-step__title.is-process {
  color: #409eff;
}
/deep/ .el-step__head.is-process {
  color: #409eff;
  border-color: #409eff;
}
.el-checkbox {
  margin: 0 5px !important;
}
.preview-img {
  width: 100%;
}
.quill-editor {
  margin-bottom: 15px;
}
/deep/ .ql-editor {
  min-height: 300px;
}
</style>