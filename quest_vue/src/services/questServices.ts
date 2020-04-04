import axios from "axios"
import {IQuest} from "../Interfaces/quest"


const url="https://localhost:44383/api/Quest";

export default { 
    Score(){
        return axios.get(`${url}/Score`);
    },
    
    GetHTTP(){
        return axios.create({
            withCredentials: true
          });
    },
    Create(questName: string,
        code: string,
        cheats: number,
        mapLat: number,
        mapLon: number,
        isSelected: boolean,
        date: string,
        time: string,
        stages: any[]){
            const quest={} as IQuest;
            quest.questName=questName;
            quest.code=code;
            quest.cheats=cheats;
            if (isSelected && mapLat && mapLon) {
                quest.mapLat=mapLat;
                quest.mapLon=mapLon;
            }
            quest.date=date;
            quest.time=time;
            quest.stages=stages;
            return this.GetHTTP().post(`${url}/Create`,quest)
        },
    GetQuestList(){    
        return this.GetHTTP().get(`${url}/List`)
    },

    Join(code: string){      
        return this.GetHTTP().post(`${url}/Join`,{code:code})
    },

    GetQuestInfo(id: string){       
          return this.GetHTTP().get(`${url}/${id}`)
    },

    Start(code: string){
          return this.GetHTTP().post(`${url}/Start`,{code:code})
    },

    End(code: string){
          return this.GetHTTP().post(`${url}/End`,{code:code})
    },

    Delete(code: string){
          return this.GetHTTP().post(`${url}/Delete`,{code:code})
    },

    EnterCode(code: string){
          return this.GetHTTP().post(`${url}/Code`,code)
    },

    Cheat(code: string){
          return this.GetHTTP().post(`${url}/Cheat`,{code:code})
    },

    Leave(code: string){
          return this.GetHTTP().post(`${url}/Leave`,{code:code})
    }
}
