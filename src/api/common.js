import request from '@/utils/request';

// 获取基础配置
export function getDex(data) {
    return request({
        url: "/dex.php",
        method: "get",
        data
    })
}

export function subscribe(data){
    return request({
        url: "/test.php",
        method: "post",
        data
    })
}
