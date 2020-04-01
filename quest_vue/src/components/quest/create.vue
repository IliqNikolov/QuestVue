<template>
<v-container>
  <v-form ref="form" >
    <v-layout row justify-center>
      <v-flex xs12 sm6>
        <v-text-field v-model="questName" type="text" 
            label="Quest Name" :rules="nameRules"></v-text-field>            
        <v-text-field v-model="code" type="text" 
            label="Entry Code" :rules="codeRules"></v-text-field>   
        <v-text-field v-model="cheats" type="number" 
            label="Number of cheats" :rules="cheatRules"></v-text-field>
        <div class="text-center">
          <v-btn big type="button" @click="toggleMap" >{{buttonText}}</v-btn>
          <Map v-if="showMap" :mapInfo="mapInfo">
          </Map>
        </div>
        <div>
            <label>Date and Time of the quest's start(optional)</label>
            <v-text-field v-model="date" type="date"/>
            <v-text-field v-model="time" type="time"/>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row justify-center class="text-center">
      <v-flex  xs12 sm9>
        <h3>Stages</h3>
      </v-flex>
    </v-layout>
    <div v-for="(stage,i) in stages" :key="i">
      <hr>
      <v-layout wrap row>
        <v-layout col xs12 wrap sm6 justify-center>
          <v-flex xs12 sm12 md12 lg12>
            <v-text-field  v-model="stages[i].name" type="text" 
              label="Stage Name" :rules="stageRules"></v-text-field>
          </v-flex>
          <p></p>
          <v-flex xs12 sm12 md12 lg12>
            <v-text-field  v-model="stages[i].code" type="text" 
              label="Stage Code" :rules="stageCodeRules"></v-text-field> 
          </v-flex>  
        </v-layout>  
        <v-layout col xs12 sm6 justify-center>  
          <v-flex>
            <v-textarea auto-grow v-model="stages[i].description" type="text" 
              label="Stage Description" :rules="descriptionRules"></v-textarea>
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout row>
      <v-layout col justify-center>
        <v-btn :disabled="stages.length===1" type="button" @click="deleteStage(i)">Delete Stage</v-btn>
      </v-layout>
      </v-layout>
    </div>
       <v-layout row xs12 sm9 >
      <v-layout col justify-end>
      <v-flex xs4 sm3>
        <v-btn type="button" @click="addStage">Add Stage</v-btn>
      </v-flex>
      </v-layout>
      <v-layout col justify-start>
      <v-flex xs4 sm3>
        <v-btn @click="create">Create</v-btn>
      </v-flex>
      </v-layout>
    </v-layout>
  </v-form>
</v-container>
</template>
<script>
import Map from "../quest/map"
import questServices from "../../services/questServices";
export default {
    name:"Create",
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
          }],
          nameRules:[
            v => !!v || "Quest Name is required",
            v => (v && v.length >= 6) || "Quest Name can't be  less than 6 characters",           
          ],
          codeRules:[
            v => !!v || "Code Name is required"
          ],
          cheatRules:[
            v => Number.isInteger(parseInt(v)) || "Cheats must be an integer",
            v => v>=0 || "Cheats must be a non negative integer"
          ],
          stageRules:[v => !!v || "Stage Name is required"],
          descriptionRules:[v => !!v || "Stage Description is required"],
          stageCodeRules:[v => !!v || "Stage Code is required"],
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
        if (this.$refs.form.validate()) {
        questServices.Create(this.questName,this.code,this.cheats,this.mapInfo.position.lat,
        this.mapInfo.position.lng,this.showMap,this.date,this.time,this.stages).then(()=>{
          this.$router.push("/")
        }).catch(()=>this.usernameAndLogout.logout());
      }}
    },
    components:{Map}
}
</script>