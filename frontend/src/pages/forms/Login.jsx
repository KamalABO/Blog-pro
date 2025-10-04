import { Link } from "react-router-dom";
import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { loginUser } from "../../redux/apiCalls/authApiCall";
const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (e) => {
        e.preventDefault()
        setShowPassword(!showPassword);
    };

    const dispath = useDispatch()

    const formSubmitHandler = (e) =>{
        e.preventDefault()
        if(email.trim() === "") return toast.error("Please enter a email")
        if(password.trim() === "") return toast.error("Please enter a password")
            
        dispath(loginUser({email,password}))
        
    }


    return ( 
        <section className="form-container">
            <h1 className="form-title">Login to your account</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label"> Email </label>
                    <input type="email" className="form-input id=" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label"> Password </label>
                    <input type={showPassword?'text':'password'} className="form-input id=" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
                    <button className="toggle-password" onClick={togglePasswordVisibility}> {showPassword ? "hide" : "show"}</button>
                </div>
                <button className="form-btn" type="submit">
                    Login
                </button>
            </form>
            <div className="form-footer">
                Did you forgot your password ? 
                <Link to="/forgot-password">Frogot Password</Link>
            </div>
        </section>
     );
}
 
export default Login;