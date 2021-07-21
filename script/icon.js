

const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const request = require('umi-request');
const wget = require('wget')

const extendRequest = request.extend({ timeout: 10000 });

const icon = [{  // 自动维护图标
  aliUrl: '//at.alicdn.com/t/font_2299850_kho69zvazd.css', // 暂时只支持使用阿里巴巴图标库
  dir: './public/fonts'  // 公共图标
}]


const postUrl = (_url, fn) => {
  extendRequest(_url)
    .then(function (response) {
      fn(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const downIcon = (iconUrl, dir) => {
  postUrl('https:' + iconUrl, (chunk) => {
    let form = 0
    let to = form
    let urlList = []
    let count = 0
    while (form !== -1 && to !== -1) {
      count++
      if (count > 3000) throw new Error("gen icon failed")
      form = to + 1
      form = chunk.indexOf("url(", form)
      to = chunk.indexOf(")", form + 1)
      if (form !== -1 && to !== -1) {
        urlList.push(chunk.substr(form + 5, to - form - 6))
      }
    }
    urlList = _.uniq(urlList.map(_url => _url.split("#")[0]))
    count = urlList.length
    urlList.forEach(_url => {
      let __url = _url.split("?")[0]
      let { ext } = path.parse(__url)
      let fileName = "iconfont" + ext
      let filePath = path.join(dir, fileName)
      fs.existsSync(filePath) && fs.unlinkSync(filePath)
      if (__url[0] !== '/') return
      let download = wget.download("https:" + __url, filePath, {})
      chunk.split(_url).join("")
      download.on('error', function (err) {
        throw err
      })
    })
    urlList.forEach(_url => {
      let strs = _url.split('?')[0].split('.')
      let type = strs[strs.length - 1]
      if (_url[0] !== '/') return
      chunk = chunk.replace(_url, './iconfont.' + type)
      chunk = chunk.replace(_url, './iconfont.' + type)
    })

    // chunk = chunk.replace('./iconfont', "./assets/fonts/iconfont");    //去掉空格
    chunk = chunk.replace(/\.\/iconfont/g, "./iconfont");    //去掉空格
    console.log(chunk)
    fs.writeFileSync(path.join('./public/fonts/fonts.css'), chunk)
  })
}


// 删除文件方法
const delDir = (path) => {
  let files = [];

  return new Promise((resolve, rejec) => {
    console.log(fs.existsSync(path), 5555)
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
        let curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          delDir(curPath); //递归删除文件夹
        } else {
          fs.unlinkSync(curPath); //删除文件
        }
        // 
        if (fs.readdirSync(path).length == 0) {
          fs.rmdirSync(path);
          resolve(true)
        }
      });
      if (files.length == 0) {
        fs.rmdirSync(path);
        resolve(true)
      }
    } else {
      resolve(true);
    }
  })
}

// 删除文件夹
delDir(path.resolve(icon[0].dir)).then(r => {
  if (!r) return;
  // 重新创建文件夹 
  fs.mkdir('./public/fonts/', function (error) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('创建目录成功');
    // 循环获取文件
    for (let item of icon) {
      downIcon(item.aliUrl, path.resolve(item.dir));
    }
  })
});
