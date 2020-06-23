<template>
<el-dialog
      class="notice_sel_user"
      title="选择用户"
      :visible="selUserDialogFlag"
      :close-on-click-modal="false"
      width="400px"
      @close="cancleSelUserDialog"
      append-to-body
      center>
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="treeFilterText">
        </el-input>
        <div class="tree_box">
            <el-tree
                class="filter-tree"
                :data="userTree"
                show-checkbox
                default-expand-all
                :filter-node-method="treeFilterNode"
                node-key="id"
                ref="userTree"
                highlight-current
                :default-checked-keys="treeDefaultChecked"
                :props="treeDefaultProps">
            </el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancleSelUserDialog">取 消</el-button>
            <el-button type="primary" @click="selUserSub">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {
        selUserDialogFlag: {
            type: Boolean,
            default: false
        },
        treeDefaultChecked: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            userTree: [],
            treeDefaultProps: {
                children: 'children',
                label: 'name'
            },
            treeFilterText: ''
        }
    },
    watch: {
        selUserDialogFlag (n, o) {
            if (n) {
                this.getUserTree().then(res => {
                    this.userTree = res.body.data
                })
            }
        },
        treeFilterText(val) {
            this.$refs.userTree.filter(val);
        }
    },
    methods: {
        ...mapActions([
            'getUserTree'
        ]),
        treeFilterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        cancleSelUserDialog () {
            this.$emit('update:selUserDialogFlag', false)
        },
        selUserSub () {     //选择用户确定
            let selUser = []
            this.$refs.userTree.getCheckedNodes().map(item => {
                if (item.type == 1) {
                    selUser.push(item)
                }
            })
            this.$emit('selUserRes', selUser)
            this.cancleSelUserDialog()
        }
    }
}
</script>

<style lang="less">
.notice_sel_user {
    .tree_box {
        max-height: 400px;
        overflow-y: auto;
    }
}
</style>