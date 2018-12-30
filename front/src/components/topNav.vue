<template>
	<div class="top-nav bBor">
		<div class="left-box icon-box">
			<a href="javascript:;" @click="backHandle" v-if="back" class="left-icon top-icon iconfont icon-xiangzuojiantou"></a>
			<a href="javascript:;" @click="closeHandle" v-if="close" class="close-icon left-icon top-icon iconfont icon-guanbi"></a>
		</div>
		<p class="title">{{ title }}</p>
		<div class="right-box icon-box">
			<a href="javascript:;" @click="menuHandle" v-if="menu" class="menu-icon left-icon top-icon iconfont icon-caidan"></a>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex';

	export default {
		name: 'topNav',
		props: {
			title: {
				default(){
					return ''
				}
			},
			back: {
				default(){
					return true
				}
			},
			close: {
				default(){
					return false
				}
			},
			menu: {
				default(){
					return true
				}
			}
		},
		computed: {
			...mapState(['showMenu'])
		},
		methods: {
			...mapActions(['setMenu']),
			backHandle(){
				window.history.length > 1
		        ? this.$router.go(-1)
		        : this.$router.push('/')
			},
			closeHandle(){
				this.$emit('closeHandle');
			},
			menuHandle(){
				this.setMenu(!this.showMenu);
			}
		}
	}
</script>

<style lang="less">
	.top-nav {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10;
		display: flex;
		width: 100%;
		height: 88px;
		line-height: 88px;
		font-size: 30px;
		background: #FFF;

		.title {
			flex: 1;
			height: 88px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.icon-box {
			display: flex;
			height: 88px;
		}
		.left-box {
			
		}
		.right-box {
			
		}
		.top-icon {
			width: 88px;
			text-align: center;
			font-size: 40px;
			color: #000;
		}
		.close-icon {
			font-size: 50px;
		}
		.menu-icon {
			font-size: 50px;
		}
	}
</style>