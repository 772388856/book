<template>
    <div class="catalog-page top-nav-height">
        <top-nav :title="title"></top-nav>
        <loading v-if="showLoad" />
        <template v-else>
        	<div class="catalog-item-1 bBor">目录</div>
        	<div class="catalog-item-2">
        		<div class="left">共{{ lists.length }}章</div>
        		<div class="right">倒序</div>
        	</div>
        	<div class="catalog-item-3">正文卷</div>
        	<ul class="catalog-list">
        		<li v-for="(list,index) in lists">
        			<router-link :to="`/read/${$route.params.id}/${list.id}`" :class="{active: lIndex == index}" class="bBor">
        				{{ list.text }}
        				<span class="time" v-if="list.time">
        					({{ list.time }})
        				</span>
    				</router-link>
        		</li>
        	</ul>
        </template>
    </div>
</template>

<script>
	import topNav from '@/components/topNav';
	import loading from '@/components/loading';

	export default {
		name: 'catalog',
		components: { topNav, loading },
		data(){
			return {
				title: '加载中...',
				showLoad: true,
				lists: [],
				lIndex: '-'
			}
		},
		created(){
			this.getData();
		},
		methods: {
			getData(){
				this.axios.get(`${this.apiUrl}/catalog`, {params: { id: this.$route.params.id }}).then((res) => {
					this.showLoad = false;

					if(res.data.code == '00' && res.data.data.lists.length){
						this.title = res.data.data.title;
						this.lists = res.data.data.lists;

						this.$nextTick(() => {
							this.lIndex = this.$route.query.index;

							setTimeout(() => {
								document.querySelector('.catalog-list .active') && (window.scrollTo(0, document.querySelector('.catalog-list .active').offsetTop - 100));
							}, 500);
						});
						console.log(res.data);
					}else{
						alert('数据异常');
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.catalog-page {
		.top-nav {
			&:after {
				display: none;
			}
		}
		.catalog-item-1 {
			line-height: 90px;
			height: 90px;
			color: #ed424b;
			text-align: center;
			font-size: .42rem;
			&:after {
			    border-bottom: 2PX solid #ed424b;
			}
		}
		.catalog-item-2 {
			display: flex;
			width: 100%;
			line-height: 88px;
			height: 88px;
			padding: 0 28px;
			font-size: .38rem;
			.left {
				flex: 1;
				font-weight: bold;
			}
		}
		.catalog-item-3 {
		    color: #969ba3;
    		background-color: #f6f7f9;
    		padding: 0 28px;
    		line-height: 70px;
			height: 70px;
			font-size: .36rem;
		}
		.catalog-list {
			li {
				padding-left: 28px;
			}
			a {
				display: block;
				height: 88px;
				line-height: 88px;
			    font-weight: 500;
			    padding-right: 28px;
			    font-size: .34rem;
			    overflow: hidden;
			    white-space: nowrap;
			    text-overflow: ellipsis;
			}
			.active {
				color: #ed424b;
			}
			.time {
				color: #969ba3;
				font-size: .32rem;
			}
		}
	}
</style>
