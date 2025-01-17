const pool = require('../db');

const addThesis = async (req, res) => {
    try {
        const {
            titlu_lucrare,
            descriere,
            locatie_pdf,
            stare,
            id_student,
            id_profesor,
        } = req.body;

        //trebuie sa dam inseram o stare "corecta"
        const validStates = ['In evaluare', 'Aprobată', 'Respinsă'];
        if (!validStates.includes(stare)) {
            return res.status(400).json({ 
                message: 'Invalid status. Must be one of: In evaluare, Aprobată, Respinsă' 
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO lucrare (
                titlu_lucrare, 
                descriere, 
                locatie_pdf, 
                stare, 
                id_student, 
                id_profesor
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [titlu_lucrare, descriere, locatie_pdf, stare, id_student, id_profesor]
        );

        res.status(201).json({ 
            message: 'Thesis added successfully!', 
            thesisId: result.insertId 
        });
    } catch (err) {
        res.status(500).json({ message: 'Error adding thesis', error: err.message });
    }
};

const getAllTheses = async (req, res) => {
    try {
        const [theses] = await pool.execute('SELECT * FROM lucrare');
        res.status(200).json(theses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching theses', error: err.message });
    }
};

const getThesisById = async (req, res) => {
    const { id } = req.params;

    try {
        const [thesis] = await pool.execute(
            'SELECT * FROM lucrare WHERE id = ?', 
            [id]
        );

        if (thesis.length === 0) {
            return res.status(404).json({ message: 'Thesis not found' });
        }

        res.status(200).json(thesis[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching thesis', error: err.message });
    }
};

const updateThesisStatus = async (req, res) => {
    const { id } = req.params;
    const { stare } = req.body;

    const validStates = ['In evaluare', 'Aprobată', 'Respinsă'];
    if (!validStates.includes(stare)) {
        return res.status(400).json({ 
            message: 'Invalid status. Must be one of: In evaluare, Aprobată, Respinsă' 
        });
    }

    try {
        const [result] = await pool.execute(
            'UPDATE lucrare SET stare = ? WHERE id = ?', 
            [stare, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Thesis not found or status unchanged' });
        }

        res.status(200).json({ message: 'Thesis status updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating thesis status', error: err.message });
    }
};

const deleteThesis = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.execute(
            'DELETE FROM lucrare WHERE id = ?', 
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Thesis not found' });
        }

        res.status(200).json({ message: 'Thesis deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting thesis', error: err.message });
    }
};

module.exports = {
    addThesis,
    getAllTheses,
    getThesisById,
    updateThesisStatus,
    deleteThesis,
};