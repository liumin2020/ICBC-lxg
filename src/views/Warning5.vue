<template>
    <div class="warningContainer" id="warningContainer">
        <!-- 头部图片 -->
        <div class="headImg">
            <div class="headH2">
                <h2>报警信息(17)</h2>
            </div>
        </div>
        <!-- /头部图片 -->
    
        <!-- 头部卡片-->
        <div class="headCardContainer">
            <div class="headCardBg">
                <PieEchart/>
                     <CollapseInfo 
                    class="collapseBox" 
                    :collapseOpenItemArr="CollapseInfoAll" 
                    />
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
                <CollapseInfo  :collapseOpenItemArr="CollapseInfoAllFoot"  />
            </div>
        </div>
        <!--/ 底部卡片 -->
    </div>
</template>

<script type="text/ecmascript-6">
// @ is an alias to /src 
import PieEchart from '@/components/PieEchart.vue'
import CollapseInfo from '@/components/CollapseInfo.vue'
import { reqUpdataData} from '../api'

export default {
    name: 'Warning',
    components: {
        PieEchart,
        CollapseInfo
    },
    created(){
        this.getUpdataData();
    },
    data() {
        return {
            total:0,
            CollapseInfoAllFoot: [{
                    collapseOpenItemArr: [
                        { title: '首次报警时间:', desc: '2020-08-05  23:54:51；' },
                        { title: '主机ip:', desc: '76.109.135.154；' },
                        { title: '事件单号:', desc: 'IDCCS200805920；' },
                        { title: '事件名称:', desc: '服务提供方限流异常；' },
                        { title: '事件摘要:', desc: '应用分布服务框架(F-DSF)，各应用直接上报，交易/资源代码：服务提供方限流异常，服务提供方限流拒绝，建议解决方 法：请联系相关应用解决，错误产生原因服务方限流拒绝，重点数据服务：否，业 务目标：F-PRSA。' },
                    ],
                    name: '当天(17)'
                },
                {
                    collapseOpenItemArr: [
                        { title: '首次报警时间:', desc: '2020-08-05  23:54:51；' },
                        { title: '主机ip:', desc: '76.109.135.154；' },
                        { title: '事件单号:', desc: 'IDCCS200805920；' },
                        { title: '事件名称:', desc: '服务提供方限流异常；' },
                        { title: '事件摘要:', desc: '应用分布服务框架(F-DSF)，各应用直接上报，交易/资源代码：服务提供方限流异常，服务提供方限流拒绝，建议解决方 法：请联系相关应用解决，错误产生原因服务方限流拒绝，重点数据服务：否，业 务目标：F-PRSA。' },
                    ],
                    name: '近3天(11)'
                },
                {
                    collapseOpenItemArr: [
                        { title: '首次报警时间:', desc: '2020-08-05  23:54:51；' },
                        { title: '主机ip:', desc: '76.109.135.154；' },
                        { title: '事件单号:', desc: 'IDCCS200805920；' },
                        { title: '事件名称:', desc: '服务提供方限流异常；' },
                        { title: '事件摘要:', desc: '应用分布服务框架(F-DSF)，各应用直接上报，交易/资源代码：服务提供方限流异常，服务提供方限流拒绝，建议解决方 法：请联系相关应用解决，错误产生原因服务方限流拒绝，重点数据服务：否，业 务目标：F-PRSA。' },
                    ],
                    name: '近7天(9)'
                }
            ],
            CollapseInfoAllFoot:[],
            CollapseInfoAll: [{
                    collapseOpenItemArr: [
                        { title: '首次报警时间:', desc: '2020-08-05  23:54:51；' },
                        { title: '主机ip:', desc: '76.109.135.154；' },
                        { title: '事件单号:', desc: 'IDCCS200805920；' },
                        { title: '事件名称:', desc: '服务提供方限流异常；' },
                        { title: '事件摘要:', desc: '应用分布服务框架(F-DSF)，各应用直接上报，交易/资源代码：服务提供方限流异常，服务提供方限流拒绝，建议解决方 法：请联系相关应用解决，错误产生原因服务方限流拒绝，重点数据服务：否，业 务目标：F-PRSA。' },
                    ],
                    name: '大行(19)'
                },
                {
                    collapseOpenItemArr: [
                        { title: '首次报警时间:', desc: '2020-08-05  23:54:51；' },
                        { title: '主机ip:', desc: '76.109.135.154；' },
                        { title: '事件单号:', desc: 'IDCCS200805920；' },
                        { title: '事件名称:', desc: '服务提供方限流异常；' },
                        { title: '事件摘要:', desc: '应用分布服务框架(F-DSF)，各应用直接上报，交易/资源代码：服务提供方限流异常，服务提供方限流拒绝，建议解决方 法：请联系相关应用解决，错误产生原因服务方限流拒绝，重点数据服务：否，业 务目标：F-PRSA。' },
                    ],
                    name: '亚太(17)  '
                },
                {
                    collapseOpenItemArr: [
                        { title: '首次报警时间:', desc: '2020-08-05  23:54:51；' },
                        { title: '主机ip:', desc: '76.109.135.154；' },
                        { title: '事件单号:', desc: 'IDCCS200805920；' },
                        { title: '事件名称:', desc: '服务提供方限流异常；' },
                        { title: '事件摘要:', desc: '应用分布服务框架(F-DSF)，各应用直接上报，交易/资源代码：服务提供方限流异常，服务提供方限流拒绝，建议解决方 法：请联系相关应用解决，错误产生原因服务方限流拒绝，重点数据服务：否，业 务目标：F-PRSA。' },
                    ],
                    name: '美洲(11)'
                },
                {
                    collapseOpenItemArr: [
                        { title: '首次报警时间:', desc: '2020-08-05  23:54:51；' },
                        { title: '主机ip:', desc: '76.109.135.154；' },
                        { title: '事件单号:', desc: 'IDCCS200805920；' },
                        { title: '事件名称:', desc: '服务提供方限流异常；' },
                        { title: '事件摘要:', desc: '应用分布服务框架(F-DSF)，各应用直接上报，交易/资源代码：服务提供方限流异常，服务提供方限流拒绝，建议解决方 法：请联系相关应用解决，错误产生原因服务方限流拒绝，重点数据服务：否，业 务目标：F-PRSA。' },
                    ],
                    name: '欧非(9)'
                }
            ]
        }
    },
    methods:{
        getcollapseParentData(data) {
            console.log('kkkkk',data[0])

        },
        async getUpdataData(){
          try{
              var result=await reqUpdataData();
              if(result && result.code=='0'){
                  var {info_list,total}=result.data
                  this.total=total;
                  this.CollapseInfoAllFoot=info_list;
                  console.log("?",this.CollapseInfoAllFoot)
              }
          }catch(e){
              console.log(e)
          }
        }
    },
   

}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 px2rem(designpx){
   $rem=37.5px
   return (designpx / $rem) rem;
 }
.warningContainer
  box-sizing border-box
  background #eff3fb
.headImg
  width 100%
  height px2rem(210px);
  background pink url('../assets/images/bg_warning.png') no-repeat center
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
.footImg
  width 100%
  height px2rem(220px)
  background url('../assets/images/bg_change.png') no-repeat center
  background-size cover
</style>

