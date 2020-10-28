import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alertCount:0,//报警数量
    topTitleCode:'',

    switchCode:'', // 开关编码
    warningTotal:'',
    switchTitleCode:'', // 二级标题编码
    switchTitles:[],
    fourthCode:'', // 四大区编码存
    arr:[],
    pieArr:[],
    DetailShow:'',//控制详情展示隐藏的标识
    showAll:false, //给原数据源collapseOpenItemArr添加 收起展开状态
    distanceX:0,  //x轴滚动的距离
    WarningNum:0, //当前点击的报警信息数量
    noPieView:false,// 展示/隐藏‘暂无饼图数据’提示框
    isMenuClickFlag:false,//记录首页菜单点击状态 用以区别折线图是否动态展示
  },
  mutations: {
    //报警数量
    alertCountEdit(state,playLoad){
      state.alertCount=playLoad;
   },
    topCodeEdit(state,playLoad){
       state.topTitleCode=playLoad;
    },
      //  开关编码
    switchCodeEdit(state,playLoad){
      state.switchCode=playLoad;
    },
    warningTotalEdit(state,playLoad){
      state.warningTotal=playLoad;
    },
    // 二级标题编码
    switchTitleCodeEdit(state,playLoad){
      state.switchTitleCode=playLoad;
    },
    switchTitlesEdit(state,playLoad){
      state.switchTitles=playLoad;

    },
    arrEdit(state,playLoad){
      state.arr=playLoad;
    },
    // 把四大区编码存储到Vuex
    fourthCodeEdit(state,playLoad){
      state.fourthCode=playLoad;
    },
    //
    pieArrEdit(state,playLoad){
      state.pieArr=playLoad;

    },
    //控制详情展示隐藏
    DetailShowEdit(state,playLoad){
      state.DetailShow=playLoad;

    },
    //给原数据源collapseOpenItemArr添加 收起展开状态
    showAllEdit(state,playLoad){
      state.showAll=playLoad;

    },
    //x轴滚动的距离
    distanceXEdit(state,playLoad){
      state.distanceX=playLoad;

    },
    //当前点击的报警信息数量
    WarningNumEdit(state,playLoad){
      state.WarningNum=playLoad;

    }, 
     // 展示/隐藏‘暂无饼图数据’提示框，
     noPieViewEdit(state,playLoad){
      state.noPieView=playLoad;

    },
    //记录首页菜单点击状态 用以区别折线图是否动态展示
    isMenuClickFlagEdit(state,playLoad){
      state.isMenuClickFlag=playLoad;

    },
    
    
    
   
  },
  actions: {
  },
  modules: {
  }
})
