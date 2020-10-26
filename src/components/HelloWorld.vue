<template>
    <div class="helloContainer" id="helloContainer">
        <div class="topBgCard">
            <div class="inner">
    
                <div class="titleLeft">
                    <scroll class="scrollH">
                        <div class="widthReal">
                            <ul class="headTitle">
                                <li class="headTitleItem" v-for="(item,index) in headTitleData" :key="item.code" :class="{activeClass:isCheckedCode==item.code}" @click="titleClick(item.code,index)">{{item.name}}</li>
                            </ul>
                            <div class=" widthReal lineRelative" >
                                <About6 class="lineAbsolute" :isCheckedIndex="this.isCheckedIndex" />
                            </div>
                        </div>
                    </scroll>
                    <!-- dots 左滑动省略号 -->
                    <div class="dots" v-if="dotsShow">
                         <div class="dotsAbsolute">...</div>
                    </div>
                </div>
    
    
                <!-- <div class="logRight" @click="toWarningPage">
                                <img src="../assets/images/icon_warning.png" alt="">
                                <p>报警({{alertCount}})/变更</p>
                            </div> -->
            </div>
            <!-- / inner -->
            <div class="centerCard">
                <div class="centerCardInner">
                    <div class="centerCardHead">
                        <div>
                            <h1>{{centerCardHeadObj.value}}</h1>
                            <div class="tipBox" v-show="isTipShow">
                                <span class="tipTest" @click="tipClick">?</span>
                            </div>
                        </div>
                        <span class="centerCardHeadUnit">{{centerCardHeadObj.name}}</span>
                    </div>
    
                    <div class="centerCardBottom">
                        <div class="centerCardBottomContainer">
                            <div class="centerCardBottomItemBox" v-for="(item,index) in centerCardBottomData" :key="index">
                                <h2 class="centerCardBottomItemVal">{{item.value}}</h2>
                                <span class="centerCardBottomItemUnit">{{item.name}}</span>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--/ topBgCard -->
    
    </div>
    <!-- / helloContainer -->
</template>

