const fs = require("fs")
const path = require('path')
const mkdirp = require('mkdirp')
const config = require('./config.json')

// 解析需要遍历的文件夹
let filePath = path.resolve(config.filePath)
let outPath = path.resolve(config.outPath)
// 定义空数组接收path
let arr = []
// 定义图片名称
let imageName = config.imageName
// 定义二级目录名称
let nextDir = config.nextDir
let nextDir_1 = config.nextDir_1
let nextDirArr = config.nextDirArr
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
   
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror,stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            // console.log(filedir);
                            arr.push(filedir)
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}



//调用文件遍历方法
fileDisplay(filePath)
setTimeout(() => {

  arr.forEach(function(filename){
    // console.log(filename)
    let start = filename.lastIndexOf('\\')
    let end = filename.lastIndexOf('.')
    let last = filename.substring(end+1)
    let realName =  filename.substring(start+1, end)

    let dir =  nextDirArr.includes(String(realName)) ? outPath + '\\' + realName + '\\' + nextDir_1 :   outPath + '\\' + realName + '\\' + nextDir
    // console.log(dir)
    mkdirp(dir, function (err) { 
        if (err) console.error(err) 
        else console.log('pow!')
        let soureceFile = path.join(filename)
    let outputPath = path.join(dir,  imageName + '.' + last)
    // console.log(outPath)

    let readStream = fs.createReadStream(soureceFile)
    let writeStream = fs.createWriteStream(outputPath)
    readStream.pipe(writeStream)
    });
    
  })
}, 1000)