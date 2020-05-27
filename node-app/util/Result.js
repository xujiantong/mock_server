class Result {
    constructor(code,msg,data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
    success(){
        return {
            code: this.code,
            msg: this.msg,
            data: this.data
        }
    }

}

module.exports = Result;