<template>
    <div class="outerBox">
        <div class="collapseInfoContainer" v-for="(item,index) in collapseOpenItemArr" :key="index">
            <div class="collapseParent">
                <div>
                    <h3>{{item.name}}</h3>
                </div>
                <div class="upDownImg" @click="collapseParentClick(item.name,item.mark)">
                    <img src="../assets/images/icon_down.png" v-show="!item.mark" />
                    <img src="../assets/images/icon_up.png" v-show="item.mark" />
                </div>
            </div>
            <div class="collapseOpen" v-if="item.mark">
                <div class="collapseOpenBg" v-for="(child,index) in item.info" :key="index">
                    <div class="collapseOpenItem">
                        <div class="title">
                            <h4 class="titleh4">变更单号:</h4>
                        </div>
                        <div class="desc">
                            <span>{{child.num}}</span>
                        </div>
                    </div>
                    <div class="collapseOpenItem">
                        <div class="title">
                            <h4 class="titleh4">变更主题:</h4>
                        </div>
                        <div class="desc">
                            <span>{{child.summary}}</span>
                        </div>
                    </div>
                    <div class="collapseOpenItem">
                        <div class="title">
                            <h4 class="titleh4Long">实施计划开始时间:</h4>
                        </div>
                        <div class="desc">
                            <span>{{child.start_date}}</span>
                        </div>
                    </div>
                    <div class="collapseOpenItem">
                        <div class="title">
                            <h4 class="titleh4Long">实施计划完成时间:</h4>
                        </div>
                        <div class="desc">
                            <span>{{child.finish_date}}</span>
                        </div>
                    </div>
                    <!-- <div class="collapseOpenItem" v-for="(item1,index1) in item.collapseOpenItemArr" :key="index1">
                            <div class="title">
                                <h4 :class="{titleh4Long:index=='0',titleh4:index1!='0'}">{{item1.title}}</h4>
                            </div>
                            <div class="desc">
                                <span>{{item1.desc}}</span>
                            </div>
                        </div> -->
    
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// @ is an alias to /src 


export default {
    props: {
        collapseOpenItemArr: {
            type: Array,
            default: []
        }
    },
    created() {
        // 添加标示
        this.collapseOpenItemArr.map(item => {
            item['mark'] = false;
            return item;
        })
    },
    data() {
        return {

            isImgShow: true,
        }
    },
    methods: {
        // 展开符点击
        collapseParentClick(name, mark) {

            this.collapseOpenItemArr.map(item => {
                if (item.name == name) {
                    item.mark = !item.mark;
                } else {
                    item.mark = false;
                }
                return item
            })

            this.collapseOpenItemArr = this.collapseOpenItemArr.slice(0)
        }
    },
    mounted() {
        console.log(522, this.collapseOpenItemArr)
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 px2rem(designpx){
   $rem=37.5px
   return (designpx / $rem) rem;
 }

.outerBox
  width 100%
.collapseInfoContainer
  width 100%
  border-top px2rem(6px) solid #eff3fb
.collapseInfoContainer:first-child
  border-top none
.collapseParent
  display flex
  justify-content space-between
  padding px2rem(24px) px2rem(30px) 
.collapseParent>div>h3
  padding-left px2rem(22px)
  font-size px2rem(28px)
  font-family PingFangSC-Regular
  color #3A3A3A
  text-align center
  letter-spacing 0
.upDownImg
  padding-right px2rem(38px)
.upDownImg>img
  width px2rem(33px)
.collapseOpen
  padding 0 px2rem(30px) px2rem(30px)
  margin-bottom px2rem(20px)
.collapseOpenBg
  padding px2rem(26px) px2rem(16px)
  box-sizing border-box
  line-height px2rem(48px)
  overflow-y auto
  font-size px2rem(26px)
  background #EFF3FB
  font-family PingFangSC-Regular
  color #000000
  letter-spacing 0 
  border-bottom px2rem(20px) solid #fff
.collapseOpenItem
  display flex
  justify-space flex-start
.titleh4Long
  width px2rem(240px)
  font-size px2rem(26px)
  font-weight 700 
.titleh4
  width px2rem(125px)
  font-size px2rem(26px)
  font-weight 700 
.desc
  padding-left px2rem(20px)


</style>