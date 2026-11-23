
import pool from "../db.js";

const viewSkillFunctionality = async (req, res) => {
    try {
        const userId = req.user.user_Id;

        const result = await pool.query(
            `SELECT 
                us.user_skill_id,
                us.skill_id,
                us.self_rating,
                us.proof_of_work,
                us.skill_type,
                s.skill_name
            FROM user_skills us
            JOIN skills s ON us.skill_id = s.skill_id
            WHERE us.user_id = $1`,
            [userId]
        );

        return res.status(200).json(result.rows);

    } catch (error) {
        console.error(error);
        return res.status(500).send("Unknown server error");
    }
};


const addSkillFunctionality = async (req, res) => {
    const userId = req.user.user_Id;
    const {
        skill_name,
        self_rating,
        proof_of_work,
        skill_type
    } = req.body;

    if (!skill_name?.trim()) {
        return res.status(400).json({
            message: "Skill name is required"
        });
    }

    if (!['offer', 'learn'].includes(skill_type)) {
        return res.status(400).json({
            message: "Invalid skill type"
        });
    }

    if (skill_type === 'offer' && self_rating == null) {
        return res.status(400).json({
            message: "Rating is required for offered skills"
        });
    }

    if (skill_type === 'learn' && (self_rating != null || proof_of_work != null)) {
        return res.status(400).json({
            message: "Learning skills cannot have a rating or proof of work"
        });
    }

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const skillResult = await client.query(
            `SELECT skill_id FROM skills
             WHERE lower(skill_name) = lower($1)`,
            [skill_name.trim()]
        );

        let skillId;

        if (skillResult.rows.length > 0) {
            skillId = skillResult.rows[0].skill_id;
        } else {
            const result = await client.query(
                `INSERT INTO skills (skill_name)
                 VALUES ($1)
                 RETURNING skill_id`,
                [skill_name.trim()]
            );

            skillId = result.rows[0].skill_id;
        }

        const result = await client.query(
            `INSERT INTO user_skills
                (user_id, skill_id, self_rating, proof_of_work, skill_type)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING user_skill_id`,
            [
                userId,
                skillId,
                skill_type === 'offer' ? self_rating : null,
                skill_type === 'offer' ? proof_of_work : null,
                skill_type
            ]
        );

        await client.query('COMMIT');

        return res.status(201).json({
            message: "Skill added successfully",
            user_skill_id: result.rows[0].user_skill_id,
            skill_id: skillId
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);

        if (error.code === '23505') {
            return res.status(409).json({
                message: "You have already added this skill"
            });
        }

        return res.status(500).send("Unknown server error");

    } finally {
        client.release();
    }
};


const deleteSkillFunctionality = async (req, res) => {
    try {
        const userId = req.user.user_Id;
        const { skill_name, skill_type } = req.body;

        if (!skill_name || !['offer', 'learn'].includes(skill_type)) {
            return res.status(400).json({
                message: "Skill name and valid skill type are required"
            });
        }

        const result = await pool.query(
            `DELETE FROM user_skills us
             USING skills s
             WHERE us.skill_id = s.skill_id
             AND us.user_id = $1
             AND lower(s.skill_name) = lower($2)
             AND us.skill_type = $3
             RETURNING us.user_skill_id`,
            [userId, skill_name.trim(), skill_type]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Skill not found"
            });
        }

        return res.status(200).json({
            message: "Skill deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Something went wrong.");
    }
};


export {
    viewSkillFunctionality,
    addSkillFunctionality,
    deleteSkillFunctionality
};
