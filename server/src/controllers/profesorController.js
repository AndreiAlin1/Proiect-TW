// professorController.js
const pool = require('../config/db');

// Helper pentru răspunsuri standardizate
const createResponse = (success, message, data = null, error = null) => ({
    success,
    message,
    data,
    ...(error && { error: process.env.NODE_ENV === 'development' ? error : 'Internal server error' })
});

// Validare date profesor
const validateProfessorData = (data) => {
    const { id, nume_complet, email } = data;
    if (!id || !nume_complet || !email) {
        throw new Error('Missing required fields: id, nume_complet, email');
    }
    if (!email.includes('@')) {
        throw new Error('Invalid email format');
    }
};

/**
 * Adăugare profesor după autentificare OAuth
 */
const addProfessorOAUTH = async (req, res) => {
    const conn = await pool.getConnection();
    
    try {
      const token = req.body.token;
      
          if (!token) {
            return res
              .status(400)
              .json(createResponse(false, "Token is required", null));
        }
      
          // Decode the token to extract user information
        const decoded = jwt.decode(token);
        if (!decoded) {
            return res.status(400).json(createResponse(false, "Invalid token", null));
        }

        const {
            sub: id,
            name: full_name,
            email,
            picture: profile_picture,
        } = decoded;
        console.log(decoded);
      
        
        validateProfessorData({ id, nume_complet: full_name, email });
        
        await conn.beginTransaction();

        // Verificare existență profesor
        const [existing] = await conn.execute(
            "SELECT id FROM profesor WHERE id = ? OR email = ?",
            [id, email]
        );

        if (existing.length > 0) {
            await conn.commit();
            return res.status(200).json(
                createResponse(true, 'Professor already exists', existing[0])
            );
        }

        // Inserare profesor nou
        const [result] = await conn.execute(
            `INSERT INTO profesor (id, nume_complet, email, imagine_profil, data_creare)
            VALUES (?, ?, ?, ?, NOW())`,
            [id, full_name, email, profile_picture]
        );

        await conn.commit();

        res.status(201).json(
            createResponse(true, 'Professor added successfully', { 
                professorId: id,
                full_name,
                email 
            })
        );

    } catch (err) {
        await conn.rollback();
        console.error('Error in addProfessorOAUTH:', err);
        res.status(500).json(
            createResponse(false, 'Error adding professor', null, err.message)
        );
    } finally {
        conn.release();
    }
};

/**
 * Actualizare detalii profesor
 */
const updateProfessorDetails = async (req, res) => {
    const conn = await pool.getConnection();
    
    try {
        const { id } = req.params;
        const { perioada_start, perioada_final, nr_elevi } = req.body;

        await conn.beginTransaction();

        const [result] = await conn.execute(
            `UPDATE profesor 
            SET perioada_start = ?, perioada_final = ?, nr_elevi = ?, data_actualizare = NOW()
            WHERE id = ?`,
            [perioada_start, perioada_final, nr_elevi, id]
        );

        if (result.affectedRows === 0) {
            await conn.rollback();
            return res.status(404).json(
                createResponse(false, 'Professor not found')
            );
        }

        await conn.commit();

        res.status(200).json(
            createResponse(true, 'Professor details updated successfully', {
                id,
                perioada_start,
                perioada_final,
                nr_elevi
            })
        );

    } catch (err) {
        await conn.rollback();
        console.error('Error in updateProfessorDetails:', err);
        res.status(500).json(
            createResponse(false, 'Error updating professor details', null, err.message)
        );
    } finally {
        conn.release();
    }
};

/**
 * Obținere toți profesorii
 */
const getAllProfessors = async (req, res) => {
    try {
        const [results] = await pool.execute(
            `SELECT 
                id, nume_complet, email, imagine_profil, 
                perioada_start, perioada_final, nr_elevi,
                data_creare, data_actualizare
            FROM profesor`
        );

        res.status(200).json(
            createResponse(true, 'Professors retrieved successfully', results)
        );
    } catch (err) {
        console.error('Error in getAllProfessors:', err);
        res.status(500).json(
            createResponse(false, 'Error retrieving professors', null, err.message)
        );
    }
};

/**
 * Obținere profesor după ID
 */
const getProfessorById = async (req, res) => {
    try {
        const { id } = req.params;

        const [results] = await pool.execute(
            `SELECT 
                id, nume_complet, email, imagine_profil,
                perioada_start, perioada_final, nr_elevi,
                data_creare, data_actualizare
            FROM profesor 
            WHERE id = ?`,
            [id]
        );

        if (results.length === 0) {
            return res.status(404).json(
                createResponse(false, 'Professor not found')
            );
        }

        res.status(200).json(
            createResponse(true, 'Professor retrieved successfully', results[0])
        );
    } catch (err) {
        console.error('Error in getProfessorById:', err);
        res.status(500).json(
            createResponse(false, 'Error retrieving professor', null, err.message)
        );
    }
};

/**
 * Ștergere profesor
 */
const deleteProfessor = async (req, res) => {
    const conn = await pool.getConnection();
    
    try {
        const { id } = req.params;

        await conn.beginTransaction();

        // Verificare dacă profesorul are studenți asociați
        const [students] = await conn.execute(
            'SELECT COUNT(*) as count FROM student WHERE id_profesor = ?',
            [id]
        );

        if (students[0].count > 0) {
            await conn.rollback();
            return res.status(400).json(
                createResponse(false, 'Cannot delete professor with associated students')
            );
        }

        const [result] = await conn.execute(
            'DELETE FROM profesor WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            await conn.rollback();
            return res.status(404).json(
                createResponse(false, 'Professor not found')
            );
        }

        await conn.commit();

        res.status(200).json(
            createResponse(true, 'Professor deleted successfully')
        );
    } catch (err) {
        await conn.rollback();
        console.error('Error in deleteProfessor:', err);
        res.status(500).json(
            createResponse(false, 'Error deleting professor', null, err.message)
        );
    } finally {
        conn.release();
    }
};

module.exports = {
    addProfessorOAUTH,
    updateProfessorDetails,
    getAllProfessors,
    getProfessorById,
    deleteProfessor
};