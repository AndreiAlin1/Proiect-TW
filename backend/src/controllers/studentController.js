const pool = require('../db');

const addStudentOAUTH = async (req, res) => {
    try {
        const { id, full_name, email, profile_picture } = req.body;

        const [checkExisting] = await pool.execute(
            "SELECT * FROM student WHERE id = ?",
            [id]
        );

        if (checkExisting.length > 0) {
            return res.status(200).json({ message: 'Student already exists.' });
        }

        const [result] = await pool.execute(
            `INSERT INTO student (id, nume_complet, email, imagine_profil) 
             VALUES (?, ?, ?, ?)`,
            [id, full_name, email, profile_picture]
        );

        res.status(201).json({ message: 'Student added successfully!', studentId: id });
    } catch (err) {
        res.status(500).json({ message: 'Error adding student after auth', error: err.message });
    }
};

const updateStudentDetails = async (req, res) => {
    try {
        const { id } = req.params; 
        const { series, cls, major, acces_token } = req.body;

        const [result] = await pool.execute(
            `UPDATE student 
             SET serie = ?, grup = ?, specializare = ?, token_acces = ? 
             WHERE id = ?`,
            [series, cls, major, acces_token, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        res.status(200).json({ message: 'Student details updated successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating student details', error: err.message });
    }
};


const getAllStudents = async (req, res) => {
    try {
        const [students] = await pool.execute("SELECT * FROM student");
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ message: "Error fetching students", error: err.message });
    }
};

const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const [student] = await pool.execute("SELECT * FROM student WHERE id = ?", [id]);

        if (student.length === 0) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json(student[0]);
    } catch (err) {
        res.status(500).json({ message: "Error fetching student", error: err.message });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await pool.execute('DELETE FROM student WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting student', error: err.message });
    }
};

const checkStudentByEmail = async (email) => {
    const [result] = await pool.execute('SELECT * FROM student WHERE email = ?', [email]);
    return result.length > 0;
};

const getStudentThesis = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await pool.execute(
            `SELECT s.id, s.nume_complet, l.id AS lucrare_id, l.titlu 
             FROM student s 
             JOIN lucrare l ON s.id_lucrare = l.id 
             WHERE s.id = ?`, [id]
        );
        
        if (result.length === 0) {
            return res.status(404).json({ message: 'Student or thesis not found' });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching student thesis', error: err.message });
    }
};

module.exports = {
    addStudentAfterAuth,
    updateStudentDetails,
    getAllStudents,
    getStudentById,
    deleteStudent,
    checkStudentByEmail,
    getStudentThesis,
};
