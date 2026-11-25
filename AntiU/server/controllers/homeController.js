import pool from "../db.js";

const homeFeed= async(req,res) => {
    try{
        const result1= await pool.query(
            `SELECT 
            p.post_id,
            p.user_id,
            u.name,
            u.college,
            p.post_content,
            p.media_link,
            p.created_at,
            p.updated_at
            from posts as p
            join users as u
            on p.user_id = u.user_id
            where p.user_id!= $3
            order by p.created_at desc
            limit $1 offset $2`,
            [8,0, req.user.user_Id]
        );

        const result2 = await pool.query(
            `SELECT 
                u.user_id,
                u.name,
                u.current_year,
                u.branch,
                u.heroline,
                json_agg(
                    json_build_object(
                        'skill_name', s.skill_name,
                        'skill_type', us.skill_type,
                        'self_rating', us.self_rating,
                        'proof_of_work', us.proof_of_work
                    )
                ) AS skills
            FROM users AS u
            JOIN user_skills AS us
                ON u.user_id = us.user_id
            JOIN skills AS s
                ON us.skill_id = s.skill_id
            WHERE u.user_id != $1
            GROUP BY 
                u.user_id,
                u.name,
                u.current_year,
                u.branch,
                u.heroline
            order by random()
            LIMIT 8`,
            [req.user.user_Id]
);

        return res.status(200).json({
            post: result1.rows,
            skillCards: result2.rows
        });


    }catch(error){
        console.error("HOME FEED ERROR:", error.message);
        console.error("ERROR CODE:", error.code);
    }
}

const viewUserPost= async (req, res)=> {
    try{
        const userId= req.user.user_Id;

        const result= await pool.query(
            `Select post_id, user_id, post_content, media_link, created_at, updated_at
            from posts
            where user_id= $1
            order by created_at DESC`,
            [userId]
        )

        if(result.rowCount === 0)
            return res.status(404).send("No posts found.")

        return res.status(200).send(result.rows);
    }catch(error){
        console.log(error);
        return res.status(500).send("Unknown server error");
    }
}

const addPost= async(req, res) => {

    try{
        const userId= req.user.user_Id;
        const {post_content, media_link}= req.body;

        const result= await pool.query(
            `Insert  into posts(user_id, post_content, media_link)
            values($1, $2, $3)
            returning post_id`,
            [userId, post_content, media_link]
        )

        return res.status(201).send("Post added successfully");
    }catch(error){
        console.log(error);
        return res.status(500).send("Unknown server error");
    }
}

const editPost= async(req, res)=> {
    try{
        const userId= req.user.user_Id;
        const {postId}= req.params;
        const {post_content, media_link}= req.body;

        const result= await pool.query(
            `Update posts
            set post_content= COALESCE($1, post_content),
            media_link= COALESCE($2, media_link),
            updated_at= current_timestamp
            where user_id= $3 and post_id= $4`,
            [post_content, media_link, userId, postId]
        )

        return res.status(200).send("Post edited successfully");
    }catch(error){
        console.log(error);
        return res.status(500).send("Unknown server error");
    }
}

const deletePost= async(req,res)=> {// it deletes even if the postId used in the api does not even exist , still it shows deleted successfully.
 try{
        const userId= req.user.user_Id;
        const {postId}= req.params;


        const result= await pool.query(
            `DELETE from posts
            where user_id= $1 and post_id=$2`,
            [userId, postId]
        )

        return res.status(200).send("Deleted successfully");
    }catch(error){
        console.log(error);
        return res.status(500).send("Unknown server error");
    }
}


export {homeFeed, viewUserPost, addPost, editPost, deletePost};