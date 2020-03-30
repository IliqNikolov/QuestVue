import axios from "axios"
import {IQuest} from "../Interfaces/quest"


const url="https://localhost:44383/api/Quest";

export default { 
    Score(){
        return axios.get(`${url}/Score`);
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
            const http = axios.create({
                withCredentials: true
              });
            return http.post(`${url}/Create`,quest)
        },

    GetQuestList(){
        const http = axios.create({
            withCredentials: true
          });
        return http.get(`${url}/List`)
    },

    Join(code: string){
        const http = axios.create({
            withCredentials: true
          });
        return http.post(`${url}/Join`,{code:code})
    },

    GetQuestInfo(id: string){
        const http = axios.create({
            withCredentials: true
          });
          return http.get(`${url}/${id}`)
    },

    Start(code: string){
        const http = axios.create({
            withCredentials: true
          });
          return http.post(`${url}/Start`,{code:code})
    },

    End(code: string){
        const http = axios.create({
            withCredentials: true
          });
          return http.post(`${url}/End`,{code:code})
    },

    Delete(code: string){
        const http = axios.create({
            withCredentials: true
          });
          return http.post(`${url}/Delete`,{code:code})
    },

    EnterCode(code: string){
        const http = axios.create({
            withCredentials: true
          });
          return http.post(`${url}/Code`,code)
    },

    Cheat(code: string){
        const http = axios.create({
            withCredentials: true
          });
          return http.post(`${url}/Cheat`,{code:code})
    },

    Leave(code: string){
        const http = axios.create({
            withCredentials: true
          });
          return http.post(`${url}/Leave`,{code:code})
    }
}
