<template>
    <div class="myEchart">
        <h3 class="myEchartTitle">{{title}}</h3>
        <div ref="canvasLine" class="canvasLine"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import echarts from 'echarts'
export default {
    props: {
        linedata: {
            type: Object,
            default: {}
        },
        logId: {
            type: String,
            default: 'id1'
        }
    },
    data() {
        return {
            title: ''
        }
    },
    methods: {
        getEchartData(x, y, maxVal) {
            // var canvasLine = document.getElementById("canvasLine");
            var myEchart = echarts.init(this.$refs.canvasLine);
            myEchart.clear()
            var option = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#6797ff', //通过设置rgba调节背景颜色与透明度
                    color: '#fff',
                    borderWidth: '1',
                    fontSize: '10',
                    fontWeight: '200',
                    borderColor: 'transparent',
                    textStyle: {
                        color: 'white',
                        fontSize: '10',
                        fontWeight: '200'
                    },
                    formatter(params) {
                        var seriesName = params[0].seriesName
                        var name = params[0].name;
                        var val = params[0].value;
                        var str = name + ":" + "<br/>" + seriesName + ":" + val;
                        // var str = name +':'+ val
                        return str

                    },
                    // formatter: '{a0} <br/>日期：{b} <br />价格： {c0}' + "%",
                    // axisPointer: {
                    //    type: 'shadow'
                    // },
                    // 提示框位置（超出屏幕时不能被隐藏）
                    position: function(point, params, dom, rect, size) {
                        var x = 0; // x坐标位置
                        var y = 0; // y坐标位置

                        // 当前鼠标位置
                        var pointX = point[0];
                        var pointY = point[1];

                        // 外层div大小
                        // var viewWidth = size.viewSize[0];
                        // var viewHeight = size.viewSize[1];

                        // 提示框大小
                        var boxWidth = size.contentSize[0];
                        var boxHeight = size.contentSize[1];

                        // boxWidth > pointX 说明鼠标左边放不下提示框
                        if (boxWidth > pointX) {
                            x = 5;
                        } else { // 左边放的下
                            x = pointX - boxWidth;
                        }

                        // boxHeight > pointY 说明鼠标上边放不下提示框
                        if (boxHeight > pointY) {
                            y = 5;
                        } else { // 上边放得下
                            y = pointY - boxHeight;
                        }


                        return [x, y];
                    }
                },
                grid: {
                    // 间距是 根据x、y轴计算的；假如都是0，x、y轴的label汉字就隐藏掉了。
                    left: '0', // 默认10%，给24就挺合适的。
                    top: '5%', // 默认60
                    right: '1%', // 默认10%
                    bottom: '5%', // 默认60

                    // width: '100%', // grid 组件的宽度。默认自适应。
                    // height: '100%',

                    containLabel: true, // grid 区域是否包含坐标轴的刻度标签。(如果true的时候，上下左右可以为0了)

                    // show:true, // 是否显示直角坐标系网格。是否显示grid，grid:show后，下面的一些参数生效。
                    // backgroundColor:'#ccac62',
                    // borderColor:"#000",

                    tooltip: {
                        formatter(params) {
                            // return params.name + ":" + params.data.value + "/" + params.data.date;
                            // var seriesName = params[0].seriesName
                            var name = params[0].name;
                            var val = params[0].value;
                            var str = name + ':' + '<br/>' + val;
                            return str
                        }
                    }, // 本坐标系特定的 tooltip 设定。(可以有多个grid)
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        show: false //不显示坐标轴刻度线
                    },
                    axisLine: {
                        lineStyle: {
                            color: "#C3D3E0",
                            fontSize: 11,
                            fontWeight: 200,
                            fontFamily: 'PingFangSC-Medium;'
                        }
                    },
                    nameTextStyle: {
                        fontSize: 11,

                    },
                    axisLabel: {
                        formatter: function(value, idx) {
                            var date = new Date(value);
                            // console.log('value', value, idx)
                            var mon = date.getMonth() + 1;
                            var day = date.getDate();
                            var hourse = date.getHours();
                            var minu = date.getMinutes();
                            var secon = date.getSeconds();

                            hourse = hourse < 10 ? '0' + hourse : hourse;
                            minu = minu < 10 ? "0" + minu : minu;
                            secon = secon < 10 ? "0" + secon : secon;

                            var str = hourse + ":" + minu + ":" + secon;
                            // return (idx === 0 || mon=='1')? value : [hourse,minu,secon].join(':');
                            return str;
                        },
                        textStyle: {
                            fontSize: 11
                        },
                        //  interval:14,
                    },

                    data: x //x
                },
                yAxis: {
                    // position:'right',
                    type: 'value',
                    nameLocation: 'start',
                    axisLine: {
                        show: false, //不显示坐标轴线
                        color: '#C3D3E0',
                        lineStyle: {
                            color: "#C3D3E0",
                            fontFamily: 'PingFangSC-Medium;'
                        }
                    },
                    axisTick: {
                        show: false //不显示坐标轴刻度线
                    },
                    axisLabel: {
                        formatter: '{value} ',
                        textStyle: {
                            fontSize: 10
                        }
                    },
                    nameTextStyle: {
                        align: 'center',

                    },
                    scale: true,
                    max: maxVal, //设置y轴值最大值
                    min: 0,
                    splitNumber: 3, //设置y轴值间隔
                    boundaryGap: [0.2, 0.2]
                },
                series: [{
                    name: this.title,
                    symbol: "none", //去掉折线上面的小圆点
                    lineStyle: {
                        normal: {
                            color: '#5D8EF4', //设置折线图的颜色
                            width: 2 //设置折线图的宽度
                        }
                    },
                    markArea: {},
                    data: y, //y
                    type: 'line',
                    smooth: true,

                }],
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'inside',
                    xAxisIndex: [0],
                    filterMode: 'none',
                    start: 0,
                    end: 100
                }]
            }
            myEchart.setOption(option)
        },
        getPic() {
            var keys = Object.keys(this.linedata);
            var result = this.linedata[keys];
            this.title = this.linedata[keys].title
            var maxValue = Math.max(...result.y);
            this.getEchartData(result.x, result.y, maxValue);
        }
    },
    mounted() {
        this.getPic();
        // console.log("logId:",this.logId)
    },
    watch: {
        linedata() {
            this.getPic();
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
px2rem(designpx){
     $rem=37.5px;
 return (designpx / $rem) rem;
}
.myEchart
  width 100%
  height px2rem(300px)
//   background pink
.myEchartTitle
  width 100%
  height px2rem(58px)
.myEchartTitle
  margin 0
  padding 0
  font-size px2rem(28px)
  font-family PingFangSC-Regular
  color #4375DF
  letter-spacing 0
.canvasLine
  width 100%
  height 100%
//   background yellow
</style>
