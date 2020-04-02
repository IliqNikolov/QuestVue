<template>
<div>
    <div class="d-flex align-center flex-column">
        <h1>{{quest.QuestName}} ({{quest.Status}})</h1>
        <h3 v-if="0>quest.Cheats">Completed</h3>
        <div v-if="quest.IsOwner">
            <v-row>
                <v-col>
                    <v-btn v-if="quest.Status=='Not Started'" @click="start">Start</v-btn>
                    <v-btn v-if="quest.Status=='Started'" @click="end">End</v-btn>
                </v-col>
                <v-col><v-btn @click="deleteQuest">Delete</v-btn></v-col>
            </v-row>
        </div>
    </div>
    <div v-if="quest.IsOwner" class="d-flex align-center flex-column">
            <div>Code : {{quest.Code}}</div>
    </div>
    <div class="d-flex align-center flex-column" v-if="!quest.IsOwner && quest.Cheats>=0 && quest.Status=='Started'">
        <v-form ref="form" >
            <v-layout row>
                <v-layout col><div class="my-text-box"><v-text-field width="300" v-model="code" 
                  type="text" label="Code" :rules="codeRules"></v-text-field></div></v-layout>
                <v-layout col><v-btn @click="sendQuest">Enter</v-btn></v-layout>
            </v-layout>
            <div class="error--text" v-if="invalidQuestCode">Invalid Quest Code</div>
        </v-form>
    </div>
    <div class="d-flex align-center flex-column">
        <template v-if="quest.Cheats>=0">
            Cheats : {{quest.Cheats}}
        </template>
        Number of players : {{quest.PlayerCount}}
    </div>
    <div class="d-flex justify-space-around flex-row">
        <v-btn v-if="quest.Cheats>0 && quest.Status=='Started' && !quest.IsOwner" @click="cheat">Cheat</v-btn> 
        <v-btn v-if="!quest.IsOwner" @click="leave">Leave</v-btn>
    </div>
    <Map :mapInfo="mapInfo" v-if="quest.MapLat && quest.MapLon"></Map>
    <v-layout row>
        <v-layout col><v-flex ><input v-if="quest.Date" type="date" :disabled="true" :value="quest.Date"></v-flex></v-layout>
        <v-layout col><v-flex><input v-if="quest.Time" type="time" :disabled="true" :value="quest.Time"></v-flex></v-layout>
    </v-layout>  
    <template v-if="quest.Status!='Not Started || quest.IsOwner'">
        <v-stepper vertical>
            <template v-for="(stage,index) in quest.Stages">
                <v-stepper-step  :editable="!!stage.Description" :complete="!!stage.Description" :key="`${index}-step`" :step="index+1">
                    {{stage.Name}}          
                </v-stepper-step>
                <v-stepper-content :key="index" :step="index+1">
                    {{stage.Description}}
                </v-stepper-content>
            </template>
        </v-stepper>
    </template>
</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Map from "../quest/map"
export default {
    name:"Info",
    mixins:[validationMixin],
    props:["quest","invalidQuestCode"],
    components:{Map},
    data:function(){
        return{
            codeRules:[
            v => !!v || "Code Name is required"
          ],
            code:""       
        }
    },
    computed:{
        mapInfo:function(){return {     
             position:{ lat:this.quest.MapLat, lng:this.quest.MapLon},
             center:{ lat:this.quest.MapLat, lng:this.quest.MapLon},
             isMarkerLocked:true
        }
        }
    },
    validations:{
        code: {required}
    },
     methods:{
        start:function(){
            this.$emit("start")                       
        },  
        end:function(){
            this.$emit("end");                       
        },    
        deleteQuest:function(){
            this.$emit("delete");                       
        },  
        cheat:function(){
            this.$emit("cheat");                       
        },
        leave:function(){
            this.$emit("leave");                       
        },  
        sendQuest:function(){
            if (this.$refs.form.validate()) {
                this.$emit("enter",this.code);   
            }        
        },
        clearForm:function(){
            this.code="";
            this.$v.$reset();
        }
    }   
}
</script>
<style scoped>
.my-text-box {
    width: 300px !important;
  }
</style>