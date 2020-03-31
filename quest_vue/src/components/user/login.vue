<template>
<v-form ref="form">
        <v-text-field v-model="username" type="text" 
        label="Username" :rules="usrnameRules"></v-text-field>
        <v-text-field v-model="password" type="password"
        label="Password" :rules="passwordRules"></v-text-field>
    <div v-if="isInvalidUsernameOrPassword">Invalid username or password</div>
    <v-btn small @click="login">Login</v-btn>
</v-form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import userServices from '../../services/userServices'

export default {
    name:"Login",
    mixins:[validationMixin],
    data: function(){
        return{
            username:"",
            password:"",
            usrnameRules:[
                v => !!v || 'Username is required',
                v => (v && v.length >= 6) || "Username can't be  less than 6 characters",
            ],
            passwordRules:[
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || "Password can't be  less than 6 characters",
            ],
            isInvalidUsernameOrPassword:false
        }
    },
    methods:{
        login: function(){
            if (this.$refs.form.validate()) {
                userServices.Login(this.username,this.password).then(res=> {
                    this.isInvalidUsernameOrPassword=false;
                    document.cookie="user="+res.data.token;
                    localStorage.user=this.username;
                    this.$emit("updateNavBar");
                    this.$router.push("/")
                }
                ).catch(e=>{
                    if (e.response.status==401) {
                        this.isInvalidUsernameOrPassword=true;
                    }
                }
                )               
            }
            
        }
    },
    validations:{
        username: {required,minLength: minLength(6) },
        password: {required,minLength: minLength(6) }
    }
}
</script>