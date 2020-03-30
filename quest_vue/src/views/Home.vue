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
      <list @changeQuest="changeQuest" @changeQuestToThis="changeQuestToThis" :usernameAndLogout="usernameAndLogout"></list>
      <div v-if="Object.keys(quest).length === 0">
        Please slect Quest
      </div>
      <Info v-else :quest="quest" :mapInfo="mapInfo"></Info>
    </div>
    {{quest}}
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
      mapInfo:{}
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
    changeQuest:function(e){
      questServices.GetQuestInfo(e).then(res=>{
        this.mapInfo={     
             position:{ lat:res.data.MapLat, lng:res.data.MapLon},
             center:{ lat:res.data.MapLat, lng:res.data.MapLon},
             isMarkerLocked:true
          }
        this.quest=res.data
        }).catch(()=>{
        this.usernameAndLogout.logout();
      })   
    },
    changeQuestToThis:function(e){
      this.mapInfo={     
             position:{ lat:e.MapLat, lng:e.MapLon},
             center:{ lat:e.MapLat, lng:e.MapLon},
             isMarkerLocked:true
          }
      this.quest=e;
    }
  }
}
</script>
