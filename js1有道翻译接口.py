import json
import requests
from fake_useragent import UserAgent
import hashlib
import random
import time
test = ['一','二','三','四']
url = r"https://fanyi.youdao.com/translate_o?smartresult=dict&smartresult=rule"

# bv = md5("5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36")
# salt = r + int(10 * Math.random())
# lts = (new Date).getTime()
# sign = md5("fanyideskweb" + e + salt + "Ygy_4c=r#e#4EX^NUGUc5")

def getmd5(d):
    m = hashlib.md5()
    m.update(d.encode())
    return m.hexdigest()


ts = str(int(time.time()))+'000'
salt = ts+str(int(random.random()*10))


for  i in  test:
    data = {
        "i": "明白",
        "from": "AUTO",
        "to": "AUTO",
        "smartresult": "dict",
        "client": "fanyideskweb",
        "salt": salt,
        "sign": getmd5("fanyideskweb" + str(i) + salt + "Ygy_4c=r#e#4EX^NUGUc5"),
        "lts": ts,
        "bv": getmd5(
            "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"),
        "doctype": "json",
        "version": "2.1",
        "keyfrom": "fanyi.web",
        "action": "FY_BY_REALTlME"
    }
    header = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Length": "252",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie": "OUTFOX_SEARCH_USER_ID=-1357880989@10.108.162.138; OUTFOX_SEARCH_USER_ID_NCOO=298735761.70872587; ___rl__test__cookies=1660132486275",
        "Host": "fanyi.youdao.com",
        "Origin": "https://fanyi.youdao.com",
        "Pragma": "no-cache",
        "Referer": "https://fanyi.youdao.com/",
        "sec-ch-ua": "\"Chromium\";v=\"104\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"104\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    data['i'] = i
    response = requests.post(url=url,headers = header,data = data)
    print(json.loads(response.text)['translateResult'])

