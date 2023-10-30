

const getCourses = async () => {
  const [result] = await pool.query("select * from courses");
  return result;
};

const getCourse = async (id) => {
  const [result] = await pool.query(`select * from courses where id=? `, [id]);
  return result[0];
};

const insertCourse = async (title) => {
  const [result] = await pool.query("insert into courses (Title) values (?)", [
    title,
  ]);
  return getCourse(result.insertId);
};

const updateCourse = async (id, title) => {
  const [result] = await pool.query(
    `
     update courses set title = ? where id = ?`,
    [title, id]
  );
  return getCourse(id);
};

const deleteCourse = async (id) => {
  const result = pool.query("delete from courses where Id = ?", [id]);
  return id
};

const callStoredProcedure = async(id)=>{
    const [result] = await pool.query('call sp_select (?)' , [id])
    return result[0]
}
const data = callStoredProcedure(40).then((result) => {
  console.log(result);
});
