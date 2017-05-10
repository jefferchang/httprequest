var express = require('express');
var path = require("path");
var superagent = require('superagent');
var charset = require('superagent-charset');
var app = express();
charset(superagent);

app.get('/request', function (req, r) {
    var targetUrl = req.query.url;
    var method = req.query.method_;
    if(targetUrl){
        if ("POST" == method){
            superagent.post(targetUrl)
                .charset('utf-8')
                .end(function (err, res) {
                    if (res) {
                        r.send(res.text);
                    }else{
                        r.send("no data");
                    }
                });
        }else{
            superagent.get(targetUrl)
                .charset('utf-8')
                .end(function (err, res) {
                    if (res) {
                        r.send(res.text);
                    }else{
                        r.send("no data");
                    }
                });
        }
    }else{
        r.send(r);
    }
});
app.use(express.static(path.join(__dirname, 'view')));
app.listen(3000);
console.log("启动完成");

 
