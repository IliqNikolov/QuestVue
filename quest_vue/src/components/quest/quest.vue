<template>
<div>   
    <v-container class="hidden-sm-and-down">
      <v-layout row>
          <v-flex sm4 col>
            <div>
              <list @changeQuest="changeQuest" @changeQuestToThis="changeQuestToThis" :usernameAndLogout="usernameAndLogout" ref="list"></list>
            </div>
          </v-flex>
          <v-flex xs12 sm8 col>
            <h1 v-if="Object.keys(quest).length === 0">
                Please slect Quest
            </h1>
            <Info v-else :invalidQuestCode="invalidQuestCode" :quest="quest" @start="start" @end="end" @cheat="cheat" @delete="deleteQuest" @leave="leave" @enter="enter" ref="info"></Info>
          </v-flex>
      </v-layout>
    </v-container>
    <div class="hidden-md-and-up">
      <v-tabs grow centered v-model="tab">
        <v-tab>Quests</v-tab>
        <v-tab :disabled="isQuestSelected">Selected quest</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item><list @changeQuest="changeQuest" @changeQuestToThis="changeQuestToThis" :usernameAndLogout="usernameAndLogout" ref="list"></list></v-tab-item>
        <v-tab-item>
          <h1 v-if="Object.keys(quest).length === 0">
                Please slect Quest
            </h1>
            <Info v-else :invalidQuestCode="invalidQuestCode" :quest="quest" @start="start" @end="end" @cheat="cheat" @delete="deleteQuest" @leave="leave" @enter="enter" ref="info"></Info>
          </v-tab-item>      
      </v-tabs-items>      
    </div>
</div>
</template>

<script>
import List from '../quest/list'
import Info from '../quest/questInfo'
import questServices from '../../services/questServices';

export default {
  name:"Quest",
  props:{usernameAndLogout:{}}, 
  data:function(){
    return{
      quest:{},
      invalidQuestCode:false,
      tab:{} 
    }
  },
  components:{List,Info},
  computed:{
    isQuestSelected:function(){
      if(Object.keys(this.quest).length === 0){
      return true;
      }
      return false;
    }
  },
  watch: {
    quest:function(newQuest,oldQuest){    
      if (Object.keys(newQuest).length === 0) {
        this.tab=0
      }
      else if (Object.keys(newQuest).length >= 0) {
        this.tab=1
      }
    }
  },
  methods:{
    changeQuest:function(id){
      questServices.GetQuestInfo(id).then(res=>this.quest=res.data).catch(()=>{
        this.usernameAndLogout.logout();
      })   
    },
    changeQuestToThis:function(quest){
      this.quest=quest;
    },
    start:function(){
      questServices.Start(this.quest.Id).then(()=>{
        this.quest.Status="Started";
      }).catch(()=>this.usernameAndLogout.logout());
    },
    end:function(){
      questServices.End(this.quest.Id).then(()=>{
        this.quest.Status="Finished";
      }).catch(()=>this.usernameAndLogout.logout());
    },
    cheat:function(){
      questServices.Cheat(this.quest.Id).then(res=>{
        this.quest=res.data;
        this.$refs.info.clearForm();
      }).catch(()=>this.usernameAndLogout.logout());     
    },
    deleteQuest:function(){
      questServices.Delete(this.quest.Id).then(()=>{
        this.$refs.list.reftesh();
        this.quest={}}
        )
      .catch(()=>this.usernameAndLogout.logout());
    },
    leave:function(){
      questServices.Leave(this.quest.Id).then(()=>{
        this.$refs.list.reftesh();
        this.quest={}}
        )
      .catch(()=>this.usernameAndLogout.logout());
    },
    enter:function(code){
      questServices.EnterCode({QuestId:this.quest.Id,Code:code}).then(res=>{
        this.$refs.info.clearForm();
        this.quest=res.data;
        this.invalidQuestCode=false;
      }).catch(e=>{
        if (e.response.data=="Invalid Code") {
            this.invalidQuestCode=true;
        }
        else{
          this.usernameAndLogout.logout();
        }
      }
      )
    }
  }
}
</script>