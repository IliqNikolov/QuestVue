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
            <button :disabled="$v.$invalid">Enter</button>
        </font>
    </div>
    <div v-if="quest.Cheats>0 && quest.Status=='Started' && !quest.IsOwner">
        <button @click="cheat">cheat</button>
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
    {{mapInfo}}
</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import Map from "../quest/map"
export default {
    name:"Info",
    mixins:[validationMixin],
    props:["quest","mapInfo"],
    components:{Map},
    data:function(){
        return{
            code:"",
            invalidQuestCode:false
        }
    },
    validations:{
        code: {required}
    },
     methods:{
        start:function(){
            console.log("start");                       
        },  
        end:function(){
            console.log("end");                       
        },    
        deleteQuest:function(){
            console.log("delete");                       
        },  
        cheat:function(){
            console.log("cheat");                       
        },
        leave:function(){
            console.log("leave");                       
        },     
    }   
}
</script>