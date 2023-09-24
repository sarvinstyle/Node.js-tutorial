const pool = require("../utilities/mysql_database")

module.exports = class CoursesModel {

    static getCourses = async()=>{
        const [result] =await pool.query("select * from courses")
        return result;
    }

    
    
}