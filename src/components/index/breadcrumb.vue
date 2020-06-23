<template>
	<div class="breadcrumb" :style="{ 'background-color':color}">
		<span class="left">
			<slot name="right"></slot>
		</span>
		<el-breadcrumb class="app-breadcrumb" separator="/">
			<transition-group name="breadcrumb" mode="out-in">
				<el-breadcrumb-item v-for="(item,index) in levelList" :key="index">
					<span v-if="index!=1&&index!=0">
						<span
							v-if="item.redirect==='noRedirect'||index==levelList.length-1"
							class="no-redirect"
						>{{ item.meta.title+'&nbsp;&nbsp;&nbsp;&nbsp;'+tail}}</span>

						<a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
					</span>
					<span v-else>
						<span
							v-if="item.redirect==='noRedirect'||index==levelList.length-1"
							class="no-redirect"
						>{{ item.meta.title}}</span>

						<a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
					</span>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
		<span style="float:right;padding:10px 30px 0;">
			<el-switch v-model="headflag"></el-switch>
		</span>
	</div>
</template>

<script>
	const { pathToRegexp, match, parse, compile } = require("path-to-regexp");
	import { mapActions, mapGetters } from "vuex";
	export default {
		data() {
			return {
				levelList: null,
				tail: "",
				headflag: true
			};
		},
		computed: {
			...mapGetters(["usermenus", "color"])
		},

		watch: {
			$route() {
				this.tail = "";
				this.getBreadcrumb();
				if (this.$route.query.title != undefined) {
					this.tail = this.$route.query.title;
				}
			},
			headflag() {
				localStorage.setItem("headflag", this.headflag);
				this.$emit("switchchange", this.headflag);
			}
		},
		created() {
			this.getBreadcrumb();

			if (this.$route.query.title != undefined) {
				this.tail = this.$route.query.title;
			}
		},
		mounted() {
			this.$nextTick(() => {
				localStorage.getItem("headflag") == "true"
					? (this.headflag = true)
					: (this.headflag = false);

				this.$emit("switchchange", this.headflag);
			});
		},
		methods: {
			getBreadcrumb() {
				// only show routes with meta.title
				let matched = this.$route.matched.filter(
					item => item.meta && item.meta.title
				);
				const first = matched[0];
				let index = localStorage.getItem("activeIndex");
				if (!this.isDashboard(first)) {
					matched = [
						{
							path: this.usermenus[parseInt(index)].children[0].route,
							meta: {
								title: this.usermenus[parseInt(index)].menuName
							}
						}
					].concat(matched);
				}

				this.levelList = matched.filter(
					item =>
						item.meta &&
						item.meta.title &&
						item.meta.breadcrumb !== false
				);
			},
			isDashboard(route) {
				const name = route && route.name;
				if (!name) {
					return false;
				}
				return (
					name.trim().toLocaleLowerCase() === "首页".toLocaleLowerCase()
				);
			},
			pathCompile(path) {
				const { params } = this.$route;
				var toPath = compile(path);
				return toPath(params);
			},
			handleLink(item) {
				const { redirect, path } = item;
				if (redirect) {
					this.$router.push(redirect);
					return;
				}

				this.$router.push(this.pathCompile(path));
			}
		}
	};
</script>

<style  scoped>
	.left {
		float: left;
		padding: 15px 0 15px 28px;
	}
	.app-breadcrumb.el-breadcrumb {
		display: inline-block;
		font-size: 15px;
		line-height: 44px;
		margin-left: 8px;
		float: left;
		padding: 1px 18px;
	}
	.no-redirect {
		color: #666666;
		cursor: text;
	}
	.el-breadcrumb__inner a {
		font-weight: 500;
	}

	/* breadcrumb transition */
	.breadcrumb-enter-active,
	.breadcrumb-leave-active {
		transition: all 0.5s;
	}

	.breadcrumb-enter,
	.breadcrumb-leave-active {
		opacity: 0;
		transform: translateX(20px);
	}

	.breadcrumb-move {
		transition: all 0.5s;
	}

	.breadcrumb-leave-active {
		position: absolute;
	}
	.breadcrumb {
		width: 100%;
		height: 48px;
		border-bottom: 10px solid #fafafa;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		z-index: 10;
	}
</style>
