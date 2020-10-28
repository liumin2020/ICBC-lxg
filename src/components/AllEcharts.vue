<template>
    <div class="allEchartsContainer">
        <!-- 顶部导航菜单 -->
        <div class="echartsHead">
            <ul class="echartsHeadBox">
                <li v-for="(item, index) in echartsHeadData" :key="item.code" class="echartsHeadLi" :class="{echartsHeadLiActive:isChecked==item.code}" @click="echartsHeadLiClick(item.code,index)">{{item.name}}</li>
            </ul>
            <!-- line -->
            <div class="lineBox">
                <About class="lineAbsolute" :isCheckedIndex="this.isCheckedIndex" />
            </div>
            <!-- / line -->
        </div>
        <!--/ 顶部导航菜单 -->
    
        <!-- 时间按钮 -->
        <div class="timeBox">
            <ul class="timeContent">
                <li v-for="item in timeBtnData" :key="item.id" @click="timeBtnClick(item.name)" :class="{timeBtnActive:isTimeChecked==item.name}">{{item.name}} </li>
            </ul>
        </div>
        <!--/ 时间按钮 -->
    
        <!-- echarts 折线图 -->
        <div class="echartsZone">
    
            <!-- <MyEchart v-for="(item, index) in lineData" :key="index"  :line-dat="item" class="myEchart" ref="child" /> -->
            <MyEchart v-if="tradeShow" :title="tradeTitle" :lineDat="tradeData" :isLoading="resultTradeLoading" class="myEchart" ref="child" />
            <MyEchart v-if="timeShow" :title="timeTitle" :lineDat="timeData" :isLoading="resultTimeLoading" class="myEchart" ref="child" />
            <MyEchart v-if="systemShow" :title="systemTitle" :lineDat="systemData" :isLoading="resultSystemLoading" class="myEchart" ref="child" />
            <MyEchart v-if="bussinessShow" :title="bussinessTitle" :lineDat="bussinessData" :isLoading="resultBussinessLoading" class="myEchart" ref="child" />
        </div>
    
    </div>
</template>

