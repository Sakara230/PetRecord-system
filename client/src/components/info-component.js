import React , {useState} from 'react'
import { MDBTable, MDBTableHead, MDBTableBody , MDBInputGroup,MDBBtn} from 'mdb-react-ui-kit';
import infoService from '../services/info-service';


const InfoComponent = () => {
  let [infoData , setInfoData] = useState(null);
  let [search , setSearch] = useState("");

  const inputSearch = (e) => {
    setSearch(e.target.value);
  }
  const handleSearchInfo = () => {
    infoService.get(search).then((data) => {
      console.log(data);
      setInfoData(data.data);
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div>
      <div className='col-9 m-5'>
        <h4 className='mb-3 ms-1'>病歷查詢</h4>
        <MDBInputGroup className='mb-5'>
          <input className='form-control' placeholder="Search Pet-ID" type='text' onChange={inputSearch} />
          <MDBBtn onClick={handleSearchInfo}>Search</MDBBtn>
        </MDBInputGroup>
        {infoData != null && (
          <MDBTable striped className='table-dark rounded-5 square ' >
            
            <MDBTableBody>
              <tr>
                <td colSpan={3} className='fs-3' ><b>RECORD</b></td>
                <td align='right'><MDBBtn color='success'>EDIT</MDBBtn> <MDBBtn color='danger' className='ms-2'>Delete</MDBBtn></td>
              </tr>
              <tr>         
                <td ><b>寵物名</b></td>
                <td >{infoData.info.name}</td>
                <td ><b>飼主</b></td>
                <td >{infoData.info.owner}</td>
              </tr>
              <tr>
                <td  >種類</td>
                <td >{infoData.info.species}</td>
                <td >品種</td>
                <td >{infoData.info.breed}</td>
              </tr>
              <tr>
                <td >電話</td>
                <td >{infoData.info.phone}</td>
                <td >病歷號</td>
                <td >{infoData.info._id}</td>
              </tr>
              <tr>
                <td >晶片號</td>
                <td >{infoData.info.chip}</td>
                <td >生日</td>
                <td >{infoData.info.birthday}</td>
              </tr>
              <tr>
                <td >年齡</td>
                <td ></td>
                <td >性別</td>
                <td >{infoData.info.gender}</td>
              </tr>
              <tr>
                <td >血型</td>
                <td >{infoData.info.bloodType}</td>
                <td >結紮</td>
                {infoData.info.ligation == true && (
                  <td>已結紮</td>
                )}
                {infoData.info.ligation != true && (
                  <td>未結紮</td>
                )}
                
              </tr>
              <tr>
                <td >過敏</td>
                <td >{infoData.info.allergy}</td>
                <td >重大疾病</td>
                <td >{infoData.info.majorDiseases}</td>
              </tr>
              <tr className='table-warning '>
                <td>備註</td>
                <td colSpan={3}>{infoData.info.remark}</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        )}
        
      </div>
    </div>
  )
}

export default InfoComponent
