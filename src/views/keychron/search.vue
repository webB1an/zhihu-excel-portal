<template>
  <div class="app-container list">
    <el-card>
      <el-form :inline="true" :model="form">
        <el-form-item>
          <el-button type="primary" @click="onGenerate">生成Md</el-button>
          <el-button type="primary" @click="htmlToImage">生成图片</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table
      :data="list"
      border
      :show-header="false"
      style="margin-top: 20px; "
    >
      <el-table-column
        prop="0"
        width="80"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="1"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[1] === 'string' && scope.row[1].includes('png')" width="100%" :src="scope.row[1]" alt="">

          <span v-else>{{ scope.row[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="2"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[2] === 'string' && scope.row[2].includes('png')" width="100%" :src="scope.row[2]" alt="">
          <span v-else>{{ scope.row[2] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="2"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[3] === 'string' && scope.row[3].includes('png')" width="100%" :src="scope.row[3]" alt="">
          <span v-else>{{ scope.row[3] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="4"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[4] === 'string' && scope.row[4].includes('png')" width="100%" :src="scope.row[4]" alt="">
          <span v-else>{{ scope.row[4] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="5"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[5] === 'string' && scope.row[5].includes('png')" width="100%" :src="scope.row[5]" alt="">
          <span v-else>{{ scope.row[5] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="6"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[6] === 'string' && scope.row[6].includes('png')" width="100%" :src="scope.row[6]" alt="">
          <span v-else>{{ scope.row[6] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="7"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[7] === 'string' && scope.row[7].includes('png')" width="100%" :src="scope.row[7]" alt="">
          <span v-else>{{ scope.row[7] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="8"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[8] === 'string' && scope.row[8].includes('png')" width="100%" :src="scope.row[8]" alt="">
          <span v-else>{{ scope.row[8] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="9"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[9] === 'string' && scope.row[9].includes('png')" width="100%" :src="scope.row[9]" alt="">
          <span v-else>{{ scope.row[9] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="10"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <img v-if="typeof scope.row[10] === 'string' && scope.row[10].includes('png')" width="100%" :src="scope.row[10]" alt="">
          <span v-else>{{ scope.row[10] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import * as download from 'downloadjs'
import keyboardList from './data'
export default {
  data() {
    return {
      form: {},
      title: '京造系列键盘',
      list: keyboardList
    }
  },
  created() {
    console.log(this.list)
    const arrary = []
    console.log()
    arrary[0] = { 0: '产品型号' }
    arrary[1] = { 0: '产品图片' }
    arrary[2] = { 0: '键盘配列' }
    arrary[3] = { 0: '轴体类型' }
    arrary[4] = { 0: '键帽材质' }
    arrary[5] = { 0: '背光类型' }
    arrary[6] = { 0: '连接方式' }
    arrary[7] = { 0: '电池容量' }
    arrary[8] = { 0: '支持平台' }
    this.list.forEach((item, index) => {
      Object.keys(item).forEach(key => {
        switch (key) {
          case 'name':
            arrary[0][index + 1] = item[key]
            arrary[1][index + 1] = require(`./images/${item[key]}.png`)
            break
          case 'keys':
            arrary[2][index + 1] = item[key]
            break
          case 'switch':
            arrary[3][index + 1] = item[key]
            break
          case 'keyMaterial':
            arrary[4][index + 1] = item[key]
            break
          case 'light':
            arrary[5][index + 1] = item[key]
            break
          case 'connect':
            arrary[6][index + 1] = item[key]
            break
          case 'battery':
            arrary[7][index + 1] = item[key]
            break
          case 'system':
            arrary[8][index + 1] = item[key]
            break
        }
      })
    })
    console.log(arrary)
    this.list = arrary
  },
  methods: {
    onGenerate() {},
    htmlToImage() {
      const node = document.querySelector('.el-table')
      console.log(node)
      html2canvas(node).then(canvas => {
        const base64 = canvas.toDataURL()
        download(base64, '价位列表')
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
// .list .el-table tr td:first-child {
//   background: #F5F7FA;
// }
.list .el-table td, .el-table th {
  padding: 2px 0;
}
.list .el-table .cell {
  padding-right: 4px;
  padding-left: 4px;
}
.list .el-table img {
  width: 100%;
  height: 100%;
}
</style>
