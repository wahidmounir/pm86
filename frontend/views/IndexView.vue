<template lang="jade">
#home-view.view
  h1.title
    span(v-if='github.name') {{github.name}}
    img(v-else, src='../public/github.svg', @click='githubLogin')
    | . Wellcome to PM86
  .list(v-for='(item, index) in buckets')
    router-link(:to="'/buckets/' + item._id")
      .wrap
        span {{item.bucket_name}}
  .list
    router-link(to="/create")
      .wrap
        span Create a bucket!
</template>

<script>
import api from 'stores/api'
export default {
  computed: {
  },
  data () {
    return {
      gitConfig: {
        client_id: 'ddf8e94834e773472899',
        scope:     'user:email'
      },
      github: {},
      buckets: []
    }
  },
  methods: {
    githubLogin() {
      const dataStr = (new Date()).valueOf();
      localStorage.setItem('state', dataStr);
      location.href = `https://github.com/login/oauth/authorize?client_id=${this.gitConfig.client_id}&scope=${this.gitConfig.scope}&state=${dataStr}`;
    },
    mine() {
    },
    fetch() {
      api.get('buckets').then(result => {
        this.buckets = result.data.data
      })
    }
  },
  mounted() {
    const github = localStorage.getItem('github');
    if (github !== null) {
      this.fetch()
      return this.github = JSON.parse(github);
    }

    if (this.$route.query.code &&
        this.$route.query.state &&
        this.$route.query.state === localStorage.getItem('state')) {
      api.post('/account/github', {code: this.$route.query.code})
      .then(result => {
        localStorage.setItem('github', JSON.stringify(result.data.data))
        this.$notify.success({
          title: 'Connect github success',
          message: `Hello ${result.data.data.name}`
        });
        this.github = result.data.data
        this.$router.push('/')
        this.fetch()
      })
    } else {
      console.log('查询登录失败')
    }
  }
}
</script>

<style lang="stylus" scoped>

.title
  font-weight 400
  font-size 2rem

  img
    width 50px
    vertical-align text-bottom
    cursor pointer

#home-view
  padding-top 30px
  text-align center

  .list
    border 1px solid #cfd8dc
    width 300px
    margin 60px auto
    cursor pointer
    transition all .2s ease-in-out
    border-radius 5px
    box-shadow 0 1px 2px rgba(0, 0, 0, 0.1)
    border-radius 5px
    -webkit-transition all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
    transition all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
    font-size 18px
    .wrap
      margin 15px 20px
      border-left 4px solid #cfd8dc
      padding 10px 20px
      text-align left

  .list::after
    content ""
    border-radius 5px
    position absolute
    z-index -1
    top 0
    left 0
    width 100%
    height 100%
    box-shadow 0 5px 15px rgba(0, 0, 0, 0.3)
    opacity 0
    -webkit-transition all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)
    transition all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)

  .list:hover
    -webkit-transform scale(1.25, 1.25)
    transform scale(1.25, 1.25)

  .list:hover::after
      opacity 1

  .command
    position absolute
    bottom 35px
    font-family 'Lucida Console', Monaco, monospace
    background-color #3F3F3F
    border-radius 5px
    color white
    cursor text
    font-size 1rem
    line-height 30px

</style>
