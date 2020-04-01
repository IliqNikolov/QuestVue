<template>
<div>
    <table>
        <tr>
        <th>Name</th>
        <th>Points</th>
    </tr>
    <tr v-for="(person,index) in resData.List" :key="index">
        <td>
            {{person.Name}}
        </td>
        <td>
            {{person.Score}}
        </td>
    </tr>
    </table>
</div>
</template>

<script>
import questServices from '../../services/questServices';


export default  {
    name: 'HighScores',
    data: function()
    {
        return{
            resData:{}
        }
    },
    mounted: function(){
        this.getData()
    },
    methods:{
        getData: function () {
            questServices.Score().then(res =>{              
                this.resData=res.data
        })
        }
    }
}
</script>

<style scoped>

</style>