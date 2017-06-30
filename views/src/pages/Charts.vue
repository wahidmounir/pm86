<template lang="jade">
.admin
  .echarts
    IEcharts(:option='line')
  .echarts
    IEcharts(:option='bar')
  .echarts
    IEcharts(:option='pie')
  .echarts
    IEcharts(:option='pie_radius')
</template>

<script>
import IEcharts from 'vue-echarts-v3/src/full.vue';
import mock from './mock.json'
export default {
  components: {
    IEcharts
  },
  data: () => ({
    line: {
      color:["#20a0ff","#13CE66","#F7BA2A","#FF4949"],
      title: {
        text: '曲线图'
      },
      xAxis: {
        data: ["文章", "用户", "专题", "广告", "视频", "元信息"]
      },
      yAxis:{},
      series: [
        {
          name: "总量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    },
    bar: {
      color:["#20a0ff","#13CE66","#F7BA2A","#FF4949"],
      title: {
        text: '柱状图'
      },
      xAxis: {
        data: ["文章", "用户", "专题", "广告", "视频", "元信息"]
      },
      yAxis:{},
      series: [
        {
          name: "总量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    },
    pie: {
      color:["#13CE66","#FF4949"],
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        top: 'top',
        data: ["Free", "Usage"]
      },
      series : [
        {
          name: 'Total',
          type: 'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:[
            {value:335, name:'Free'},
            {value:310, name:'Usage'},
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  })
}
</script>

<style scoped>
.echarts {
  float: left;
  width: 500px;
  height: 400px;
}
</style>