<script type="text/ecmascript-6">
import About6 from '../views/About6.vue'
import About from '../views/About.vue'
import Scroll from './scroll/Scroll'
import { reqHeadAreaData, reqHeadCardData, reqAlertCountData } from '../api'
import { Dialog } from 'vant';
export default {
    name: 'HelloWorld',
    components: {
        About,
        About6,
        Scroll
    },
    props: {
        msg: String
    },
    data() {
        return {
            alertCount: 0,
            timer: '',
            tipContent: '',
            isTipShow: false,
            isCheckedIndex: 0,
            centerCardHeadObj: {},
            centerCardBottomData: [{ id: 1, val: '601', unit: '响应时间(毫秒)' }, { id: 2, val: '100%', unit: '系统成功率' }, { id: 3, val: '99.5%', unit: '业务成功率' }],
            isCheckedCode: 'JWAM',
            headTitleData: [],
            dotsShow:true,
        }
    },
    watch: {
        async isCheckedCode(val) {
            if (val) {
                // console.log("watch", val)
                this.isCheckedCode = val;
                // 把地区编号存储到Vuex
                this.$store.commit('topCodeEdit', this.isCheckedCode)
                await this.getHeadCardData();
            }
        },
           //x轴滚动的距离
         '$store.state.distanceX':function(val){
            if(Math.abs(val)>165){
               this.dotsShow=false
            }else{
              this.dotsShow=true
            }
            
        },
    },
    destroyed() {
        clearTimeout(this.timer)
    },
    methods: {
        freshInfo() {
            this.timer = window.setInterval(() => {
                this.getHeadCardData();
            }, 20000)
        },

        //定时刷新页面2s
        ontimeRefresh() {
            clearInterval(this.timerId)
            this.timerId = setInterval(() => {
                this.getHeadAreaData();
                // this.$eventBus.$emit('ajaxUpdate')
            }, 10000)
        },
        async getHeadAreaData() {
            try {
                var result = await reqHeadAreaData();
                if (result && result.code == "0") {
                    var { data } = result;
                    this.headTitleData = data;
                    // this.headTitleData.map(item=>{
                    //   if(item.name=='工银亚太'){
                    //     item.name='亚太区'
                    //   }
                    //   if(item.name=='工银美洲'){
                    //     item.name='美洲区'
                    //   }
                    //   if(item.name=='工银欧洲'){
                    //     item.name='欧非区'
                    //   }
                    // })

                    this.isCheckedCode = this.headTitleData[0].code
                }
            } catch (e) {
                console.log(e)
            }

        },
        async getHeadCardData() {
            try {

                var result = await reqHeadCardData(this.isCheckedCode);
                if (result && result.code == '0') {
                       
                    var data = result.data.info_list;
                    this.tipContent = result.data.source_dec;
                    this.centerCardHeadObj = data.shift();
                    this.centerCardBottomData = data;

                }
            } catch (e) {
                console.log(e)
            }
        },

        titleClick(code, index) {
            this.isCheckedCode = code;
            this.isCheckedIndex = index;
            // this.getHeadCardData();

            // 把地区编号code传给公共bus
            // this.$EventBus.$emit('areaClick', this.isCheckedCode);

            // 把地区编号存储到Vuex
            this.$store.commit('topCodeEdit', this.isCheckedCode)

            // 把当前选中index传给公共bus
            this.$EventBus.$emit('indexChange', this.isCheckedIndex);
            // 当点击的不是第一个时隐藏提示框
            if (index == '0') {
                this.isTipShow = false;
            } else {
                this.isTipShow = true;
            }

            // console.log(this.isCheckedCode)
        },
        tipClick() {
            Dialog({ message: `${this.tipContent}` });
        },

        // 报警数量
        async getAlertCountData() {
            try {
                var result = await reqAlertCountData();

                if (result && result.code == '0') {
                    this.alertCount = result.data.count;
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    created() {
        this.getAlertCountData();
        this.getHeadAreaData();
        // 把地区编号传给公共bus
        // this.$EventBus.$emit('areaClick', this.isCheckedCode);
        // console.log(2225, this.isCheckedCode)

        // 把地区编号存储到Vuex
        this.$store.commit('topCodeEdit', this.isCheckedCode)
    },


    mounted() {
        this.getHeadCardData();
        this.freshInfo();

    },



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus" scoped>
px2rem(designpx ){
   $rem = 37.5px
   return (designpx / $rem )rem 
}
.helloContainer
  width 100%
  height 100%
  box-sizing border-box
  overflow hidden
.topBgCard
  padding 0 px2rem(30px)
  width 100%
  height px2rem(416px)
  box-sizing:border-box
  background #fff url('../assets/images/bg.png') no-repeat center
.inner
  display flex
  padding px2rem(20px) 0
  width 100%

.titleLeft
  height 100%
  width 100%

.scrollH
  width 100%
  height px2rem(104px)
  overflow hidden
  // background pink
.widthReal
  width px2rem(1400px)
.headTitle
  display flex
  justify-content space-between
  padding px2rem(20px) 0 
  height px2rem(104px)
  box-sizing border-box
.headTitle>li
  width 100%
  height 100%
.headTitleItem
  text-align center
  vertical-align middle
  font-family PingFangSC-Medium
  font-size px2rem(32px)
  color #FFFFFF
.activeClass
  font-size px2rem(38px)
  color #fff
.logRight
  margin 0
  width px2rem(222px)
  height px2rem(104px)
  overflow hidden
  text-align center
  font-family PingFangSC-Regular
  font-size px2rem(22px) 
  font-weight 200 
  color #FFFFFF
.logRight>img
  width px2rem(68px)
  height px2rem(68px)
  vertical-align middle
.lineRelative
  position:relative;
  width 100%
 
.lineAbsolute
  position absolute
  top - px2rem(22px)
  left 0
 
.centerCard
  width 100%
  height px2rem(336px)
  border-radius px2rem(20px)
  background #fff url("../assets/images/bg_number.png") no-repeat center
  background-size cover
.centerCardInner
  padding px2rem(40px) 0 px2rem(28px) px2rem(48px)
  overflow hidden
.centerCardHead
  margin 0
  padding 0
  width 100%
  height px2rem(177px)
  // background pink
.centerCardHead>div>h1 
  margin 0
  padding 0
  font-size px2rem(84px)
  height px2rem(84px)
  line-height px2rem(84px)
  font-weight 400
  font-family PingFangSC-Regular
  color: #FFF
.centerCardHeadUnit
  margin 0
  padding 0
  font-size px2rem(22px)
  font-weight 200
  font-family PingFangSC-Regular
  color #FFFFFF
  letter-spacing 0
.tipBox
  position relative
  width 100%;
  height px2rem(0px)
  background red
.tipTest
  position absolute 
  z-index 2
  top px2rem(-100px)
  left 93%
  padding px2rem(5px)
  width px2rem(24px)
  height px2rem(24px)
  line-height px2rem(24px)
  border-radius px2rem(24px)
  text-align center
  color #bbb
  font-weight 700
  background #eff3fb
.centerCardBottom
  padding 0
  width 100%
  height px2rem(82px)
  overflow hidden
  box-sizing border-box 
.centerCardBottomContainer
  display flex
  justify-content space-between
  width 100%
  height 100% 
.centerCardBottomItemBox
  width 100%
  height 100%
.centerCardBottomItemVal
  margin 0
  padding 0
  font-size px2rem(44px)
  height px2rem(44px)
  line-height px2rem(44px)
  font-family PingFangSC-Medium
  color #FFFFFF
.centerCardBottomItemUnit
  margin 0
  padding 0
  font-size px2rem(22px)
  height px2rem(22px)
  line-height px2rem(22px)
  font-family PingFangSC-Regular
  color #FFFFFF
.dots
  position relative
  width 100%
.dotsAbsolute
  position fixed
  right 0
  top px2rem(35px)
  color #FFF
  font-weight 700


  

</style>
