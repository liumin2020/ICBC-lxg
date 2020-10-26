<template>
    <div class="switchTitleBox" id="switchTitleBox">
        <!-- 顶部导航菜单 -->
        <div class="echartsHead">
            <ul class="echartsHeadBox">
                <li class="echartsHeadLi" v-if="!grayShow" v-for="(list,index) in switchTitles" :key="list.loc_code" @click="switchTitleClick(list.loc_code,index,list.loc_count)">
    
                    <span class="relativeBox">
                                    {{list.loc_name}}
                                <span v-if="!titleIsShow[list.loc_code]" class="numberRed "  :class="{numberMoreRed:list['loc_count']>=10}">{{list.loc_count}}</span>
                    </span>
                </li>
    
                <li>
    
                    <el-switch class="switch" @change="switchClick" v-model="valModel" :active-color="color" inactive-color="#eee" active-text="" :inactive-text="inactiveText" :inactive-value="inactiveValue" :active-value="activeValue">
                    </el-switch>
    
    
                </li>
            </ul>
            <!-- line -->
            <div class="lineBox" v-if="!grayShow">
                <About class="lineAbsolute" :isCheckedIndex="switchTitleIndex" />
            </div>
            <!-- / line -->
        </div>
        <!--/ 顶部导航菜单 -->
    </div>
</template>

