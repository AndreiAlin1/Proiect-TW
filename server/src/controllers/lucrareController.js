const pool = require('../config/db');

const addThesis = async (req, res) => {
    try {
      const studentId = req.params.id;  // Corrected params access
      const { titlu_lucrare } = req.body;  // Corrected body access
      
      const stare = 'Neîncarcată';
      const data_incarcare = new Date();
  
      const [result] = await pool.execute(
        `INSERT INTO lucrare (
          titlu_lucrare, 
          stare, 
          data_incarcare,
          id_student
        ) VALUES (?, ?, ?, ?)`,  // Corrected number of placeholders
        [titlu_lucrare, stare, data_incarcare, studentId]
      );
  
      res.status(201).json({ 
        message: 'Thesis added successfully!', 
        thesisId: result.insertId 
      });
    } catch (err) {
      console.error("Error in addThesis:", err);
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

const getThesisByStudentId = async (req, res) => {
    const { studentId } = req.params;  // Student ID from the request params

    try {
        // Query to fetch theses for the given studentId
        const [theses] = await pool.execute(
            'SELECT * FROM lucrare WHERE id_student = ?', 
            [studentId]
        );

        if (theses.length === 0) {
            return res.status(404).json({ message: 'No theses found for this student' });
        }

        res.status(200).json(theses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching theses for student', error: err.message });
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
    getThesisByStudentId,
    updateThesisStatus,
    deleteThesis,
};