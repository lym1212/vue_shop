<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          label="订单编号"
          prop="order_number"
          width="500"
        ></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template v-slot="scope">
            <el-tag v-if="scope.row.pay_status === '1'" type="success"
              >已付款</el-tag
            >
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" width="200">
          <template v-slot="scope">{{
            scope.row.create_time | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showAddressDialog"
            ></el-button>
            <el-tooltip
              content="查看物流信息"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="success"
                icon="el-icon-location"
                size="mini"
                @click="showExpressDialog"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalOrders"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <!-- 修改地址对话框 -->
    <el-dialog
      title="修改地址"
      :visible.sync="addressDialogVisible"
      width="50%"
    >
      <el-form :model="addressData" label-width="100px">
        <el-form-item label="省市区/县">
          <el-cascader
            :options="cityData"
            v-model="addressData.prov"
            :props="provProps"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="addressData.detail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 物流信息对话框 -->
    <el-dialog
      title="物流信息"
      :visible.sync="expressDialogVisible"
      width="50%"
    >
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(item, index) in expressInfo"
          :key="index"
          :timestamp="item.time"
        >
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="expressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="expressDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderList, getExpressInfo } from 'network/orders.js'
import cityData from 'assets/citydata.js'

export default {
  name: 'Order',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      orderList: [],
      totalOrders: 0,
      cityData,
      addressDialogVisible: false,
      expressDialogVisible: false,
      addressData: {
        prov: [],
        detail: ''
      },
      provProps: {
        expandTrigger: 'hover'
      },
      expressInfo: []
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const { data: res } = await getOrderList(this.queryInfo)
      if (res.meta.status !== 200) return this.$msg.error(res.meta.msg)
      this.orderList = res.data.goods
      this.totalOrders = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    showAddressDialog() {
      this.addressDialogVisible = true
    },
    async showExpressDialog() {
      const { data: res } = await getExpressInfo()
      if (res.meta.status !== 200) return this.$msg.error(res.meta.message)
      console.log(res.data)
      this.expressInfo = res.data
      this.expressDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>