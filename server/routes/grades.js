const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET: 모든 Grades 가져오기
router.get("/", async (req, res) => {
  try {
    const grades = await db.query("SELECT * FROM Grades");
    res.status(200).json(grades);
  } catch (error) {
    console.error("Error fetching grades:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: 새로운 Grade 추가
router.post("/", async (req, res) => {
  const { GradeName } = req.body;

  if (!GradeName) {
    return res.status(400).json({ error: "GradeName is required" });
  }

  try {
    const result = await db.query("INSERT INTO Grades (GradeName) VALUES (?)", [
      GradeName,
    ]);
    res
      .status(201)
      .json({ message: "Grade added successfully", GradeID: result.insertId });
  } catch (error) {
    console.error("Error adding new grade:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: Grade 업데이트
router.put("/:gradeId", async (req, res) => {
  const { gradeId } = req.params;
  const { GradeName } = req.body;

  try {
    const result = await db.query(
      "UPDATE Grades SET GradeName = ? WHERE GradeID = ?",
      [GradeName, gradeId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Grade not found" });
    }

    res.status(200).json({ message: "Grade updated successfully" });
  } catch (error) {
    console.error("Error updating grade:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: Grade 삭제
router.delete("/:gradeId", async (req, res) => {
  const { gradeId } = req.params;

  try {
    const result = await db.query("DELETE FROM Grades WHERE GradeID = ?", [
      gradeId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Grade not found" });
    }

    res.status(200).json({ message: "Grade deleted successfully" });
  } catch (error) {
    console.error("Error deleting grade:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
