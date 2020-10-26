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
            <MyEchart :linedata="item" v-for="(item, index) in lineData" :key="index" class="myEchart" ref="child" />
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
            isCheckedIndex: 0,//选中按钮Index
            isTimeChecked: '10m',
            timeBtnData: [{ id: 1, name: '10m' }, { id: 2, name: '1h' }, { id: 3, name: '12h' }, ],
            isChecked: '',
            isCheckedCode: '',
            echartsHeadData: [],
            lineData: []
        }
    },
    methods: {
        //  接入点数据   全量接入 西三旗接入 嘉定接入
        async getEchartBtnsData() {
            try {
                var result = (this.isCheckedCode != '') ? await reqEchartBtnsData(this.isCheckedCode) : await reqEchartBtnsData('JWALL');
                if (result && result.code == '0') {
                    var { data } = result;
                    this.echartsHeadData = data;
                    // console.log(this.echartsHeadData)
                    // 存储被选中接入点的编码
                    this.isChecked = this.echartsHeadData[0].code;
                    console.log(1111, this.isChecked)

                }
            } catch (e) {
                console.log(e);
            }
        },
        //区域编码点按钮点击事件
        echartsHeadLiClick(code, index) {
            this.isChecked = code; //区域编码
            this.isCheckedIndex = index; //记录被点击index
        },
        // 折线图数据
        async getAllLineEchartsData() {
            try {
                var result = await reqAllLineEchartsData(this.isChecked, this.isTimeChecked)
                if (result && result.code == '0') {
                    var { data } = result;
                    console.log(77, data);
                    var keys = Object.keys(data);
                    var ob = {};
                    var ar = [];
                    keys.forEach(item => {
                        if (1) {
                            ob.title = item;
                            ob.x = data.time_list;
                            ob.y = data[item]
                            ar.push(ob);
                        }
                    })
                    console.log('ar', ar)
                    var { res_time, suc_xt, suc_yw, time_list, trade } = data;

                    var newArr0 = [res_time, suc_xt, suc_yw, trade];
                    console.log(9, newArr0)
                    var newArr = [];
                    var obj = {};



                    var obj0 = {};
                    var obj1 = {};
                    var obj2 = {};
                    obj['trade'] = { x: time_list, y: trade, title: '交易率(笔/十秒)' };
                    obj0['res_time'] = { x: time_list, y: res_time, title: '响应时间(毫秒)' };
                    obj1['suc_xt'] = { x: time_list, y: suc_xt, title: '系统成功率' };
                    obj2['suc_yw'] = { x: time_list, y: suc_yw, title: '业务成功率' };
                    newArr.push(obj);
                    newArr.push(obj0);
                    newArr.push(obj1);
                    newArr.push(obj2);
                    console.log("*", newArr)

                    this.lineData = newArr;


                    // data.map
                } //
            } catch (e) {
                console.log(e)
            }
        },
        // 时间段选择事件
        timeBtnClick(name) {
            this.isTimeChecked = name;
            console.log(this.isTimeChecked)
            this.getAllLineEchartsData();
        }
    },

    mounted() {
        this.getEchartBtnsData();
        this.getAllLineEchartsData();

        window.setInterval(() => {
            setTimeout(_ => {
                this.getAllLineEchartsData();
            }, 0)
        }, 20000)
    },
    created() {
        //  获取地区编号
        this.$EventBus.$off("areaClick")
        this.$EventBus.$on('areaClick', (data) => {
            this.isCheckedCode = data;
            console.log(11511, this.isCheckedCode)
        })
    },
    watch: {
        //监听区域编码的变化
        async isCheckedCode(val) {
            if (val) {
                //初始化接入点选项，默认选中第一个
                this.isCheckedIndex=0;

                await this.getEchartBtnsData();
            }
        },
        // 区域编码
        async isChecked(val) {
            if (val) {
                this.isChecked = val;
                this.isTimeChecked="10m"
                await this.getAllLineEchartsData();
                console.log("区域编码", val)
            }
        }
    },
    // 时间
    async isTimeChecked(val) {
        if (val) {
            this.isTimeChecked = val;
            await this.getAllLineEchartsData();
            console.log("time:", val)
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
