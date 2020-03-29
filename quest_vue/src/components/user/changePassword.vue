<template>
<form @submit.prevent="changePassword">
    <div>
        <label>Old Password</label>
        <input v-model="oldPassword" type="password" @blur="$v.oldPassword.$touch()">
        <div v-if="$v.oldPassword.$error">Password must be at least 6 characters long</div>
    </div>
    <div>
        <label>New Password</label>
        <input v-model="newPassword" type="password" @blur="$v.newPassword.$touch()">
        <div v-if="$v.newPassword.$error">New Password must be at least 6 characters long</div>
    </div>
    <div>
        <label>Repeat New Password</label>
        <input v-model="reNewPassword" type="password" @blur="$v.reNewPassword.$touch()">
        <div v-if="$v.reNewPassword.$error">New Password and Repeat New Password are different</div>
    </div>
    <div v-if="isPasswordCorrect">Invalid password</div>
    <button :disabled="$v.$invalid">Change Password</button>
    {{oldPassword}}|{{newPassword}}|{{reNewPassword}}
</form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs} from 'vuelidate/lib/validators'
import userServices from '../../services/userServices'

export default {
    name:"ChangePassword",
    mixins:[validationMixin],
    props:{usernameAndLogout:{}},
    data: function(){
        return{
            oldPassword:"",
            newPassword:"",
            reNewPassword:"",
            isPasswordCorrect:false
        }
    },
    methods:{
        changePassword: function(){
            userServices.ChangePassword(this.newPassword,this.oldPassword).then(res=> {
                this.isPasswordCorrect=false;
                this.$router.push("/")
            }
            ).catch(e=>{
                if (e.response.status==400) {
                    this.isPasswordCorrect=true;
                }
                if (e.response.status==401) {
                    this.usernameAndLogout.logout();
                }
            }
            )
            
        }
    },
    validations:{
        oldPassword: {required,minLength: minLength(6) },
        newPassword: {required,minLength: minLength(6) },
        reNewPassword: {sameAsPassword: sameAs("newPassword") }

    }
}
</script>