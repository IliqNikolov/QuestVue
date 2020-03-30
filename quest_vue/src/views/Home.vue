<template>
  <div class="home">
    <div v-if="!isLogged">
      <b> Hobbit:</b>
      <p> You! Mr. Bilbo where're you off to?</p>

      <b>Bilbo Baggins:</b>
      <p> I'm already late.</p>

      <b> Hobbit:</b>
      <p> Late for what?</p>

      <b> Bilbo Baggins:</b>
      <p> I'm going on an adventure.</p>
      <i>― J.R.R. Tolkien, The Hobbit</i>
    </div>
    <div v-else>
      <list @changeQuest="changeQuest" @changeQuestToThis="changeQuestToThis" :usernameAndLogout="usernameAndLogout" ref="list"></list>
      <div v-if="Object.keys(quest).length === 0">
        Please slect Quest
      </div>
      <Info v-else :invalidQuestCode="invalidQuestCode" :quest="quest" @start="start" @end="end" @cheat="cheat" @delete="deleteQuest" @leave="leave" @enter="enter" ref="info"></Info>
    </div>
  </div>
</template>

<script>
import List from '../components/quest/list'
import Info from '../components/quest/questInfo'
import questServices from '../services/questServices';

export default {
  name: 'Home',
  props:{usernameAndLogout:{}},  
  data:function(){
    return{
      isLogged:false,
      quest:{},
      invalidQuestCode:false   
    }
  },
  mounted:function(){
    if (localStorage.user) {
      this.isLogged=true;
    }
    else{
      this.isLogged=false;
    }
  },
  components:{List,Info},
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
    },
  }
}
</script>
