import React, {useState} from "react"
import Cookies from "js-cookie"
import "./Login.css"
import axios from "axios"
import { useNavigate, useCookies } from "react-router-dom"

const Login = ({ setLoginUser}) => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({
        username:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        const url = "http://localhost:3000/v1/user/login";
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: user.username,
            password: user.password,
        }),
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                if (json.token !== undefined) {
                    Cookies.set('token', json.token, { expires: 7 })
                    navigate("/v1/dashboard");
                } else {
                    alert(json.msg);
                }
            })
            .catch(err => { console.log(err) 
        });
            
        
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Enter your Username"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>
        </div>
    )
}

export default Login