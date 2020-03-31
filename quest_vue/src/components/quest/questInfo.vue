<template>
<div>
    <div>
        <h1>{{quest.QuestName}} ({{quest.Status}})</h1>
        <h3 v-if="0>quest.Cheats">Completed</h3>
        <div v-if="quest.IsOwner">
        <button v-if="quest.Status=='Not Started'" @click="start">Start</button>
        <button v-if="quest.Status=='Started'" @click="end">End</button>
        <button @click="deleteQuest">Delete</button>
        <div>Code : {{quest.Code}}</div>
        </div>
    </div>
    <div v-if="!quest.IsOwner && quest.Cheats>=0 && quest.Status=='Started'">
        <font @submit.prevent="sendQuest">
            <label>Code</label>
            <input v-model="code" type="text" @blur="$v.code.$touch()">
            <div v-if="$v.code.$error">Entry Code is required</div>
            <div v-if="invalidQuestCode">Invalid Quest Code</div>
            <button @click="sendQuest" :disabled="$v.$invalid">Enter</button>
        </font>
    </div>
    <div v-if="quest.Cheats>0 && quest.Status=='Started' && !quest.IsOwner">
        <button @click="cheat">Cheat</button>
    </div>  
    <div>
        Number of players : {{quest.PlayerCount}}
    </div>
    <div v-if="quest.Cheats>=0">
        Cheats : {{quest.Cheats}}
    </div>
    <div v-if="!quest.IsOwner">
        <button @click="leave">Leave</button>
    </div> 
    <Map :mapInfo="mapInfo" v-if="quest.MapLat && quest.MapLon"></Map>
    <div>
        <input v-if="quest.Date" type="date" :disabled="true" :value="quest.Date">
        <input v-if="quest.Time" type="time" :disabled="true" :value="quest.Time">
    </div>  
    <template v-if="quest.Status!='Not Started || quest.IsOwner'">
        <div v-for="(stage,index) in quest.Stages" :key="index">
        <hr>
            {{stage.Name}} - {{stage.Description}}
        </div>
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
            this.$emit("enter",this.code);           
        },
        clearForm:function(){
            this.code="";
            this.$v.$reset();
        }   
    }   
}
</script>