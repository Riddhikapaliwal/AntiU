import pool from "../db.js";

const viewProfileFunctionality = async (req, res) => {
  try {
    const userId = req.user.user_Id;
    const result = await pool.query(
      "SELECT user_Id, email, name, course, current_year, branch, college, age, address, heroline FROM users WHERE user_Id= $1",
      [userId],
    );
    if (result.rows.length === 0) return res.status(404).send("data not found");

    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Unknown server error");
  }
};

const editProfileFunctionality = async (req, res) => {
  try {
    const userId = req.user.user_Id;
    const {
      name,
      college,
      course,
      branch,
      current_year,
      heroline,
      age,
      address,
    } = req.body;

    const result = await pool.query(
      // "Update users set  name=$1, course=$3, current_year=$5, branch=$4, college=$2 where user_id=$6",
      // [name, college, course, branch, current_year, userId]

      `UPDATE users 
        SET 
            name=COALESCE($1, name),
            college=COALESCE($2, college),
            course=COALESCE($3, course),
            branch=COALESCE($4, branch),
            current_year=COALESCE($5, current_year),
            heroline= COALESCE($6, heroline),
            age= COALESCE($7, age),
            address= COALESCE($8, address)
        WHERE user_id=$9`,
      [
        name,
        college,
        course,
        branch,
        current_year,
        heroline,
        age,
        address,
        userId,
      ],
    );

    if (result.rowCount == 0) return res.status(404).send("someting wrong");

    return res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Unknown server error");
  }
};

const viewPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const [profile, skills, experiences, posts] = await Promise.all([
      pool.query(
        `SELECT user_id, name, college, course,
                branch, current_year, heroline
         FROM users WHERE user_id = $1`,
        [userId],
      ),

      pool.query(
        `SELECT us.user_skill_id, s.skill_name, us.skill_type,
                us.self_rating, us.proof_of_work
         FROM user_skills us
         JOIN skills s ON s.skill_id = us.skill_id
         WHERE us.user_id = $1`,
        [userId],
      ),

      pool.query(
        `SELECT organisation, designation, description,
                start_date, end_date
         FROM experience WHERE user_id = $1
         ORDER BY start_date DESC`,
        [userId],
      ),

      pool.query(
        `Select post_id, user_id, post_content, media_link, created_at, updated_at
            from posts
            where user_id= $1
            order by created_at 
            limit 6`,
        [userId],
      ),
    ]);

    if (!profile.rows.length) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      ...profile.rows[0],
      skills: skills.rows,
      experiences: experiences.rows,
      posts: posts.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to load profile",
    });
  }
};

export {
  viewProfileFunctionality,
  editProfileFunctionality,
  viewPublicProfile,
};
