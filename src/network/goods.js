import {request} from './request'
//categories
export function gtecategories(type,pagenum,pagesize){
    return request({
        url:'/categories',
        method:'GET',
        params:{
            pagenum,
            pagesize,
            type,
        }
    })
}
export function addcategories(cat_pid,cat_name,cat_level){
    return request({
        url:'/categories',
        method:'POST',
        data:{
            cat_pid,
            cat_name,
            cat_level
        }
    })
}
export function findcategoriesbyid(id){
    return request({
        url:'/categories/'+id,
        method:'GET',
        params:{
            id
        }
    })
}
export function delcate(id){
    return request({
        url:'/categories/'+id,
        method:'DELETE',
        params:{
            id
        }
    })
}
export function putcate(id,cat_name){
    return request({
        url:'/categories/'+id,
        method:'PUT',
        params:{
            id
        },
        data:{
            cat_name
        }
    })
}

//params
export function getparams(id,sel){
    return request({
        url:'/categories/'+id+'/attributes',
        method:'GET',
        params:{
            id,
            sel
        }
    })
}
export function addparams(id,attr_name,attr_sel,attr_vals){
    return request({
        url:'/categories/'+id+'/attributes',
        method:'POST',
        data:{
            id,
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}
export function delparams(id,attrid){
    return request({
        url:'/categories/'+id+'/attributes/'+attrid,
        method:'DELETE',
        params:{
            id,
            attrid
        }
    })
}
export function editparams(id,attrid,attr_name,attr_sel,attr_vals){
    return request({
        url:'/categories/'+id+'/attributes/'+attrid,
        method:'PUT',
        params:{
            id,
            attrid
        },
        data:{
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}

//goods
export function getgoods(query,pagenum,pagesize){
    return request({
        url:'goods',
        method:'GET',
        params:{
            query,
            pagenum,
            pagesize
        }
    })
}
export function delgoods(id){
    return request({
        url:'/goods/'+id,
        method:'DELETE',
        params:{
            id
        }
    })
}
export function addgoods(goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs){
    return request({
        url:'/goods',
        method:'POST',
        data:{
            goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        }
    })
}
