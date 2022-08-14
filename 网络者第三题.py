# encoding:utf-8
import requests
import json
import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs
from fake_useragent import UserAgent

jspath = r"D:\desktop\jsworkspace\main.js"
url = r"http://spider.wangluozhe.com/challenge/api/3"
contex = execjs.compile(open(jspath,'r',encoding='utf8').read(),cwd=r'D:\desktop\jsworkspace\node_modules')
headers ={
    "User-Agent":UserAgent().random,
"Cookie": "td_cookie=1035321796; session=883300f8-5564-4db6-8c31-6f15178905d3.r1eeIEtPeIrAHk5A4yUIp9_dw14",
"Accept": "application/json, text/javascript, */*; q=0.01",
"Accept-Encoding": "gzip, deflate",
"Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"

}
res = 0
for i in range(1,101):
    data  ={
        "page": str(i),
        "count": "10",
        "_signature":contex.call("res")
    }
    response = requests.post(url,headers=headers,data=data)
    data = json.loads(response.text)['data']
    for j in data:
        res += int(j['value'])

print(res)