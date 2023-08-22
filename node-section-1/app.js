const http = require('http');
const server = http.createServer((req , res)=>{
    if(req.url === "/"){
        res.write("hello from home page");
        res.end()
    }
    if(req.url === '/api/course'){
        res.write(JSON.stringify(['html','css']))
        res.end()
    }

});

// server.on("connection", (socket)=>{
//     console.log("new connection is connected")
// })


server.listen(3000)
console.log("server is listening on port 3000")