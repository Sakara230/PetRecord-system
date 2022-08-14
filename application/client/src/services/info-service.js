import axios from "axios";
const API_URL = "http://localhost:8080/api/info";

class InfoService {
    create(name, species, breed , owner , phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark){
        return axios.post(API_URL + "/create-Info" , {name, species, breed , owner , phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark});
    };

    get(_id) {
        return axios.get(API_URL + "/" + _id);
    }
    
    delete(_id) {
        return axios.delete(API_URL + "/" + _id);
    }

    patch(_id , name, species, breed , owner , phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark) {
        return axios.patch(API_URL + "/" + _id , {name, species, breed , owner , phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark});
    }
}

export default new InfoService();