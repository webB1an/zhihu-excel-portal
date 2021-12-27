<template>
  <div class="app-container list">
    <div style="width: 100px" v-html="svg" />
    <el-card>
      <el-form :inline="true" :model="form">
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="选择类型">
            <el-option
              v-for="item in typeOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="价格范围">
          <el-slider
            v-model="form.priceRange"
            style="width: 400px"
            :step="100"
            show-stops
            range
            :max="2500"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onGenerate">生成Md</el-button>
          <el-button type="primary" @click="htmlToImage">生成图片</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table
      :data="list"
      border
      style="margin-top: 20px; width: 841px"
    >
      <el-table-column :label="title" header-align="center">
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
        />
        <el-table-column
          prop="switch"
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
        />
        <el-table-column
          v-if="isRecommond"
          prop="fit"
          width="140"
          header-align="center"
          align="center"
          label="适用人群"
        >
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.fit" :key="item" class="tag" size="mini">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="isRecommond"
          width="160"
          prop="star"
          header-align="center"
          align="center"
          label="推荐指数"
        >
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.star"
              disabled
              :colors="colors"
            />
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import * as download from 'downloadjs'
import keyboardList from './data/keyboard'
import multiavatar from '@multiavatar/multiavatar'
export default {
  data() {
    return {
      svg: '',
      ALL: 'all',
      RECOMMOND: 'recommond',
      LINE: 'line',
      BLUETOOTH: 'bluetooth',
      TOW_P_FOUR_G: 'towPFourG',
      BLUETOOTH_BIMODAL: 'bluetoothBimodal',
      TWO_P_FOUR_G_BIMODAL: 'towPFourGBimodal',
      THREE_MODE: 'threeMode',
      RGB: 'rgb',
      TWELVE: 'twelve',
      TWELVE_REC: 'twelveRec',
      isRecommond: false,
      colors: {
        1: '#99A9BF',
        2: '#99A9BF',
        3: '#99A9BF',
        4: '#AC7931',
        5: '#FF9900'
      },
      typeOpts: [
        {
          value: 'all',
          label: '所有'
        },
        {
          value: 'recommond',
          label: '推荐'
        },
        {
          value: 'line',
          label: '有线'
        },
        {
          value: 'bluetooth',
          label: '蓝牙'
        },
        {
          value: 'towPFourG',
          label: '2.4G'
        },
        {
          value: 'bluetoothBimodal',
          label: '蓝牙双模'
        },
        {
          value: 'towPFourGBimodal',
          label: '2.4G双模'
        },
        {
          value: 'threeMode',
          label: '三模'
        },
        {
          value: 'rgb',
          label: 'RGB'
        },
        {
          value: 'twelve',
          label: '双十二'
        },
        {
          value: 'twelveRec',
          label: '双十二推荐'
        }
      ],
      keyboardList,
      title: '',
      list: [],
      form: {
        type: 'all',
        priceRange: [0, 2500]
      }
    }
  },
  created() {
    this.search()
    const svgCode = multiavatar('474747474747', true)
    this.svg = svgCode
    console.log(svgCode)
  },
  methods: {
    search() {
      const { type, priceRange } = this.form
      console.log(typeof type)
      const typeValue = this.typeOpts.find(item => item.value === type).label

      if (type === this.RECOMMOND) {
        this.isRecommond = true
      } else {
        this.isRecommond = false
      }
      switch (type) {
        case this.RECOMMOND:
        case this.ALL:
        case this.RGB:
        case this.TWELVE:
        case this.TWELVE_REC:
          this.title = this.keyboardList[type].title
          console.log(this.keyboardList[type].data, priceRange[0], priceRange[1])
          this.list = this.keyboardList[type].data.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1])
          break
        default:
          this.title = `${typeValue} 键盘`
          this.list = this.keyboardList[this.ALL].data.filter(item => item.connect === typeValue && item.price >= priceRange[0] && item.price <= priceRange[1])
      }

      return {
        list: this.list
      }
    },
    onSubmit() {
      this.search()
    },
    onGenerate() {
      const { list } = this.search()

      let md = ``

      list.forEach(item => {
        md += `
${item.name}
${item.price}
${item.describe}
`
      })

      console.log(md)
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
      this.$router.push({
        name: 'KeyboardDetail',
        params: row
      })
    }
  }
}
</script>

<style lang="scss">
.app-container .el-tag {
  margin-right: 4px;
}
.list .el-table tr td:first-child {
  background: #F5F7FA;
}
.list .el-table td, .el-table th {
  padding: 6px 0;
}
</style>
