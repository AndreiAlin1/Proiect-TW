// studentController.js
const pool = require('../config/db');

// Helper function for standardized response format
const createResponse = (success, message, data = null, error = null) => ({
    success,
    message,
    data,
    ...(error && { error: process.env.NODE_ENV === 'development' ? error : 'Internal server error' })
});

// Validation helper
const validateStudentData = (data) => {
    const { id, full_name, email } = data;
    if (!id || !full_name || !email) {
        throw new Error('Missing required fields: id, full_name, email');
    }
    if (!email.includes('@')) {
        throw new Error('Invalid email format');
    }
};

/**
 * Add new student after OAuth authentication
 */
const addStudentOAUTH = async (req, res) => {
    const conn = await pool.getConnection();
    
    try {
        const { id, full_name, email, profile_picture } = req.body;
        
        // Validate input data
        validateStudentData({ id, full_name, email });
        
        await conn.beginTransaction();

        // Check if student already exists
        const [existing] = await conn.execute(
            "SELECT id FROM student WHERE id = ? OR email = ?",
            [id, email]
        );

        if (existing.length > 0) {
            await conn.commit();
            return res.status(200).json(
                createResponse(true, 'Student already exists', existing[0])
            );
        }

        // Insert new student
        const [result] = await conn.execute(
            `INSERT INTO student (id, nume_complet, email, imagine_profil, data_creare)
            VALUES (?, ?, ?, ?, NOW())`,
            [id, full_name, email, profile_picture]
        );

        await conn.commit();

        res.status(201).json(
            createResponse(true, 'Student added successfully', { 
                studentId: id,
                full_name,
                email 
            })
        );

    } catch (err) {
        await conn.rollback();
        console.error('Error in addStudentOAUTH:', err);
        res.status(500).json(
            createResponse(false, 'Error adding student after authentication', null, err.message)
        );
    } finally {
        conn.release();
    }
};

/**
 * Update student details
 */
const updateStudentDetails = async (req, res) => {
    const conn = await pool.getConnection();
    
    try {
        const { id } = req.params;
        const { series, cls, major, acces_token } = req.body;

        // Validate input
        if (!series || !cls || !major) {
            throw new Error('Missing required fields: series, cls, major');
        }

        await conn.beginTransaction();

        // Update student details
        const [result] = await conn.execute(
            `UPDATE student 
            SET serie = ?, grup = ?, specializare = ?, token_acces = ?, data_actualizare = NOW()
            WHERE id = ?`,
            [series, cls, major, acces_token, id]
        );

        if (result.affectedRows === 0) {
            await conn.rollback();
            return res.status(404).json(
                createResponse(false, 'Student not found')
            );
        }

        await conn.commit();

        res.status(200).json(
            createResponse(true, 'Student details updated successfully', {
                id,
                series,
                cls,
                major
            })
        );

    } catch (err) {
        await conn.rollback();
        console.error('Error in updateStudentDetails:', err);
        res.status(500).json(
            createResponse(false, 'Error updating student details', null, err.message)
        );
    } finally {
        conn.release();
    }
};

/**
 * Get student thesis information
 */
const getStudentThesis = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            `SELECT 
                s.id,
                s.nume_complet,
                l.id AS lucrare_id,
                l.titlu,
                l.descriere,
                l.data_creare AS teza_data_creare
            FROM student s
            LEFT JOIN lucrare l ON s.id_lucrare = l.id
            WHERE s.id = ?`,
            [id]
        );

        if (result.length === 0) {
            return res.status(404).json(
                createResponse(false, 'Student not found')
            );
        }

        res.status(200).json(
            createResponse(true, 'Student thesis retrieved successfully', result[0])
        );

    } catch (err) {
        console.error('Error in getStudentThesis:', err);
        res.status(500).json(
            createResponse(false, 'Error fetching student thesis', null, err.message)
        );
    }
};

/**
 * Check if student exists by email
 */
const checkStudentByEmail = async (email) => {
    try {
        const [result] = await pool.execute(
            'SELECT id, email FROM student WHERE email = ?',
            [email]
        );
        return result.length > 0;
    } catch (err) {
        console.error('Error in checkStudentByEmail:', err);
        throw err;
    }
};

module.exports = {
    addStudentOAUTH,
    updateStudentDetails,
    getStudentThesis,
    checkStudentByEmail
};