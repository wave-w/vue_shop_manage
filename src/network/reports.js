import { request } from './request';
export function getreports(){
    return request({
        url:'/reports/type/1',
        method:'GET'
    })
}