import {request} from './request'
export function getrights(type){
    return request({
        url:'/rights/'+type,
        method:'GET',
        params:{
            type
        }
    })
}
export function getroles(){
    return request({
        url:'/roles',
        method:"GET"
    })
}
export function addroles(roleName,roleDesc){
    return request({
        url:'/roles',
        method:"POST",
        data:{
            roleName,
            roleDesc
        }
    })
}
export function geteditroles(id){
    return request({
        url:'/roles/'+id,
        method:"GET",
        data:{
            id
        }
    })
}
export function puteditroles(id,roleName,roleDesc){
    return request({
        url:'/roles/'+id,
        method:"PUT",
        params:{
            id
        },
        data:{
            roleName,
            roleDesc
        }
    })
}
export function delroles(id){
    return request({
        url:'/roles/'+id,
        method:"DELETE",
        params:{
            id
        },
    })
}
export function deltag(roleId,rightId){
    return request({
        url:'/roles/'+roleId+'/rights/'+rightId,
        method:'DELETE',
        params:{
            roleId,
            rightId
        }
    })
}
export function putrights(roleId,rids){
    return request({
        url:'/roles/'+roleId+'/rights',
        method:'POST',
        params:{
            roleId,
        },
        data:{
            rids
        }
    })
}