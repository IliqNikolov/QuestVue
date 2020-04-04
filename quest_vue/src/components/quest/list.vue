<template>
    <v-container class="d-flex align-center flex-column">
        <v-row>
            <v-col>
                <v-btn color="primary" @click="toggleJoinQuest">{{joinButtonText}}</v-btn>
            </v-col>
            <v-col>
                <v-btn color="primary" to="/create">Create Quest</v-btn>
            </v-col>
        </v-row>
        <v-form  v-if="showQuestEntryForm" ref="form" >
            <div class="my-text-box">
            <v-text-field width="300" v-model="code" type="text" 
             label="Code" :rules="codeRules"></v-text-field>    
            </div>
            <div class="error--text" v-if="invalidQuestCode">Invalid Quest Code</div>
            <v-btn color="primary" @click="joinQuest">Enter</v-btn>
        </v-form>
        <v-list dense max-width="300">
            <v-divider></v-divider>
            <v-subheader>My Quests</v-subheader>
             <v-list-item v-for="quest in questList.MyQuests" :key="quest.Id">
              <span text @click="clickedQuest(quest.Id)">{{quest.Name}} - {{quest.Status}} </span>  
            </v-list-item>
            <v-divider></v-divider>
            <v-subheader>Other Quests</v-subheader>
             <v-list-item v-for="quest in questList.NotMyQuests" :key="quest.Id">
              <span text @click="clickedQuest(quest.Id)">{{quest.Name}} - {{quest.Status}} </span>  
            </v-list-item>
        </v-list>       
    </v-container>
</template>
<script>
import questServices from "../../services/questServices"

export default {
    name:"List",
    props:{usernameAndLogout:{},questList:{}},  
    data:function(){
        return{
            showQuestEntryForm:false,
            code:"",
            invalidQuestCode:false,
            codeRules:[
            v => !!v || "Code Name is required"
          ],
            joinButtonText:"Join Quest"
        }
    },   
    methods:{
        clickedQuest:function(id){
            this.$emit("changeQuest",id)          
        },        
        joinQuest:function(){
             if (this.$refs.form.validate()) {
            questServices.Join(this.code).then(res=>{
                this.code="";
                this.toggleJoinQuest();
                this.invalidQuestCode=false;
                this.$emit("changeQuestToThis",res.data);
            }
            ).catch(e=>{
                if (e.response.status==401) {
                    this.usernameAndLogout.logout();
                }
                else{
                    this.invalidQuestCode=true;
                }
            })
             }        
        },
        toggleJoinQuest:function(){
            if (this.showQuestEntryForm) {
                this.showQuestEntryForm=false;
                this.joinButtonText="Join Quest";
            }
            else{
                this.showQuestEntryForm=true;
                this.joinButtonText="Hide";
            }
        }      
    }
}
</script>
<style scoped>
.my-text-box {
    width: 300px !important;
  }
</style>