<template>
    <div class="outerBox">
        <div class="collapseInfoContainer">
    
            <div v-if="!infoShow">
                <div class="flowerLine" v-if="collapseOpenItemArr.length>0"></div>
                <div class="itemHeadName" v-if="collapseOpenItemArr.length>0">
                    <div class="wordBox">
                        <img class="wordImg" src="../assets/images/title_line.png" alt="">
                        <span class="word">{{this.HeadNam}}</span>
                    </div>
                    <div class="collapseOpen">
    
                        <!-- 报警模版 -->
                        <div v-if="collapseOpenItemArr.length<=0" class="noData">
                            <h6>暂无数据</h6>
                        </div>
                        <div class="collapseOpenBg" v-for="(child,index) in collapseOpenItemArr" :key="index">
                            <div class="collapseOpenItem">
                                <div class="title">
                                    <h4 class="titleh4Mid">首次报警时间:</h4>
                                </div>
                                <div class="desc">
                                    <span>{{child.first_time}}</span>
                                </div>
                            </div>
                            <div class="collapseOpenItem">
                                <div class="title">
                                    <h4 class="titleh4">主机ip:</h4>
                                </div>
                                <div class="desc">
                                    <span>{{child.ip}}</span>
                                </div>
                            </div>
                            <div class="collapseOpenItem">
                                <div class="title">
                                    <h4 class="titleh4">事件单号:</h4>
                                </div>
                                <div class="desc">
                                    <span>{{child.id}}</span>
                                </div>
                            </div>
                            <div class="collapseOpenItem">
                                <div class="title">
                                    <h4 class="titleh4">事件名称:</h4>
                                </div>
                                <div class="desc">
                                    <span>{{child.name}}</span>
                                </div>
                            </div>
                            <div class="collapseOpenItem">
                                <div class="title">
                                    <h4 class="titleh4">事件摘要:</h4>
                                </div>
                                <div class="desc">
                                    <span>{{child.message}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="collapseOpenBg" v-if="toggleBox" @click="showAllToggle">
                            <h6>
                                <img src="../assets/images/open.png" alt="" class="openImg" v-if="this.$store.state.showAll" />
                                <img src="../assets/images/fold.png" alt="" class="openImg" v-if="!this.$store.state.showAll" />
                                <span class="showAll" v-if="this.$store.state.showAll">展开</span>
                                <span class="showAll" v-if="!this.$store.state.showAll">收起</span>
                            </h6>
                        </div>
                        <!--/ 报警模版  -->
    
                        <!-- // -->
                    </div>
                </div>
                <!--  -->
            </div>
    
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// @ is an alias to /src 

import { reqGrayContentData, reqContentData } from '../api'
import { mapState } from 'vuex'

export default {

    created() {

        this.getPrimaryArgs();
        this.getArrKeep()


    },
   props:['infoShow'],
    data() {
        return {
           
            showAll:false,
            HeadNam: '',
            collapseOpenItemArr: [],
            fistCode: '',
            secodeCode: '',
            lastCode: '',
            toggleBox:true,
            arrOld: [],
            Top2Arr: [],
            showList: []
        }
    },

    watch: {
        '$store.state.showAll': function(val) {
            if (val) {
                this.collapseOpenItemArr = this.Top2Arr;
            } else {
                this.collapseOpenItemArr = this.arrOld;
            }
        },
        '$store.state.switchTitleCode':async function(val) {
            await this.getPrimaryArgs();
            await this.getGrayContentData();
        },
        '$store.state.fourthCode': async function(val) {
            await this.getPrimaryArgs();
            await this.getGrayContentData();
        },
        
    },
    methods: {
        // 报警内容列表
        async getGrayContentData() {
            try {
                var result = (this.fistCode == 'F-MBANKP(FOVA)') ? (await reqContentData(this.fistCode, this.secodeCode, this.lastCode)) : (await reqGrayContentData(this.fistCode, this.lastCode));
                if (result && result.code == '0') {

                    var { info_list, title } =result.data;
                    this.collapseOpenItemArr = info_list;

                    this.arrOld=[]; //用以存储原数据源（不变）
                    this.collapseOpenItemArr.map(itm=>{
                        this.arrOld.push(itm);
                    })
                    this.Top2Arr = this.arrOld.slice(0, 2); //前2项数据
                    this.HeadNam = title;
                }
            } catch (e) {
                console.log(e);
            }
        },
        //    获取switchCode，switchTitleCode，fourthCode值（请求参数获取）
        getPrimaryArgs() {
            this.fistCode = this.$store.state.switchCode;
            this.secodeCode =this.$store.state.switchTitleCode;
            this.lastCode =this.$store.state.fourthCode;
        },
        // 保存全量数据和前2个数据
        getArrKeep() {
          
            this.Top2Arr = this.arrOld.slice(0, 2);
        },
        //展开收起显示隐藏切换
        showAllToggle() {
             // 收起展开状态取反
                var flg=!this.$store.state.showAll;
                this.$store.commit('showAllEdit',flg);
        },
        //展开收起显示隐藏条件判断
        toggleBoxChang() {
            if (this.collapseOpenItemArr.length >2) {
                this.toggleBox = true;
            } else {
                this.toggleBox = false;
            }

        },

    },
    async mounted() {
        // await this.getGrayContentData();
        await this.getArrKeep();
        // this.toggleBoxChang();
        
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
  font-family PingFangSC-Regular
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
  padding px2rem(26px)  0 px2rem(26px) px2rem(16px)
  box-sizing border-box
  line-height px2rem(48px)
  overflow-y auto
  font-size px2rem(26px)
  background #EFF3FB
  font-family PingFangSC-Regular
  color #000000
  background #fff
  letter-spacing 0 
  border-bottom px2rem(2px) dashed #ccc
.collapseOpenBg:last-child
  border-bottom none
  text-align center
  color #000
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
.titleh4Mid
  width px2rem(180px)
  font-size px2rem(26px)
  font-weight 700
.desc
  padding-left px2rem(20px)
  text-align justify
  word-break: break-all
  text-align-last left
  font-family PingFangSC-Regular
  letter-spacing 0
  color #000
.noData
  margin 0
  padding px2rem(26px) 0
  text-align center
  font-family PingFangSC-Regular
  font-size px2rem(26px)
  color #000000
  background #fff
  letter-spacing 0
.itemHeadName
  padding px2rem(40px)
.wordBox
 
.wordImg
  display inline-block
  margin-left px2rem(14px)
  height px2rem(32px)
  line-height px2rem(32px) 
  text-align middle
  vertical-align middle
.word
  display inline-block
  margin-left px2rem(12px)
  font-size px2rem(32px)
  font-weight 500
  text-align middle
.openImg
  width px2rem(16px)
  margin-right px2rem(16px)
.showAll
  text-decoration none 
  font-size px2rem(22px)
  color rgb(67,117,223)


</style>