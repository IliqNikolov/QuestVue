<template>
<form @submit.prevent="register">
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
    <div>
        <label>Repeat Password</label>
        <input v-model="rePassword" type="password" @blur="$v.rePassword.$touch()">
        <div v-if="$v.rePassword.$error">Password and Repeat Password are different</div>
    </div>
    <div v-if="isUsernameTaken">Username Taken</div>
    <button :disabled="$v.$invalid">Register</button>
    {{username}}|{{password}}|{{rePassword}}
</form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs} from 'vuelidate/lib/validators'
import userServices from '../../services/userServices'

export default {
    name:"Register",
    mixins:[validationMixin],
    data: function(){
        return{
            username:"",
            password:"",
            rePassword:"",
            isUsernameTaken:false
        }
    },
    methods:{
        register: function(){
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
    },
    validations:{
        username: {required,minLength: minLength(6) },
        password: {required,minLength: minLength(6) },
        rePassword: {sameAsPassword: sameAs("password") }

    }
}
</script>