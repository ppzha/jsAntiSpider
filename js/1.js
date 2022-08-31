const CryptoJS = require('crypto-js');
/*
undefined
adi5c90nmp6xwpqw44
511159
1661928146
55aa969f2468ffd4cd13799bdcf806f7

* */

var appkey = "adi5c90nmp6xwpqw44";
// var nonce = Math.floor(Math.random() * 999999 + 100000);
// var timestamp = parseInt(new Date().getTime() / 1000);
var app_secret = '55aa969f2468ffd4cd13799bdcf806f7';
var nonce = 719313
var timestamp = 1661929197

function get_sign(){
    var stringText = "undefined" + appkey+nonce+timestamp+app_secret;
    console.log(stringText)
    return CryptoJS.MD5(stringText).toString().toLocaleUpperCase();

}

console.log("sign:" + get_sign())

