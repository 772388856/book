<template>
    <div class="read-page">
        <loading v-if="showLoad" />
        <template v-else>
        	<div class="read-top" :class="{top: hasTop}">
        		<a href="javascript:;" @click="back" class="left iconfont icon-xiangzuojiantou"></a>
        		<div class="right">
        			<router-link to="/" class="iconfont icon-shouye"></router-link>
        			<router-link :to="`/catalog/${$route.params.id}?index=${index}`" class="iconfont icon-caidan"></router-link>
        		</div>
        	</div>
        	<section v-html="read" @click="hasTop = !hasTop"></section>
        	<ul class="btn-box">
        		<li v-if="up">
        			<router-link :to="`/read/${$route.params.id}/${up}`" replace>上一章</router-link>
    			</li>
        		<li v-if="next">
        			<router-link :to="`/read/${$route.params.id}/${next}`" replace>下一章</router-link>
    			</li>
        	</ul>
        </template>
    </div>
</template>

<script>
	import loading from '@/components/loading';

	export default {
		name: 'read',
		components: { loading },
		data(){
			return {
				showLoad: true,
				read: '',
				up: '',
				next: '',
				index: '',
				hasTop: false
			}
		},
		created(){
			this.getData();
		},
		watch: {
			'$route'(to, from){
				this.read = '';
				this.showLoad = true;
				this.up = '';
				this.next = '';
				this.index = '';
				this.getData();
			}
		},
		methods: {
			getData(){
				const handle = () => {
					this.hasTop && (this.hasTop = false);
				}

				document.removeEventListener('scroll', handle);

				this.axios.get(`${this.apiUrl}/read`, {params: { id: this.$route.params.id, read: this.$route.params.read }}).then((res) => {
					this.showLoad = false;

					if(res.data.code == '00'){
						this.read = res.data.data.read;
						this.getCatalog();
						console.log(res.data);
					}else{
						alert('数据异常');
					}

					this.$nextTick(() => {
						document.addEventListener('scroll', handle);
					});
				});
			},
			getCatalog(){
				this.axios.get(`${this.apiUrl}/catalog`, {params: { id: this.$route.params.id }}).then((res) => {
					if(res.data.code == '00' && res.data.data.lists.length){
						res.data.data.lists.forEach((list, index) => {
							if(list.id == this.$route.params.read){
								if(index){
									this.up = res.data.data.lists[index-1].id;
								}else{
									this.up = '';
								}
								if(index < res.data.data.lists.length-1){
									this.next = res.data.data.lists[index+1].id;
								}else{
									this.next = '';
								}
								this.index = index;
							}
						});
					}
				});
			},
			back(){
				this.$router.back(-1);
			}
		}
	}
</script>

<style lang="less">
	.read-page {
		position: relative;
		height: 100%;
		min-height: 100vh;
		background: url(https://qidian.gtimg.com/qdm/img/skin-default-t.ece62.jpg) no-repeat center top,url(https://qidian.gtimg.com/qdm/img/skin-default-b.79f06.jpg) no-repeat center bottom,url(https://qidian.gtimg.com/qdm/img/skin-default-m.35905.jpg) repeat-y center 119px;
    	background-size: 100%;

    	.read-top {
    		position: fixed;
    		top: 0;
    		left: 0;
    		z-index: 5;
    		display: flex;
    		width: 100%;
		    background-color: rgba(0,0,0,.9);
		    height: 88px;
		    line-height: 88px;
		    opacity: 0;
	        transform: translate3d(0, -50%, 0);
	        transition: .3s;

		    .iconfont {
		    	display: inline-block;
		    	width: 88px;
		    	text-align: center;
	    	    vertical-align: middle;
		    	color: #FFF;
		    	font-size: 35px;
		    }
		    .right {
		    	flex: 1;
		    	text-align: right;
		    }
		    &.top {
	    	    opacity: 1;
    	        transform: translate3d(0, 0, 0);
		    }
    	}
    	section {
		    text-align: justify;
	        line-height: 1.8;
            overflow: hidden;
            padding: 32px;
            font-size: .42rem;
		    h3 {
		    	font-size: 1.5em;
			    font-weight: 400;
			    line-height: 1.2;
			    margin: 1em 0;
		    }
		    p {
	    	    font-size: 1em;
    			margin: .1em 0;
		    }
		    .jsAuthorSay {
		    	display: none;
		    }
    	}
    	.btn-box {
    		display: flex;
    		width: 100%;
    		padding: 16px;
    		padding-top: 0;
    		padding-bottom: 50px;
    		li {
    			flex: 1;
    			padding: 0 16px;
    		}
    		a {
    			display: block;
    			text-align: center;
    			color: #FFF;
    			line-height: 70px;
    			height: 70px;
    			background: #ed424b;
    			border-radius: 100rem;
    			font-size: .4rem;
    		}
    	}
	}
</style>
