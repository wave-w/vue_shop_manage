import {request} from './request';
export function getorders(query, pagenum, pagesize, user_id,pay_status, is_send, 
    order_fapiao_title,order_fapiao_company, order_fapiao_content,consignee_addr) {
    return request({
        url: 'orders',
        method: "GET",
        params: {
            query, 
            pagenum, 
            pagesize,
            user_id,
            pay_status,
            is_send,
            order_fapiao_title,
            order_fapiao_company,
            order_fapiao_content,
            consignee_addr
        }
    })
}
export function getadressinfo(id) {
    return request({
        url: '/kuaidi/'+id,
        method: "GET",
        params: {
          id
        }
    })
}