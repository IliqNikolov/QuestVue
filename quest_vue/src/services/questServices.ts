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
        }
    
}
