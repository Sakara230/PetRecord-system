import React , {useState} from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import AuthService from '../services/auth-service';
import { useNavigate } from 'react-router-dom';

export default function RegisterComponent() {
    let [username , setUsername] = useState();
    let [FirstName , setFirstName] = useState();
    let [LastName , setLastName] = useState();
    let [email , setEmail] = useState();
    let [password , setPassword] = useState();
    let [message , setMessage] = useState();
    const navigate = useNavigate();
    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
        setUsername(e.target.value + LastName);
    }

    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
        setUsername(FirstName + e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleRegister = () => {
        console.log("handle register... sending to auth service.");
        console.log(username);
        AuthService.register(username , email , password ).then(() => {
            window.alert(
                "Registration success! redirect to the login page!"
            );
            navigate("/login");
        }).catch(error => {
            console.log("sending to Auth service catch error...");
            console.log(error.response);
            setMessage(error.response.data);
        })
    }

  return (
    <div className='d-flex justify-content-center' style={{ height: '100vh' }}>
        <form className='m-5'>
            <h1 className='mb-4'>註冊</h1>
            { message && <div className="alert alert-danger">{message}</div> }
            <MDBRow className='mb-4'>
                <MDBCol>
                    <MDBInput onChange={handleChangeFirstName} id='form3Example1' label='First name' />
                </MDBCol>
                <MDBCol>
                    <MDBInput onChange={handleChangeLastName} id='form3Example2' label='Last name' />
                </MDBCol>
            </MDBRow>
            <MDBInput onChange={handleChangeEmail} className='mb-4' type='email' id='form3Example3' label='Email address' />
            <MDBInput onChange={handleChangePassword} className='mb-4' type='password' id='form3Example4' label='Password' />

            <MDBCheckbox
                wrapperClass='d-flex justify-content-center mb-4'
                id='form3Example5'
                label='Subscribe to our newsletter'
                defaultChecked
            />

            <MDBBtn onClick={handleRegister} type='button' className='mb-4' block>
                SIGN UP
            </MDBBtn>

            <div className='text-center'>
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