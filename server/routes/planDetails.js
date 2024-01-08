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
        // to number
        Prices: Number(detail.Prices),
        Features: detail.Features.split(","),
      };
    });

    console.log("Get all plan details:", planDetailsWithPricesAndFeatures);

    res.status(200).json(planDetailsWithPricesAndFeatures);
  } catch (error) {
    console.error("Get all plan details failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST: 새로운 PlanDetail 추가
router.post("/", async (req, res) => {
  const { BotID, TradeTypeID, DurationID, GradeID, Prices, Features } =
    req.body;

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

    // Prices 추가
    if (Prices && Prices.length) {
      const pricesQuery = `INSERT INTO Prices (PlanDetailID, Price) VALUES ?`;
      const pricesValues = Prices.map((price) => [newPlanDetailId, price]);
      await db.query(pricesQuery, [pricesValues]);
    }

    // Features 추가
    if (Features && Features.length) {
      const featuresQuery = `INSERT INTO Features (PlanDetailID, FeatureName) VALUES ?`;
      const featuresValues = Features.map((feature) => [
        newPlanDetailId,
        feature,
      ]);
      await db.query(featuresQuery, [featuresValues]);
    }

    res
      .status(201)
      .json({
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

  try {
    const query = "DELETE FROM PlanDetails WHERE PlanDetailID = ?";
    const result = await db.query(query, [planDetailId]);

    if (result.affectedRows === 1) {
      res.status(200).json({ message: "Plan detail deleted successfully" });
    } else {
      res.status(404).json({ error: "Plan detail not found" });
    }
  } catch (error) {
    console.error("Delete plan detail failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: 특정 PlanDetail 업데이트
router.put("/:planDetailId", async (req, res) => {
  const { planDetailId } = req.params;
  const { BotID, TradeTypeID, DurationID, GradeID } = req.body;

  if (!BotID || !TradeTypeID || !DurationID || !GradeID) {
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
