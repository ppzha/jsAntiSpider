var appkey = 'adi5c90nmp6xwpqw44';
var app_secret = '55aa969f2468ffd4cd13799bdcf806f7'
var encrypt = function (data, cfg) {
    var timestamp = getTimestamp();
    var nonce = Math.floor(Math.random() * 999999 + 100000)
    var crypto = {appkey: appkey, timestamp: timestamp, nonce: nonce,};
    var sign = md5Crypto(data, crypto);
    data.signField && delete data.signField;
    var result = {appkey: crypto.appkey, nonce: crypto.nonce, timestamp: crypto.timestamp, sign: sign,};
    for (var key in data) {
        result[key] = data[key]
    }
    if (!cfg) {
        return result;
    } else {
        var formData = new FormData();
        for (var key in result) {
            if (key == 'add_data') {
                formData.append(key, JSON.stringify(result[key]))
            } else {
                formData.append(key, result[key])
            }
        }
        ;var param = new URLSearchParams(formData);
        return param;
    }
    ;
};
var encryptPost = function (data) {
    var appkey = "mdi5c90nmp6xwpqw56"
    var appSecret = "80aa969f2468ffd4cd13799bdcf80619";
    var nonce = Math.floor(Math.random() * 999999 + 100000)
    var sign1 = {appkey: appkey, nonce: nonce, timestamp: parseInt(new Date().getTime() / 1000),}
    var temp = {}
    data.forEach(function (item) {
        temp[item.key] = item.value
    })
    var ddata = temp
    for (var i in ddata) {
        sign1[i] = ddata[i]
    }
    var sign2 = objKeySort(sign1)
    var sign3 = ""
    for (var i in sign2) {
        sign3 += sign2[i]
    }
    var formData = new FormData()
    formData.append(data[0].key, data[0].value)
    formData.append(data[1].key, data[1].value)
    var params = [{key: "appkey", value: appkey}, {key: "nonce", value: nonce}, {
        key: "timestamp",
        value: parseInt(new Date().getTime() / 1000)
    }, {key: "sign", value: CryptoJS.MD5(sign3 += appSecret).toString().toLocaleUpperCase()},]
    for(var i = 0;i < params.length; i++)
    {
        formData.append(params[i].key, params[i].value)
    }
    return new URLSearchParams(formData);
};

function objKeySort(obj) {
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
}

var getTimestamp = function () {
    return parseInt(new Date().getTime() / 1000);
};
var md5Crypto = function (paramsJson, crypto) {
    var signField = paramsJson.signField || ['add_data']
    var cryptoParams = {};
    Object.keys(crypto).myforEach(function (key) {
        cryptoParams[key] = crypto[key]
    })
    Object.keys(signField).myforEach(function (i) {
        cryptoParams[signField[i]] = paramsJson[signField[i]]
    })
    Object.keys(signField).myforEach(function (i) {
        var key = signField[i]
        if(cryptoParams[key] == paramsJson[key])
        {
            return null;
        }
    })
    var
    cryptoSort = sortObjByKey(cryptoParams);
    var cryptoStr = "";
    Object.keys(cryptoSort).mymap(function (item) {
        cryptoStr += typeof cryptoSort[item] == 'object' ? JSON.stringify(cryptoSort[item]) : cryptoSort[item];
    })
    cryptoStr += app_secret;
    var md5CryptoUpper = CryptoJS.MD5(cryptoStr).toString().toLocaleUpperCase();
    return md5CryptoUpper;
};
var sortObjByKey = function (obj) {
    var keys = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < keys.length; i++) {
        var index = keys[i];
        newObj[index] = obj[index];
    }
    return newObj;
};

function ajax(methods, url, data, callback, simple) {
    var xhr = new XMLHttpRequest();
    if (methods == 'get') {
        if (data.flag == 'xcsp') {
            appkey = "ddi5c90nmp6xwpqw47";
            var baseURL = ' http://dwxcb.wxcu.edu.cn/api/';
            app_secret = '85aa969f2468ffd4cd13799bdcf80610';
        } else {
            appkey = 'adi5c90nmp6xwpqw44';
            var baseURL = 'http://www.wxcu.edu.cn/api';
            app_secret = '55aa969f2468ffd4cd13799bdcf806f7';
        }
        var paramsStr = filterParams(JSON.stringify(encrypt(data)))
        var paramsStr1 = encodeURI(paramsStr)
        xhr.open('get', baseURL + url + '?' + paramsStr1, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                var res = JSON.parse(xhr.responseText)
                if(!simple)
                {
                    callback(res.data)
                }
            else
                {
                    callback(res)
                }
            }
        };
        xhr.send();
    } else if (methods == 'post') {
        appkey = "ndi5c90nmp6xwpqw57"
        app_secret = "90aa969f2468ffd4cd13799bdcf80620";
        var baseURL = 'http://www.wxcu.edu.cn/api';
        xhr.open('post', baseURL + url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(encryptPost(data));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                var res = JSON.parse(xhr.responseText)
                callback(res)
            }
        };
    }
}
