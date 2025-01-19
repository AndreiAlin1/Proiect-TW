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
<<<<<<< HEAD
    const conn = await pool.getConnection();  // Get a connection from the pool
    try {
        console.log("Se apeleaza addThesis")
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
        console.error("Error in addThesis:", err);
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
=======
  try {
    console.log("Se apeleaza addThesis");
    const studentId = req.params.id; // Corrected params access
    const { titlu_lucrare } = req.body; // Corrected body access

    const stare = "Neîncarcată";
    const data_incarcare = new Date();

    const [result] = await pool.execute(
      `INSERT INTO lucrare (
          titlu_lucrare, 
          stare, 
          data_incarcare,
          id_student
        ) VALUES (?, ?, ?, ?)`, // Corrected number of placeholders
      [titlu_lucrare, stare, data_incarcare, studentId]
    );

    console.log("Stare" + result.stare);
    res.status(201).json({
      message: "Thesis added successfully!",
      thesisId: result.insertId,
    });
  } catch (err) {
    console.error("Error in addThesis:", err);
    res
      .status(500)
      .json({ message: "Error adding thesis", error: err.message });
  }
};

const getAllTheses = async (req, res) => {
  try {
    const [theses] = await pool.execute("SELECT * FROM lucrare");
    res.status(200).json(theses);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching theses", error: err.message });
  }
};

const getThesisById = async (req, res) => {
  const { id } = req.params;

  try {
    const [thesis] = await pool.execute("SELECT * FROM lucrare WHERE id = ?", [
      id,
    ]);

    if (thesis.length === 0) {
      return res.status(404).json({ message: "Thesis not found" });
>>>>>>> e66dba39b4d507edb5666c01f5ec45cc0e53e8b4
    }

    res.status(200).json(thesis[0]);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching thesis", error: err.message });
  }
};

const getThesisByStudentId = async (req, res) => {
<<<<<<< HEAD
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
=======
  const { id } = req.params; // Student ID from the request params

  try {
    // Query to fetch theses for the given studentId
    const [theses] = await pool.execute(
      "SELECT titlu_lucrare FROM lucrare WHERE id_student = ?",
      [id]
    );
    console.log("ID " + id);
    console.log(theses);

    if (theses.length === 0) {
      return res
        .status(404)
        .json({ message: "No theses found for this student" });
>>>>>>> e66dba39b4d507edb5666c01f5ec45cc0e53e8b4
    }

    res.status(200).json({
      success: true,
      theses: theses[theses.length - 1],
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching theses for student",
      error: err.message,
    });
  }
};

<<<<<<< HEAD
const getThesisByProfId = async (req, res) => {
    const conn = await pool.getConnection();  // Get a connection from the pool
    try {
        console.log("we are inside route")

        const { id } = req.params;

        console.log("Received profId:", id);

        const [theses] = await conn.execute(
            'SELECT * FROM lucrare WHERE id_profesor = ?', 
            [id]
        );

        console.log("Query result:", theses);

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
=======
const updateThesisStatus = async (req, res) => {
  const { id } = req.params;
  const { stare } = req.body;

  const validStates = ["In evaluare", "Aprobată", "Respinsă", "Neîncărcată"];
  if (!validStates.includes(stare)) {
    return res.status(400).json({
      message:
        "Invalid status. Must be one of: In evaluare, Aprobată, Respinsă",
    });
  }

  try {
    const [result] = await pool.execute(
      "UPDATE lucrare SET stare = ? WHERE id = ?",
      [stare, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Thesis not found or status unchanged" });
    }

    res.status(200).json({ message: "Thesis status updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating thesis status", error: err.message });
  }
};

const setThesisProf = async (req, res) => {
  const { id } = req.params;
  const { stare, id_prof } = req.body;

  try {
    const [result] = await pool.execute(
      "UPDATE lucrare SET stare = ?, id_profesor = ? WHERE id = ?",
      [stare, id_prof, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Thesis not found or status unchanged" });
>>>>>>> e66dba39b4d507edb5666c01f5ec45cc0e53e8b4
    }

    res.status(200).json({ message: "Thesis status updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating thesis status", error: err.message });
  }
};

const deleteThesis = async (req, res) => {
<<<<<<< HEAD
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
=======
  const { id } = req.params;

  try {
    const [result] = await pool.execute("DELETE FROM lucrare WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Thesis not found" });
>>>>>>> e66dba39b4d507edb5666c01f5ec45cc0e53e8b4
    }

    res.status(200).json({ message: "Thesis deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting thesis", error: err.message });
  }
};

module.exports = {
<<<<<<< HEAD
    addThesis,
    getAllTheses,
    getThesisById,
    getThesisByStudentId,
    getThesisByProfId,
    updateThesisStatus,
    setThesisProf,
    deleteThesis,
=======
  addThesis,
  getAllTheses,
  getThesisById,
  getThesisByStudentId,
  updateThesisStatus,
  setThesisProf,
  deleteThesis,
>>>>>>> e66dba39b4d507edb5666c01f5ec45cc0e53e8b4
};
