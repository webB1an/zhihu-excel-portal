<template>
  <div class="app-container">
    <el-table
      :data="list"
      :show-header="false"
      border
      style="margin-top: 20px; width: 500px;height: 290px"
      :span-method="objectSpanMethod"
    >
      <el-table-column
        prop="type"
        width="90"
        header-align="center"
        align="center"
        label=""
      />
      <el-table-column
        prop="value"
        width="118"
        header-align="center"
        align="center"
        label=""
      />
      <el-table-column
        prop="image"
        header-align="center"
        align="center"
        label=""
      >
        <template slot-scope="scope">
          <img width="100%" :src="scope.row.image" alt="">
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="htmlToImage">生成图片</el-button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import * as download from 'downloadjs'
export default {
  data() {
    return {
      title: '',
      list: [],
      originData: null
    }
  },
  created() {
    const { params } = this.$route
    console.log('--', params)
    this.originData = params
    let arr = []
    for (const key in params) {
      switch (key) {
        case 'name':
          arr.push({ type: '型号', value: params[key], flag: 1, image: require(`./images/${params[key]}.png`) })
          break
        case 'price':
          arr.push({ type: '价格', value: params[key], flag: 2 })
          break
        case 'switch':
          arr.push({ type: '轴体', value: params[key], flag: 3 })
          break
        case 'keys':
          arr.push({ type: '配列', value: params[key], flag: 4 })
          break
        case 'light':
          arr.push({ type: '有无背光', value: params[key], flag: 5 })
          break
        case 'connect':
          arr.push({ type: '连接方式', value: params[key], flag: 6 })
          break
      }
    }
    arr = arr.sort((a, b) => a.flag - b.flag)

    console.log(arr)
    this.list = arr
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return {
          rowspan: 6,
          colspan: 1
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    },
    htmlToImage() {
      const node = document.querySelector('.el-table')
      html2canvas(node).then(canvas => {
        const base64 = canvas.toDataURL()
        download(base64, this.originData.name)
        console.log(canvas)
      })
    }
  }
}
</script>

<style lang="scss">
.app-container .el-tag {
  margin-right: 4px;
}
</style>
