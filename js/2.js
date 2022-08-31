// appkey=adi5c90nmp6xwpqw44&nonce=899733&timestamp=1661929985&sign=2545A7FB70D94DFC42327B387AF384BB

var myforEach = function forEach(callback, thisArg) {
    var T, k;
    if (this == null) {
        throw new TypeError("this is null or not defined");
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
    }
    if (arguments.length > 1) {
        T = thisArg;
    }
    k = 0;
    while (k < len) {
        var kValue;
        if (k in O) {
            kValue = O[k];
            callback.call(T, kValue, k, O);
        }
        k++;
    }
}
var mymap = Array.prototype.map || function(fn) {
    if (Object.prototype.toString.call(fn) != "[object Function]") {
        throw new Error("传入参数不是函数");
    }
    var newArr = [];
    var arr = this;
    for (var i = 0; i < arr.length; i++) {
        var s = fn.call(this, arr[i], i, arr);
        if (s) {
            newArr.push(s);
        }
    }
    return newArr;
}

var md5Crypto = function (paramsJson, crypto) {
    var signField = paramsJson.signField || ['add_data']
    var cryptoParams = {};
    myforEach(function (key) {
        cryptoParams[key] = crypto[key]
    })
    myforEach(function (i) {
        cryptoParams[signField[i]] = paramsJson[signField[i]]
    })
    myforEach(function (i) {
        var key = signField[i]
        if(cryptoParams[key] == paramsJson[key])
        {
            return null;
        }
    })
    var cryptoSort = sortObjByKey(cryptoParams);
    var cryptoStr = "";
    mymap(function ('add_data') {
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

console.log(md5Crypto('',{appkey: 'adi5c90nmp6xwpqw44', timestamp: 1661926926, nonce: 773274}))