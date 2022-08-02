const btn = document.getElementById("btn");
const searchID = document.getElementById("petID");
const list = document.getElementById("list");

const getInfo = async (petID) => {
  try {
    const response = await axios.get(`/api/v1/information/form/${petID}`);
    console.log("complete");
    list.innerHTML = `<div id="list">
    <div>寵物名:${response.data.info.name}</div>
    <div>種類:${response.data.info.species}</div>
    <div>品種:${response.data.info.breed}</div>
    <div>飼主:${response.data.info.owner}</div>
    <div>電話:${response.data.info.phone}</div>
    <div>病歷號:${response.data.info._id}</div>
    <div>晶片號:${response.data.info.chip}</div>
    <div>生日:${response.data.info.birthday}     年齡:</div>
    <div>性別:${response.data.info.gender}     血型:${response.data.info.bloodType}</div>
    <div>結紮:${response.data.info.ligation}</div>
    <div>過敏:${response.data.info.allergy}</div>
    <div>重大疾病:${response.data.info.majorDiseases}</div>
    <div>備註:${response.data.info.remark}</div>
  </div>`;
  } catch (error) {
    console.log(error);
  }
};

btn.addEventListener("click", () => {
  console.log("complete");
  getInfo(searchID.value);
});
