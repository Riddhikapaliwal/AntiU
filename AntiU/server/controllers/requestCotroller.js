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

export {searchFunctionality};