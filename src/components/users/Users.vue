<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 输入框 -->
      <el-row :gutter="8">
        <el-col :span="8">
          <el-input
            v-model="queryInfo.keyword"
            placeholder="请输入内容"
            class="input-with-select"
            clearable
            @clear="getUserList">
            <el-button @click="getUserList" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 用户列表区 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="权限" prop="role_id">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.role_id === 30">超级管理员</el-tag>
            <el-tag type="primary" v-if="scope.row.role_id === 20">管理员</el-tag>
            <el-tag type="success" v-else-if="scope.row.role_id === 10">普通用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === '1'">未锁定</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === '0'">锁定</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row.id)">编辑</el-button>
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
    </el-card>
      <!-- 编辑用户对话框 -->
      <el-dialog
        title="编辑用户"
        :visible.sync="editDialogVisible"
        @close="editDialogClosed"
        width="50%">
        <el-form ref="editFormRef" :model="editForm" :rules="editFormRules" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="editForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="role_id">
            <el-select v-model="editForm.role_id" placeholder="请选择">
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="editForm.status" placeholder="请选择">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的邮箱'))
    }
    return {
      queryInfo: {
        keyword: '',
        pageIndex: 1,
        pageSize: 5
      },
      userList: [],
      total: 0,
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在5-10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ]
      },
      statusOptions: [{
        value: '1',
        label: '未锁定'
      }, {
        value: '0',
        label: '锁定'
      }],
      roleOptions: [{
        value: '10',
        label: '普通用户'
      }, {
        value: '20',
        label: '管理员'
      }, {
        value: '30',
        label: '超级管理员'
      }]
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取用户信息
    async getUserList () {
      const { data: res } = await this.$http.get('user', { params: this.queryInfo })
      if (res.status !== 200) return this.$message.error('用户列表获取失败')
      this.userList = res.data.data
      this.total = res.data.totalCount
    },
    // 监听页码的变化
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    // 监听页码值的变化
    handleCurrentChange (newPage) {
      this.queryInfo.pageIndex = newPage
      this.getUserList()
    },
    async showEditDialog (id) {
      const { data: res } = await this.$http.get('user/' + id)
      if (res.status !== 200) return
      this.editForm = res.data
      this.editDialogVisible = true
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editUser () {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('user/' + this.editForm.id, this.editForm)
        if (res.status !== 200) {
          this.$message.error('修改用户信息失败')
        }
        this.$message.success('修改用户信息成功')
        this.editDialogVisible = false
        this.getUserList()
      })
    }
  }
}

</script>

<style lang='less' scoped>

</style>
