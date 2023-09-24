const mysql = require('mysql2'); 
require('dotenv').config();
 

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password :process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
// }).promise();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password : "123321",
    database: 'sarvinstyle',
}).promise()
 
const getCourses = async()=>{
    const [result] =await pool.query("select * from courses")
    console.log(result)
}

const getCourse=async(id)=>{
    const [result] = await pool.query(`select * from courses where Id = ?` ,[id])
    return result[0]
}

const insertCourse = async(title)=>{
    const [result] = await pool.query("insert into courses(title) values (?)"
    ,[title])
console.log(result)
    const id= result.insertId
   // return (id , title)
    return getCourse(id)
}

const updateCourse = async(id , title)=>{
    const result = await pool.query("update courses set Title = ? where Id =?"
    ,[  title,id])
   // return (id , title)
    return getCourse(id)
}

const deleteCourse = async(id )=>{
    const result = await pool.query("delete from courses  where Id =?"
    ,[  id])
   // return (id , title)
    return id
}

const storedProcedure = async(id )=>{
    const [result] = await pool.query("call sp_select (?)"
    ,[  id])
   // return (id , title)
    return result
}

insertCourse('c++' ).then((result)=>{
    console.log(result) 
})



 