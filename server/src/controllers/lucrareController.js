const pool = require("../config/db");

const createResponse = (success, message, data = null, error = null) => ({
  success,
  message,
  data,
  ...(error && {
    error:
      process.env.NODE_ENV === "development" ? error : "Internal server error",
  }),
});

const addThesis = async (req, res) => {
  const conn = await pool.getConnection(); // Get a connection from the pool
  try {
    const studentId = req.params.id;
    const { titlu_lucrare } = req.body;

    const stare = "Neîncarcată";
    const data_incarcare = new Date();

    const [result] = await conn.execute(
      `INSERT INTO lucrare (titlu_lucrare, stare, data_incarcare, id_student) 
       VALUES (?, ?, ?, ?)`,
      [titlu_lucrare, stare, data_incarcare, studentId]
    );

    return res.status(201).json(
      createResponse(true, "Thesis added successfully!", {
        thesisId: result.insertId,
      })
    );
  } catch (err) {
    return res
      .status(500)
      .json(createResponse(false, "Error adding thesis", null, err.message));
  } finally {
    conn.release(); // Release the connection back to the pool
  }
};

const getAllTheses = async (req, res) => {
  const conn = await pool.getConnection(); // Get a connection from the pool
  try {
    const [theses] = await conn.execute("SELECT * FROM lucrare");
    return res
      .status(200)
      .json(createResponse(true, "Theses retrieved successfully", theses));
  } catch (err) {
    return res
      .status(500)
      .json(createResponse(false, "Error fetching theses", null, err.message));
  } finally {
    conn.release(); // Release the connection back to the pool
  }
};

const getThesisById = async (req, res) => {
  const conn = await pool.getConnection(); // Get a connection from the pool
  try {
    const { id } = req.params;

    const [thesis] = await conn.execute("SELECT * FROM lucrare WHERE id = ?", [
      id,
    ]);

    if (thesis.length === 0) {
      return res
        .status(404)
        .json(createResponse(false, "Thesis not found", null));
    }

    return res
      .status(200)
      .json(createResponse(true, "Thesis retrieved successfully", thesis[0]));
  } catch (err) {
    return res
      .status(500)
      .json(createResponse(false, "Error fetching thesis", null, err.message));
  } finally {
    conn.release(); // Release the connection back to the pool
  }
};

const getThesisTitleByStudentId = async (req, res) => {
  const { id } = req.params;

  try {
    const [theses] = await pool.execute(
      "SELECT titlu_lucrare FROM lucrare WHERE id_student = ?",
      [id]
    );

    // Pentru cont nou, returnăm un răspuns de succes cu titlu null
    if (theses.length === 0) {
      return res.status(200).json({
        success: true,
        theses: { titlu_lucrare: null },
      });
    }

    res.status(200).json({
      success: true,
      theses: theses[theses.length - 1],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching theses for student",
      error: err.message,
    });
  }
};

const getThesisProfessorIdByStudentId = async (req, res) => {
  const { id } = req.params;

  try {
    const [theses] = await pool.execute(
      "SELECT id_profesor FROM lucrare WHERE id_student = ?",
      [id]
    );

    // Pentru cont nou, returnăm un răspuns de succes cu titlu null
    if (theses.length === 0) {
      return res.status(200).json({
        success: true,
        theses: { id_profesor: null },
      });
    }

    res.status(200).json({
      success: true,
      theses: theses[theses.length - 1],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching theses for student",
      error: err.message,
    });
  }
};

const getThesisStatusByStudentId = async (req, res) => {
  const { id } = req.params;
  console.log("FOR THESES STATUS STEP " + id);

  try {
    const [theses] = await pool.execute(
      "SELECT stare FROM lucrare WHERE id_student = ?",
      [id]
    );

    // Pentru cont nou, returnăm un răspuns de succes cu titlu null
    if (theses.length === 0) {
      return res.status(200).json({
        success: true,
        theses: { stare: null },
      });
    }

    res.status(200).json({
      success: true,
      theses: theses[theses.length - 1],
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching theses for student",
      error: err.message,
    });
  }
};

const getThesisByStudentId = async (req, res) => {
  const conn = await pool.getConnection(); // Get a connection from the pool
  try {
    const { studentId } = req.params;

    const [theses] = await conn.execute(
      "SELECT * FROM lucrare WHERE id_student = ?",
      [studentId]
    );

    if (theses.length === 0) {
      return res
        .status(404)
        .json(createResponse(false, "No theses found for this student", null));
    }

    return res
      .status(200)
      .json(createResponse(true, "Theses retrieved successfully", theses));
  } catch (err) {
    return res
      .status(500)
      .json(
        createResponse(
          false,
          "Error fetching theses for student",
          null,
          err.message
        )
      );
  } finally {
    conn.release();
  }
};

const getThesisByProfId = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { id } = req.params;

    const [theses] = await conn.execute(
      "SELECT * FROM lucrare WHERE id_profesor = ?",
      [id]
    );

    if (theses.length === 0) {
      return res
        .status(404)
        .json(
          createResponse(false, "No theses found for this professor", null)
        );
    }

    return res
      .status(200)
      .json(createResponse(true, "Theses retrieved successfully", theses));
  } catch (err) {
    return res
      .status(500)
      .json(
        createResponse(
          false,
          "Error fetching theses for professor",
          null,
          err.message
        )
      );
  } finally {
    conn.release(); // Release the connection back to the pool
  }
};

