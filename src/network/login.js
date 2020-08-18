import { request } from './request';
export function Login(username,password){
    return request({
        url : '/login',
        params: {
            username,
            password
        }
    })
}