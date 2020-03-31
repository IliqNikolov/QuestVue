<template>
<v-form ref="form">
    <v-text-field v-model="username" type="text" 
        label="Username" :rules="usrnameRules"></v-text-field>
    <v-text-field v-model="password" type="password"
        label="Password" :rules="passwordRules"></v-text-field>
    <v-text-field v-model="rePassword" type="password"
        label="Repeat Password" :rules="rePasswordRules"></v-text-field>
    <div v-if="isUsernameTaken">Username Taken</div>
    <v-btn small color="primary" @click="register">Register</v-btn>
</v-form>
</template>
<script>
import userServices from '../../services/userServices'

export default {
    name:"Register",
    data: function(){
        return{
            username:"",
            password:"",
            rePassword:"",
            usrnameRules:[
                v => !!v || 'Username is required',
                v => (v && v.length >= 6) || "Username can't be  less than 6 characters",
            ],
            passwordRules:[
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || "Password can't be  less than 6 characters",
            ],
            rePasswordRules:[
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || "Password can't be  less than 6 characters",
                v => v==this.password || "Passwords don't match"               
            ],
            isUsernameTaken:false
        }
    },
    methods:{
        register: function(){
            if (this.$refs.form.validate()) {
                userServices.Register(this.username,this.password).then(res=> {
                    this.isUsernameTaken=false;
                    document.cookie="user="+res.data.token;
                    localStorage.user=this.username;
                    this.$emit("updateNavBar");
                    this.$router.push("/")
                }
                ).catch(e=>{
                    if (e.response.status==400) {
                        this.isUsernameTaken=true;
                    }
                }
                )                
            }
            
        }
    },   
}
</script>