<template>
    <div class="pieEchartContainer" id="pieEchartContainer">
        <div id="pic" class="pic" ></div>
        <div class="colorSquare" >
            <ul>
                <li v-for="item in pieArr" :key="item.region_code"><em :style="{backgroundImage:item.color}"></em><span>{{item.region_name}}({{item.count}})</span></li>
            </ul>
        </div>
        <!-- 饼图详情信息 -->
        <template>
                            <CollapseInfoWarning class="collapseBox" v-show="this.$store.state.DetailShow" />
</template>
    </div>
</template>

<script type="text/ecmascript-6">
// @ is an alias to /src 
import echarts from 'echarts'

import CollapseInfoWarning from '@/components/CollapseInfoWarning.vue'
import { setTimeout } from 'timers';

export default {
    data() {
        return {
            dowShow: false,
            pieArr: [],
            fourthCode: '',
            switchTitleCode: '',
            switchTitles: [],
            isFreshFlag: false,
            bgColor: [{ name: '大行区', color: 'linear-gradient(to right bottom, #bbf6cc,#4dd2b8)', colorBegin: '#bbf6cc', colorEnd: '#4dd2b8' },
                { name: '美洲区', color: 'linear-gradient(to right bottom, #ffedc4,#fdbe69)', colorBegin: '#ffedc4', colorEnd: '#fdbe69' },
                { name: '欧洲区', color: 'linear-gradient(to right bottom, #8ef0f2,#5685e7)', colorBegin: '#8ef0f2', colorEnd: '#5685e7' },
                { name: '亚太区', color: 'linear-gradient(to right bottom, #ecb7b5,#f27d7a)', colorBegin: '#ecb7b5', colorEnd: '#f27d7a' }
            ],
            option: {

                labelLine: {
                    normal: {
                        length: 5, // 改变标示线的长度
                        lineStyle: {
                            color: "green" // 改变标示线的颜色
                        }
                    },
                },
                label: {
                    normal: {
                        textStyle: {
                            color: 'green' // 改变标示文字的颜色
                        }
                    }
                },
                //
                angleAxis: {
                    max: 100,
                    startAngle: 10,
                    show: false,
                    handle: { size: 50, show: true },
                    splitLine: {
                        show: false
                    }
                },
                radiusAxis: {
                    type: 'category',
                    show: false,
                    splitLine: {
                        show: false
                    },



                },
                polar: {
                    tooltip: { show: true },
                    radius: ['50%', '100%'],

                },
                tooltip: {
                    show: false,
                    trigger: 'item',
                    color: '#fff',
                    borderWidth: '1',
                    fontSize: '10',
                    fontWeight: '200',
                    // borderColor: 'transparent',
                    textStyle: {
                        fontSize: '10',
                        fontWeight: '200'
                    },
                    formatter: '{b}: {c} ({d}%)',
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

                series: [{
                    // name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '80%'],
                    center: ["50%", "50%"],
                    roundCap: true,
                    avoidLabelOverlap: true,
                    hoverAnimation: false,
                    label: {
                        show: false,
                        // color: 'red',
                        position: 'outside',
                        // color: 'red',
                        color: [],
                        formatter: function(val) {
                            var fontColor = val.data.itemStyle.color.colorStops[1].color;

                            var name = val.name;
                            var per = val.percent;
                            per = per.toFixed(1);
                            var str = `${name}:${per}%`;
                            return str
                        },
                        padding: [0, -3, 10, 10],


                        rich: {
                            a: {
                                lineHeight: 20,
                                align: 'left',
                                color: '#999'
                            },
                            hr: {
                                width: '200%',
                                borderWidth: 1,
                                height: 1,

                            }
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '12',
                            fontWeight: 200,

                        },

                    },
                    labelLine: {
                        show: true,
                        length: 10,
                        length2: 10
                    },

                    data: [{
                            "name": "大行区",
                            "value": 19,
                            "itemStyle": {
                                "label": {
                                    "normal": {
                                        "testStyle": {
                                            "fontSize": "20px"
                                        }
                                    },
                                },
                                "color": {
                                    "x": 0,
                                    "y": 0.2113248654051872,
                                    "x2": 1,
                                    "y2": 0.7886751345948129,
                                    "type": "linear",
                                    "global": false,
                                    "colorStops": [{
                                            "offset": 0,
                                            "color": "#bbf6cc"
                                        },
                                        {
                                            "offset": 1,
                                            "color": "#4dd2b8"
                                        }
                                    ]
                                }
                            },
                            "_startArc": 0,
                            "_endArc": 1.0471975511965976,
                            "_color": "#1576d2",
                            "_percent": 0.16666666666666666
                        },
                        {
                            "name": "美洲区",
                            "value": 11,
                            "itemStyle": {
                                "color": {
                                    "x": 1,
                                    "y": 0.8836634939894799,
                                    "x2": 0,
                                    "y2": 0.1163365060105202,
                                    "type": "linear",
                                    "global": false,
                                    "colorStops": [{
                                        "offset": 0,
                                        "color": "#ffedc4"
                                    }, {
                                        "offset": 1,
                                        "color": "#fdbe69"
                                    }]

                                    // ["#8ef0f2","#5685e7"]
                                }
                            },
                            "_startArc": 3.665191429188092,
                            "_endArc": 3.9269908169872414,
                            "_color": "#26c1f2",
                            "_percent": 0.041666666666666664
                        },
                        {
                            "name": "欧洲区",
                            "value": 9,
                            "itemStyle": {
                                "color": {
                                    "x": 0.43417375120630197,
                                    "y": 1,
                                    "x2": 0.565826248793698,
                                    "y2": 0,
                                    "type": "linear",
                                    "global": false,
                                    "colorStops": [{
                                        "offset": 0,
                                        "color": "#8ef0f2"
                                    }, {
                                        "offset": 1,
                                        "color": "#5685e7"
                                    }]

                                    // ["#ffd9d7","#fdb1b3"]
                                }
                            },
                            "_startArc": 3.9269908169872414,
                            "_endArc": 5.759586531581288,
                            "_color": "#a166ff",
                            "_percent": 0.2916666666666667
                        }, {
                            "name": "亚太区",
                            "value": 17,
                            "itemStyle": {
                                "color": {
                                    "x": 0.9999999999999998,
                                    "y": 0,
                                    "x2": 1.6653345369377348e-16,
                                    "y2": 1,
                                    "type": "linear",
                                    "global": false,
                                    "colorStops": [{
                                            "offset": 0,
                                            "color": "#ffd9d7"
                                        },
                                        // {
                                        //     注意：该亮色部分仅为说明渐变方向实际应用中请勿如此。
                                        //     offset: 0.5,
                                        //     color: '#87ceeb',
                                        // },
                                        {
                                            "offset": 1,
                                            "color": "#fdb1b3"
                                        }
                                    ]
                                    //    ["#ffd9d7","#fdb1b3"]

                                    // ["#ffedc4","#fdbe69"]
                                }
                            },
                            "_startArc": 1.0471975511965976,
                            "_endArc": 3.665191429188092,
                            "_color": "#d14a82",
                            "_percent": 0.4166666666666667
                        }
                    ],
                }]
                //
            }
        }
    },
    components: {
        CollapseInfoWarning,
    },
    async created() {
        await this.switchTitleRend();
        await this.getPic();

    },
    watch: {
        '$store.state.switchCode': function(val) {
            this.switchTitleRend();
            this.getPic();
        },
        '$store.state.switchCode': function(val) {
            this.switchTitleRend();
            this.getPic();
        },
        '$store.state.switchTitleCode': function(val) {
            this.switchTitleRend();
            this.getPic();
        },

    },
    methods: {
        // 二级标题（西三旗，嘉定）&& 饼图色块列表渲染
        switchTitleRend() {
            this.switchTitleCode = this.$store.state.switchTitleCode;
            if (this.switchTitleCode != '') {
                this.switchTitles = this.$store.state.switchTitles;
                this.switchTitles.map(itm => {
                    if (itm.loc_code == this.switchTitleCode) {
                        this.pieArr = itm.info;
                    }
                });
            } else {
                this.pieArr = this.$store.state.arr;

            }


            // 把背景色添加到饼图数据  
            this.pieArr = this.pieArr.map((ls, index) => {
                if (ls.region_name == this.bgColor[index].name) {
                    var indexId = index;
                    ls['color'] = this.bgColor[indexId].color;
                    ls['colorBegin'] = this.bgColor[indexId].colorBegin;
                    ls['colorEnd'] = this.bgColor[indexId].colorEnd;

                }
                return ls;
            });

            // 把四大区titles（饼图数据pieArr）存储到Vuex
            this.$store.commit('pieArrEdit', this.pieArr);

            // if (this.pieArr && this.pieArr.length > 0) {
            //     this.fourthCode = this.pieArr[0].region_code;

            //     把四大区编码存储到Vuex
            //     this.$store.commit('fourthCodeEdit', this.fourthCode);

            // }

            this.getPic();


        },
        getPic() {
            var _self = this;
            var myEchart = echarts.init(document.getElementById('pic'));
            myEchart.clear() //清空缓存

            // 更改饼图数据
            _self.option.series[0].data = []; //清空原旧数据
            _self.pieArr.map((lis, index) => {
                var name = lis.region_name;
                var val = lis.count;
                var colorStart = lis.colorBegin;
                var colorStop = lis.colorEnd;

                _self.option.series[0].data.push({
                    name: name,
                    value: val,
                    itemStyle: {
                        label: {
                            normal: {
                                textStyle: {
                                    color: colorStop,
                                    fontSize: 20
                                }
                            },
                        },

                        color: {
                            x: 0,
                            y: 0.2113248654051872,
                            x2: 1,
                            y2: 0.7886751345948129,
                            type: "linear",
                            global: false,
                            colorStops: [{
                                    offset: 0,
                                    color: colorStart
                                },
                                {
                                    offset: 1,
                                    color: colorStop
                                }
                            ]
                        }
                    },
                    _startArc: 0,
                    _endArc: 1.0471975511965976,
                    _color: "#1576d2",
                    _percent: 0.16666666666666666
                })

            });
            // -----更改饼图数据


            myEchart.on('click', (param) => {

                // 显示详情组件 把DetailShow控制详情展示隐藏的标示存储到vuex
                this.$store.commit('DetailShowEdit', true);

                // 收起展开状态全部默认设置为false
                this.$store.commit('showAllEdit', false);

                var obj = {};
                var clickCode = this.switchTitleCode;
                obj[clickCode] = this.$store.state.DetailShow;
                this.$emit('numDisapear', obj);

                var name = param.data.name;
                _self.pieArr.map(item => {

                    if (item['region_name'] == name) {
                        var code = item.region_code; //获取当前点击的四大区code值
                        // 把四大区编码存储到Vuex
                        _self.fourthCode = code;
                        _self.$store.commit('fourthCodeEdit', _self.fourthCode);

                    }
                })

            });

            myEchart.setOption(_self.option);

        },



    },
    async mounted() {
        await this.switchTitleRend();
        await this.getPic();
    },
    created() {
        this.getPic()
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 px2rem(designpx){
   $rem=37.5px
   return (designpx / $rem) rem;
 }
.pieEchartContainer
  width 100%
  box-sizing border-box
  border-radius px2rem(20px)
  background #fff
  font-family PingFangSC-Medium
.pic
  width 100%
  height px2rem(360px)
  background #fff

.colorSquare
  width 100%
  padding px2rem(10px) 0 px2rem(10px)
//   background pink
.colorSquare>ul
  display flex
  padding 0 5%
  justify-content space-between
.colorSquare>ul>li
  width 100%
  text-align center
.colorSquare>ul>li>em
  display inline-block
  margin-right px2rem(10px)
  width px2rem(24px)
  height px2rem(24px)
  vertical-align middle
  border-radius px2rem(6px)
.colorSquare>ul>li>span
   font-size px2rem(24px)
   color #666
   font-weight 200

</style>

