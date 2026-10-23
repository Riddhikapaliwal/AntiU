import pool from "../db.js";

const viewProfileFunctionality= async(req, res)=>{

    try{
    const userId= req.user.user_Id;
    const result= await pool.query(
        "SELECT user_Id, email, name, course, current_year, branch, college FROM users WHERE user_Id= $1",
        [userId] 
    )
    if(result.rows.length === 0) 
        return res.status(404).send("data not found")

    return res.send(result.rows);
}catch(error){
    console.log(error);
    return res.status(500).send('Unknown server error');
}
}

const editProfileFunctionality= async(req, res)=>{

    try{
    const userId= req.user.user_Id;
    const {name, college, course, branch, current_year} = req.body;

    const result= await pool.query(
        // "Update users set  name=$1, course=$3, current_year=$5, branch=$4, college=$2 where user_id=$6",
        // [name, college, course, branch, current_year, userId]

        `UPDATE users 
        SET 
            name=COALESCE($1, name),
            college=COALESCE($2, college),
            course=COALESCE($3, course),
            branch=COALESCE($4, branch),
            current_year=COALESCE($5, current_year)
        WHERE user_id=$6`,
        [name, college, course, branch, current_year, userId])
        
    if(result.rowCount ==0)
        return res.status(404).send("someting wrong")

    return res.status(200).json({
    message: "Profile updated successfully"
    })

    
}catch(error){
    console.log(error);
    return res.stats(500).send("Unknown server error")
};
}


export { viewProfileFunctionality, editProfileFunctionality};
