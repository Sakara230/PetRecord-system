const Information = require("../models/Information");
const asyncWrapper = require("../middleware/async");

//取得所有病歷
const getAllInformation = asyncWrapper(async (req, res) => {
  const info = await Information.find({});
  res.status(200).json({ info });
});

//取得單一病歷
const getInformation = asyncWrapper(async (req, res) => {
  const { id: infoID } = req.params;
  const info = await Information.findOne({ _id: infoID });
  if (!info) {
    return res.status(404).json(`No info id with ${infoID}`);
  }
  res.status(200).json({ info });
});

//創建新病歷
const createInformation = asyncWrapper(async (req, res) => {
  const info = await Information.create(req.body);
  res.status(201).json({ info });
});

//編輯單一病歷
const updateInformation = asyncWrapper(async (req, res) => {
  const { id: infoID } = req.params;
  const info = await Information.findOneAndUpdate({ _id: infoID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!info) {
    return res.status(404).json(`No info id with ${infoID}`);
  }
  res.status(200).json({ info });
});

//編輯刪除單一病歷
const deleteInformation = asyncWrapper(async (req, res) => {
  const { id: infoID } = req.params;
  const info = await Information.findOneAndDelete({ _id: infoID });

  if (!info) {
    return res.status(404).json(`No info id with ${infoID}`);
  }

  res.status(200).send("success delete task");
});

module.exports = {
  getAllInformation,
  getInformation,
  createInformation,
  updateInformation,
  deleteInformation,
};
