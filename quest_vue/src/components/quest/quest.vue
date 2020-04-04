<template>
<div>   
    <v-container class="hidden-sm-and-down">
      <v-layout row>
          <v-flex sm4 col>
            <div>
              <list @changeQuest="changeQuest" @changeQuestToThis="changeQuestToThis" :usernameAndLogout="usernameAndLogout" :questList="questList"></list>
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
        <v-tab-item><list @changeQuest="changeQuest" @changeQuestToThis="changeQuestToThis" :usernameAndLogout="usernameAndLogout" :questList="questList"></list></v-tab-item>
        <v-tab-item>
          <h1 v-if="Object.keys(quest).length === 0">
                Please slect Quest
            </h1>
            <Info v-else :invalidQuestCode="invalidQuestCode" :quest="quest" @start="start" @end="end" @cheat="cheat" @delete="deleteQuest" @leave="leave" @enter="enter" ref="infoM"></Info>
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
      tab:{} ,
      questList:{}
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
  mounted:function(){
        questServices.GetQuestList().then(res=>this.questList=res.data
            ).catch(()=>this.usernameAndLogout.logout());
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
      questServices.GetQuestInfo(id).then(res=>{
        this.quest=res.data
        this.reftesh();
        this.invalidQuestCode=false;
        }).catch(()=>{
        this.usernameAndLogout.logout();
      })   
    },
    changeQuestToThis:function(quest){
      this.reftesh();
      this.quest=quest;
      this.invalidQuestCode=false;
    },
    start:function(){
      questServices.Start(this.quest.Id).then(()=>{
        this.quest.Status="Started";
        this.reftesh();
      }).catch(()=>this.usernameAndLogout.logout());
    },
    end:function(){
      questServices.End(this.quest.Id).then(()=>{
        this.quest.Status="Finished";
        this.reftesh();
      }).catch(()=>this.usernameAndLogout.logout());
    },
    cheat:function(){
      questServices.Cheat(this.quest.Id).then(res=>{
        this.ressetCode();
      }).catch(()=>this.usernameAndLogout.logout());     
    },
    deleteQuest:function(){
      questServices.Delete(this.quest.Id).then(()=>{
        this.reftesh();
        this.quest={}}
        )
      .catch(()=>this.usernameAndLogout.logout());
    },
    leave:function(){
      questServices.Leave(this.quest.Id).then(()=>{
        this.reftesh();
        this.quest={}}
        )
      .catch(()=>this.usernameAndLogout.logout());
    },
    enter:function(code){
      questServices.EnterCode({QuestId:this.quest.Id,Code:code}).then(res=>{        
        this.ressetCode();
        this.quest=res.data;
      }).catch(e=>{
        if (e.response.data=="Invalid Code") {
            this.invalidQuestCode=true;
        }
        else{
          this.usernameAndLogout.logout();
        }
      }
      )
    },
    reftesh:function(){
      questServices.GetQuestList().then(res=>this.questList=res.data
      ).catch(()=>this.usernameAndLogout.logout());
    },
    ressetCode:function(){
      this.$refs.info.clearForm();
      this.$refs.infoM.clearForm();
      this.invalidQuestCode=false;
    }
  }
}
</script>