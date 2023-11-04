const getHome =(req, res) => {
  //  dbDebug("db debug")
  console.log(req.body)
    res.send("hello from sarvinstyle codding");
  
  }

module.exports = {getHome}