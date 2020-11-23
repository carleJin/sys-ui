<template>
    <div class="settings">
        <transition name="mask" mode="out-in" appear>
            <div class="mask"
                v-show="settingsControl"
                @click.self="handleMask">
            </div>  
        </transition>
        <div class="content"
            :class="{'is_show': settingsControl}"
            :style="{width: width}">
            <div class="head">
                <h2 class="head_title" 
                    v-if="title">{{title}}</h2>
                <slot name="top"></slot>
            </div>
            <div class="option"
                v-if="showClose"
                v-dragpin:right >
                <el-button 
                    type="primary" 
                    :icon="settingsControl ? 'el-icon-close' : 'el-icon-setting'"
                    @click="handleClose"></el-button>
            </div>
            <div class="body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            flag: false
        }
    },
    props: {
        // 标题
        title: String,
        // 点击遮罩层关闭
        maskClose: {
            type: Boolean,
            default: true
        },
        // 是否显示关闭按钮
        showClose: {
            type: Boolean,
            default: true
        },
        //宽度
        width: {
            type: String,
            default() {
                return '300px'
            }
        }
    },
    computed: {
       ...mapGetters(['settingsControl']) 
    },
    methods: {
        //打开关闭
        handleToogle() {
            if(this.flag) return;
            this.flag = true;
            
            this.$store.dispatch('changeSettings', {key: 'settingsControl', value: !this.settingsControl})
            .then(() => {
                this.flag = false;
            })
        },
        //点击遮罩层
        handleMask() {
            if(this.maskClose) this.handleToogle();
        },
        //关闭按钮
        handleClose() {
            this.handleToogle();
        },
    },
}
</script>

<style lang="less" scoped>
.settings{
    color: #303133;
    width: 0;
    height: 0;
    position: fixed;
    z-index: 2000;
    .mask{
        overflow: auto;
        text-align: center;
        position: fixed;
        width: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .5);
        z-index: 1;
    }
    .content{
        display: inline-block;
        box-sizing: border-box;
        background-color: #fff;
        text-align: left;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        width: 0px;
        z-index: 2;
        transition: transform .3s;
        transform: translateX(100%);
        &.is_show{
            transform: translateX(0%);
        }
        .head{
            position: relative;
            background-color: #fff;
            border-radius: 4px;
            display: flex;
            .head_title{
                display: inline-block;
                font-size: 16px;
                padding: 12px;
            }
        }
        .option{
            display: inline-block;
            width: 54px;
            height: 40px;
            overflow: hidden;
            position: absolute;
            top: 90%;
            left: 0px;
            transform: translateX(-100%);
            z-index: 1;
        }
        .body{
            box-sizing: border-box;
            padding: 12px;
            z-index: 2;
        }
    }
}

.mask-enter-active,.mask-leave-active{
    transition: opacity .3s;
    opacity: 1;
}
.mask-enter,.mask-leave-to{
    opacity: 0;
}
</style>