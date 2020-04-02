<template>
    <v-container class="fill-height">
        <v-layout row justify-center>
            <v-flex xs12 sm6>
                <v-simple-table width="300">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Name</th>
                                <th class="text-left">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(person,index) in resData.List" :key="index">
                                <td>{{person.Name}}</td>
                                <td>{{person.Score}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-flex>
        </v-layout>
    </v-container>
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