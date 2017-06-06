
export default class Response{

    /**
     * 响应实体
     * @param code      响应code值
     * @param msg       响应的message
     * @param data      响应的数据
     */
    constructor(code,msg,data){
        if(!code){
            throw new Error("Code值不能为空");
        }
        this.code = code;

        if(!msg){
            this.msg = "";
        }
        this.msg = msg;

        if(!data){
            this.data = {};
        }
    }
}

export const SUCCESS = 100;
export const ERROR_COMMON = 101;