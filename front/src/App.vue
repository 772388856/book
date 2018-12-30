<template>
  <div>
    <router-view/>
    <vue-ins-progress-bar></vue-ins-progress-bar>
    <menu-app v-if="showMenu"></menu-app>
  </div>
</template>

<script>
  import menuApp from '@/components/menu';
  import {mapActions, mapState} from 'vuex';

  export default {
    name: 'app',
    components: { menuApp },
    computed: {
        ...mapState(['showMenu'])
    },
    mounted(){
      this.$insProgress.finish()
    },
    created(){
      this.$insProgress.start()
      this.$router.beforeEach((to, from, next) => {
        this.$insProgress.start()
        next()
        })
        this.$router.afterEach((to, from) => {
        this.$insProgress.finish()
      })
    }
  }
</script>

<style lang="less">
    @import "./assets/css/common/common";
</style>
