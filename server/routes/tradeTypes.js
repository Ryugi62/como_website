const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET: 모든 TradeTypes 가져오기
router.get("/", async (req, res) => {
  try {
    const tradeTypes = await db.query("SELECT * FROM TradeTypes");
    res.status(200).json(tradeTypes);
  } catch (error) {
    console.error("Error fetching trade types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: 새로운 TradeType 추가
router.post("/", async (req, res) => {
  const { TypeName } = req.body;

  if (!TypeName) {
    return res.status(400).json({ error: "TypeName is required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO TradeTypes (TypeName) VALUES (?)",
      [TypeName]
    );
    res
      .status(201)
      .json({
        message: "TradeType added successfully",
        TradeTypeID: result.insertId,
      });
  } catch (error) {
    console.error("Error adding new trade type:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: TradeType 업데이트
router.put("/:tradeTypeId", async (req, res) => {
  const { tradeTypeId } = req.params;
  const { TypeName } = req.body;

  try {
    const result = await db.query(
      "UPDATE TradeTypes SET TypeName = ? WHERE TradeTypeID = ?",
      [TypeName, tradeTypeId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "TradeType not found" });
    }

    res.status(200).json({ message: "TradeType updated successfully" });
  } catch (error) {
    console.error("Error updating trade type:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: TradeType 삭제
router.delete("/:tradeTypeId", async (req, res) => {
  const { tradeTypeId } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM TradeTypes WHERE TradeTypeID = ?",
      [tradeTypeId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "TradeType not found" });
    }

    res.status(200).json({ message: "TradeType deleted successfully" });
  } catch (error) {
    console.error("Error deleting trade type:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
