<template>
	<div class="book-page top-nav-height">
		<top-nav :title="book.title"></top-nav>
		<loading v-if="showLoad" />
		<div v-else class="book-detail-info">
			<img v-if="book.img" :src="book.img" class="book-cover-blur" />
			<div class="book-layout">
				<div>
					<img v-lazy="book.img" v-if="book.img" class="book-cover" />
				</div>
				<div class="book-cell">
					<h2 class="book-title" v-if="book.title">{{ book.title }}</h2>
					<div class="book-rand-a" v-if="book.rand" v-html="book.rand"></div>
					<div class="book-meta-1" v-if="book.meta1">{{ book.meta1 }}</div>
					<div class="book-meta-2" v-if="book.meta2">{{ book.meta2 }}</div>
				</div>
			</div>
			<div class="book-btn-box" v-if="oneId">
				<router-link :to="`/read/${$route.params.id}/${oneId}`" class="book-btn">立即阅读</router-link>
			</div>
			<div class="book-summary left-space">
				<div class="tBor" v-html="book.content"></div>
			</div>
			<router-link :to="`/catalog/${$route.params.id}`" class="book-catalog-box left-space">
				<div class="book-catalog tBor">
					<div class="left">目录</div>
					<div class="right">
						{{ book.status }}
						<i class="iconfont icon-xiangyoujiantou""></i>
					</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import topNav from '@/components/topNav';
	import loading from '@/components/loading';

	export default {
		name: 'book',
		components: { topNav, loading },
		data(){
			return {
				showLoad: true,
				oneId: '',
				book: {
					title: '加载中...'
				}
			}
		},
		created(){
			this.getData();
		},
		methods: {
			getData(){
				this.axios.get(`${this.apiUrl}/book`, {params: { id: this.$route.params.id }}).then((res) => {
					this.showLoad = false;

					if(res.data.code == '00'){
						this.book = res.data.data;
						this.getCatalog();
						console.log(res.data);
					}else{
						alert('数据异常');
					}
				});
			},
			getCatalog(){
				this.axios.get(`${this.apiUrl}/catalog`, {params: { id: this.$route.params.id }}).then((res) => {
					if(res.data.code == '00' && res.data.data.lists.length){
						this.oneId = res.data.data.lists[0].id;
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.book-page {
		.top-nav {
			background: none;
			&:after {
				display: none;
			}
		}
		.book-detail-info {
			position: relative;
		}
		.book-cover-blur {
			position: absolute;
		    top: calc(50% - 87.5vw);
			left: 0;
			width: 100%;
			height: 175vw;	
		    opacity: .02;
		    opacity: calc(.1 + .05);
		    -webkit-filter: blur(calc(17px + 1px));
		    filter: blur(calc(17px + 1px));
		}
		.book-layout {
			position: relative;
			z-index: 2;
			display: flex;
			padding: 32px;
		}
		.book-cover {
			width: 160px;
			min-height: 160px;
		}
		.book-cell {
			margin-left: 16px;
			& > * {
				margin-bottom: .2rem;
			}
		}
		.book-title {
		    overflow: hidden;
		    white-space: nowrap;
		    text-overflow: ellipsis;
		    font-weight: bold;
		    font-size: .42rem;
		}
		.book-rand-a {
			aria,
			.tag-solid {
				display: none;
			}
		}
		.book-btn-box {
			position: relative;
			z-index: 2;
			padding: 0 32px;
		}
		.book-btn {
			display: block;
			background: #ed424b;
			color: #FFF;
			text-align: center;
			height: 80px;
			line-height: 80px;
			font-size: .42rem;
			border-radius: 6px;
		}
		.left-space {
			padding-left: 32px;
		}
		.book-summary {
			position: relative;
			z-index: 2;
			margin-top: 32px;
			
			& > div {
				padding: 32px;
				padding-left: 0;
				font-size: .36rem;
				line-height: .7rem;
			}
		}
		.book-catalog-box {
			position: relative;
			z-index: 2;
			display: block;
		}
		.book-catalog {
			display: flex;
			width: 100%;
			line-height: 88px;
			padding-right: 32px;

			.left {
				font-weight: bold;
				font-size: .42rem;
			}
			.right {
				flex: 1;
				margin-left: 30px;
				color: #969ba3;
				overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			}
			.iconfont {
			    vertical-align: middle;
			}
		}
	}
</style>