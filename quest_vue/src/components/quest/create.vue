<template>
<form @submit.prevent="create">
  <div>
        <label>Quest Name</label>
        <input v-model="questName" type="text" @blur="$v.questName.$touch()">
        <div v-if="$v.questName.$error">Quest Name must be at least 6 characters long</div>
    </div>
     <div>
        <label>Entry Code</label>
        <input v-model="code" type="text" @blur="$v.code.$touch()">
        <div v-if="$v.code.$error">Entry Code is required</div>
    </div>
    <div>
        <label>Number of cheats</label>
        <input v-model="cheats" type="number" @blur="$v.cheats.$touch()">
        <div v-if="$v.cheats.$error">Number of cheats should be positive</div>
    </div>
    <div>
      <button type="button" @click="toggleMap">{{buttonText}}</button>
      <Map v-if="showMap" :mapInfo="mapInfo">
      </Map>
    </div>
    <div>
        <label>Date and Time of the quest's start(optional)</label>
        <input v-model="date" type="date">
        <input v-model="time" type="time">
    </div>
    <div>
      <h3>Stages</h3>
      <div v-for="(stage,i) in $v.stages.$each.$iter" :key="i">
        <hr>
        <label>Stage Name</label>
        <input v-model="stages[i].name" type="text" @blur="stage.name.$touch()">
        <div v-if="stage.name.$error">Name is required</div>
        <label>Stage Description</label>
        <input v-model="stages[i].description" type="text" @blur="stage.description.$touch()">
        <div v-if="stage.description.$error">Description is required</div>
        <label>Stage Code</label>
        <input v-model="stages[i].code" type="text" @blur="stage.code.$touch()">
        <div v-if="stage.code.$error">Code is required</div>
        <button type="button" @click="deleteStage(i)">Delete Stage</button>
      </div>
    <button type="button" @click="addStage">Add Stage</button>
    </div>
    <button>Create</button>
</form>
</template>
<script>
import Map from "../quest/map"
import { validationMixin } from "vuelidate";
import { required, minLength, minValue } from "vuelidate/lib/validators";
import questServices from "../../services/questServices"
export default {
    name:"Create",
    mixins:[validationMixin],
    props:{usernameAndLogout:{}},   
    data(){
        return{  
          mapInfo:{     
             position:{ lat:42.68514255501258, lng:23.34247648715973},
             center:{lat:42.68514255501258, lng:23.34247648715973},
             isMarkerLocked:false
          },
          questName:"",
          code:"",
          cheats:0,
          buttonText:"Add Map",
          showMap:false,
          date:"",
          time:"",
          stages:[{
            name:"",
            description:"",
            code:""
          }]
        }
    },
    methods:{
      clicked: function(e){
        this.mapInfo.position.lat=e.latLng.lat();
        this.mapInfo.position.lng=e.latLng.lng();        
      },
      toggleMap: function(){
        if (this.showMap) {
          this.showMap=false;
          this.buttonText="Add Map";
        }
        else{
          this.showMap=true;
          this.buttonText="Remove map";
        }
      },
      addStage: function(){
        this.stages=this.stages.concat({
          name:"",
            description:"",
            code:""
        })
      },
      deleteStage: function(e){
        this.stages.splice(e,1);               
      },
      create: function(){
        questServices.Create(this.questName,this.code,this.cheats,this.mapInfo.position.lat,
        this.mapInfo.position.lng,this.showMap,this.date,this.time,this.stages).then(()=>{
          this.$router.push("/")
        }).catch(e=>this.usernameAndLogout.logout());
      }
    },
    components:{Map},
    validations:{
        questName: {required,minLength: minLength(6) },
        code: {required},
        cheats:{required,minValue: minValue(0)},
        stages:{
          $each:{
            name:{required},
            description:{required},
            code:{required}
          }
        }
    }
}
</script>