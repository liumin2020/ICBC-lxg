<template>
    <div>
        <div class="outerBox">
            <div class="collapseInfoContainer">
                <div class="collapseParent">
                    <div>
                        <h3>{{collapseOpenItemArr.name}}</h3>
                    </div>
                    <div class="upDownImg" @click="collapseParentClick(collapseOpenItemArr['name'],isImgShow)">
                        <img src="../assets/images/icon_down.png" v-show="isImgShow" />
                        <img src="../assets/images/icon_up.png" v-show="!isImgShow" />
                    </div>
                </div>
    
    
    
                <div v-if="!isImgShow">
                    <div class="flowerLine"></div>
                    <div class="collapseOpen">
    
                        <!-- 报警模版 -->
                        <div v-if="false">
                            <div v-if="collapseOpenItemArr['info'].length<=0" class="noData">
                                <p>暂无数据</p>
                            </div>
                            <div class="collapseOpenBg" v-for="(child,index) in collapseOpenItemArr.info" :key="index">
                                <div class="collapseOpenItem">
                                    <div class="title">
                                        <h4 class="titleh4Mid">首次报警时间:</h4>
                                    </div>
                                    <div class="desc">
                                        <span>{{child.num}}</span>
                                    </div>
                                </div>
                                <div class="collapseOpenItem">
                                    <div class="title">
                                        <h4 class="titleh4">主机ip:</h4>
                                    </div>
                                    <div class="desc">
                                        <span>{{child.summary}}</span>
                                    </div>
                                </div>
                                <div class="collapseOpenItem">
                                    <div class="title">
                                        <h4 class="titleh4">事件单号:</h4>
                                    </div>
                                    <div class="desc">
                                        <span>{{child.start_date}}</span>
                                    </div>
                                </div>
                                <div class="collapseOpenItem">
                                    <div class="title">
                                        <h4 class="titleh4">事件名称:</h4>
                                    </div>
                                    <div class="desc">
                                        <span>{{child.finish_date}}</span>
                                    </div>
                                </div>
                                <div class="collapseOpenItem">
                                    <div class="title">
                                        <h4 class="titleh4">事件摘要:</h4>
                                    </div>
                                    <div class="desc">
                                        <span>{{child.finish_date}}</span>
                                    </div>
                                </div>
                            </div>
    
                        </div>
                        <!--/ 报警模版  -->
    
                        <div v-if="true">
    
                            <div v-if="collapseOpenItemArr['info'].length<=0" class="noData">
                                <p>暂无数据</p>
                            </div>
                            <div class="collapseOpenBg" v-for="(child,index) in collapseOpenItemArr.info" :key="index">
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
                            </div>
                            <div class="collapseOpenBg" v-if="toggleBox" @click="showAllToggle">
                                <h6>
                                    <img src="../assets/images/open.png" alt="" class="openImg" v-if="showAll" />
                                    <img src="../assets/images/fold.png" alt="" class="openImg" v-if="!showAll" />
                                    <span class="showAll" v-if="showAll">展开</span>
                                    <span class="showAll" v-if="!showAll">收起</span>
                                </h6>
                            </div>
                        </div>
                        <!-- // -->
                    </div>
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
            type: Object,
            default: {}
        }
    },
    created() {
        this.getArrKeep();
    },
    data() {
        return {
            isImgShow: true,
            toggleBox: true,
            showAll: false,
            arrOld: [],
            Top2Arr: [],

        }
    },
    watch: {
        'showAll': function(val) {
            if (val) {
                this.collapseOpenItemArr['info'] = this.Top2Arr;
            } else {
                this.collapseOpenItemArr['info'] = this.arrOld;
            }
        }
    },
    methods: {

        collapseParentClick(name, mark) {
            this.isImgShow = !this.isImgShow;
        },
        //展开收起显示隐藏条件判断
        toggleBoxChang() {
            if (this.collapseOpenItemArr['info'].length > 2) {
                this.toggleBox = true;
            } else {
                this.toggleBox = false;
            }

        },
        //展开收起显示隐藏切换
        showAllToggle() {
            this.showAll = !this.showAll;
        },
        // 保存全量数据和前2个数据
        getArrKeep() {
            this.collapseOpenItemArr['info'].map(itm => {
                this.arrOld.push(itm);
            });
            this.Top2Arr = this.arrOld.slice(0, 2);
        }


    },
    mounted() {
        this.toggleBoxChang();
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
.collapseParent
//   background yellow
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
.flowerLine
  width 100%
  padding px2rem(32px) 0
  background url('../assets/images/flower_lin.png')no-repeat center
  background-size contain
.upDownImg
  padding-right px2rem(38px)
.upDownImg>img
  width px2rem(33px)
.collapseOpen
  padding 0 px2rem(30px) 
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
  background #fff
  letter-spacing 0 
  border-bottom 1px dashed #ccc
  border-bottom px2rem(3px) dashed #ccc
.collapseOpenBg:last-child
  border-bottom none
  text-align center
.showAll
  text-decoration none 
  font-size px2rem(22px)
  color rgb(67,117,223)
.openImg
  width px2rem(16px)
  margin-right px2rem(16px)
.collapseOpenItem
  display flex
  justify-space flex-start
  padding-bottom px2rem(8px)
.titleh4Long
  width px2rem(240px)
  font-size px2rem(26px)
  font-weight 700
.titleh4
  width px2rem(125px)
  font-size px2rem(26px)
  font-weight 700 
.titleh4Mid
  width px2rem(180px)
  font-size px2rem(26px)
  font-weight 700
.desc
  padding-left px2rem(20px)
.noData
  margin 0
  padding px2rem(26px) 0
  text-align center
  font-family PingFangSC-Regular
  font-size px2rem(24px)
  font-weight 200
  color #666
  background #fff
  letter-spacing 0
.noData>p
  font-size px2rem(24px)
  font-weight 200

</style>