const sql = require("mssql");
require("dotenv").config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    TrustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("connected to pool");
    return pool;
  })
  .catch((err) => console.log("Error : " + err));

const getCourses = async () => {
  const pool = await poolPromise;
  const request = pool.request();
  const result = await request.query("select * from courses");
  console.log(result);
  return result.recordset
};

const getCourse = async (id)=>{
    const pool = await poolPromise;
    const request = pool.request();
    request.input("Id" , sql.Int , id)
    const result = await request.query("select * from courses where Id = @Id")
    console.log(result)
    return result.recordset

}

const insertCourse = async (title)=>{
    const pool = await poolPromise;
    const request = pool.request();
    request.input("Title" , sql.NVarChar , title)
    const result = await request.query("insert into courses (title) values (@Title)")
    console.log(result)
   // return result.recordset
}

const updateCourse = async (id , title)=>{
  const pool = await poolPromise;
  const request = pool.request();
  request.input("Id" , sql.Int , id)
  request.input("Title" , sql.NVarChar , title)
  const result = await request.query("update courses set Title = @Title where Id = @Id")
  console.log(result)
 // return result.recordset
}
const deleteCourse = async (id)=>{
  const pool = await poolPromise;
  const request = pool.request();
  request.input("selectedId" , sql.Int , id)
  const result = await request.query("delete from courses where Id = @selectedId")
  console.log(result)
 // return result.recordset

}

const callStoredProcedure = async(id)=>{
  const pool = await poolPromise;
  const request = pool.request()
  request.input("Id"  , sql.Int , id)
  const result = await request.execute("sp_select")
  console.log(result)
  return result.recordset
}

updateCourse(1 , "PHP");

