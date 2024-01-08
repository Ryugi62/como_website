const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET: 모든 Durations 가져오기
router.get("/", async (req, res) => {
  try {
    const durations = await db.query("SELECT * FROM Durations");
    res.status(200).json(durations);
  } catch (error) {
    console.error("Error fetching durations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: 새로운 Duration 추가
router.post("/", async (req, res) => {
  const { Duration } = req.body;

  if (!Duration) {
    return res.status(400).json({ error: "Duration is required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO Durations (Duration) VALUES (?)",
      [Duration]
    );
    res
      .status(201)
      .json({
        message: "Duration added successfully",
        DurationID: result.insertId,
      });
  } catch (error) {
    console.error("Error adding new duration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: Duration 업데이트
router.put("/:durationId", async (req, res) => {
  const { durationId } = req.params;
  const { Duration } = req.body;

  try {
    const result = await db.query(
      "UPDATE Durations SET Duration = ? WHERE DurationID = ?",
      [Duration, durationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Duration not found" });
    }

    res.status(200).json({ message: "Duration updated successfully" });
  } catch (error) {
    console.error("Error updating duration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: Duration 삭제
router.delete("/:durationId", async (req, res) => {
  const { durationId } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM Durations WHERE DurationID = ?",
      [durationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Duration not found" });
    }

    res.status(200).json({ message: "Duration deleted successfully" });
  } catch (error) {
    console.error("Error deleting duration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
