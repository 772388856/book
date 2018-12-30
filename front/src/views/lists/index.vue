<template>
    <div class="lists-page top-nav-height" v-infinite-scroll="getData" infinite-scroll-disabled="busy" infinite-scroll-distance="200">
        <top-nav :title="title"></top-nav>
        <ul class="lists-box">
        	<li class="lists-item" v-for="item in lists">
        		<router-link :to="`/book/${item.bid}`" class="lists-link bBor">
        			<div class="lists-left">
        				<img v-lazy="`https://bookcover.yuewen.com/qdbimg/349573/${item.bid}/150`" />
        			</div>
        			<div class="lists-right">
        				<h4 class="title">{{ item.bName }}</h4>
        				<div class="desc">{{ item.desc }}</div>
        				<div class="info">
        					<div v-if="item.bAuth" class="left auth">{{ item.bAuth }}</div>
        					<div class="right">
        						<span v-if="item.cat" class="cat">{{ item.cat }}</span>
        						<span v-if="item.state" class="state">{{ item.state }}</span>
        						<span v-if="item.cnt" class="cnt">{{ item.cnt }}</span>
        					</div>
        				</div>
        			</div>
        		</router-link>
        	</li>
        </ul>
        <loading v-if="showLoad" />
    </div>
</template>

<script>
	import topNav from '@/components/topNav';
	import loading from '@/components/loading';

	export default {
		name: 'lists',
		data(){
			return {
				title: '',
				page: 1,
				busy: false,
				lists: [],
				showLoad: true
			}
		},
		components: { topNav, loading },
		created(){
			this.getTitle();
		},
		watch: {
			'$route'(to, from){
				this.title = '';
				this.page = 1;
				this.busy = false;
				this.lists = [];
				this.showLoad = true;
				this.getTitle();
				this.getData();
			}
		},
		methods: {
			getTitle(){
				if(this.$route.params.type == 'male'){
					this.title = '男生';
				}else{
					this.title = '女生';
				}
				if(this.$route.params.id == 'hotfree'){
					this.title += ' - 人气排名';
				}else{
					this.title += ' - 新书推荐';
				}
			},
			getData(){
				this.busy = true;
				this.axios.get(`${this.apiUrl}/lists/${this.$route.params.type}/${this.$route.params.id}`, {params: { page: this.page }}).then((res) => {
					if(res.data && Object.prototype.toString.call(res.data.data.records) == '[object Array]' && res.data.data.records.length){
						this.lists = this.lists.concat(res.data.data.records);
						this.page++;
						this.busy = false;
					}else{
						this.showLoad = false;
					}					
				});
			}
		}
	}
</script>

<style lang="less">
	.lists-box {
		.lists-item {
			padding-left: 30px;
		}
		.lists-link {
			display: flex;
			padding: 30px;
			padding-left: 0;
		}
		.lists-left {
			img {
				display: block;
				width: 2rem;
				min-height: 2rem;
				box-shadow: 0 2px 6px rgba(0,0,0,.3);
			}
		}
		.lists-right {
			margin-left: 20px;

			.title {
				font-weight: bold;
				font-size: .42rem;
			}
			.desc {
				margin-top: .2rem;
				color: #969ba3;
				font-size: .3rem;
			    -webkit-box-orient: vertical;
    			-webkit-line-clamp: 3;
    			display: -webkit-box;
    			overflow: hidden;
			}
			.info {
				display: flex;
				width: 100%;
				font-size: .3rem;
				margin-top: .2rem;
				color: #969ba3;	

				.left {
					flex: 1;
				}
				.right {
				 	span {
				 		font-size: .24rem;
				 		border-radius: .08rem;
				 		margin-left: 5px;
				 		padding: 0 .05rem;
				 		display: inline-block;
				 		vertical-align: middle;
				 	}
				 	.cat {
			 		    color: #969ba3;
			 		    border: 1PX solid #969ba3;
				 	}
				 	.state {
			 		    color: #ed424b;
			 		    border: 1PX solid #ed424b;
				 	}
				 	.cnt {
			 		    color: #4284ed;	
			 		    border: 1PX solid #4284ed;
				 	}
				}
			}
		}
	}
</style>
