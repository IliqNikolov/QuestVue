<template>
<v-container class="fill-height">
        <v-layout row justify-center>
            <v-flex xs12 sm6>
                <v-form ref="form">
                    <v-text-field v-model="oldPassword" type="password"
                         label="Old Password" :rules="oldPasswordRules"></v-text-field>
                        <v-text-field v-model="newPassword" type="password"
                         label="New Password" :rules="newPasswordRules"></v-text-field>
                        <v-text-field v-model="reNewPassword" type="password"
                         label="Repeat New Password" :rules="reNewPasswordRules"></v-text-field>
                    <div class="error--text" v-if="isPasswordCorrect">Invalid password</div>
                    <v-btn color="primary" @click="changePassword">Change Password</v-btn>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import userServices from '../../services/userServices'

export default {
    name:"ChangePassword",
    props:{usernameAndLogout:{}},
    data: function(){
        return{
            oldPassword:"",
            newPassword:"",
            reNewPassword:"",
            isPasswordCorrect:false,
            oldPasswordRules:[
                v => !!v || 'Password is required',
                v => (v && v.length >= 6) || "Password can't be  less than 6 characters",
            ],
            newPasswordRules:[
                v => !!v || 'Repeat New Password is required',
                v => (v && v.length >= 6) || "New Password can't be  less than 6 characters",
            ],
            reNewPasswordRules:[
                v => !!v || 'Repeat New Password is required',
                v => (v && v.length >= 6) || "Repeat New Password can't be  less than 6 characters",
                v => v==this.newPassword || "New Passwords don't match"               
            ],
        }
    },
    methods:{
        changePassword: function(){
            if (this.$refs.form.validate()) {
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
        }
    }
}
</script>