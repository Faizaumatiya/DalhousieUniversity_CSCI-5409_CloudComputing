import { useState } from "react";
import './loginstyle.css';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useNavigate } from "react-router-dom";
import UserPool from '../UserPool'
import LoginHeader from "./LoginHeader";

//https://www.telerik.com/blogs/how-to-create-validate-react-form-hooks
//https://www.section.io/engineering-education/registration-form-react.js-firebase/

const LoginForm = props => {

    const navigate = useNavigate();
  

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        if(email === ''){
            alert("Email id required")
            return
        }
        if(password === ''){
            alert("Password required")
            return
        }

        const user = new CognitoUser({
            Username: email,
            Pool: UserPool,
        });
    
        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        localStorage.setItem('emailid', email)

        user.authenticateUser( authDetails,{
            onSuccess: (data) => {
                alert("User logged in successfully", data  )
                console.log("onSuccess:", data);
                           navigate("/addBlog");
            },
            onFailure: (err) => {
                alert("Invalid Credentials", err )
                console.error("onFailure:", err);
            },
            newPasswordRequired: (data) => {
                console.log("newPasswordRequired:", data);
            },
    
        });
    

    };

    return (
        <div>
            <LoginHeader/>
       
        <div className='form'>
            <div className='form-body'>
            {/* <div>
                <h3>Login</h3></div>   */}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form__label">Email</label>
                    <input
                    className="form__input"
                    type="text"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="form__label">Password</label>
                    <input
                    className="form__input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div class = "footer">
                    <button type="submit" class="btn">
                    Login
                    </button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default LoginForm;

