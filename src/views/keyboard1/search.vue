<template>
  <div class="app-container list">
    <el-card>
      <el-form :inline="true" :model="form">
        <el-form-item label="型号">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="轴体">
          <el-input v-model="form.switchs" />
        </el-form-item>
        <el-form-item label="背光">
          <el-input v-model="form.light" />
        </el-form-item>
        <el-form-item label="连接方式">
          <el-select v-model="form.connect" placeholder="选择类型">
            <el-option
              v-for="item in connectOpt"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="配列方式">
          <el-slider
            v-model="keysRange"
            style="width: 400px"
            :step="1"
            show-stops
            range
            :max="108"
          />
        </el-form-item>
        <br>
        <el-form-item label="价格范围">
          <el-slider
            v-model="priceRange"
            style="width: 400px"
            :step="50"
            show-stops
            range
            :max="3000"
          />
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="addKeyboard">添加</el-button>
          <el-button type="primary" @click="onGenerate">生成 Markdown</el-button>
          <el-button type="primary" @click="htmlToImage">生成图片</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table
      :data="list"
      border
      style="margin-top: 20px; width: 841px"
    >
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="型号"
        width="140"
      >
        <template slot-scope="scope">
          <span style="cursor: pointer;" @click="toDetail(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        width="140"
        header-align="center"
        align="center"
        label="价格"
      >
        <template slot-scope="scope">
          <span style="cursor: pointer;" @click="toEditor(scope.row)">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="switchs"
        width="140"
        header-align="center"
        align="center"
        label="轴体"
      />
      <el-table-column
        prop="keys"
        width="140"
        header-align="center"
        align="center"
        label="配列"
      />
      <el-table-column
        prop="light"
        width="140"
        header-align="center"
        align="center"
        label="有无背光"
      />
      <el-table-column
        prop="connect"
        width="140"
        header-align="center"
        align="center"
        label="连接方式"
      >
        <template slot-scope="scope">
          {{ connect[scope.row.connect] }}
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import * as download from 'downloadjs'
import { getList } from '@/api/keyboard'
import { connect, connectOpt } from '@/constant/keyboard'
export default {
  data() {
    return {
      connect,
      connectOpt,
      priceRange: [0, 3000],
      keysRange: [0, 108],
      form: {
        name: '',
        switchs: '',
        light: '',
        connect: 6,
        minPrice: 0,
        maxPrice: 3000,
        minKeys: 0,
        maxKeys: 108
      },

      list: []
    }
  },
  watch: {
    keysRange: {
      immediate: true,
      handler(val, oldVal) {
        const [minKeys, maxKeys] = val
        this.form.minKeys = minKeys
        this.form.maxKeys = maxKeys
      }
    },
    priceRange: {
      immediate: true,
      handler(val, oldVal) {
        const [minPrice, maxPrice] = val
        this.form.minPrice = minPrice
        this.form.maxPrice = maxPrice
      }
    }
  },
  created() {
    this.init(0)
  },
  methods: {
    init(options) {
      options = { name: '', maxPrice: 4000, minPrice: 0, switchs: '', minKeys: 0, maxKeys: 108, light: '', connect: 6, ...options }
      getList(options).then(res => {
        console.log('---------------res---------------', res)
        this.list = res.data
      })
    },
    onSubmit() {
      console.log('------------------------------', this.form)
      this.init(this.form)
    },
    onGenerate() {
      const list = this.list
      let md = ``

      list.forEach(item => {
        md += `
${item.name}
${item.price}
${item.describe}
${item.url}
`
      })

      // console.log(md)

      this.$copyText(md).then(() => {
        this.$message.success('复制成功！')
      })
    },
    htmlToImage() {
      const node = document.querySelector('.el-table')
      console.log(node)
      html2canvas(node).then(canvas => {
        const base64 = canvas.toDataURL()
        download(base64, '价位列表')
        console.log(canvas)
      })
    },
    toDetail(row) {
      console.log(row)
      this.$router.push({
        path: `/keyboard1/detail?id=${row.id}`
      })
    },
    toEditor(row) {
      console.log(row)
      this.$router.push({
        path: `/keyboard1/editor?id=${row.id}`
      })
    },
    addKeyboard() {
      this.$router.push({
        path: `/keyboard1/add`
      })
    }
  }
}
</script>

<style lang="scss">
.app-container .el-tag {
  margin-right: 4px;
}
.list .el-table tr th:first-child {
  background: #F5F7FA;
}
.list .el-table tr td:first-child {
  background: #F5F7FA;
}
.list .el-table td, .el-table th {
  padding: 6px 0;
}
</style>
