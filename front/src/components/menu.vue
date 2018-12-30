<template>
    <div class="app-menu">
        <div class="bg" @click="close"></div>
        <leftSlideIn>
	        <ul class="main" v-if="showMenu">
	        	<li v-for="(list, index) in lists">
	        		<a href="javascript:;" @click="jump(list.href)" :to="list.href" class="bBor" :class="{tBor: index == 0}">{{ list.name }}</a>
	        	</li>
	        </ul>
        </leftSlideIn>
    </div>
</template>

<script>
	import leftSlideIn from '@/components/transition/leftSlideIn';
    import {mapActions, mapState} from 'vuex';

    export default {
        name: 'appMenu',
        components: { leftSlideIn },
        data(){
            return {
            	lists: [
            		{
            			href: '/',
            			name: '首页'
            		},
            		{
            			href: '/lists/male/hotfree',
            			name: '男生-人气排名'
            		},
            		{
            			href: '/lists/male/freenew',
            			name: '男生-新书推荐'
            		},
                    {
                        href: '/lists/female/hotfree',
                        name: '女生-人气排名'
                    },
                    {
                        href: '/lists/female/freenew',
                        name: '女生-新书推荐'
                    }
            	],
            	showMenu: false
            }
        },
        mounted(){
        	this.showMenu = true;
        },
        methods: {
            ...mapActions(['setMenu']),
        	close(){
        		this.showMenu = false;
        		setTimeout(() => {
        			this.setMenu(false);
        		}, 400);
        	},
            jump(url){
                this.close();
                this.$router.push(url);
            }
        }
    }
</script>

<style lang="less">
    .app-menu {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 101;
        width: 100%;
        height: 100%;
        height: 100vh;

        .bg {
        	position: absolute;
        	top: 0;
        	left: 0;
        	width: 100%;
        	height: 100%;
        	height: 100vh;
        	background: rgba(0,0,0,.6);
        	cursor: pointer;
        }
        .main {
        	position: absolute;
        	top: 0;
        	right: 0;
        	z-index: 2;
        	width: 5rem;
        	height: 100%;
        	height: 100vh;
        	padding: 100px 0;
        	background: #FFF;
        	font-size: 28px;
        	a {
        		display: block;
        		padding: 0 30px;
        		line-height: 100px;
        	}
        }
    }
</style>