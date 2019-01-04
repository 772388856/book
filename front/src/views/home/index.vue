<template>
    <div class="home-page top-nav-height">
    	<top-nav title="咸狗书" :back="false"></top-nav>

    	<a href="http://99-you.com" class="img-box">
    		<img src="//qidian.qpic.cn/qidian_common/349573/ee4ff8502c09c020ce5e90d6a41b4c32/0" />
    	</a>

    	<div class="module top-line" v-if="Object.prototype.toString.call(male.hotfree) == '[object Array]'">
    		<div class="title-box">
				<div class="left">人气排名 - 男生</div>
				<router-link to="/lists/male/hotfree" class="right">
					<span>更多</span>
					<i class="right-icon iconfont icon-xiangyoujiantou"></i>
				</router-link>
			</div>
			<ul class="list-box" v-if="male.hotfree.length">
				<li v-for="(item,index) in male.hotfree">
	        		<router-link :to="`/book/${item.bid}`" class="line">
        				<img v-lazy="`https://bookcover.yuewen.com/qdbimg/349573/${item.bid}/150`" class="img" />
        				<div class="text">{{ item.bName }}</div>
	        		</router-link>
	        	</li>
			</ul>
			<loading v-else />
    	</div>

    	<div class="module top-line" v-if="Object.prototype.toString.call(male.freenew) == '[object Array]'">
    		<div class="title-box">
				<div class="left">新书推荐 - 男生</div>
				<router-link to="/lists/male/freenew" class="right">
					<span>更多</span>
					<i class="right-icon iconfont icon-xiangyoujiantou"></i>
				</router-link>
			</div>
			<ul class="list-box" v-if="male.freenew.length">
				<li v-for="(item,index) in male.freenew">
	        		<router-link :to="`/book/${item.bid}`" class="line">
        				<img v-lazy="`https://bookcover.yuewen.com/qdbimg/349573/${item.bid}/150`" class="img" />
        				<div class="text">{{ item.bName }}</div>
	        		</router-link>
	        	</li>
			</ul>
			<loading v-else />
    	</div>

    	<a href="http://99-you.com" class="img-box top-line">
    		<img src="//qidian.qpic.cn/qidian_common/349573/c3e154d703b8f2c3a72f060e385bfb89/0" />
    	</a>

    	<div class="module top-line" v-if="Object.prototype.toString.call(female.hotfree) == '[object Array]'">
    		<div class="title-box">
				<div class="left">人气排名 - 女生</div>
				<router-link to="/lists/female/hotfree" class="right">
					<span>更多</span>
					<i class="right-icon iconfont icon-xiangyoujiantou"></i>
				</router-link>
			</div>
			<ul class="list-box" v-if="female.hotfree.length">
				<li v-for="(item,index) in female.hotfree">
	        		<router-link :to="`/book/${item.bid}`" class="line">
        				<img v-lazy="`https://bookcover.yuewen.com/qdbimg/349573/${item.bid}/150`" class="img" />
        				<div class="text">{{ item.bName }}</div>
	        		</router-link>
	        	</li>
			</ul>
			<loading v-else />
    	</div>

    	<div class="module top-line" v-if="Object.prototype.toString.call(female.freenew) == '[object Array]'">
    		<div class="title-box">
				<div class="left">新书推荐 - 女生</div>
				<router-link to="/lists/female/freenew" class="right">
					<span>更多</span>
					<i class="right-icon iconfont icon-xiangyoujiantou"></i>
				</router-link>
			</div>
			<ul class="list-box" v-if="female.freenew.length">
				<li v-for="(item,index) in female.freenew">
	        		<router-link :to="`/book/${item.bid}`" class="line">
        				<img v-lazy="`https://bookcover.yuewen.com/qdbimg/349573/${item.bid}/150`" class="img" />
        				<div class="text">{{ item.bName }}</div>
	        		</router-link>
	        	</li>
			</ul>
			<loading v-else />
    	</div>
    </div>
</template>

<script>
	import topNav from '@/components/topNav';
	import loading from '@/components/loading';

	export default {
		name: 'home',
		components: { topNav, loading },
		data(){
			return {
				// 男生
				male: {
					hotfree: [],
					freenew: []
				},
				// 女生
				female: {
					hotfree: [],
					freenew: []
				}
			}
		},
		created(){
			this.getMaleHotfree();
			this.getMaleFreenew();
			this.getFemaleHotfree();
			this.getFemaleFreenew();
		},
		methods: {
			getMaleHotfree(){
				this.axios.get(`${this.apiUrl}/lists/male/hotfree`, {params: { page: 1 }}).then((res) => {
					if(res.data && Object.prototype.toString.call(res.data.data.records) == '[object Array]' && res.data.data.records.length){
						this.male.hotfree = res.data.data.records;
					}else{
						this.male.hotfree = '';
					}
				});
			},
			getMaleFreenew(){
				this.axios.get(`${this.apiUrl}/lists/male/freenew`, {params: { page: 1 }}).then((res) => {
					if(res.data && Object.prototype.toString.call(res.data.data.records) == '[object Array]' && res.data.data.records.length){
						this.male.freenew = res.data.data.records;
					}else{
						this.male.freenew = '';
					}
				});
			},
			getFemaleHotfree(){
				this.axios.get(`${this.apiUrl}/lists/female/hotfree`, {params: { page: 1 }}).then((res) => {
					if(res.data && Object.prototype.toString.call(res.data.data.records) == '[object Array]' && res.data.data.records.length){
						this.female.hotfree = res.data.data.records;
					}else{
						this.female.hotfree = '';
					}
				});
			},
			getFemaleFreenew(){
				this.axios.get(`${this.apiUrl}/lists/female/freenew`, {params: { page: 1 }}).then((res) => {
					if(res.data && Object.prototype.toString.call(res.data.data.records) == '[object Array]' && res.data.data.records.length){
						this.female.freenew = res.data.data.records;
					}else{
						this.female.freenew = '';
					}
				});
			}
		}
	}
</script>

<style lang="less">
	.home-page {
		.top-line {
		    border-top: .3rem solid #f5f5f5;
		}
		.top-nav {
			padding-left: 32px;
		}
		.img-box {
			display: block;
			img {
				display: block;
				width: 100%;
			}
		}
		.module {
			border-top: 15px solid #F5F5F5;
			.title-box {
				display: flex;
				width: 100%;
				padding: 0 30px;
				line-height: 80px;
				font-size: 30px;

				.left {
					position: relative;
					flex: 1;
					padding-left: 20px;
					&:after {
						content: "";
						position: absolute;
						width: 4px;
						height: 30px;
						left: 0;
						top: 50%;
						margin-top: -18px;
						background: #f60;
					}
				}
				.right {
					color: #aaa;
					font-size: 24px;

					* {
						display: inline-block;
					    vertical-align: middle;
					}
					.right-icon {
						margin-lefet: .1rem;
						font-size: .3rem;
					}
				}
			}
			.list-box {
			    display: flex;
	            flex-direction: row;
	            padding: 20px 10px;
	            padding-top: 0;
	            overflow: auto;
	            -webkit-overflow-scrolling: touch;
	            li {
	                padding: 0 20px;
	            }
	            .line {
	            	display: block;
	            	width: 132px;
	            }
	            .img {
	            	display: block;
	            	width: 132px;
	            	min-height: 132px;
            	    box-shadow: 0 2px 6px rgba(0,0,0,.3);
	            }
	            .text {
	            	margin-top: .2rem;
	            	overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: .32rem;
	            }
			}
		}
	}
</style>
