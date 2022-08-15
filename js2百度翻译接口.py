# https://mp.weixin.qq.com/s/li_UBzEUvLmaL207eFhyvw
# https://fanyi.baidu.com/

import requests
import json
from fake_useragent import UserAgent

test = ['一','二','三','四']
url = r"https://fanyi.baidu.com/v2transapi?from=zh&to=en"

for  i in  test:
    data = {
        "from": "zh",
        "to": "en",
        "query": i,
        "transtype": "translang",
        "simple_means_flag": "3",
        "sign": "146987.449818",
        "token": "f1ad27c18301ca70439be29f2b2772dd",
        "domain": "common"
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