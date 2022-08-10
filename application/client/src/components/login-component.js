import React , {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import AuthService from '../services/auth-service';

export default function LoginComponent(props) {
    let {currentUser , setCurrentUser} = props;
    let [email , setEmail] = useState("");
    let [password , setPassword] = useState("");
    let [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = () =>{
        AuthService.login(email , password).then((response) => {
            console.log(response.data);
            if(response.data.token) {
                localStorage.setItem("user" , JSON.stringify(response.data));
            }
            setCurrentUser(AuthService.getCurrentUser());
            navigate("/info");
          }).catch((error) => {
              console.log(error.response);
              setMessage(error.response.data);
          })
    }

  return (
    <div className='d-flex justify-content-center mb-4' >
        <form className='my-5 col-2' >
            <div className='row'>
                <h1 className='mb-4'>歡迎登入</h1>
                
                {message && (
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
            </div>
            <MDBInput onChange={handleChangeEmail}  className='mb-4' type='email' id='form2Example1' label='Email address' />
            <MDBInput onChange={handleChangePassword} className='mb-4' type='password' id='form2Example2' label='Password' />

            <MDBRow className='mb-4'>
                <MDBCol>
                    <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
                </MDBCol>
                <MDBCol>
                    <a href='#!'>Forgot password?</a>
                </MDBCol>
            </MDBRow>

            <MDBBtn onClick={handleLogin} type='button' className='mb-4' block>
                Sign in
            </MDBBtn>

            <div className='text-center'>
                <p>
                    Not a member? <a href='/register'>Register</a>
                </p>
                <p>or sign up with:</p>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='facebook-f' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='google' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='twitter' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='github' />
                </MDBBtn>
            </div>
        </form>
    </div>
    
  );
}