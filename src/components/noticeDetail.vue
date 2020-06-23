<template>
    <jp-drawer :drawer="checkDetailDialog"
                size="800px"
                :customTitle="true"
                :contentBorder="false"
                @closeDrawer="closeDrawer"
                class="notice_detail">
        <div class="detail_title" slot="title">
            <div class="detail_biaoti">{{noticeDetail.title}}</div>
            <div class="detail_base">
                <span>发布人：{{noticeDetail.senderName}}</span>
                <span>发布时间: {{noticeDetail.sendTime}}</span>
            </div>
        </div>
        <div class="edit_content" slot="content" v-html="noticeDetail.msgContent"></div>
    </jp-drawer>
</template>

<script>
import jpDrawer from '@/components/jpDrawer'
import { mapActions } from 'vuex'
export default {
    props: {
        noticeDetail: {
            title: '',
            senderName: '',
            sendTime: '',
            msgContent: ''
        },
        checkDetailDialog: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            
        }
    },
    components: {
        jpDrawer
    },
    methods: {
        ...mapActions([
            'countAnnounceReadInfo',   //更新头部消息提醒
            'addOrUpdateSysAnnounceReadInfo'    //通知已读
        ]),
        closeDrawer () {
            this.$emit('closeDrawer')
        }
    },
    watch:{
        checkDetailDialog () {
            if (this.checkDetailDialog) {
                if (this.noticeDetail.read == 0) {
                    this.addOrUpdateSysAnnounceReadInfo({id: this.noticeDetail.id, read: 1}).then(res => {
                        if (res.body.errorCode  == 0) {
                            console.log(res, '成功已读')
                            this.countAnnounceReadInfo()
                            this.$emit('updateMyNotice')
                        }
                    })
                }
            }
        }
    }
}
</script>

<style lang="less">
.notice_detail {
    .el-drawer__header {
        font-size: 16px;
        color: #000;
        padding: 5px 15px;
    }
    .detail_title {
        .detail_biaoti {
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
        }
        .detail_base {
            font-size: 14px;
            color:rgba(0, 0, 0, 0.45);
            span {
                margin-right: 10px;
            }
        }
    }
}
</style>