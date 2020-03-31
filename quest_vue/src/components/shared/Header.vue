<template>
<v-card color="grey lighten-4" flat height="200px" tile>
    <v-toolbar dense>
            <router-link to="/">
                <img src="@/assets/Untitled-1 - Copy.png">
            </router-link>
        <v-spacer></v-spacer>
        <template  v-if="this.usernameAndLogout.username">
            <span>Hello {{usernameAndLogout.username}}</span>
            <router-link to="/changepassword">
                <v-btn text small>
                    Change Password
                </v-btn>
            </router-link>
            <v-btn text small @click="usernameAndLogout.logout" class="hidden-sm-and-down">Logout</v-btn>
        </template>
        <template  v-else>
            <router-link to="/login">
                <v-btn text small>
                    Login
                </v-btn>
                </router-link>
            <router-link to="/register">
                <v-btn text small>
                    Register
                </v-btn>
                </router-link>
        </template >
    </v-toolbar>
    </v-card>
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
a {
    color: black;
    text-decoration: none;
}
a:visited {
  color: black;
}
</style>