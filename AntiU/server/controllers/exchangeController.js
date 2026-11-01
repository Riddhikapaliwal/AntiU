import pool from "../db.js";

const sendReqFunctionality= async(req, res)=> {

    try{
        const senderId= req.user.user_Id;
        const {receiver_id, requested_skill_id, offered_skill_id, message}= req.body;

        if(!receiver_id || !requested_skill_id){
            return res.status(400).json({
                message:"Receiver and requested skill are required."
            });
        }

        if(Number(receiver_id) === Number(senderId)){
            return res.status(400).json({
                message: "You cannot send a request to yourself"
            });
        }

        const requestedSkill= await pool.query(
            `Select user_skill_id
            from user_skills
            where user_skill_id= $1
            and user_id= $2`,
            [requested_skill_id, receiver_id]
        );

        if(requestedSkill.rowCount === 0){
            return res.status(400).json({
                message:"Requested skill does not belong to the receiver."
            })
        }

        if(offered_skill_id!= null && offered_skill_id!=undefined){
            const offeredSkill= await pool.query(
                `SELECT user_skill_id
                FROM user_skills
                WHERE user_skill_id= $1
                and user_id= $2`,
                [offered_skill_id, senderId]
            );

            if(offeredSkill.rowCount === 0){
                return res.status(400).json({
                    message: "Offered skill does ont belong to you."
                });
            }
        }

        const existingRequest= await pool.query(
            `SELECT request_id
            FROM exchange_requests
                WHERE sender_id=$1
                and receiver_id= $2
                and requested_skill_id= $3
                and status='pending`,
                [senderId, receiver_id, requested_skill_id]
        );

        if(existingRequest.rowCount> 0){
            return res.status(409).json({
                message: "You already have a pending request for this skill."
            });
        }

        const result= await pool.query(
            `INSERT INTO exchange_requests
            (sender_id, receiver_id, requested_skill_id, offered_skill_id, message)
            values ($1, $2, $3, $4, $5)
            returning request_id, status, created_at`,
            [senderId, receiver_id, requested_skill_id, offered_skill_id ?? null, message ?? null]
        );

        return res.status(201).json({
            message: "Exchange request sent successfully.",
            request: result.rows[0]
        });
    }catch(error){
        console.error(error);

        return res.status(500).json({
            message: "Unknown server error"
        })
    }
}