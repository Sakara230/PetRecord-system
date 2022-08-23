import React , {useState} from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

import NavComponent from './components/nav-component';
import HomeComponent from './components/home-component';
import LoginComponent from './components/login-component';
import AuthService from './services/auth-service';
import RegisterComponent from './components/register-component';
import InfoComponent from './components/info-component';
import AddInfoComponent from './components/add-info-component';




function App() {
  let [currentUser , setCurrentUser] = useState(AuthService.getCurrentUser());
 
  
  
  return (
    <div className='justify-content-center' style={{ height: '100vh' }}>
      
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/info" element={<InfoComponent />} />
        <Route path="/add-info" element={<AddInfoComponent />} />
        <Route path="/login" element={<LoginComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        
      </Routes>
    </div>
  );
}

export default App;
