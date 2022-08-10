const CaseModel = require("../models/case-model");
const asyncWrapper = require("../middleware/async");

//取得所有病歷
const getAllCase = asyncWrapper(async (req, res) => {
  const illness = await CaseModel.find({});
  res.status(200).json({ illness });
});

//取得單一病歷
const getCase = asyncWrapper(async (req, res) => {
  const { id: petID } = req.params;
  const illness = await CaseModel.find({ petID: petID });

  res.status(200).json({ illness });
});

//創建新病歷
const createCase = asyncWrapper(async (req, res) => {
  const illness = await CaseModel.create(req.body);
  res.status(201).json({ illness });
});

//編輯單一病歷
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

//編輯刪除單一病歷
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
