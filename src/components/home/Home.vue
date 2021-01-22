<template>
    <el-container class="homeContainer">
      <!-- 侧边栏 -->
        <el-aside width="200px">
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
            active-text-color="#ffd04b">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="4-1">选项1</el-menu-item>
                <el-menu-item index="4-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
        </el-aside>
        <el-container>
          <!-- 头部 -->
          <el-header>
            <i :class="isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold'" @click="toggleCollapse"></i>
            <el-button type="primary">退出</el-button>
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
</style>
