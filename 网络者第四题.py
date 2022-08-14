# encoding:utf-8
import requests
import json
import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs
from fake_useragent import UserAgent
import time
jspath = r"D:\desktop\jsworkspace\main.js"
url = r"http://spider.wangluozhe.com/challenge/api/4"
contex = execjs.compile(open(jspath,'r',encoding='utf8').read(),cwd=r'D:\desktop\jsworkspace\node_modules')
headers ={
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Length": "59",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Cookie": "session=dbc7a77a-c28d-4e26-a64f-3e763ca1220b.IENtOw8lYXJA_mSVRO_2dB-gNNw",
            "Host": "spider.wangluozhe.com",
            "Origin": "http://spider.wangluozhe.com",
            "Pragma": "no-cache",
            "Referer": "http://spider.wangluozhe.com/challenge/4",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest"
}
res = 0
for i in range(1,101):
    aaa = contex.call("tmp")
    data  ={
        "page": str(i),
        "count": "10",
        "_signature":aaa
    }
    print(aaa)
    response = requests.post(url,headers=headers,data=data)
    # print(response.text)
    data = json.loads(response.text)['data']
    for j in data:
        res += int(j['value'])
print(res)