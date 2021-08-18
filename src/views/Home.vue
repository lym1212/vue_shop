<template>
  <el-container class="home_container">
    <el-header>
      <div>
        <img src="~assets/avatar.jpg" alt="logo" />
        <span>后台管理系统</span>
      </div>
      <el-button type="danger" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollaspe ? '64px' : '200px'">
        <div class="toggle_button" @click="toggleClick">
          <span class="el-icon-d-arrow-right" v-show="isCollaspe"></span>
          <span class="el-icon-d-arrow-left" v-show="!isCollaspe"></span>
        </div>
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#1e90ff"
          unique-opened
          :collapse="isCollaspe"
          :collapse-transition="false"
          router
          :default-active="$route.path"
        >
          <!-- 一级菜单 -->
          <el-submenu
            v-for="item in menuList"
            :key="item.id"
            :index="item.id + ''"
          >
            <template slot="title">
              <i class="iconfont" :class="menuIcons[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              v-for="item in item.children"
              :key="item.id"
              :index="'/' + item.path"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenu } from 'network/home'

export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
      // 字体图标对象
      menuIcons: {
        '125': 'icon-users',
        '103': 'icon-tijikongjian',
        '101': 'icon-shangpin',
        '102': 'icon-danju-tianchong',
        '145': 'icon-baobiao'
      },
      isCollaspe: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出
    logout() {
      // 清空token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await getMenu()
      if (res.meta.status !== 200) {
        this.$msg.error(res.meta.msg)
      } else {
        this.menuList = res.data
      }
    },
    // getMenuList() {
    //   getMenu().then(res => {
    //     // console.log(res);
    //     if (res.meta.status !== 200) {
    //       this.$msg.error(res.meta.msg)
    //     } else {
    //       this.menuList = res.data
    //     }
    //   })
    // },
    toggleClick() {
      this.isCollaspe = !this.isCollaspe
    },
    // 保存二级菜单的激活状态
    // saveNavState(activePath) {
    //   window.sessionStorage.setItem('activePath', activePath)
    //   this.activePath = activePath
    // }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}
.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  background-color: #545c64;
  color: #fff;
  font-size: 20px;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    vertical-align: middle;
    padding-right: 5px;
  }
}
.el-aside {
  background-color: #545c64;
  transition: all 0.5s;
  .el-menu {
    border-right: 0;
  }
  .toggle_button {
    height: 24px;
    width: 100%;
    color: #fff;
    text-align: center;
    line-height: 24px;
    background-color: rgb(138, 135, 135);
    cursor: pointer;
  }
}
.el-main {
  background-color: rgb(238, 238, 238);
}
.iconfont {
  margin-right: 10px;
}
</style>