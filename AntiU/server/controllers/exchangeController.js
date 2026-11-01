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

        if(offered_skill_id!= null){
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
                and status='pending'`,
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

const viewReceivedRequest= async (req,res) => {
    try{
        const receiver_id= req.user.user_Id;
        
        const result= await pool.query(
                    `SELECT
            se.request_id,
            se.sender_id,
            u.name AS sender_name,
            requested_s.skill_name AS requested_skill,
            offered_s.skill_name AS offered_skill,
            se.message,
            se.status,
            se.created_at

        FROM exchange_requests AS se

        JOIN users AS u
            ON se.sender_id = u.user_id

        JOIN user_skills AS requested_us
            ON se.requested_skill_id = requested_us.user_skill_id

        JOIN skills AS requested_s
            ON requested_us.skill_id = requested_s.skill_id

        LEFT JOIN user_skills AS offered_us
            ON se.offered_skill_id = offered_us.user_skill_id

        LEFT JOIN skills AS offered_s
            ON offered_us.skill_id = offered_s.skill_id

        WHERE se.receiver_id = $1
        AND se.status = 'pending'

        ORDER BY se.created_at DESC'`,
            [receiver_id]
        )

        return res.status(200).send(result.rows)

    }catch(error){
        console.log(error);
        return res.status(500).send("Unknown server error")
    }
}

const viewSentRequest= async (req,res) => {
    try{
        const sender_id= req.user.user_Id;
        
        const result= await pool.query(
                    `SELECT
            se.request_id,
            se.sender_id,
            u.name AS sender_name,
            requested_s.skill_name AS requested_skill,
            offered_s.skill_name AS offered_skill,
            se.message,
            se.status,
            se.created_at

        FROM exchange_requests AS se

        JOIN users AS u
            ON se.receiver_id = u.user_id

        JOIN user_skills AS requested_us
            ON se.requested_skill_id = requested_us.user_skill_id

        JOIN skills AS requested_s
            ON requested_us.skill_id = requested_s.skill_id

        LEFT JOIN user_skills AS offered_us
            ON se.offered_skill_id = offered_us.user_skill_id

        LEFT JOIN skills AS offered_s
            ON offered_us.skill_id = offered_s.skill_id

        WHERE se.sender_id = $1
        AND se.status = 'pending'

        ORDER BY se.created_at DESC`,
            [sender_id]
        )

        return res.status(200).send(result.rows)

    }catch(error){
        console.log(error);
        return res.status(500).send("Unknown server error")
    }
}

const acceptRequest= async(req, res)=> {
    try{
        const receiverId = req.user.user_Id;
        const { request_id } = req.params;
        const result= await pool.query(
            `UPDATE exchange_requests
            set status='accepted',
                updated_at= current_timestamp
            where request_id= $1
            and receiver_id= $2
            and status= 'pending'`,
            [request_id, receiverId]
        )
       
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Request not found or already processed."
            });
        }

        return res.status(200).json({
            message: "Request accepted successfully."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Unknown server error");
    }
}


const rejectRequest= async(req, res)=> {
    try{
        const {request_id, receiver_id}= req.body;
        const result= await pool.query(
            `UPDATE exchange_requests
            set status='rejected',
                updated_at= current_timestamp
            where request_id= $1
            and receiver_id= $2
            and status= 'pending'`,
            [request_id, receiver_id]
        )
        
    
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Request not found or already processed."
            });
        }

        return res.status(200).json({
            message: "Request rejected successfully."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Unknown server error");
    }
}

export {rejectRequest, acceptRequest, sendReqFunctionality, viewReceivedRequest, viewSentRequest}
     