import { text } from "express";
import pool from "../db.js";

   const viewExperienceFunctionality= async(req, res)=> {
        try{
            const userId= req.user.user_Id;
            
            const result= await pool.query(
                `SELECT experience_id, organisation, designation, description, start_date, end_date from experience where user_id=$1`,
                [userId]
            )

            if(result.rows.length ===0)
                return res.status(404).send("No experience added.")

            return res.status(200).json(result.rows);
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
            VALUES($1,$2,$3,$4,$5,$6)`,
            [userId, organisation, designation, description, start_date, end_date]
        )

        return res.status(201).send("Edited successfully")

    }catch(error){
        console.log(error);
        res.status(500).send("Unknown error")
    }
    }

    const editExperienceFuncionality= async (req,res)=>{
        try{
            const userId= req.user.user_Id;
            const {experience_id}= req.params;
            const {organisation, designation, description, start_date, end_date}= req.body;
            
            const result1= await pool.query(
                `UPDATE experience 
                SET 
                organisation=COALESCE($1, organisation),
                designation=COALESCE($2, designation),
                description=COALESCE($3, description),
                start_date=COALESCE($4, start_date),
                end_date=COALESCE($5, end_date)
            WHERE user_id=$6 and experience_id=$7`, //i think that i have to add experience_id too in where clause
            [organisation, designation, description, start_date, end_date, userId, experience_id]
            )

            if(result1.rowCount === 0)
                return res.status(404).send("Experience not found");

            return res.status(200).send("Edited successfully")
        }catch(erorr){
            return res.status(500).send("something went wrong")
        }
    }

    const deleteExperienceFunctionality= async (req, res)=>{
        try{
            const userId= req.user.user_Id;
            const {experience_id} = req.params;

            const result= await pool.query(
                `DELETE from experience
                where user_id=$1 and experience_id=$2`,
                [userId, experience_id]
            )

            if(result.rowCount === 0) //i dont know how to check if the delete query executed successfully or not
                return res.status(404).send("Experience not found")

            return res.status(200).send("Deleted successfully.")

    }catch(error){
        console.log(error);
        return res.status(500).send("Something went wrong.")
    }
    }
// some changes and have to add view function too for skill and experinece.

export {viewExperienceFunctionality, addExperienceFunctionality, editExperienceFuncionality, deleteExperienceFunctionality};

