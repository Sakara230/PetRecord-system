const express = require("express");
const router = express.Router();

const {
  getAllInformation,
  getInformation,
  createInformation,
  updateInformation,
  deleteInformation,
} = require("../controllers/information");


// router.get("/form" , (req , res) => {
//   res.sendFile('index.html',{root:"./public"});
//   // res.get(getAllInformation);
  
// });

express.static("./public");

router.route("/form/all-info").get(getAllInformation).post(createInformation);

router
  .route("/form/:id")
  .get(getInformation)
  .patch(updateInformation)
  .delete(deleteInformation);

module.exports = router;
