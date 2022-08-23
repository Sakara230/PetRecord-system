const RecordModel = require("../models/record-model");
const asyncWrapper = require("../middleware/async");

//取得所有診療紀錄
const getAllRecord = asyncWrapper(async (req, res) => {
  const record = await RecordModel.find({});
  res.status(200).json({ record });
});

//取得單一診療紀錄
const getRecord = asyncWrapper(async (req, res) => {
  const { id: medicalNumber } = req.params;
  const record = await RecordModel.find({ medicalNumber: medicalNumber });

  res.status(200).json({ record });
});

//創建新診療紀錄
const createRecord = asyncWrapper(async (req, res) => {
  const record = await RecordModel.create(req.body);
  res.status(201).json({ record });
});

//編輯單一診療紀錄
const updateRecord = asyncWrapper(async (req, res) => {
  const { id: recordID } = req.params;
  const record = await RecordModel.findOneAndUpdate(
    { _id: recordID },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!record) {
    return res.status(404).json(`No record id with ${recordID}`);
  }
  res.status(200).json({ record });
});

//刪除單一診療紀錄
const deleteRecord = asyncWrapper(async (req, res) => {
  const { id: recordID } = req.params;
  const record = await RecordModel.findOneAndDelete({ _id: recordID });

  if (!record) {
    return res.status(404).json(`No record id with ${recordID}`);
  }

  res.status(200).send("success delete record");
});

module.exports = {
  getAllRecord,
  getRecord,
  createRecord,
  updateRecord,
  deleteRecord,
};
