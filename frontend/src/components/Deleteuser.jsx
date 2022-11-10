import React, { useState } from "react"
import "./Deleteuser.css"
import axios from "axios"
import Cookies from "js-cookie"
import { Navigate, useNavigate } from "react-router-dom"

const Deleteuser = () => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({
        username: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const deleteUser = () => {
        
        const url = "http://localhost:3000/v1/user/" + user.username;
        const options = {
        method: 'DELETE',
        headers: {
            'authorization': "Bearer " + Cookies.get('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        //credentials: 'include',
        body: JSON.stringify({
            username: user.username,
            password: user.password,
        }),
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                //const data = JSON.parse(json);
                console.log(json)
                if (json.msg) {
                    alert(json.msg);
                } else {
                    alert(user.username + ' Deleted');
                }
            })
            .catch(err => { console.log(err) 
        });
        
    }

    return (
        <div className="delete">
            <h1>Delete user</h1>
            <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username"></input>
            <div className="button" onClick={deleteUser}>Delete</div>
        </div>
    )
}

export default Deleteuser