import { request } from './request';
export function muens(){
    return request({
        url : '/menus',
    })
}