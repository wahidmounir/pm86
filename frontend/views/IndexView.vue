<template lang="pug">
#home-view.view
  h1.title Wellcome to PM86 !
  p(@click='github') Login
  .listItem(v-for='(item, index) in items')
    router-link.link(:to="'/bucket/' + item.public_key")
      p.name {{item.bucket_name}}
    span.command &nbsp $ pm86 interact {{item.secret_key}} {{item.public_key}} &nbsp
  h1.warn(v-if='items.length === 0') 暂时还有没创建哦😯
</template>

<script>
import api from 'stores/api'
export default {
  name: 'home-view',
  computed: {
    items () {
      return this.$store.state.buckets
    }
  },
  data () {
    return {
      gitConfig: {
        client_id: 'ddf8e94834e773472899',
        client_secret: '47fbd6e9c4f0309f76ca46b31728efba65ef4feb',
        scope: 'user:email'
      }
    }
  },
  methods: {
    github () {
    const dataStr = (new Date()).valueOf();
    localStorage.setItem('state', dataStr);
    location.href = `https://github.com/login/oauth/authorize?client_id=${this.gitConfig.client_id}&scope=${this.gitConfig.scope}&state=${dataStr}`;
    }
  },
  mounted () {
    if (this.$route.query.code &&
        this.$route.query.state &&
        this.$route.query.state === localStorage.getItem('state')) {
      const result = api.post(`https://github.com/login/oauth/access_token?
                client_id=${this.gitConfig.client_id}&
                client_secret=${this.gitConfig.client_secret}
                &code=${this.$route.query.code}`)
         .then(result => {
        console.log(result);
        const args = result.data.split('&');
        const tokenInfo = args[0].split("=");
        const token = tokenInfo[1];
        api.get(`https://api.github.com/user?access_token=${token}`).then(result => {
          console.log(result);
        })
      })

    } else {
      console.log('查询登录失败');
    }
  }
}
</script>

<style lang="stylus" scoped>

.title {
  font-weight: 400;
  font-size: 2rem;
}

/* 列表项间隔padding-top */
.listItem {
    position: relative;
    padding-left: 40px;
    padding-top: 4px;
    width: 90%;
    margin: 0 auto;
    height: 150px;
    margin-left 100px;
}
/* 列表项自带竖线 */
.listItem:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    border-right: 1px solid rgb(50, 65, 87);
    left: 19px;
    z-index: 1;
}
/* 列表项自带小圆点 */
.listItem:after {
    content: "";
    display: inline-block;
    position: absolute;
    width: 12px;
    height: 1px;
    background-color: rgb(50, 65, 87);
    left: 20px;
    top: 50%;
    margin-top: -3px;
    z-index: 1;
}
#home-view
  height auto
  padding-top 30px

  .warn
    text-align center
    margin-top 200px

  .name
    font-size 1.5rem
    position    absolute
    bottom 90px

  .command
    position    absolute
    bottom 35px
    font-family 'Lucida Console', Monaco, monospace
    background-color #3F3F3F
    border-radius 5px
    color white
    cursor text
    font-size 1rem
    line-height 30px

</style>