<script type="text/ecmascript-6">
import About from '../views/About.vue'
import MyEchart from './EchartName.vue'
import { reqEchartBtnsData, reqAllLineEchartsData } from '../api'
export default {
    components: {
        About,
        MyEchart
    },
    data() {
        return {
            timer: '',
            isCheckedIndex: 0, //选中按钮Index
            isTimeChecked: '10m',
            timeBtnData: [{ id: 1, name: '10m' }, { id: 2, name: '1h' }, { id: 3, name: '12h' }, ],
            isChecked: 'JWALL',
            isCheckedCode: 'JWAMXSQ',
            echartsHeadData: [],
            lineData: [],
            tradeTitle: "交易率(笔/十秒)",
            timeTitle: "响应时间(毫秒)",
            systemTitle: "系统成功率(%)",
            bussinessTitle: "业务成功率(%)",
            tradeShow: false, //交易率组件隐藏
            timeShow: false, //响应时间组件隐藏
            systemShow: false, //系统成功率组件隐藏
            bussinessShow: false, //业务成功率组件隐藏
            tradeData: {}, //交易率数据
            timeData: {}, // 响应时间(毫秒)
            systemData: {}, // 系统成功率(%)
            bussinessData: {}, // 业务成功率(%)
            resultTradeLoading: true, //交易率加载
            resultTimeLoading: true, //响应时间加载
            resultSystemLoading: true, //系统成功率加载
            resultBussinessLoading: true, //业务成功率加载 
        }
    },
    methods: {
        setTimer() {
            this.timer = window.setInterval(() => {
                this.getAllLineEchartsData();
            }, 10000)
        },
        //  接入点数据   全量接入 西三旗接入 嘉定接入
        async getEchartBtnsData() {
            try {
                var result = (this.isCheckedCode != '') ? await reqEchartBtnsData(this.isCheckedCode) : await reqEchartBtnsData('JWALL');
                if (result && result.code == '0') {
                    var { data } = result;
                    this.echartsHeadData = data;
                    // 存储被选中接入点的编码
                    this.isChecked = this.echartsHeadData[0].code;
                }
            } catch (e) {
                console.log(e);
            }
        },
        //区域编码点按钮点击事件
        echartsHeadLiClick(code, index) {
            this.isChecked = code; //区域编码
            this.isCheckedIndex = index; //记录被点击index

            //改变首页菜单点击状态 用以区别折线图是否动态展示
            this.isMenuClickFlagFn();
        },
        // 折线图数据
        async getAllLineEchartsData() {
            try {
                //  数据回来之前Loading显示
                // this.resultTradeLoading = true; //交易率加载
                // this.resultTimeLoading = true; //响应时间加载
                // this.resultSystemLoading = true; //系统成功率加载
                // this.resultBussinessLoading = true; //业务成功率加载 


                // 交易率
                var resultTrade = await reqAllLineEchartsData(this.isChecked, this.isTimeChecked, 'trade');
                var tObj = resultTrade.data;
                this.resultTradeLoading = false; //交易率Loading加载关闭
                this.tradeShow = true; //交易率组件显示
                if (resultTrade.code == '0') {


                    if (resultTrade.data.x && resultTrade.data.y) {
                        tObj['isDataNull'] = false;

                    } else {
                        tObj['isDataNull'] = true; //数据为空 
                    }
                    this.tradeData = tObj;

                }

                // 响应时间(毫秒)
                var resultTime = await reqAllLineEchartsData(this.isChecked, this.isTimeChecked, 'res_time');
                var timeObj = resultTime.data;
                this.resultTimeLoading = false; //响应时间Loading加载关闭
                this.timeShow = true; //响应时间组件显示
                if (resultTime.code == '0') {


                    if (resultTime.data.x && resultTime.data.y) {
                        timeObj['isDataNull'] = false;

                    } else {
                        timeObj['isDataNull'] = true; //数据为空 
                    }
                    this.timeData = timeObj;
                }



                // 系统成功率(%)
                var resultSystem = await reqAllLineEchartsData(this.isChecked, this.isTimeChecked, 'suc_xt');
                var systemObj = resultSystem.data;
                this.resultSystemLoading = false; //系统成功率Loading加载关闭
                this.systemShow = true; //系统成功率组件显示
                if (resultSystem.code == '0') {


                    if (resultSystem.data.x && resultSystem.data.y) {
                        systemObj['isDataNull'] = false;

                    } else {
                        systemObj['isDataNull'] = true; //数据为空
                    }
                    this.systemData = systemObj;

                }



                // 业务成功率(%)
                var resultBussiness = await reqAllLineEchartsData(this.isChecked, this.isTimeChecked, 'suc_yw');
                var bussinessObj = resultBussiness.data;
                this.resultBussinessLoading = false; //业务成功率Loading加载关闭
                this.bussinessShow = true; //业务成功率组件显示
                if (resultBussiness.code == '0') {

                    if (resultBussiness.data.x && resultBussiness.data.y) {
                        bussinessObj['isDataNull'] = false;

                    } else {
                        bussinessObj['isDataNull'] = true; //数据为空 
                    }
                    this.bussinessData = bussinessObj;

                }



            } catch (e) {
                console.log(e)
            }
        },
        // 时间段选择事件
        timeBtnClick(name) {
            this.isTimeChecked = name;
            this.getAllLineEchartsData();

            //改变首页菜单点击状态 用以区别折线图是否动态展示
            this.isMenuClickFlagFn();
        },
        //记录首页菜单点击状态 用以区别折线图是否动态展示
        isMenuClickFlagFn() {
            // 把首页菜单点击状态改成true(动态展示展现图)并存储到Vuex
            this.$store.commit('isMenuClickFlagEdit', true);

            //10s后把首页菜单点击状态更改成false并存储到Vuex
            setTimeout(() => {
                this.$store.commit('isMenuClickFlagEdit', false);
            }, 10000);
        }

    },

    mounted() {
        this.setTimer();

    },
    created() {
        this.isCheckedCode = this.$store.state.topTitleCode;

        this.getEchartBtnsData();
        // this.getAllLineEchartsData();
    },
    destroyed() {
        clearTimeout(this.timer)
    },
    watch: {
        '$store.state.topTitleCode': function(val) {
            this.isCheckedCode = this.$store.state.topTitleCode;
            if (val) {
                //初始化接入点选项，默认选中第一个
                this.isCheckedIndex = 0;
                this.getEchartBtnsData()
            }
        },
        //监听区域编码的变化

        // 区域编码
        async isChecked(val) {
            if (val) {
                this.isChecked = val;
                this.isTimeChecked = "10m"
                await this.getAllLineEchartsData();
            }
        }
    },

    // 时间
    async isTimeChecked(val) {
        if (val) {
            this.isTimeChecked = val;
            await this.getAllLineEchartsData();
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 px2rem(designpx){
     $rem=37.5px;
     return (designpx / $rem) rem;
 }
.allEchartsContainer
   width 100%
.echartsHead
   width 100%
.echartsHeadBox
   display flex
   justify-content flex-start 
   width 100%
   height px2rem(66px)
   box-sizing border-box
   overflow hidden
   border-bottom px2rem(2px) solid #EFF3FB
.echartsHeadBox>li
   width 33.3%
   height px2rem(66px)
   text-align center
.echartsHeadLi
   font-size px2rem(28px)
   font-family PingFangSC-Medium
   color #3A3A3A
   letter-spacing 0
.echartsHeadLiActive
   font-size px2rem(33px)
   font-family PingFangSC-Medium
   color #3A3A3A
   letter-spacing 0
.lineBox
  position relative
  width 100%
.lineAbsolute
  position absolute
  top -px2rem(22px)
  left 0
.timeBox
  padding px2rem(40px) px2rem(30px)
  box-sizing border-box
  overflow hidden
.timeContent
  display flex
  justify-content space-around
  width 100%
  height px2rem(60px)
  line-height px2rem(60px)
  border-radius px2rem(20px)
  background #EFF3FB
.timeContent>li
  width 100%
  height px2rem(60px)
  line-height px2rem(60px)
  border-right px2rem(2px) solid #fff
  text-align center
.timeContent>li:first-child
  border-radius px2rem(20px) 0 0 px2rem(20px)
.timeContent>li:last-child
  border-right none
  border-radius  0 px2rem(20px) px2rem(20px) 0
.timeBtnActive
  background-image linear-gradient(188deg, #8FFFD9 0%, #4E7CEB 100%, #6277FC 100%)
.echartsZone
  padding 0 px2rem(30px)
  width 100%
  margin-bottom px2rem(60px)
  box-sizing border-box
.myEchart
  padding-bottom px2rem(100px)


 
   


   
</style>
