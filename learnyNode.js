//#1//console.log('Привет, мир!');
/*#2//var process = require('process');
console.log(process.argv);*
---------------------------------------
 C:\Users\Wersus_\Desktop\NodeApp\myProject>node learnyNode.js 1 2 3
 [ 'C:\\Program Files\\nodejs\\node.exe',<-a;ways node
 'C:\\Users\\Wersus_\\Desktop\\NodeApp\\myProject\\learnyNode.js',<-dir to the file
 '1',<-our arguments
 '2',
 '3' ]
---------------------------------------- */
/*//#3
reading file
--------------------------------------
 var process = require('process');
 var fs = require('fs');
 buf = new Buffer(fs.readFileSync(process.argv[2]));
 var str = buf.toString('utf8');
 str = str.split('\n');
 var count = 0;
 for(var i=0;i<str.length;i++){
 count+=1;
 }
 count = count-1;
 console.log(count);
--------------------------------------
*/
/*#4readAsync
--------------------------------------

 var fs = require('fs')
 var file = process.argv[2]
 fs.readFile(file, function (err, contents) {
 if (err) {
 return console.log(err)
 }
 // также можно использовать fs.readFile(file, 'utf8', callback)
 var lines = contents.toString().split('\n').length - 1
 console.log(lines)
 })
--------------------------------------
 */
/* #5 filter file list
--------------------------------------
 var fs = require('fs')
 var path = require('path')
 var folder = process.argv[2]
 var ext = '.' + process.argv[3]
 fs.readdir(folder, function (err, files) {
 if (err) return console.error(err)
 files.forEach(function (file) {
 if (path.extname(file) === ext) {
 console.log(file)
 }
 })
 })
--------------------------------------
*/
/*#7 get response from url
--------------------------------------
 var http = require('http')
 http.get(process.argv[2], function (response) {
 response.setEncoding('utf8')
 response.on('data', console.log)
 response.on('error', console.error)
 }).on('error', console.error)
--------------------------------------
 */
/*#8 get response from url and anylize it
--------------------------------------
 http = require('http');
 process = require('process');
 http.get(process.argv[2],function (response) {
 response.on('error',function (err) {console.log(err);return err;});
 response.setEncoding('utf8');
 var strRes = '';
 response.on('data',function (data) {
 strRes+=data;
 });
 response.on('end',function () {
 console.log(strRes.length);
 console.log(strRes);
 });
 });
--------------------------------------
 */
/*#9 simple TCP
--------------------------------------
 net = require('net');
 process = require('process');
 date = new Date();
 var server = net.createServer(function (socket) {
 var str = date.getFullYear()+'-'+(date.getMonth()+1)+'-'
 +date.getDate()+' '+('0'+date.getHours())+':'+date.getMinutes()+'\n';
 console.log(str);
 socket.write(str);
 socket.end();
 });
 server.listen(process.argv[2]);
--------------------------------------
 */
/*#10 get syncro data from 3 servers
--------------------------------------
 http = require('http');
 process = require('process');
 function f(i) {
 http.get(process.argv[i],function (response) {
 response.on('error',function (err) {console.log(err);return err;});
 response.setEncoding('utf8');
 var str ='';
 response.on('data',function (data) {
 str += data;
 });
 response.on('end',function () {
 console.log(str);
 })
 });
 return 1;
 }
 var b = 0;
 var a = 0;
 a = f(2);
 if(a==1){
 b = f(3);
 }
 if(b==1){
 f(4);
 }
/////////////////////////////////////////////
 var http = require('http')
 var bl = require('bl')
 var results = []
 var count = 0
 function printResults () {
 for (var i = 0; i < 3; i++) {
 console.log(results[i])
 }
 }
 function httpGet (index) {
 http.get(process.argv[2 + index], function (response) {
 response.pipe(bl(function (err, data) {
 if (err) {
 return console.error(err)
 }
 results[index] = data.toString()
 count++
 if (count === 3) {
 printResults()
 }
 }))
 })
 }
 for (var i = 0; i < 3; i++) {
 httpGet(i)
 }
--------------------------------------
 */
/*#11 on each request server respondes with file
--------------------------------------
 http = require('http');
 process = require('process');
 fs = require('fs');
 server = http.createServer(function (req,res) {
 stream = fs.createReadStream(process.argv[3]);
 stream.pipe(res);
 });
 server.listen(process.argv[2]);
--------------------------------------
 */
/*#12 return back data that was sended via post on some port
--------------------------------------
 var http = require('http')
 var map = require('through2-map')
 var server = http.createServer(function (req, res) {
 if (req.method !== 'POST') {
 return res.end('send me a POST\n')
 }
 req.pipe(map(function (chunk) {
 return chunk.toString().toUpperCase()
 })).pipe(res)
 })
 server.listen(Number(process.argv[2]))
--------------------------------------
 */
http = require('http');
process = require('process');
url = require('url');
server = http.createServer(function (req,res) {
    if (req.method !== 'GET') {
        return res.end('send me a GET\n')
    }
   res.writeHead(200, { 'Content-Type': 'application/json' });
   var obj = url.parse(req.url,true);
   if(obj.pathname=='/api/parsetime'){
       return JSON.stringify(obj.query);
   }
    if(obj.pathname=='/api/unixtime'){
        return JSON.stringify(new Date().toISOString());
    }
});
server.listen(process.argv[2]);


