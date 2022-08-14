"""
http://spider.wangluozhe.com/challenge/2
目标：采集100页的全部数字，并计算所有数据加和。本次题目加密算法是SHA1魔改版，请抠出源码进行计算！
"""


import requests
import execjs
import json
from fake_useragent import UserAgent

req_url = "http://spider.wangluozhe.com/challenge/api/2"
headers = {
    "User-Agent":UserAgent().random,
    'Cookie':'session=e0c54f39-f73c-4b7f-b4fd-e4b43eb0103e.cJx-LNxxsnHXFQfpfqf45PodFN8'

}

js_path = r"D:\Desktop\jsworkspace\main.js"
contex = execjs.compile(open(js_path,'r').read())

sum = 0

for i in range(1,101):
    post_data = {
        "page":str(i),
        "count":str(10),
        "_signature":contex.call('aaa')
    }

    reponse = requests.post(url = req_url,headers=headers,data=post_data)
    for j in json.loads(reponse.text)['data']:
        sum += j['value']

print(sum)





