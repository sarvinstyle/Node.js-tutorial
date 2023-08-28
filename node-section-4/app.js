
const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json())

const courses= [
    {id : 1 , name :"html"},
    {id : 2 , name :"css"},
    {id : 3 , name :"javascript"},
  ]

app.get("/", (req, res) => {
  res.send("hello from sarvinstyle codding");
});

app.get("/api/courses" , (req, res)=>{
    res.send(['html' , 'css' , 'c++'])
})

// /api/courses/3
app.get("/api/courses/:id" , (req , res)=>{  
    const course =courses.find(c=> c.id === parseInt( req.params.id))
    if(!course) res.status(404).send("course with given id not found")
    res.send(course)
});

app.post("/api/courses" , (req,res)=>{
    if( !req.body.name || req.body.name.length <3)
    {
        res.status(400).send("name is required")
        return
    }
    const course={ 
        id : courses.length + 1,
        name : req.body.name
    }

    courses.push(course)
    res.send(course)
})

app.put("/api/courses/:id" , (req, res)=>{
    const course =courses.find(c=> c.id === parseInt( req.params.id))
    if(!course) return res.status(404).send("course with given id not found")

    if( !req.body.name || req.body.name.length <3)
        return res.status(400).send("name is required and more than 3 charachter")
    
    course.name = req.body.name
    res.send(course)

})


app.delete("/api/courses/:id" , (req , res)=>{
    const course =courses.find(c=> c.id === parseInt( req.params.id))
    if(!course) return res.status(404).send("course with given id not found")

    const index = courses.indexOf(course)
    courses.splice(index , 1)

    res.send(course)

})



const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
