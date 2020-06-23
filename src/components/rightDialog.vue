<template>
  <div class="v-modal modalR" v-if="isShow1" @click="toClose">
    <div class="dialogR" :style="'width:'+width+';right:'+width1">
      <div class="titleR">{{title}} <span class="el-icon-close" @click="closeR"></span></div>
      <div class="mainR">
        <div :class="isBorder?'demo-border':''"> 
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    title:String,
    width:{
      type:String,
      default:'600px'
    },
    isShow:Boolean,
    isBorder:Boolean
  },
  data(){
    return {
      width1:'-100%',
      isShow1:false
    }
  },
  methods:{
    toClose(event){
      var e=event.target;
      var that=this;
      if(e.classList.contains('modalR')==true){
        this.$emit('update:isShow', false);
        setTimeout(function(){
          that.isShow1=false;
          that.$emit('close')
        },400)
      }
    },
    closeR(){
      var that=this;
      this.$emit('update:isShow', false);
      setTimeout(function(){
        that.isShow1=false;
        that.$emit('close')
      },400)
    },
  },
  watch:{
    isShow(oldV,newV){
      var that=this;
      if(newV==false){
        that.isShow1=true;
        setTimeout(function(){
          that.width1=0;
        },0)
      }else{
        this.width1='-100%';
        setTimeout(function(){
          that.isShow1=false;
        },400)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.modalR{
  z-index: 2001;
  background: rgba(0,0,0,0.5);
  opacity: 1;
  .dialogR{
    background: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    right:-100%;
    transition:right .4s ease-in-out;
    color: #303133;
    box-shadow: -2px 0 8px rgba(0,0,0,.5);
    .titleR{
      padding: 16px 24px;
      border-radius: 4px 4px 0 0;
      border-bottom: 1px solid #e8e8e8;
      font-size: 18px;
      position: relative;
      .el-icon-close{
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .mainR{
      padding: 16px 24px;
      .demo-border{
        width: 90%;
        margin: 0 auto;
        border: 1px solid #e9e9e9;
        padding: 20px;
      }
    }
  }
}
</style>

