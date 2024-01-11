const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET: 모든 PlanDetails와 할인 정보 가져오기
router.get("/", async (req, res) => {
  try {
    const query = `SELECT 
          PlanDetails.PlanDetailID, 
          Bots.BotName, 
          TradeTypes.TypeName AS TradeType, 
          Durations.Duration, 
          Grades.GradeName AS Grade,
          GROUP_CONCAT(DISTINCT Prices.Price ORDER BY Prices.Price) AS Prices,
          GROUP_CONCAT(DISTINCT Prices.DiscountAmount ORDER BY Prices.DiscountAmount) AS DiscountAmounts,
          GROUP_CONCAT(DISTINCT Prices.DiscountPercentage ORDER BY Prices.DiscountPercentage) AS DiscountPercentages,
          GROUP_CONCAT(DISTINCT Prices.IsDiscountActive ORDER BY Prices.IsDiscountActive) AS IsDiscountActives,
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
        // discountAmounts: 10000,
        discountAmounts: Number(detail.DiscountAmounts)
          ? [Number(detail.DiscountAmounts)]
          : 0,
        // discountPercentages: 10,
        discountPercentages: Number(detail.DiscountPercentages)
          ? [Number(detail.DiscountPercentages)]
          : 0,

        // isDiscountActives: true or false,
        isDiscountActives: Number(detail.IsDiscountActives) ? 1 : 0,
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
    // PlanDetails 테이블에 데이터 추가
    const insertQuery = `INSERT INTO PlanDetails (BotID, TradeTypeID, DurationID, GradeID) VALUES (?, ?, ?, ?)`;
    const result = await db.query(insertQuery, [
      BotID,
      TradeTypeID,
      DurationID,
      GradeID,
    ]);
    const newPlanDetailId = result.insertId;

    // Prices 테이블에 기본 가격 및 할인 정보 추가 (기본값: 가격 0, 할인 없음, 할인율 0%, 할인가격 0)
    const priceInsertQuery = `INSERT INTO Prices (PlanDetailID, Price, DiscountAmount, DiscountPercentage, IsDiscountActive) VALUES (?, ?, ?, ?, ?)`;
    await db.query(priceInsertQuery, [
      newPlanDetailId,
      0, // 기본 가격
      0, // 할인 금액
      0, // 할인율
      0, // 할인 활성화 여부
    ]);

    res.status(201).json({
      message: "New PlanDetail added successfully",
      PlanDetailID: newPlanDetailId,
    });
  } catch (error) {
    console.error("Add new plan detail failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE: 특정 PlanDetail 및 관련 가격 정보 삭제
router.delete("/:planDetailId", async (req, res) => {
  const { planDetailId } = req.params;

  try {
    await db.query("DELETE FROM Prices WHERE PlanDetailID = ?", [planDetailId]);
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

// PUT: 특정 PlanDetail 및 할인 정보 업데이트
router.put("/:planDetailId", async (req, res) => {
  const { planDetailId } = req.params;
  const { BotID, TradeTypeID, DurationID, GradeID, Price, DiscountAmount } =
    req.body;

  // console.log(`planDetailId: ${planDetailId}`);
  // console.log(`BotID: ${BotID}`);
  // console.log(`TradeTypeID: ${TradeTypeID}`);
  // console.log(`DurationID: ${DurationID}`);
  // console.log(`GradeID: ${GradeID}`);
  // console.log(`Price: ${Price}`);
  // console.log(`DiscountAmount: ${DiscountAmount}`);

  if (!BotID || !TradeTypeID || !DurationID || !GradeID) {
    return res.status(400).json({
      error: "BotID, TradeTypeID, DurationID and GradeID are required",
    });
  }

  try {
    if (Price < DiscountAmount) {
      return res.status(400).json({
        error: "Price must be greater than discount amount",
      });
    }

    await db.query(
      "UPDATE PlanDetails SET BotID = ?, TradeTypeID = ?, DurationID = ?, GradeID = ? WHERE PlanDetailID = ?",
      [BotID, TradeTypeID, DurationID, GradeID, planDetailId]
    );

    // 0 ~ 100의 값으로 할인율 정수로 변환
    let DiscountPercentage = Math.round((DiscountAmount / Price) * 100).toFixed(
      0
    );

    // 할인율이 0 ~ 100 사이의 값이 아닌 경우 0으로 설정
    if (DiscountPercentage < 0 || DiscountPercentage > 100) {
      DiscountPercentage = 0;
    }

    // prices에 planDetailId가 일치하는 데이터가 있는지 확인
    const prices = await db.query(
      "SELECT * FROM Prices WHERE PlanDetailID = ?",
      [planDetailId]
    );

    // prices에 planDetailId가 일치하는 데이터가 없는 경우
    if (prices.length === 0) {
      // prices 테이블에 새로운 데이터 추가
      await db.query(
        "INSERT INTO Prices (PlanDetailID, Price, DiscountAmount, DiscountPercentage, IsDiscountActive) VALUES (?, ?, ?, ?, ?)",
        [planDetailId, Price, DiscountAmount, DiscountPercentage, 1]
      );
    } else {
      // prices 테이블에 planDetailId가 일치하는 데이터가 있는 경우
      // prices 테이블에서 planDetailId가 일치하는 데이터 업데이트
      await db.query(
        "UPDATE Prices SET Price = ?, DiscountAmount = ?, DiscountPercentage = ?, IsDiscountActive = ? WHERE PlanDetailID = ?",
        [Price, DiscountAmount, DiscountPercentage, 1, planDetailId]
      );
    }

    res.status(200).json({ message: "Plan detail updated successfully" });
  } catch (error) {
    console.error("Update plan detail failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
