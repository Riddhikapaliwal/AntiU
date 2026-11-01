import pool from "../db.js";

const searchFunctionality= async(req, res)=> {
    try{
        const {type, q}= req.query;
        const userId= req.user.user_Id;

        if(!q || !q.trim()){
            return res.status(400).send("Search query is required");
        }

        let result;
        if(type=== "name"){
            result= await pool.query(
                `SELECT user_id, name, college
                from users
                where name ILIKE $1
                and user_id!= $2
                order by name
                limit 10`,
                [`%${q}%`, userId]
            )
        }else if(type=== "skill"){
            result= await pool.query(
                `SELECT DISTINCT u.user_id, u.name, u.college
                from users u
                join user_skills us on u.user_id= us.user_id
                join skills s on us.skill_id= s.skill_id
                where s.skill_name ILIKE $1
                    and u.user_id!= $2
                order by u.name
                limit 10`,
                [`%${q}%`, userId]
            )
        }else if(type === "college"){
            result= await pool.query(
                `SELECT user_id, name, college
                from users
                where college ILIKE $1
                and user_id!= $2
                order by name
                limit 10`,
                [`%${q}%`, userId]
            )
        }else{
            return res.status(400).send("Invalid search type");
        }
        
        return res.status(200).json(result.rows);

    }catch(error){
        console.log(error);
        return res.status(500).send("Unknown server error");
    }
}

const viewUserProfile = async (req, res) => {
    try {
        const { user_id } = req.params;

        const profile = await pool.query(
            `SELECT user_id, name, college, course, branch,
                    current_year, age, heroline
             FROM users
             WHERE user_id = $1`,
            [user_id]
        );

        // Check whether the student exists
        if (profile.rowCount === 0) {
            return res.status(404).json({
                message: "User does not exist."
            });
        }

        // 2. Fetch student's skills
        const skills = await pool.query(
            `SELECT s.skill_id, s.skill_name,
                    us.user_skill_id, us.self_rating,
                    us.proof_of_work
             FROM user_skills AS us
             JOIN skills AS s
             ON us.skill_id = s.skill_id
             WHERE us.user_id = $1`,
            [user_id]
        );

        // 3. Fetch student's experiences
        const experiences = await pool.query(
            `SELECT experience_id, organisation, designation,
                    description, start_date, end_date
             FROM experience
             WHERE user_id = $1
             ORDER BY start_date DESC`,
            [user_id]
        );

        // 4. Fetch student's posts
        const posts = await pool.query(
            `SELECT post_id, post_content, media_link,
                    created_at, updated_at
             FROM posts
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [user_id]
        );

        return res.status(200).json({
            profile: profile.rows[0],
            skills: skills.rows,
            experiences: experiences.rows,
            posts: posts.rows
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Unknown server error"
        });
    }
};

export {searchFunctionality, viewUserProfile};