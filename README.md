- 说明

复制image下文件到指定的目录，如image/1.jpg -->  1/newindex2/images/activity/test.jpg
- 运行

`
node index.js
`
- 配置

`
{
  "filePath": "./image",   // 源文件目录
  
  "outPath": "./output",   // 输出文件目录
  
  "imageName": "test",    // 输出文件名称(重名之后的)
  
  "nextDir": "newindex",  // 一个二级目录的情况
  
  "nextDir_1": "newindex2/images/activity",  // 其他二级目录的情况
  
  "nextDirArr": ["1", "2", "bir"]          // 需要生成其他二级目录的图片名称
}
`
