const pool = require("../config/db");

// Helper function for standardized response format
const createResponse = (success, message, data = null, error = null) => ({
  success,
  message,
  data,
  ...(error && {
    error: process.env.NODE_ENV === "development" ? error : "Internal server error",
  }),
});

const addThesis = async (req, res) => {
  const conn = await pool.getConnection();  // Get a connection from the pool
  try {
    const studentId = req.params.id;
    const { titlu_lucrare } = req.body;
    
    const stare = 'Neîncarcată';
    const data_incarcare = new Date();
    
    const [result] = await conn.execute(
      `INSERT INTO lucrare (titlu_lucrare, stare, data_incarcare, id_student) 
       VALUES (?, ?, ?, ?)`,
      [titlu_lucrare, stare, data_incarcare, studentId]
    );
    
    return res.status(201).json(createResponse(
      true,
      'Thesis added successfully!',
      { thesisId: result.insertId }
    ));
  } catch (err) {
    return res.status(500).json(createResponse(
      false,
      'Error adding thesis',
      null,
      err.message
    ));
  } finally {
    conn.release();  // Release the connection back to the pool
  }
};

const getAllTheses = async (req, res) => {
  const conn = await pool.getConnection();  // Get a connection from the pool
  try {
    const [theses] = await conn.execute('SELECT * FROM lucrare');
    return res.status(200).json(createResponse(
      true,
      'Theses retrieved successfully',
      theses
    ));
  } catch (err) {
    return res.status(500).json(createResponse(
      false,
      'Error fetching theses',
      null,
      err.message
    ));
  } finally {
    conn.release();  // Release the connection back to the pool
  }
};

const getThesisById = async (req, res) => {
  const conn = await pool.getConnection();  // Get a connection from the pool
  try {
    const { id } = req.params;
    
    const [thesis] = await conn.execute(
      'SELECT * FROM lucrare WHERE id = ?',
      [id]
    );

    if (thesis.length === 0) {
      return res.status(404).json(createResponse(
        false,
        'Thesis not found',
        null
      ));
    }

    return res.status(200).json(createResponse(
      true,
      'Thesis retrieved successfully',
      thesis[0]
    ));
  } catch (err) {
    return res.status(500).json(createResponse(
      false,
      'Error fetching thesis',
      null,
      err.message
    ));
  } finally {
    conn.release();  // Release the connection back to the pool
  }
};

const getThesisByStudentId = async (req, res) => {
  const conn = await pool.getConnection();  // Get a connection from the pool
  try {
    const { studentId } = req.params;

    const [theses] = await conn.execute(
      'SELECT * FROM lucrare WHERE id_student = ?',
      [studentId]
    );

    if (theses.length === 0) {
      return res.status(404).json(createResponse(
        false,
        'No theses found for this student',
        null
      ));
    }

    return res.status(200).json(createResponse(
      true,
      'Theses retrieved successfully',
      theses
    ));
  } catch (err) {
    return res.status(500).json(createResponse(
      false,
      'Error fetching theses for student',
      null,
      err.message
    ));
  } finally {
    conn.release();  // Release the connection back to the pool
  }
};

const getThesisByProfId = async (req, res) => {
  const conn = await pool.getConnection();  // Get a connection from the pool
  try {
    const { id } = req.params;

    const [theses] = await conn.execute(
      'SELECT * FROM lucrare WHERE id_profesor = ?',
      [id]
    );

    if (theses.length === 0) {
      return res.status(404).json(createResponse(
        false,
        'No theses found for this professor',
        null
      ));
    }

    return res.status(200).json(createResponse(
      true,
      'Theses retrieved successfully',
      theses
    ));
  } catch (err) {
    return res.status(500).json(createResponse(
      false,
      'Error fetching theses for professor',
      null,
      err.message
    ));
  } finally {
    conn.release();  // Release the connection back to the pool
  }
};

const updateThesisStatus = async (req, res) => {
  const conn = await pool.getConnection();  // Get a connection from the pool
  try {
    const { id } = req.params;
    const { stare } = req.body;

    const validStates = ['In evaluare', 'Aprobată', 'Respinsă', 'Neîncărcată'];
    if (!validStates.includes(stare)) {
      return res.status(400).json(createResponse(
        false,
        'Invalid status. Must be one of: In evaluare, Aprobată, Respinsă, Neîncărcată',
        null
      ));
    }

    const [result] = await conn.execute(
      'UPDATE lucrare SET stare = ? WHERE id = ?',
      [stare, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json(createResponse(
        false,
        'Thesis not found or status unchanged',
        null
      ));
    }

    return res.status(200).json(createResponse(
      true,
      'Thesis status updated successfully',
      null
    ));
  } catch (err) {
    return res.status(500).json(createResponse(
      false,
      'Error updating thesis status',
      null,
      err.message
    ));
  } finally {
    conn.release();  // Release the connection back to the pool
  }
};

const setThesisProf = async (req, res) => {
  const conn = await pool.getConnection();  // Get a connection from the pool
  try {
    const { id } = req.params;
    const { stare, id_prof } = req.body;

    const [result] = await conn.execute(
      'UPDATE lucrare SET stare = ?, id_profesor = ? WHERE id = ?',
      [stare, id_prof, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json(createResponse(
        false,
        'Thesis not found or update unsuccessful',
        null
      ));
    }

    return res.status(200).json(createResponse(
      true,
      'Thesis professor and status updated successfully',
      null
    ));
  } catch (err) {
    return res.status(500).json(createResponse(
      false,
      'Error updating thesis professor and status',
      null,
      err.message
    ));
  } finally {
    conn.release();  // Release the connection back to the pool
  }
};

const deleteThesis = async (req, res) => {
  const conn = await pool.getConnection();  // Get a connection from the pool
  try {
    const { id } = req.params;

    const [result] = await conn.execute(
      'DELETE FROM lucrare WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json(createResponse(
        false,
        'Thesis not found',
        null
      ));
    }

    return res.status(200).json(createResponse(
      true,
      'Thesis deleted successfully',
      null
    ));
  } catch (err) {
    return res.status(500).json(createResponse(
      false,
      'Error deleting thesis',
      null,
      err.message
    ));
  } finally {
    conn.release();  // Release the connection back to the pool
  }
};

module.exports = {
  addThesis,
  getAllTheses,
  getThesisById,
  getThesisByStudentId,
  getThesisByProfId,
  updateThesisStatus,
  setThesisProf,
  deleteThesis,
};
