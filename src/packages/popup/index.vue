<template>
    <transition name="pop" mode="out-in" appear>
        <div class="popup" 
            :class="{
                'is_fixed': fixed
            }"
            v-show="visible"
            role="popup"
            @click.self="handleMask">
            <transition name="popcontent" mode="out-in" appear>
                <div class="content"
                    :class="{
                        'is_auto': auto
                    }"
                    v-if="visible">
                    <div class="head">
                        <h2 class="pop_title" 
                            v-if="title">{{title}}</h2>
                        <slot name="top"></slot>
                        <div class="pop_close el-icon-close"
                            v-if="showClose" 
                            @click="handleClose"></div>
                    </div>
                    <div class="body">
                        <slot />
                    </div>
                    <slot name="bottom">
                        <div class="foot" v-if="showConfirmButton || showCancelButton" >
                            <el-button 
                                v-if="showConfirmButton" 
                                type="primary" 
                                size="medium"
                                :loading="confirmLoading"
                                @click="handleConfirm">{{confirmButtonText || '确定'}}</el-button>
                            <el-button 
                                v-if="showCancelButton" 
                                type="primary" 
                                size="medium" 
                                :loading="cancelLoading"
                                plain 
                                @click="handleCancel">{{cancelButtonText || '取消'}}</el-button>
                        </div>
                    </slot>
                </div>
            </transition>
        </div>  
    </transition>
</template>

<script>

export default {
    name: 'Popup',
    props: {
        visible:{
            type: Boolean,
            default: false
        },
        // 标题
        title: String,
        // 启用fixed定位
        fixed: {
            type: Boolean,
            default: true
        },
        // 是否行内块元素并居中
        auto: {
            type: Boolean,
            default: true
        },
        // 是否移为body直接子元素
        appendToBody: {
            type: Boolean,
            default: false
        },
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
        // 确定
        showConfirmButton: {
            type: Boolean,
            default: false
        },
        confirmButtonText: String,
        onConfirm: Function,
        confirmLoading: {
            type: Boolean,
            default: false
        },
        // 取消
        showCancelButton: {
            type: Boolean,
            default: false
        },
        cancelButtonText: String,
        onCancel: Function,
        cancelLoading: {
            type: Boolean,
            default: false
        },
    },
    watch:{
        visible:function(val){
            if(this.fixed) {
                if(val){
                    this.update()
                    this.bodyOverflow = document.body.style.overflow;
                    document.body.style.overflow = 'hidden';
                    
                    if(this.appendToBody && !this.isAppendToBody) {
                        this.isAppendToBody = true;
                        document.body.appendChild(this.$el);
                    }
                }else{
                    document.body.style.overflow = this.bodyOverflow;
                }
            }
        },
    },
    data() {
        return {
            isAppendToBody: false,
        }
    },
    beforeDestroy() {
        const { $el } = this;
        if($el && $el.parentNode) {
            $el.parentNode.removeChild($el)
        }
    },
    methods: {
        //关闭
        closePop() {
            this.$emit('update:visible', false)
        },
        //点击右上角关闭
        handleClose() {
            if(typeof this.onCancel=== 'function') {
                this.onCancel(this.closePop)
            } else {
                this.closePop()
            }
        },
        //点击遮罩层
        handleMask() {
            if(!this.maskClose) return;

            this.handleClose()
        },
        //确定
        handleConfirm() {
            if(typeof this.onConfirm === 'function') {
                this.onConfirm()
            } else {
                this.closePop()
            }
        },
        //取消
        handleCancel() {
            this.handleClose()
        },
        //更新
        update() {
            let popList = document.querySelectorAll('div[role="popup"]');
            let zIndexMap = [];
            for(let i = 0; i < popList.length; i++) {
                zIndexMap.push(getComputedStyle(popList[i], null).zIndex)
            }
            let max = zIndexMap.length ? Math.max(...zIndexMap) : 1000;
            let maxNum = zIndexMap.filter(v => v == max);
            if(getComputedStyle(this.$el, null).zIndex != max || maxNum.length > 1) {
                this.$el.style.zIndex = max + 1;
            }
        },
    }
}
</script>

<style scoped lang="less">
@import '~@/assets/styles/theme-color.less';

.popup{
    overflow: auto;
    text-align: center;
    &.is_fixed{
        position: fixed;
        width: 100%;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .5);
        z-index: 1000;
    }
    .content{
        display: block;
        box-sizing: border-box;
        margin: 12px;
        background-color: #fff;
        text-align: left;
        &.is_auto{
            display: inline-block;
            margin: 12px auto;
            border-radius: 4px;
        }
        .head{
            position: relative;
            background-color: #fff;
            border-radius: 4px;
            display: flex;
            .pop_title{
                display: inline-block;
                font-size: 20px;
                padding: 17px 12px;
            }
            .pop_close{
                display: inline-block;
                font-size: 20px;
                padding: 6px;
                position: absolute;
                top: 2px;
                right: 2px;
                cursor: pointer;
                border-radius: 100%;
                transition: .1s;
                z-index: 1;
                &:hover{
                    color: @popup-close-hover_color;
                    background-color: @popup-close-hover_bgcolor;
                }
            }
        }

        .body{
            box-sizing: border-box;
            padding: 12px;
            border: 1px solid transparent;
            border-top-color: @popup-body-bordercolor;
            border-bottom-color: @popup-body-bordercolor;
            border-radius: 4px;
        }

        .foot{
            box-sizing: border-box;
            padding: 12px;
            text-align: right;
        }
    }
}

.pop-enter-active,.pop-leave-active{
    transition: opacity .3s;
    opacity: 1;
}
.pop-enter,.pop-leave-to{
    opacity: 0;
}

.popcontent-enter-active,.popcontent-leave-active{
    transition: transform .3s ease, opacity .3s ease;
    opacity: 1;
    // transform: scale(1);
}
.popcontent-enter,.popcontent-leave-to{
    opacity: 0;
    transform: translate(-50%, 0%);
    // transform: translate(0%, -50%);
    // transform: scale(0);
}
</style>