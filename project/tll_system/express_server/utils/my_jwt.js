const crypto = require("crypto");       // 引入加密算法

// 签名函数
function sign(info, key) {
    // 用秘钥和sha256算法生成hmac对象
    const hmac = crypto.createHmac("sha256", key);
    // 将info存储为buffer类型的二进制数据
    hmac.update(info);
    // 返回一个16进制字符串
    return hmac.digest("hex");
}

// token失效函数
let valid = false
let jwt_record = null

function jwt_expire(seconds) {
    valid = false
    jwt_record = null
    console.log(`token经过${seconds}s后, 失效了`)
}

// 防抖(倒计时结束使token失效)
let timer
function debounce(fn, seconds) {
    return function() {
        console.log(`token将在${seconds}s后失效`);
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => { 
            fn(seconds);
        }, seconds * 1000);
    }
}

// JWT生成
function jwt_gen(info, key, seconds) {
    // 生成header
    const header = {
        typ: "JWT",
        alg: "HS256"
    };
    const header_str = Buffer.from(JSON.stringify(header)).toString("base64")
    // 生成payload
    const payload_str = Buffer.from(JSON.stringify(info)).toString("base64")
    // 生成signature
    const sig_str = Buffer.from(sign(header_str + "." + payload_str, key)).toString("base64")
    // 根据三者生成token
    const jwt = (header_str + "." + payload_str + "." + sig_str).replace(/=/g, "")
    valid = true
    jwt_record = jwt
    console.log("jwt_gen token: ", valid)
    // token expire
    debounce(jwt_expire, seconds)()
    return jwt
}

// 返回jwt的有效性（全局）
function token_verification(received_token) {
    // console.log('token valid: ', valid)
    // console.log('token equal: ', received_token === jwt_record)
    // console.log('received token: ', received_token)
    // console.log('record token: ', jwt_record)
    if(valid && received_token === jwt_record) return true
    else return false
}

// 将jwt秘钥生成函数和jwt校验函数导出
module.exports = {
    jwt_gen,
    token_verification
}