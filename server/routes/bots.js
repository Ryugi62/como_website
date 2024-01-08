// 여기에 라우트 설정을 추가
const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET: 모든 Bots 가져오기
router.get("/", async (req, res) => {
  try {
    const bots = await db.query("SELECT * FROM Bots");
    res.status(200).json(bots);
  } catch (error) {
    console.error("Error fetching bots:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: 새로운 Bot 추가
router.post("/", async (req, res) => {
  const { BotName } = req.body;

  if (!BotName) {
    return res.status(400).json({ error: "BotName is required" });
  }

  try {
    const result = await db.query("INSERT INTO Bots (BotName) VALUES (?)", [
      BotName,
    ]);
    res
      .status(201)
      .json({ message: "Bot added successfully", BotID: result.insertId });
  } catch (error) {
    console.error("Error adding new bot:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: Bot 업데이트
router.put("/:botId", async (req, res) => {
  const { botId } = req.params;
  const { BotName } = req.body;

  try {
    const result = await db.query(
      "UPDATE Bots SET BotName = ? WHERE BotID = ?",
      [BotName, botId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Bot not found" });
    }

    res.status(200).json({ message: "Bot updated successfully" });
  } catch (error) {
    console.error("Error updating bot:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: Bot 삭제
router.delete("/:botId", async (req, res) => {
  const { botId } = req.params;

  try {
    const result = await db.query("DELETE FROM Bots WHERE BotID = ?", [botId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Bot not found" });
    }

    res.status(200).json({ message: "Bot deleted successfully" });
  } catch (error) {
    console.error("Error deleting bot:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
