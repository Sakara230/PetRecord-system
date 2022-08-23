const CaseModel = require("../models/case-model");
const asyncWrapper = require("../middleware/async");

//取得所有診療紀錄
const getAllCase = asyncWrapper(async (req, res) => {
  const illness = await CaseModel.find({});
  res.status(200).json({ illness });
});

//取得單一診療紀錄
const getCase = asyncWrapper(async (req, res) => {
  const { id: medicalNumber } = req.params;
  const illness = await CaseModel.find({ medicalNumber: medicalNumber });

  res.status(200).json({ illness });
});

//創建新診療紀錄
const createCase = asyncWrapper(async (req, res) => {
  const date = new Date(req.body.date);
  const dateUTC = date.toUTCString();

  const medicalNumber = req.body.medicalNumber;
  const records = await CaseModel.find({ medicalNumber: medicalNumber });

  for (const record of records) {
    dateRecord = record.date.toUTCString();
    if (dateRecord === dateUTC) {
      res.status(500).send("預約時間重複");
      return;
    }
  }

  const illness = await CaseModel.create(req.body);
  res.status(201).json({ illness });
});

//編輯單一診療紀錄
const updateCase = asyncWrapper(async (req, res) => {
  const { id: illnessID } = req.params;
  const illness = await CaseModel.findOneAndUpdate(
    { _id: illnessID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!illness) {
    return res.status(404).json(`No case id with ${illnessID}`);
  }
  res.status(200).json({ illness });
});

//刪除單一診療紀錄
const deleteCase = asyncWrapper(async (req, res) => {
  const { id: illnessID } = req.params;
  const illness = await CaseModel.findOneAndDelete({ _id: illnessID });

  if (!illness) {
    return res.status(404).json(`No case id with ${illnessID}`);
  }

  res.status(200).send("success delete case");
});

module.exports = {
  getAllCase,
  getCase,
  createCase,
  updateCase,
  deleteCase,
};
