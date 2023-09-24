const {sql , poolPromise} = require("../utilities/mssql_database")
 

class CoursesModel {
  static getCourses = async () => {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.query("select * from courses");
    console.log(result);
    return result.recordset
  };
  
  static getCourse = async (id)=>{
      const pool = await poolPromise;
      const request = pool.request();
      request.input("Id" , sql.Int , id)
      const result = await request.query("select * from courses where Id = @Id")
      console.log(result)
      return result.recordset
  
  }
  
  static insertCourse = async (title)=>{
      const pool = await poolPromise;
      const request = pool.request();
      request.input("Title" , sql.NVarChar , title)
      const result = await request.query("insert into courses (title) values (@Title)")
      console.log(result)
     // return result.recordset
  
  }
  
  static deleteCourse = async (id)=>{
      const pool = await poolPromise;
      const request = pool.request();
      request.input("selectedId" , sql.Int , id)
      const result = await request.query("delete from courses where Id = @selectedId")
      console.log(result)
     // return result.recordset
  
  }
  
  static callStoredProcedure = async(id)=>{
      const pool = await poolPromise;
      const request = pool.request()
      request.input("Id"  , sql.Int , id)
      const result = await request.execute("sp_select")
      console.log(result)
      return result.recordset
}
}

module.exports= CoursesModel