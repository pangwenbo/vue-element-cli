<template>
	<div class="processDraw mainCon">
		<el-form ref="form" :model="currentRow" label-width="120px" :rules="rules">
			<el-form-item label="模型名称：" prop="name">
				<el-input v-model="currentRow.name" placeholder="请输入模型名称"></el-input>
			</el-form-item>
			<el-form-item label="模型标识：" prop="key">
				<el-input v-model="currentRow.key" placeholder="请输入模型标识"></el-input>
			</el-form-item>
			<el-form-item label="模型版本：" prop="version">
				<el-input v-model="currentRow.version" placeholder="请输入模型版本" v-number-input></el-input>
			</el-form-item>
			<el-form-item label="模型描述：">
				<el-input
					v-model="currentRow.description"
					placeholder="请输入模型描述"
					maxlength="200"
					type="textarea"
				></el-input>
				<div
					v-if="currentRow.description"
					class="tipPos"
				>当前已输入{{currentRow.description.length}}个字符，您还可以输入{{200-currentRow.description.length}}个字符</div>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer" style="text-align:center">
			<el-button type="primary" @click="toSubmit">提交</el-button>
			<el-button type="primary" @click="resetForm">重置</el-button>
		</div>
		<el-right title="流程绘制" width="800px" :isShow.sync="showDraw">
			<div>
				<iframe
					:src="'http://hae.sw.jpsycn.com/activiti-explorer/modeler.html?modelId='+modelId"
					width="100%"
					height="500"
					align="center"
					frameborder="0"
					scrolling="auto"
				></iframe>
			</div>
		</el-right>
	</div>
</template>
<script>
	import elRight from "@/components/rightDialog";
	export default {
		data() {
			return {
				currentRow: {},
				showDraw: false,
				modelId: "",
				rules: {
					name: [
						{
							required: true,
							message: "请输入模型名称",
							trigger: "blur"
						}
					],
					key: [
						{
							required: true,
							message: "请输入模型标识",
							trigger: "blur"
						}
					]
				}
			};
		},
		mounted() {},
		components: { elRight },
		methods: {
			toSubmit() {
				this.$refs.form.validate(valid => {
					if (valid) {
						this.$store
							.dispatch("newModel", { body: this.currentRow })
							.then(res => {
								if (res.body.errorCode == 0) {
									this.modelId = res.body.data.id;
									this.showDraw = true;
								}
							});
					}
				});
			},
			resetForm() {
				this.$refs["form"].clearValidate();
				this.currentRow = {};
			}
		}
	};
</script>
<style lang="less" scoped>
	.tipPos {
		position: absolute;
		bottom: -20px;
		font-size: 12px;
	}
</style>

