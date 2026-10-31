import pool from "../db.js";

const viewSkillFunctionality= async(req,res)=> {
    try{
        const userId= req.user.user_Id;

        const result1= await pool.query(
            `select us.self_rating, us.proof_of_work, s.skill_name 
            from user_skills as us
            join skills as s
            on us.skill_id= s.skill_id  
            where user_id= $1 `,
            [userId]
        )

        if(result1.rows.length != 0){
            return res.status(200).json(result1.rows[0]);
        }else{
            return res.status(404).send("No skills added")
        }

    }catch(error){
    console.log(error);
    return res.status(500).send("Unknown server error")
};
}

const addSkillFunctionality= async(req,res)=>{
    const client= await pool.connect();

    try{
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
            const result= await client.query(
                `INSERT INTO skills (skill_name)
                values ($1)
                RETURNING skill_id`,
                [skill_name.trim()]
            );

            skillId= result.rows[0].skill_id;
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
    }finally{
        client.release();
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
        else 
            return res.status(404).send("Skill not found")

        await pool.query(
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

export {viewSkillFunctionality, addSkillFunctionality, deleteSkillFunctionality}; 