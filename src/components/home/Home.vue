<template>
    <el-container class="homeContainer">
      <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '64px':'200px'">
          <!-- 菜单栏 -->
          <el-col :span="12">
          <div class="logoImg">
            <img src="../../assets/Homyit.png" alt="">
          </div>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
            <el-menu-item index="/home">
              <i class="el-icon-s-home"></i>
              <span slot="title" :display="isCollapse ? 'none':'inline'">首页</span>
            </el-menu-item>
            <el-submenu index="/users">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/users">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/article">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>文章信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/article">文章列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="/cate">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>分类信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/cate">分类列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/setting">
              <i class="el-icon-s-tools"></i>
              <span>网站配置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        </el-aside>
        <el-container>
          <!-- 头部 -->
          <el-header>
            <i :class="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold'" @click="toggleCollapse"></i>
            <el-button type="primary" @click="loginOut">退出</el-button>
          </el-header>
          <!-- 主体 -->
          <el-main>
            <!-- 路由占位符 -->
            <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 菜单是否收缩
      isCollapse: false
    }
  },
  methods: {
    // 退出
    loginOut () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}

</script>

<style lang='less' scoped>
.logoImg{
  text-align: center;
  > img {
    height: 40px;
    padding: 8px;
  }
}
.homeContainer {
  height: 100vh;
}

.el-header {
  display: flex;
  justify-content: space-between;
  background: #fff;
  align-items: center;
}

.el-aside {
  background: #344766;
}

.el-main {
  background: #eee;
}

.el-icon-s-fold,
.el-icon-s-unfold {
  display: block;
  padding: 10px;
  color: #409EFF;
  cursor: pointer;
  transform: scale(1.5);
}

</style>
