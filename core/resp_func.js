import Response,* as RESP from './resp_code';

/**
 * 当文件上传失败时进行调用
 * @param res   响应实体
 */
export function onFailed(res,code,message){
    let resp = new Response(code,message);

    res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
    res.end(JSON.stringify(resp));
}

export function onSuccess(res,msg,data){
    let resp = new Response(RESP.SUCCESS,msg,data);

    res.status(200);
    res.set('Content-Type','text/plain;charset=utf-8');
    res.end(JSON.stringify(resp),'utf-8');
}