<script type="text/ecmascript-6">
import About from '../views/About.vue'
import { reqWarnigSwitchData, reqGrayAreasData } from '../api'
import { Dialog } from 'vant'
export default {
    props: {
        titleIsShow: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
        About
    },
    data() {
        return {
            DetailShow: false,
            showObj: {},
            switchTitleCode: '',
            switchTitleIndex: 0,
            switchTitles: [],
            warningTotal: '',
            grayShow: false,
            inactiveValue: '0',
            activeValue: '1',
            valModel: '',
            color: 'skyblue',
            inactiveText: '切换灰度',
            activeText: '',
            checked: 'true',

            // switchShow:'',
        }
    },
    watch: {

        'valModel': function(val) {
            if (val) {
                // 把switchCode(开关编码)存储到Vuex
                this.$store.commit('switchCodeEdit', val);
                // localStorage.setItem('switchCode', JSON.stringify(val));
                this.getGrayAreasData();

                // 隐藏详情区域
                this.$store.commit('DetailShowEdit', false);
            }
        },
        '$store.state.WarningNum':function(warningNum){
            //根据报警数量是否大于0 展示‘暂无数据’提示框 并把值存储到vuex
            var noPieView=false;
           if(warningNum-0>0){
               noPieView=false;
           }else{
               noPieView=true;
           }
           // 展示/隐藏‘暂无数据’提示框 并把值存储到vuex
           this.$store.commit('noPieViewEdit', noPieView);
        },
        titleIsShow: (a) => {
            // console.log(a, '3333')
        }
    },
    methods: {
        // 报警大区分类
        async getWarnigSwitchData() {
            try {
                var result = await reqWarnigSwitchData();
                if (result && result.code == '0') {
                    var { data } = result
                    data.map(item => {
                        if (item.area_name == "海外手机灰度") {
                            this.activeValue = item.area_code; //
                        } else {
                            this.inactiveValue = item.area_code; //

                            this.valModel = item.area_code;

                            // 把switchCode存储到Vuex
                            this.$store.commit('switchCodeEdit', this.valModel);
                            // localStorage.setItem('switchCode', JSON.stringify(this.valModel));


                        }
                    });
                    this.getGrayAreasData();


                }
            } catch (e) {
                console.log(e)
            }
        },


        // 报警地区统计,灰度报警地区统计
        async getGrayAreasData() {
            try {
                var result = await reqGrayAreasData(this.valModel);
               
                if (result && result.code == '0') {
                    var { info_list, total } = result.data;
                    this.warningTotal = total;

                    

                    this.switchTitles = info_list;

                 //  把默认第一个选中的报警数量WarningNum存储到vuex
                    if (this.switchTitles[0].loc_count>=0) {
                        this.$store.commit('WarningNumEdit', this.switchTitles[0].loc_count);
                    }

                    //把灰度的报警数量存储起来
                    if(this.valModel=='F-WAPB'){
                         this.$store.commit('WarningNumEdit', total);
                    }
                   
                    
                   

                    // this.$emit('freshPage') //拿到数据在处理方式

                    // 把total存储到Vuex
                    this.$store.commit('warningTotalEdit', this.warningTotal);
                    // 把switchTitles存储到Vuex
                    this.$store.commit('switchTitlesEdit', this.switchTitles);


                    //   获取第一个标题（西三旗，嘉定）的code值 用以设置页面进来饼图的默认值
                    if (this.switchTitles[0].loc_code) {
                        this.switchTitleCode = this.switchTitles[0].loc_code;
                    } else {
                        this.switchTitleCode = '';
                        var arr = this.switchTitles[0].info; //灰度数据列表单独存储（==pieArr）

                        // 把arr存储到Vuex
                        this.$store.commit('arrEdit', arr); //灰度数据列表单独存储（==pieArr）
                    }
                    // 把switchTitleCode存储到Vuex
                    this.$store.commit('switchTitleCodeEdit', this.switchTitleCode);
                }
            } catch (e) {
                console.log(e)
            }
        },
        // 切换灰度开关点击
        switchClick() {
            if (this.valModel == 'F-WAPB') {
                this.grayShow = true; // 二级标题（西三旗，嘉定）显示 隐藏
                this.switchTitleIndex = 0; //把索引重置0，下划线值重置0
            } else {
                this.grayShow = false;
            }

            this.$store.commit('DetailShowEdit', false); // 隐藏详情区域

        },
        // 切换灰度 ___ 二级标题点击
        switchTitleClick(code, indx, WarningNum) {
            this.switchTitleCode = code;

            // 把二级标题switchTitleCode存储到Vuex
            this.$store.commit('switchTitleCodeEdit', this.switchTitleCode);

            this.switchTitleIndex = indx; //下划线索引值存储

            this.DetailShow = false;
            this.$store.commit('DetailShowEdit', this.DetailShow); // 隐藏详情区域 并存储到vuex

            //  把当前点击的WarningNum存储到vuex
            this.$store.commit('WarningNumEdit', WarningNum);


        }
    },

    created() {
        this.getWarnigSwitchData();
        this.getGrayAreasData();
    },
    mounted() {
        // this.getWarnigSwitchData();
        this.getGrayAreasData();
        this.$on('numDisapear', val => {
            this.showObj = val;
        })
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
px2rem(designpx){
     $rem=37.5px;
     return (designpx / $rem) rem;
 }
//  /* switch按钮样式 */
.el-switch__label * 
    line-height: 1;
    font-size: px2rem(20px);
    display: inline-block;

.switch .el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
    font-size px2rem(20px) !important;
    font-weight:200 !important;

}
// /*打开时文字位置设置*/
.switch .el-switch__label--right {
    z-index: 1;
    font-size px2rem(20px)
    font-weight 200
}
// /* 调整打开时文字的显示位子 */
.switch .el-switch__label--right span{
    margin-right px2rem(18px)
    margin-top px2rem(16px)
    font-size px2rem(20px)
    font-weight 200
}
// /*关闭时文字位置设置*/
.switch .el-switch__label--left {
    z-index: 1;
}
// /* 调整关闭时文字的显示位子 */
.switch .el-switch__label--left span{
    margin-left: px2rem(34px)
}
// /*显示文字*/
.switch .el-switch__label.is-active {
    display: block;
}
// /* 调整按钮的宽度 */
.switch.el-switch .el-switch__core,
.el-switch .el-switch__label {
     width: px2rem(135px) !important;
     margin: 0;
}


</style>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 px2rem(designpx){
     $rem=37.5px;
     return (designpx / $rem) rem;
 }
.switchTitleBox
   width 100%
   font-family PingFangSC-Medium
.echartsHead
   width 100%
.echartsHeadBox
   display flex
   justify-content flex-end 
   width 100%
   height px2rem(105px)
   box-sizing border-box
   overflow hidden
   border-bottom px2rem(2px) solid #EFF3FB
.echartsHeadBox>li
   align-items center
   width 33.3%
   height px2rem(105px)
   line-height px2rem(105px)
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
.relativeBox
   position relative
.numberRed
   position absolute
   top -60%
   right px2rem(-40px)
   height px2rem(34px)
   width px2rem(34px)
   line-height px2rem(34px)
   text-align center
   font-size px2rem(24px)
   font-weight 100
   border-radius px2rem(16px)
   background #f77d54
   color #fff
.numberMoreRed
   position absolute
   top -65%
   right px2rem(-40px)
   height px2rem(34px)
   width px2rem(46px)
   line-height px2rem(34px)
   text-align center
   font-size px2rem(24px)
   font-weight 100
   border-radius px2rem(16px)
   background #f77d54
   color #fff

.lineBox
  position relative
  width 100%
.lineAbsolute
  position absolute
  top -px2rem(22px)
  left 0
  z-index 2
.switchBtn
   background pink
   width px2rem(95px)
.switch
   font-size px2rem(12px)

   

</style>
