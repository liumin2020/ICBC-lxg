
<template>
    <div id="pic" @click="goHome" style="top:10%;padding:0px; " v-if="url" class="backIcon">
    
        <img src="../assets/images/moveIcon.png" class="moveImg" v-if="alertCount>0"/>
        <img src="../assets/images/icon_baojing.png" class="moveImg" v-if="alertCount<=0"/>

        <div class="relatBox">
            <p class="absoluteP"  v-if="alertCount>0">报警({{alertCount}})/变更</p>
            <p class="absoluteP1"  v-if="alertCount<=0">报警/变更</p>
        </div>
    
    
    </div>
</template>



<script>
import { reqAlertCountData } from '../api'
export default {
    props: ["city"],
    data() {
        return {
            alertCount:'',
            url: null,
            position: { x: 0, y: 0 },
            cx: '',
            cy: '',
            x: '',
            y: '',
            l: '',
            t: '',
            r: '',
            b: '',
        }
    },
    created() { //根据入参判断跳转使用
        this.url = `/*****`
    },
   async  mounted() {
        //初始化位置
      this.initData();
        // 获取报警数据
     await this.getAlertCountData();
    },
    methods: {
        initData() {
            let moveDiv = document.querySelector("#pic");
            this.w = document.documentElement.clientWidth || document.body.clientWidth;
            this.h = document.documentElement.clientHeight || document.body.clientHeight;
            this.x = moveDiv.offsetWidth;
            this.y = moveDiv.offsetHeight;
            //使用二级事件绑定，解决浏览器警告，可自行查询
            moveDiv.addEventListener('touchstart', this.down, { passive: false })
            moveDiv.addEventListener('touchmove', this.move, { passive: false })
            moveDiv.addEventListener('touchend', this.end, { passive: false })
            //可移动边界判断
            this.l = moveDiv.offsetLeft;
            this.t = moveDiv.offsetTop;
            this.r = this.w - this.l - this.x;
            this.b = this.h - this.t - this.y;
            console.log(this.t, "=========t")
        },
        // 实现移动端拖拽
        down(event) {
            let moveDiv = document.querySelector("#pic");
            this.position.x = moveDiv.offsetLeft;
            this.position.y = moveDiv.offsetTop;
            let touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            //光标起始位置
            this.cx = touch.clientX;
            this.cy = touch.clientY;
        },
        move(event) {
            let moveDiv = document.querySelector("#pic");
            let touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            event.preventDefault(); //阻止body滚动
            //光标偏移量
            this.curx = touch.clientX - this.cx;
            this.cury = touch.clientY - this.cy;
            //DOM 运动边界判断
            if (this.curx > 0) { //向右
                this.curx = Math.abs(this.curx) > this.r ? this.r : this.curx;
            } else { //向左
                this.curx = Math.abs(this.curx) > this.l ? -this.l : this.curx;
            }
            if (this.cury > 0) { //向下
                this.cury = Math.abs(this.cury) > this.b ? this.b : this.cury
            } else { //向上
                this.cury = Math.abs(this.cury) > this.t ? -this.t : this.cury
            }
            //DOM 运动		
            moveDiv.style.transform = `translate(${this.curx}px,${this.cury}px)`;
        },
        end() {
            let moveDiv = document.querySelector("#pic");
            //光标松开,记录盒子的位移。
            let aa = parseInt(moveDiv.style.transform.match(/(-?\d+\.?\d+)/g)[0]); //获取X偏移量
            let bb = parseInt(moveDiv.style.transform.match(/(-?\d+\.?\d+)/g)[1]); //获取Y偏移量
            let ax = parseInt(this.position.x) + aa; //DOMX轴偏移量
            let by = parseInt(this.position.y) + bb; //DOMY轴偏移量
            // 处理吸边
            //ax = ax>this.w/2?this.w-this.x:0;
            //end 时，重绘DOM位置，并清空transform的值。
            moveDiv.style.left = ax + 'px';
            moveDiv.style.top = by + 'px';
            moveDiv.style.transform = '';
            //可移动边界判断
            this.l = ax;
            this.t = by;
            this.r = this.w - this.l - this.x;
            this.b = this.h - this.t - this.y;
        },
        goHome() {
             this.$router.push('warning')
            //点击Icon要跳转的路径，
            //doSomething
        },
        // 报警数量
        async getAlertCountData() {
            try {
                var result = await reqAlertCountData();

                if (result && result.code == '0') {
                    this.alertCount = result.data.count;

                    // 报警数量存储到vueX
                    this.$store.commit('alertCountEdit',this.alertCount);
                }
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
 px2rem(designpx){
   $rem=37.5px
   return (designpx / $rem) rem;
 }
.backIcon 
    display: block;
    position: fixed;
    z-index: 999;
    touch-action: none;
.moveImg
    width px2rem(128px)
.absoluteP
    position absolute 
    top 67%
    left 1%
    text-align center
    color #fff
    font-size px2rem(16px)

.absoluteP1
    position absolute 
    top 67%
    left 12%
    text-align center
    color #fff
    font-size px2rem(16px)

</style>
