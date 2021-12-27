<template>
  <div class="keyboard-container">
    <el-form ref="originData" class="keyboard-form" :model="originData" :rules="rules" label-width="100px">
      <el-form-item label="键盘名称" prop="name">
        <el-input v-model="originData.name" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="originData.price" type="number" />
      </el-form-item>
      <el-form-item label="轴体" prop="switchs">
        <el-input v-model="originData.switchs" />
      </el-form-item>
      <el-form-item label="配列" prop="keys">
        <el-input v-model.number="originData.keys" type="number" />
      </el-form-item>
      <el-form-item label="连接方式" prop="connect">
        <el-select v-model="originData.connect" placeholder="选择类型">
          <el-option
            v-for="item in connectOpt"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="背光" prop="light">
        <el-input v-model="originData.light" />
      </el-form-item>
      <el-form-item label="链接" prop="url">
        <el-input v-model="originData.url" />
      </el-form-item>
      <el-form-item label="描述" prop="describe" style="width: 1200px">
        <markdown-editor v-model="originData.describe" height="300px" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('originData')">修改</el-button>
        <el-button @click="resetForm('originData')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
import { getList, editor } from '@/api/keyboard'
import { connect, connectOpt } from '@/constant/keyboard'
export default {
  components: { MarkdownEditor },
  data() {
    return {
      connect,
      connectOpt,
      originData: {
        id: '',
        name: '',
        price: '',
        switchs: '',
        keys: '',
        connect: 0,
        light: '',
        describe: '',
        url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入键盘名称', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        switchs: [
          { required: true, message: '请输入轴体类型', trigger: 'blur' }
        ],
        keys: [
          { required: true, message: '请输入按键数', trigger: 'blur' }
        ],
        connect: [
          { required: true, message: '请选择连接方式', trigger: 'change' }
        ],
        light: [
          { required: true, message: '请输入灯光类型', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请输入商品链接', trigger: 'change' }
        ],
        describe: [
          { required: true, message: '请输入键盘描述', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    const { query: { id }} = this.$route

    this.init({ id })
  },
  methods: {
    init(options) {
      getList(options).then(res => {
        console.log('---------------res---------------', res)
        this.originData = res.data.length ? res.data[0] : null
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editor(this.originData).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.back()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
.keyboard-container {
  margin: 20px 20px 0;
  background-color: #fff;
}
.keyboard-form {
  width: 460px;
  padding: 20px 20px;
}
</style>
