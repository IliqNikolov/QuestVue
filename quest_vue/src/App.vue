<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <Header :usernameAndLogout="usernameAndLogout" @updateNavBar="updateNavBar">
    </Header>
    <router-view :usernameAndLogout="usernameAndLogout" @updateNavBar="updateNavBar">
    </router-view>
    <Footer>
    </Footer>
  </div>
</template>

<script>
import Footer from './components/shared/Footer'
import Header from './components/shared/Header'


export default {
  name:"App",
  components:
  {
    Footer,
    Header
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
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
