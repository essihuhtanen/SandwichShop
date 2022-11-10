import React, {useState} from "react"
import "./Logout.css"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const Logout = ({ setLoginUser}) => {

    const navigate = useNavigate();

    const logout = () => {
        axios.post('http://localhost:3000/v1/user/logout')
            .then(res => {
                console.log(Cookies.get('token'));
                Cookies.remove('token');
                console.log(Cookies.get('token'));
                navigate('/v1/user/login');
                //alert(res.data.message)
                //setLoginUser(res.data.user)
                //history.push("/")
            })
            .catch(err => {console.log(err)})

        /*const url = "http://localhost:3000/v1/user/logout";
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                //const data = JSON.parse(json);
                console.log(json)
                navigate("/v1/user/login");
            })
            .catch(err => { console.log(err) 
        });*/
            
        
    }

    return (
        <div className="logout">
            <h1>Logout</h1>
            <div className="button" onClick={logout}>Logout</div>
        </div>
    )
}

export default Logout