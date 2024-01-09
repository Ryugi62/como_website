const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET: 모든 PlanDetails 가져오기
router.get("/", async (req, res) => {
  try {
    const query = `SELECT 
          PlanDetails.PlanDetailID, 
          Bots.BotName, 
          TradeTypes.TypeName AS TradeType, 
          Durations.Duration, 
          Grades.GradeName AS Grade,
          GROUP_CONCAT(DISTINCT Prices.Price ORDER BY Prices.Price) AS Prices,
          GROUP_CONCAT(DISTINCT Features.FeatureName ORDER BY Features.FeatureName) AS Features
      FROM 
          PlanDetails
      LEFT JOIN Bots ON PlanDetails.BotID = Bots.BotID
      LEFT JOIN TradeTypes ON PlanDetails.TradeTypeID = TradeTypes.TradeTypeID
      LEFT JOIN Durations ON PlanDetails.DurationID = Durations.DurationID
      LEFT JOIN Grades ON PlanDetails.GradeID = Grades.GradeID
      LEFT JOIN Prices ON PlanDetails.PlanDetailID = Prices.PlanDetailID
      LEFT JOIN Features ON PlanDetails.PlanDetailID = Features.PlanDetailID
      GROUP BY 
          PlanDetails.PlanDetailID`;
    const planDetails = await db.query(query);

    // 결과에서 Prices 및 Features를 배열로 분할
    const planDetailsWithPricesAndFeatures = planDetails.map((detail) => {
      return {
        PlanDetailID: detail.PlanDetailID,
        BotName: detail.BotName,
        TradeType: detail.TradeType,
        Duration: detail.Duration,
        Grade: detail.Grade,
        Prices: Number(detail.Prices) ? [Number(detail.Prices)] : 0,
        Features: detail.Features ? detail.Features.split(",") : [],
      };
    });

    res.status(200).json(planDetailsWithPricesAndFeatures);
  } catch (error) {
    console.error("Get all plan details failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: 새로운 PlanDetail 추가
router.post("/", async (req, res) => {
  const { BotID, TradeTypeID, DurationID, GradeID } = req.body;

  if (!BotID || !TradeTypeID || !DurationID || !GradeID) {
    return res.status(400).json({
      error: "BotID, TradeTypeID, DurationID, and GradeID are required",
    });
  }

  try {
    const insertQuery = `INSERT INTO PlanDetails (BotID, TradeTypeID, DurationID, GradeID) VALUES (?, ?, ?, ?)`;
    const result = await db.query(insertQuery, [
      BotID,
      TradeTypeID,
      DurationID,
      GradeID,
    ]);
    const newPlanDetailId = result.insertId;

    res.status(201).json({
      message: "New PlanDetail added successfully",
      PlanDetailID: newPlanDetailId,
    });
  } catch (error) {
    console.error("Add new plan detail failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: 특정 PlanDetail 삭제
router.delete("/:planDetailId", async (req, res) => {
  const { planDetailId } = req.params;

  console.log("planDetailId:", planDetailId);

  try {
    const result = await db.query(
      "DELETE FROM PlanDetails WHERE PlanDetailID = ?",
      [planDetailId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Plan detail not found" });
    }

    res.status(200).json({ message: "Plan detail deleted successfully" });
  } catch (error) {
    console.error("Error deleting plan detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: 특정 PlanDetail 업데이트
router.put("/:planDetailId", async (req, res) => {
  const { planDetailId } = req.params;
  const { BotID, TradeTypeID, DurationID, GradeID, Prices, Features } =
    req.body;

  console.log("req.body:", req.body);

  if (
    !BotID ||
    !TradeTypeID ||
    !DurationID ||
    !GradeID ||
    !Prices ||
    !Features
  ) {
    return res.status(400).json({
      error: "BotID, TradeTypeID, DurationID, and GradeID are required",
    });
  }

  try {
    const query =
      "UPDATE PlanDetails SET BotID = ?, TradeTypeID = ?, DurationID = ?, GradeID = ? WHERE PlanDetailID = ?";
    const result = await db.query(query, [
      BotID,
      TradeTypeID,
      DurationID,
      GradeID,
      planDetailId,
    ]);

    // 기존의 Prices 및 Features 삭제
    await db.query("DELETE FROM Prices WHERE PlanDetailID = ?", [planDetailId]);
    await db.query("DELETE FROM Features WHERE PlanDetailID = ?", [
      planDetailId,
    ]);

    // 새로운 Prices 및 Features 추가
    await db.query("INSERT INTO Prices (PlanDetailID, Price) VALUES (?, ?)", [
      planDetailId,
      Prices,
    ]);
    for (const feature of Features) {
      console.log("feature:", feature);

      await db.query(
        "INSERT INTO Features (PlanDetailID, FeatureName) VALUES (?, ?)",
        [planDetailId, feature]
      );
    }

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Plan detail updated successfully" });
    } else {
      res.status(404).json({ error: "Plan detail not found" });
    }
  } catch (error) {
    console.error("Update plan detail failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
