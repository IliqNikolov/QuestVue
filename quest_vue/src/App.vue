<template>
  <v-app>
    <Header :usernameAndLogout="usernameAndLogout" @updateNavBar="updateNavBar">
    </Header>
    <v-parallax src="@/assets/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" height="200"></v-parallax>
    <router-view class="bottom-padding" :usernameAndLogout="usernameAndLogout" @updateNavBar="updateNavBar">
    </router-view>
    <Footer>
    </Footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Footer from './components/shared/footer';
import Header from './components/shared/header';

export default Vue.extend({
  name: 'App',

  components: {
    Footer,Header
  }, 
  methods:{
    updateNavBar: function(){
        this.usernameAndLogout.username=localStorage.user; 
    },
    logout:function(){
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        localStorage.user="";
        this.usernameAndLogout.username=localStorage.user;
        this.$router.push("/login")
    }
  },
  data:function (){
      return{         
         usernameAndLogout:{username:localStorage.user,logout:this.logout}
      }
  } 
});
</script>
<style scoped>
.bottom-padding{
  padding-bottom: 60px;
}
</style>