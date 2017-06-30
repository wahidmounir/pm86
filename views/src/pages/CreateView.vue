<template lang="jade">
#create-view.view
  .bucket_name
    .wrap
      input(v-model='form.bucket_name', placeholder='Bucket Name', @keyup.enter='enter')
</template>

<script>
import api from 'stores/api'
export default {
  data() {
    return {
      form: {
        bucket_name: ''
      }
    }
  },
  methods: {
    enter() {
      if (this.form.bucket_name === '') {return;}
      api.post('/buckets', this.form).then(result => {
        this.$notify.success({ message: 'Success' });
        this.$router.push(`/buckets/${result.data.data._id}`)
      }, err => {
        this.$notify.error({ message: 'Error' });
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus" scoped>
#create-view
  .bucket_name
    border 1px solid #cfd8dc
    width 400px
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
    input
      outline none
      border none
      font-size 20px
</style>
