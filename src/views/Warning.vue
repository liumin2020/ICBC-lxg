<template>
    <div class="warningContainer" id="warningContainer">
        <!-- 头部图片 -->
        <div class="headImg">
            <div class="headH2">
                <h2>报警信息({{this.$store.state.warningTotal}})</h2>
            </div>
        </div>
        <!-- /头部图片 -->
    
        <!-- 头部卡片-->
        <div class="headCardContainer">
            <div class="headCardBg">
    
                <div>
                    <!-- 灰度切换 -->
                    <!-- <SwitchTitle @freshPage='freshPage' :titleIsShow="titleIsShow" /> -->
                     <SwitchTitle :titleIsShow="titleIsShow" /> 
                    <!-- 饼图 -->
                    <template>
                              <!-- <PieEchart @numDisapear="getNumDisapear" v-if="!this.$store.state.noPieView"/>
                              <div v-if="this.$store.state.noPieView">
                                <h2 class="noPieView">当前该地区暂无报警信息</h2>
                              </div> -->
                               <PieEchart @numDisapear="getNumDisapear" v-if="!this.noWarningDialog"/>
                              <div v-if="this.noWarningDialog">
                                <h2 class="noPieView">当前该地区暂无报警信息</h2>
                              </div>
</template>
               </div>
              
             
    
            </div>
        </div>
        <!-- / 头部卡片-->
    
        <!-- 底部图片 -->
        <div class="footImg">
            <div class="headH2">
                <h2>变更信息({{total}})</h2>
            </div>
        </div>
        <!-- / 底部图片 -->
        <!-- 底部卡片 -->
        <div class="headCardContainer">
            <div class="headCardBg">
                <CollapseInfo class="collapseBox2" :collapseOpenItemArr="item" v-for="(item,index) in CollapseInfoAllFoot" :key="index" />
            </div>
            <!--  -->
            <!-- 返回上一级页面 -->
            <div class="goBack">
               <h6 class="goBackBtn" @click="goBackPage">返回</h6>
            </div>
            <!--/ 返回上一级页面 -->
            <!--  -->
        </div>
        <div v-if="errMsg" class="errMsg">
            <h5>{{errMsg}}</h5>
        </div>
        <!--/ 底部卡片 -->

       

        <!-- 回到顶部 -->
        <div class="toTop">
           <a href="#warningContainer">
                <img src="../assets/images/to_top.png" class="toTopImg"/>
           </a>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
// @ is an alias to /src 
import SwitchTitle from '@/components/SwitchTitle.vue'
import PieEchart from '@/components/PieEchart.vue'
import CollapseInfo from '@/components/CollapseInfo.vue'
import { reqWarnigSwitchData, reqLocationBtnsData, reqUpdataData } from '../api'
export default {
    name: 'Warning',
    components: {
        SwitchTitle,
        PieEchart,
        CollapseInfo
    },
    created() {
        this.getUpdataData();
    },
    data() {
        return {
            total: 0,
            errMsg: '',
            isFreshFlag: false,
            CollapseInfoAllFoot: [],
            CollapseInfoAll: {},
            titleIsShow: {},
            noWarningDialog:true,//无饼图数据对话框
        }
    },
    watch: {
        // '$store.state.warningTotal':function(val){
        //   console.log('this.$store.state.warningTotal:',this.$store.state.warningTotal,val)
        // }


        //根据报警数量的变化显示/隐藏 无饼图数据对话框
         '$store.state.WarningNum':function(warningNum){
              if(warningNum>0){
                this.noWarningDialog=false;
              }else{
                 this.noWarningDialog=true;
              }
         }
    },
    methods: {
        getNumDisapear(res) {
            // console.log(res, '99999999999')
            this.titleIsShow = res
        },
        freshPage() {
            // console.log(this.isFreshFlag, 66666)
            // this.isFreshFlag = true;
        },
        async getUpdataData() {
            try {
                var result = await reqUpdataData();
                if (result && result.code == '0') {
                    var { info_list, total } = result.data
                    this.total = total;
                    this.CollapseInfoAllFoot = info_list;
                    // console.log("CollapseInfoAllFoot:", this.CollapseInfoAllFoot)
                } else if (result && result.code == '1') {
                    this.errMsg = result.msg;
                    // console.log(result.msg)
                }
            } catch (e) {
                console.log(e)
            }
        },
        //  返回上一级页面 goBackPage
        goBackPage() {
            this.$router.push('/');
            // this.$router.push({component:Home})
        }
    },

    mounted() {}

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 px2rem(designpx){
   $rem=37.5px
   return (designpx / $rem) rem;
 }
.warningContainer
  width 100%
  min-height px2rem(1560px)
  box-sizing border-box
  background #eff3fb

.headImg
  width 100%
  height px2rem(210px);
  background url('../assets/images/bg_warning.png') no-repeat center
  background-size cover
.headH2
  margin 0
  padding px2rem(68px) 0 0 px2rem(60px)
.headH2>h2 
  margin 0
  padding 0
  font-size px2rem(38px)
  font-family PingFangSC-Medium
  color #FFFFFF
  letter-spacing 0
.headCardContainer
  padding 0 px2rem(30px) px2rem(30px) px2rem(30px)
  box-sizing border-box
.headCardBg
  margin-top px2rem(-54px)
  width 100%
  border-radius px2rem(20px)
  background #fff 
.collapseBox
  width 100%
  border-top px2rem(6px) solid #eff3fb
.collapseBox2
  width 100%
  border-top px2rem(6px) solid #eff3fb
.collapseBox2:first-child
  width 100%
  border-top none
.footImg
  width 100%
  height px2rem(220px)
  background url('../assets/images/bg_change.png') no-repeat center
  background-size cover
.BtnToggle
  margin 0 auto
  padding px2rem(50px) 0
  width 100%
  text-align right
  background yellow
.BtnToggle>span
  display inline-block;
  padding px2rem(5px) px2rem(10px)
  text-align center
  border px2rem(1px) solid #ccc
  border-radius px2rem(7px)
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


.btns
  width 100%
  height px2rem(100px)
  background #fff
.btns>ul
  display flex
.btns>ul>li
  width 50%
  height px2rem(100px)
  line-height px2rem(100px)
  text-align center
  margin-left px2rem(50px)
  border px2rem(1px) solid red
  box-sizing border-box
  border-radius px2rem(100px)
.areas
  display flex
  justify-content space-between
  width 100%
  height px2rem(100px)
  line-height px2rem(100px)
  background skyblue
.areas>span
  padding px2rem(5px)
  border px2rem(1px) dotted blue
  border-radius px2rem(10px)
.errMsg
  width 100%
  padding px2rem(50px)
  background #fff

.toTop
  position fixed
  bottom 15%
  right 12%
  width px2rem(50px)
  height px2rem(50px)
.toTopImg
  width px2rem(120px)
  height px2rem(120px)
.goBack
  margin-top px2rem(28px)
  width 100%
  height px2rem(90px)
  line-height px2rem(90px)
  background linear-gradient(to right,rgb(171,234,221) 5%,rgb(140,197,224) 40%,rgb(109,157,225)100%)
  border-radius px2rem(10px)
.goBackBtn
  margin 0 auto
  font-size px2rem(44px)
  color rgb(255,255,255)
  font-family PingFangSC-Medium
  text-align center
.noPieView
   width 100%
   height px2rem(200px)
   line-height px2rem(200px)
   text-align center
  

</style>

