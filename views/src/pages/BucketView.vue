<template lang="jade">
#bucket-view.view
  //- h1(v-if='readyState === 0') WebSocket: The connection is not yet open.
  //- h1(v-if='readyState === 1') WebSocket: The connection is open and ready to communicate.
  //- h1(v-if='readyState === 2') WebSocket: The connection is in the process of closing.
  //- h1(v-if='readyState === 3') WebSocket: The connection is closed or couldn't be opened.
  //- h2(v-if='bucket.public_key') pm86 interact {{bucket.secret_key}} {{bucket.public_key}}
  p {{line}}
  .charts
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

import { timestampParse, memory , uptime, timeSince, getCookie} from '../filters'
import api from 'stores/api'
import ws from './ws.js'
import mock from './mock.json'
import Charts from './Charts.vue'
import IEcharts from 'vue-echarts-v3'

export default {
  components: {
    IEcharts
  },
  data: () => ({
    hostList: mock,
    socket: {},
    readyState: 0,
    bucket: {},
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
      color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
      title : {
        text: '饼状图',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ["文章", "用户", "专题", "广告", "视频"]
      },
      series : [
        {
          name: '总量',
          type: 'pie',
          radius : '55%',
          center: ['50%', '50%'],
          data:[
            {value:335, name:'文章'},
            {value:310, name:'用户'},
            {value:234, name:'专题'},
            {value:135, name:'广告'},
            {value:548, name:'视频'}
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
    },
    pie_radius:{
      color:["#20a0ff","#13CE66","#F7BA2A","#FF4949","#61a0a8"],
      title : {
        text: '环形图',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ["文章", "用户", "专题", "广告", "视频"]
      },
      series : [
        {
          name: '总量',
          type: 'pie',
          radius : ['40%','60%'],
          data:[
            {value:335, name:'文章'},
            {value:310, name:'用户'},
            {value:234, name:'专题'},
            {value:135, name:'广告'},
            {value:548, name:'视频'}
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
  }),
  methods: {
    memory: memory,
    uptime: uptime,
    timeSince: timeSince,
    timestampParse: timestampParse,
    free (host) {
      return host.server.free_mem / host.server.total_mem * 100 + "%"
    },
    used (host) {
      return (host.server.total_mem - host.server.free_mem) / host.server.total_mem * 100 + "%"
    },
    formatLog (logs) {
      let all = ""
      logs.forEach((log) => {
        all +=  this.timestampParse(log.at) + "</br>" + log.message + "</br>" + log.stack + "</br>"
      })
      return all
    },
    filterProcesses (processes) {
      let obj = {}
      processes.forEach((el) => {
        obj[el.name] = el
      })
      return obj
    },
    handleExecute (host, process_name, method_name, $event) {
      console.log(host)
      console.log(method_name)
      console.log(process_name)
      $event.stopPropagation();
      this.socket.send('execute:-:-:' + JSON.stringify({
        machine_name: host.server_name,
        public_key: host.public_key,
        method_name: method_name,
        parameters: { name: process_name }
      }));
    }
  },
  mounted () {
    // api.get(`/buckets/${this.$route.params.id}`).then(result => {
      // this.bucket = result.data.data
       // ws(this)
    // }, error => {
    // })
    // if(!location.href.match(/debug=true/igm)) {
    //   console.log = function() {};
    // }
  }
}
</script>

<style lang="stylus" scoped>
.echarts {
  float: left;
  width: 500px;
  height: 400px;
}

#bucket-view
  font-family 'Lucida Console', Monaco, monospace
  h1
    font-size 20px
    margin-top 50px
  h2
    margin-top 10px
    text-align center

  // .server-info .platform, .processes
  //   .line
  //     margin 20px 0

  //   .el-button
  //     margin 20px 0

  //   p
  //     line-height 30px

  //     label
  //       display inline-block
  //       width   160px

  // .title
  //   font-size   2rem
  //   padding     20px 0
  //   clear       both
  //   font-weight bold
  //   font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

  // .server-info
  //   width 100%

  //   .memory
  //     width       500px
  //     position    relative
  //     margin-top  -30px
  //     margin-left 160px

  //   .used, .free
  //     height 30px
  //     float  left

  //   .used
  //     background-color #F5DAEB

  //   .free
  //     background-color #CEF4C9

  //   .display
  //     line-height  30px
  //     text-align   center
  //     padding-left 10px
  //     position     absolute

  // .logs
  //   height 400px
  //   overflow auto
  //   padding 0
  //   margin-top 20px

  //   .log
  //     background-color #333
  //     color #fff
  //     padding 10px
  //     white-space pre
  //     overflow-x auto
  //     letter-spacing 1px
  //     line-height 15px

  //   .log:after
  //     content "\2588"
  //     margin-left 5px
  //     animation blinker 1s linear infinite

  //   @keyframes blinker {
  //     0% {
  //       opacity 1.0
  //     }
  //     50% {
  //       opacity 0.0
  //     }
  //     100% {
  //       opacity 1.0
  //     }
  //   }

</style>
