import pool from "../db.js";

const viewProfileFunctionality= async(req, res)=>{

    try{
    const userId= req.user.user_Id;
    const result= await pool.query(
        "SELECT user_Id, email, name, course, current_year, branch, college, age, heroline FROM users WHERE user_Id= $1",
        [userId] 
    )
    if(result.rows.length === 0) 
        return res.status(404).send("data not found")

    return res.json(result.rows[0]);
}catch(error){
    console.log(error);
    return res.status(500).send('Unknown server error');
}
}


const editProfileFunctionality= async(req, res)=>{

    try{
    const userId= req.user.user_Id;
    const {name, college, course, branch, current_year, heroline, age} = req.body;

    const result= await pool.query(
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
            age= COALESCE($7, age)
        WHERE user_id=$8`,
        [name, college, course, branch, current_year, heroline, age, userId])
        
    if(result.rowCount ==0)
        return res.status(404).send("someting wrong")

    return res.status(200).json({
    message: "Profile updated successfully"
    })
    
}catch(error){
    console.log(error);
    return res.status(500).send("Unknown server error")
};
}

const viewSkillFunctionality= async(req,res)=> {
    try{
        const userId= req.user.user_Id;

        const result1= await pool.query(
            `select self_rating, proof_of_work 
            from user_skills where user_id= $1 returning skill_id`,
            [userId]
        )

        if(result1.rows.length != 0){
            skillId= result1.rows.skill_id;
        }else{
            return res.status(404).send("No skills added")
        }

        const result2= await pool.query(
            `select skill_name from skills where skill_id=$1`,
            [skillId]
        )
    }catch(error){
    console.log(error);
    return res.status(500).send("Unknown server error")
};
}

const addSkillFunctionality= async(req,res)=>{
    try{
        const client= await pool.connect();
        const userId= req.user.user_Id;
        const {skill_name, skill_rating, proof_of_work}= req.body;

        if(!skill_name || skill_rating == null){
            return res.status(400).json({
                message: "Skill name and rating are required"
            });
        }

        await client.query('BEGIN');

        const skillResult= await client.query(
            `SELECT skill_id from skills
            where lower(skill_name)=lower($1)`,
            [skill_name.trim()]
        );

        let skillId;          //const declarations must be initialised.
        if(skillResult.rows.length> 0){
            skillId= skillResult.rows[0].skill_id;
        }else{
            skillResult= await client.query(
                `INSERT INTO skills (skill_name)
                values ($1)
                RETURNING skill_id`,
                [skill_name.trim()]
            );

            skillId= skillResult.rows[0].skill_id;
        }

        const result= await client.query(
            `INSERT INTO user_skills(user_id, skill_id, self_rating, proof_of_work)
            values ($1, $2, $3, $4)
           returning user_skill_id`,
            [userId, skillId, skill_rating, proof_of_work || null]
        )

        await client.query('COMMIT');

        return res.status(201).json({
            "message":"skill added successfully",
            user_skill_id: result.rows[0].user_skill_id,
            skill_id: skillId
        });

    }catch(error){
        await client.query('ROLLBACK');
        console.error(error);

        if(error.code === '23505'){
            return res.status(409).json({
                message: "you ahve already added this skill "
            })
        }
        return res.status(500).send("Unknown server error")
    }
}

const deleteSkillFunctionality= async(req,res)=>{
    try{
        const userId= req.user.user_Id;
        const {skill_name}= req.body;

        const result1= await pool.query(
        `select skill_id from skills where skill_name=$1`,
        [skill_name])

        let skillId;

        if(result1.rows.length > 0 )
            skillId= result1.rows[0].skill_id;

        const result2= await pool.query(
            `delete from user_skills where user_Id=$1 and skill_id=$2`,
            [userId, skillId]
        )

        res.status(200).json({
            "message":"Profile updated successfully"
    })
    }catch(error){
        console.log(error);
        return res.status(500).send("Something went wrong.")
    }
}

    const viewExperienceFunctionality= async(req, res)=> {
        try{
            const userId= req.user.userId;
            
            const result= await pool.query(
                `SELECT organisation, designation, description, start_date, end_date from experiences where user_id=$6`,
                [userId]
            )

            if(result.rows.length ===0)
                return res.status(404).send("No experiences added.")

            return res.status(201);
        }catch(error){
            console.log(error);
            res.status(500).send("Something went wrong.")
        }
    }

    const addExperienceFunctionality= async (req, res)=>{

        try{
        const userId= req.user.user_Id;
        const {organisation, designation, description, start_date, end_date}= req.body;

        const result1= await pool.query(
            `INSERT INTO experience (user_id, organisation, designation, description, start_date, end_date) 
            VALUES($2,$3,$4,$5,$6,$7)`,
            [userId, organisation, designation, description, start_date, end_date]
        )
        if(!result1.ok)
            return res.status(404).send("something went wrong");

        return res.status(201).send("Added successfully")
    }catch(error){
        console.log(error);
        res.status(500).send("Unknown error")
    }
    }

    const editExperienceFuncionality= async (req,   res)=>{
        try{
            const userId= req.user.user_Id;
            const {experince_id}= req.params;
            const {organisation, designation, description, start_date, end_date}= req.body;
            
            const result1= await pool.query(
                `UPDATE experience 
                SET 
                organisation=COALESCE($1, organisation),
                designation=COALESCE($2, designation),
                description=COALESCE($3, description),
                start_date=COALESCE($4, start_date),
                end_date=COALESCE($5, end_date),
           
            WHERE user_id=$6 and experience_id=$7`, //i think that i have to add experience_id too in where clause
            [organisation, designation, description, start_date, end_date, userId, experince_id]
            )

            if(result1.rowCount === 0)
                return res.status(404).send("Experience not found");

            return res.status(200).status("Edited successfully")
        }catch(erorr){
            return res.status(500).send("unknown error")
        }
    }

    const deleteExperienceFunctionality= async (req, res)=>{
        try{
            const userId= req.user.user_Id;
            const {experience_id} = req.params;

            const result= await pool.query(
                `DELETE from experiences
                where user_id=$1 and experience_id=$2`,
                [userId, experience_id]
            )

            return res.status(200).send("Deleted successfully.")

    }catch(error){
        console.log(error);
        return res.status(500).send("Something went wrong.")
    }
    }
// some changes and have to add view function too for skill and experinece.

export { viewProfileFunctionality, editProfileFunctionality, addSkillFunctionality, deleteSkillFunctionality, addExperienceFunctionality, editExperienceFuncionality, deleteExperienceFunctionality};
