<template>
  <v-app>
    <Header :usernameAndLogout="usernameAndLogout" @updateNavBar="updateNavBar">
    </Header>
    <router-view :usernameAndLogout="usernameAndLogout" @updateNavBar="updateNavBar">
    </router-view>
    <Footer>
    </Footer>
  </v-app>
</template>

<script>
import Vue from 'vue';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';

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
