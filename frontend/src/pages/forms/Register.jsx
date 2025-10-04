import { Link, useNavigate } from "react-router-dom";
import "./form.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../redux/apiCalls/authApiCall";
import Swal from "sweetalert";


const Register = () => {
    const dispath = useDispatch()
    const {registerMessage} = useSelector(state => state.auth) 

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const formSubmitHandler = (e) =>{
        e.preventDefault()
        if(username.trim() === "") return toast.error("Please enter a username")
        if(email.trim() === "") return toast.error("Please enter a email")
        if(password.trim() === "") return toast.error("Please enter a password")
        dispath(registerUser({username, email,password}))
    }

    const navigate = useNavigate()

    if (registerMessage){
        Swal({
            title: registerMessage,
            icon: "success",
        }).then(isOk => {
            if(isOk) {navigate("/login")}
        })
    }

    return ( 
        <section className="form-container">
            <h1 className="form-title">Create new account</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label"> Username </label>
                    <input type="text" className="form-input" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input type="email" className="form-input" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-input" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
                </div>
                <button className="form-btn" type="submit">
                    Register
                </button>
            </form>
            <div className="form-footer">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </section>
     );
}
 
export default Register;