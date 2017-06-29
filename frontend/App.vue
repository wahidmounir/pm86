<template lang="jade">
  #app
    transition(name="fade" mode="out-in")
      router-view
</template>

<script>
import {getCookie} from './filters'
export default {
  name: 'app',
  beforeMount () {
  }
}
</script>

<style lang="stylus">
html
  font-size 50%

body
  font-family: Avenir,Helvetica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size 15px
  background-color lighten(#eceef1, 70%)
  margin 0
  padding-top 55px
  width 100%
  height 100%
  padding 0
  overflow-y scroll

#app
  width 100%
  height 100%

.view
  width 70%
  margin 0 auto
  position relative
  height 100%

li
  list-style-type none

h2
  text-align left

ol, ul
  list-style none

a
  color #34495e
  text-decoration none
  cursor pointer


.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video
  margin 0
  padding 0
  border 0
  font inherit
  vertical-align baseline

</style>
