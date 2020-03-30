<template>
<form @submit.prevent="login">
    <div>
        <label>Username</label>
        <input v-model="username" type="text" @blur="$v.username.$touch()">
        <div v-if="$v.username.$error">Username must be at least 6 characters long</div>
    </div>
    <div>
        <label>Password</label>
        <input v-model="password" type="password" @blur="$v.password.$touch()">
        <div v-if="$v.password.$error">Password must be at least 6 characters long</div>
    </div>
    <div v-if="isInvalidUsernameOrPassword">Invalid username or password</div>
    <button :disabled="$v.$invalid">Login</button>
</form>
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
            isInvalidUsernameOrPassword:false
        }
    },
    methods:{
        login: function(){
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
    },
    validations:{
        username: {required,minLength: minLength(6) },
        password: {required,minLength: minLength(6) }
    }
}
</script>