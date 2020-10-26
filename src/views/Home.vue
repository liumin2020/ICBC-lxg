<template>
  <div class="homeContainer" id="homeContainer">
    <!-- 头部卡片 -->
    <HelloWorld class="hiWordBg"/>
    <!-- 折线图 -->
    <div class="allEcharts">
         <AllEcharts  class="echartsContent"/>
    </div>
    <!-- 可拖拽小图标 -->
    <div>
      <MoveIcon/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// @ is an alias to /src 
import HelloWorld from '@/components/HelloWorld.vue';
import AllEcharts from '@/components/AllEcharts.vue';
import MoveIcon from '@/components/MoveIcon.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    AllEcharts,
    MoveIcon
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
 px2rem(designpx){
   $rem=37.5px
   return (designpx / $rem) rem;
 }
.homeContainer
  width 100%
  box-sizing border-box
  overflow-y auto
  background #eff3fb
.hiWordBg
  width 100%
  height px2rem(480px)
.allEcharts
  padding px2rem(30px)
  width 100%
  // height 100%
  // overflow-y auto
  box-sizing border-box
.echartsContent
  padding px2rem(44px) 0 px2rem(20px) 0
  box-sizing border-box
  background #fff
  box-shadow 0 0 px2rem(12px) 0 #E4E7F2
  border-radius px2rem(20px)
  border-radius px2rem(20px)
  // background red

   
  
 
</style>

