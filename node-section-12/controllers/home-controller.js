const getHome =(req, res) => {
  //  dbDebug("db debug")
    res.send("hello from sarvinstyle codding");
  
  }
const getHomePost =(req, res) => {
    console.log(req.body)
    res.send("hello from sarvinstyle codding");
  
  }
module.exports = {getHome , getHomePost}