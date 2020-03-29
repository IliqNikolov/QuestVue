import axios from "axios"
import {IUser} from "../Interfaces/user"
import {IChangePassword} from "../Interfaces/change-password"

const url="https://localhost:44383/api/User";

export default { 
    Login(username: string,password: string){
        const user = {} as IUser;
        user.Password=password;
        user.Username=username
        return axios.post(`${url}/Login`,user);
    },

    Register(username: string,password: string){
        const user = {} as IUser;
        user.Password=password;
        user.Username=username;
        return axios.post(`${url}/Register`,user);
    },

    ChangePassword(newPassword: string,password: string){
        const passwordData={} as IChangePassword;
        passwordData.Password=password;
        passwordData.NewPassword=newPassword;   
        const http = axios.create({
            withCredentials: true
          });
        return http.post(`${url}/Changepassword`,passwordData)
    }

}