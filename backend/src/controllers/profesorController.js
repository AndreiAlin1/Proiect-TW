const pool = require('../db');

const addProfessor = async (req, res) => {
    try {
        const { id, nume_complet, email, imagine_profil, perioada_start, perioada_final } = req.body;
        const [result] = await pool.execute(
            `INSERT INTO profesor (id, nume_complet, email, imagine_profil, perioada_start, perioada_final) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [id, nume_complet, email, imagine_profil, perioada_start, perioada_final]
        );
        res.status(201).json({ message: 'Professor added successfully!', professorId: id });
    } catch (err) {
        res.status(500).json({ message: 'Error adding professor.', error: err.message });
    }
};

const addProfessorOAUTH = async (req, res) => {
    try {
        const { id, full_name, email, profile_picture } = req.body;
        const [checkExisting] = await pool.execute(
            "SELECT * FROM profesor WHERE id = ?", 
            [id]
        );

        if (checkExisting.length > 0) {
            return res.status(200).json({ message: "Professor already exists" });
        }

        const [result] = await pool.execute(
            `INSERT INTO profesor (id, nume_complet, email, imagine_profil) 
             VALUES (?, ?, ?, ?)`,
            [id, full_name, email, profile_picture]
        );
        
        res.status(201).json({ message: 'Professor added successfully via OAUTH!', professorId: id });
    } catch (err) {
        res.status(500).json({ message: "Error adding professor OAUTH.", error: err.message });
    }
};

const updateProfessorDetails = async (req, res) => {
    const { id } = req.params;
    const { perioada_start, perioada_final } = req.body;
    try {
        const [result] = await pool.execute(
            `UPDATE profesor SET perioada_start = ?, perioada_final = ? WHERE id = ?`,
            [perioada_start, perioada_final, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Professor not found.' });
        }
        
        res.json({ message: 'Professor details updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: "Error updating professor details.", error: err.message });
    }
};

const getAllProfessors = async (req, res) => {
    try {
        const [results] = await pool.execute(`SELECT * FROM profesor`);
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving professors.', error: err.message });
    }
};

const getProfessorById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await pool.execute(
            `SELECT * FROM profesor WHERE id = ?`, 
            [id]
        );

        if (results.length === 0) {
            return res.status(404).json({ message: 'Professor not found.' });
        }

        res.json(results[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving professor.', error: err.message });
    }
};

const updateProfessor = async (req, res) => {
    const { id } = req.params;
    const { nume_complet, email, imagine_profil, perioada_start, perioada_final, nr_elevi } = req.body;

    try {
        const [result] = await pool.execute(
            `UPDATE profesor 
             SET nume_complet = ?, email = ?, imagine_profil = ?, 
                 perioada_start = ?, perioada_final = ?, nr_elevi = ? 
             WHERE id = ?`,
            [nume_complet, email, imagine_profil, perioada_start, perioada_final, nr_elevi, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Professor not found.' });
        }

        res.json({ message: 'Professor updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating professor.', error: err.message });
    }
};

const deleteProfessor = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute(
            `DELETE FROM profesor WHERE id = ?`, 
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Professor not found.' });
        }

        res.json({ message: 'Professor deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting professor.', error: err.message });
    }
};

module.exports = {
    addProfessor,
    addProfessorOAUTH,
    getAllProfessors,
    getProfessorById,
    updateProfessor,
    updateProfessorDetails,
    deleteProfessor
};