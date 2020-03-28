import axios from "axios"

const url="https://localhost:44383/api/Quest";

export default { 
    Score() 
    {
        return axios.get(`${url}/Score`);
    }
    
}
