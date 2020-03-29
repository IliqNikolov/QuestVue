<template>
<div>
 <router-link to="/">
     <img src="@/assets/Untitled-1 - Copy.png">
 </router-link>
 <template  v-if="this.usernameAndLogout.username">
     <span>Hello {{usernameAndLogout.username}}</span>
     <router-link to="/changepassword">
        <button>
            Change Password
        </button>
     </router-link>
     <button @click="usernameAndLogout.logout">Logout</button>
 </template>
 <template  v-else>
     <router-link to="/login">
        <button>
            Login
        </button>
        </router-link>
     <router-link to="/register">
        <button>
            Register
        </button>
        </router-link>
 </template >
</div>
</template>

<script lang="ts">
//import { Component, Prop, Vue } from 'vue-property-decorator';

export default {
    name: 'Header',
    props:{
        usernameAndLogout:{}
    }    
}
</script>

<style scoped>

</style>