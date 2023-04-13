import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './registerationstyle.css'
import UserPool from '../UserPool';
import RegisterationHeader from './RegisterationHeader';

//https://www.section.io/engineering-education/registration-form-react.js-firebase/
function RegistrationForm() {

    const navigate = useNavigate();
    //const navigate = useNavigate();
    const navigateToLogin = () => {
        // 👇️ navigate to /contacts
        navigate('/loginPage');
    };

     // https://regexr.com/3e48o
     const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
    }

    const handleSubmit  = async(e) => {
        e.preventDefault();
        
        UserPool.signUp(email, password,[], null, (err, data) => {
          
            if (err) {
                if(lastName === ''){
                    alert("Last name is required")
                    return
                }
                if(email === ''){
                    alert("Email is required")
                    return
                }
                if(!validEmail.test(email)){
                    alert("Invalid email")
                    return
                }
                if(password === ''){
                    alert("Password is required")
                    return
                }
                else{
                      alert(err)
                alert("User not registered successfully")
                console.error(err);
                }  
                
            }
            else{
                alert("User registered successfully")
            console.log("hhhhhhhhhhhhhhhhhh")
            console.log(data);
            navigate("/loginPage");

            }
            
          });
        };
        console.log(firstName,lastName,email,password);

    return(
        <div>
            <RegisterationHeader/>
        
    <form onSubmit={handleSubmit}>
        <div className="form">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">First Name </label>
                    <input className="form__input" type="text" 
                    value={firstName} onChange = {(e) => handleInputChange(e)} 
                    id="firstName" 
                    required
                    placeholder="First Name"/>
                </div>
                <div className="lastname">
                    <label className="form__label" for="lastName">Last Name </label>
                    <input  type="text" name="" id="lastName" 
                    value={lastName}  
                    className="form__input" 
                    onChange = {(e) => handleInputChange(e)} 
                    placeholder="LastName"
                    required/>
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" 
                    id="email" className="form__input" 
                    value={email} 
                    onChange = {(e) => handleInputChange(e)} 
                    placeholder="Email"/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" 
                    type="password"  
                    id="password" 
                    value={password} 
                    onChange = {(e) => handleInputChange(e)} 
                    placeholder="Password"/>
                </div>
            </div>
            <div class="footer">
                <button onClick={()=>handleSubmit()} 
                type="submit" class="btn">Register</button>
            </div>
            <div class="register-footer">
                Already registered? 
                <button onClick={navigateToLogin}
                type="button" class="btn">Login</button>
            </div>

        </div>
    </form>
    </div>
       
    )    
}   

export default RegistrationForm

