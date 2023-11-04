const pool = require('../utilities/mysql_database')

class CoursesModel {
    static getCourses = async () => {
        const [result] = await pool.query("select * from courses");
        return result;
      };
      
      static getCourse = async (id) => {
        const [result] = await pool.query(`select * from courses where id=? `, [id]);
        return result[0];
      };
      
      static insertCourse = async (title) => {
        const [result] = await pool.query("insert into courses (Title) values (?)", [
          title,
        ]);
        return getCourse(result.insertId);
      };
      
      static updateCourse = async (id, title) => {
        const [result] = await pool.query(
          `
           update courses set title = ? where id = ?`,
          [title, id]
        );
        return getCourse(id);
      };
      
      static deleteCourse = async (id) => {
        const result = pool.query("delete from courses where Id = ?", [id]);
        return id
      };
      
      static callStoredProcedure = async(id)=>{
          const [result] = await pool.query('call sp_select (?)' , [id])
          return result[0]
      }
}

module.exports = CoursesModel