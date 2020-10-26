<template>
  <!-- <ul class="lineBox">
    <li :class="{moveRight:isChecked=='2',moveMiddle:isChecked=='1',moveLeft:isChecked=='0'}">
      <div class="lineflex" :style="{width:lineWidth}">
        <div></div>
        <div></div>
      </div>
    </li>
  </ul>-->
  <div class="lineBox" ref="lineBoxWidth">
     <!-- transform translateX() -->
    <div class="lineflex" :style="'transform:translateX('+ translateX +'px)'">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import BSscroll from "better-scroll";
export default {
  props:{
    isCheckedIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      translateX: 0
    };
  },
  watch:{
    isCheckedIndex(newData,oldData) {
      var lineBox = this.$refs.lineBoxWidth.offsetWidth
      this.translateX += (newData - oldData) * lineBox/6
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
px2rem(designpx) {
  $rem = 37.5px;
  return (designpx / $rem) rem;
}

.lineBox {
  position: relative;
  width: 100%;
  height: px2rem(10px);
  background: transparentify;
}

.lineBox>li {
  position: absolute;
  top: 0;
  left: 0;
}

.moveLeft {
  left: 0;
  transform: translateX(0%) translateX(0px);
}

.moveMiddle {
  left: 0;
  transform: translateX(50%) translateX(90px);
}

.moveRight {
  left: 0;
  transform: translateX(100%) translateX(150px);
}

.lineflex {
  display: flex;
  flex-direction row
  width 17%
  padding 0 30px
  box-sizing border-box
  justify-content: space-between;
  height: px2rem(6px);
  border-radius: px2rem(6px);
  transition: transform 0.4s ease;
}

.lineflex>div:first-child {
  width: 12%;
  height: px2rem(6px);
  border-radius: px2rem(6px);
  background: #6277FB;
}

.lineflex>div:last-child {
  width: 85%;
  height: px2rem(6px);
  border-radius: px2rem(6px);
  background-image: linear-gradient(90deg, #6277FB 10%, #A1FED4 100%);
}
</style>


