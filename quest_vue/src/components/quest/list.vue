<template>
    <div>
        <div>
            <button @click="toggleJoinQuest">{{joinButtonText}}</button>
            <router-link to="/create" tag="button">Create Quest</router-link>
        </div>
        <font v-if="showQuestEntryForm" @submit.prevent="joinQuest">
            <label>Code</label>
            <input v-model="code" type="text" @blur="$v.code.$touch()">
            <div v-if="$v.code.$error">Entry Code is required</div>
            <div v-if="invalidQuestCode">Invalid Quest Code</div>
            <button :disabled="$v.$invalid" @click="joinQuest">Enter</button>
        </font>
        <h4>My Quests</h4>
        <ul>
            <li v-for="quest in questList.MyQuests" :key="quest.Id">
              <a @click="clickedQuest(quest.Id)">{{quest.Name}} - {{quest.Status}} </a>  
            </li>
        </ul>
        <h4>Other Quests</h4>
        <ul>
            <li v-for="quest in questList.NotMyQuests" :key="quest.Id">
              <a @click="clickedQuest(quest.Id)">{{quest.Name}} - {{quest.Status}} </a>  
            </li>
        </ul>
    </div>
</template>
<script>
import questServices from "../../services/questServices"
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
    name:"List",
    mixins:[validationMixin],
    props:{usernameAndLogout:{}},  
    data:function(){
        return{
            questList:{},
            showQuestEntryForm:false,
            code:"",
            invalidQuestCode:false,
            joinButtonText:"Join Quest"
        }
    },
    mounted:function(){
        questServices.GetQuestList().then(res=>this.questList=res.data
            ).catch(()=>this.usernameAndLogout.logout());
    },
    methods:{
        clickedQuest:function(id){
            this.$emit("changeQuest",id)          
        },
        reftesh:function(){
                questServices.GetQuestList().then(res=>this.questList=res.data
                ).catch(()=>this.usernameAndLogout.logout());
        },
        joinQuest:function(){
            questServices.Join(this.code).then(res=>{
                this.reftesh();
                this.code="";
                this.$v.$reset();
                this.toggleJoinQuest();
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
    },
     validations:{
        code: {required}
     }
}
</script>