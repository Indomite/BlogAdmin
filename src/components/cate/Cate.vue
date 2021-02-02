<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>标签管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 输入框 -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加标签</el-button>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="queryInfo.keyword"
            placeholder="请输入内容"
            class="input-with-select"
            clearable
            @clear="getTagList">
            <el-button @click="getTagList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="tagList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="类别" prop="name"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === '1'">未锁定</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === '0'">锁定</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageIndex"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- 对话框 -->
      <el-dialog
        title="添加分类"
        :visible.sync="addDialogVisible"
        @close="addDialogClosed"
        width="50%">
        <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="70px">
          <el-form-item label="类别" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="addForm.description"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addTag">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        keyword: '',
        pageIndex: 1,
        pageSize: 5
      },
      tagList: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        name: [
          { required: true, message: '请输入标签名', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getTagList()
  },
  methods: {
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 获取用户信息
    async getTagList () {
      const { data: res } = await this.$http.get('tag', { params: this.queryInfo })
      console.log(res)
      if (res.status !== 200) return this.$message.error('用户列表获取失败')
      this.tagList = res.data.data
      this.total = res.data.totalCount
    },
    // 监听页码的变化
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getTagList()
    },
    // 监听页码值的变化
    handleCurrentChange (newPage) {
      this.queryInfo.pageIndex = newPage
      this.getTagList()
    },
    // 添加标签对话框
    addTag () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('tag', this.addForm)
        if (res.code !== 200) {
          this.$message.error('添加标签失败')
        }
        this.$message.success('添加标签成功')
        this.addDialogVisible = false
        this.getTagList()
      })
    }
  }
}

</script>

<style lang='less' scoped>

</style>
