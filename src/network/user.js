import { request} from './request';
export function user(query,pagenum,pagesize){
    return request({
        url : '/users',
        method:"GET",
        params: {
            query,
            pagenum,
            pagesize
        }
    })
}
//'/users/:'+parseInt(uId) + '/state/:' + Boolean(type), this.$http.put( `users/${userstate.id}/state/${userstate.mg_state}` )
//'/users/:'+uId+'/state/:'+type,//
       
export function adduser(username,password,email,mobile){
    return request({
        url :'/users',
        method: 'POST',
    data:{
            username,
            password,
            email,
            mobile
        }
    })
}
export function putuser(uId,type){
    return request({
        url :'/users/'+uId+'/state/'+type,
        method: 'PUT',
        params:{
        uId,
        type
        }
    })
}
export function  getuser(id){
    return request({
        url :'/users/'+id,
        method: 'GET',
        params:{
        id
        }
    })
}
export function  edituser(id,email,mobile){
    return request({
        url :'/users/'+id,
        method: 'PUT',
        data:{
        id,
        email,
        mobile
        }
    })
}
export function  deluser(id){
    return request({
        url :'/users/'+id,
        method: 'DELETE',
        data:{
        id
        }
    })
}
export function setuserroles(id,rid){
    return request({
        url:'/users/'+id+'/role',
        method:'PUT',
        params:{
            id
        },
        data:{
            rid
        }
    })
}