const updateThesisStatus = async (req, res) => {
  const conn = await pool.getConnection(); // Get a connection from the pool
  try {
    const { id } = req.params;
    const { stare } = req.body;

    const validStates = ["In evaluare", "Aprobată", "Respinsă", "Neîncărcată"];
    if (!validStates.includes(stare)) {
      return res
        .status(400)
        .json(
          createResponse(
            false,
            "Invalid status. Must be one of: In evaluare, Aprobată, Respinsă, Neîncărcată",
            null
          )
        );
    }

    const [result] = await conn.execute(
      "UPDATE lucrare SET stare = ? WHERE id = ?",
      [stare, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(
          createResponse(false, "Thesis not found or status unchanged", null)
        );
    }

    return res
      .status(200)
      .json(createResponse(true, "Thesis status updated successfully", null));
  } catch (err) {
    return res
      .status(500)
      .json(
        createResponse(false, "Error updating thesis status", null, err.message)
      );
  } finally {
    conn.release(); // Release the connection back to the pool
  }
};

const updateThesisStareAcceptata = async (req, res) => {
  console.log("merge");
  const conn = await pool.getConnection(); // Get a connection from the pool
  try {
    const { id } = req.params;
    console.log("ID -UL THESIS DORIT" + id);

    const validStates = ["In evaluare", "Aprobată", "Respinsă", "Neîncărcată"];

    const [result] = await conn.execute(
      "UPDATE lucrare SET stare = ? WHERE id = ?",
      [validStates[1], id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(
          createResponse(false, "Thesis not found or status unchanged", null)
        );
    }

    return res
      .status(200)
      .json(createResponse(true, "Thesis status updated successfully", null));
  } catch (err) {
    return res
      .status(500)
      .json(
        createResponse(false, "Error updating thesis status", null, err.message)
      );
  } finally {
    conn.release(); // Release the connection back to the pool
  }
};

const setThesisProf = async (req, res) => {
  const conn = await pool.getConnection(); // Get a connection from the pool
  try {
    const { id } = req.params;
    const { stare, id_prof } = req.body;

    const [result] = await conn.execute(
      "UPDATE lucrare SET stare = ?, id_profesor = ? WHERE id = ?",
      [stare, id_prof, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(
          createResponse(false, "Thesis not found or update unsuccessful", null)
        );
    }

    return res
      .status(200)
      .json(
        createResponse(
          true,
          "Thesis professor and status updated successfully",
          null
        )
      );
  } catch (err) {
    return res
      .status(500)
      .json(
        createResponse(
          false,
          "Error updating thesis professor and status",
          null,
          err.message
        )
      );
  } finally {
    conn.release(); // Release the connection back to the pool
  }
};

const deleteThesis = async (req, res) => {
  const conn = await pool.getConnection(); // Get a connection from the pool
  try {
    const { id } = req.params;

    const [result] = await conn.execute("DELETE FROM lucrare WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json(createResponse(false, "Thesis not found", null));
    }

    return res
      .status(200)
      .json(createResponse(true, "Thesis deleted successfully", null));
  } catch (err) {
    return res
      .status(500)
      .json(createResponse(false, "Error deleting thesis", null, err.message));
  } finally {
    conn.release(); // Release the connection back to the pool
  }
};

const getNumberOfStudents = async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const { id } = req.params; // Extrage ID-ul din parametrii request-ului
    console.log("PROFFESOR ID PROVIDED " + id);

    // Validare parametru
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Professor ID is required",
      });
    }

    // Verifică mai întâi dacă profesorul există
    const [profExists] = await conn.execute(
      "SELECT id FROM profesor WHERE id = ?",
      [id]
    );

    if (profExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No professor found with ID: ${id}`,
      });
    }

    // Obține numărul de studenți
    const [rows] = await conn.execute(
      `SELECT COUNT(DISTINCT id_student) as nr_studenti 
       FROM lucrare 
       WHERE id_profesor = ? 
       AND stare = 'Aprobată'`,
      [id]
    );

    // Verifică dacă query-ul a returnat rezultate valide
    if (!rows || !rows[0] || rows[0].nr_studenti === null) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve student count",
      });
    }

    return res.json({
      success: true,
      data: {
        professorId: id,
        studentCount: rows[0].nr_studenti,
      },
      message: "Student count retrieved successfully",
    });
  } catch (error) {
    console.error("Error in getNumberOfStudents:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to get number of students",
    });
  } finally {
    if (conn) {
      conn.release();
    }
  }
};

// const getThesisStare = async (req, res) => {
//   let conn;
//   try {
//     conn = await pool.getConnection();
//     const { id } = req.params; // Extrage ID-ul din parametrii request-ului

//     // Validare parametru
//     if (!id) {
//       return res.status(400).json({
//         success: false,
//         message: "THESIS ID is required",
//       });
//     }

//     // Obține numărul de studenți
//     const [rows] = await conn.execute(
//       `SELECT stare from lucrare
//          FROM lucrare
//          stare = 'Aprobată'`,
//       [id]
//     );

//     // Verifică dacă query-ul a returnat rezultate valide
//     if (!rows || !rows[0] || rows[0].nr_studenti === null) {
//       return res.status(500).json({
//         success: false,
//         message: "Failed to retrieve student count",
//       });
//     }

//     return res.json({
//       success: true,
//       data: {
//         professorId: id,
//         studentCount: rows[0].nr_studenti,
//       },
//       message: "Student count retrieved successfully",
//     });
//   } catch (error) {
//     console.error("Error in getNumberOfStudents:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message || "Failed to get number of students",
//     });
//   } finally {
//     if (conn) {
//       conn.release();
//     }
//   }
// };
module.exports = {
  addThesis,
  getAllTheses,
  getThesisById,
  getThesisByStudentId,
  getThesisByProfId,
  getThesisTitleByStudentId,
  updateThesisStatus,
  setThesisProf,
  deleteThesis,
  updateThesisStareAcceptata,
  getNumberOfStudents,
  getThesisStatusByStudentId,
  getThesisProfessorIdByStudentId,
};
