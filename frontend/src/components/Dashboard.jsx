import React, {useState} from "react"
import "./Dashboard.css"
import Deleteuser from "./Deleteuser";
import Logout from "./Logout";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({
        username: "",
        email:"",
        password:"",
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const createUser = () => {

        const url = "http://localhost:3000/v1/user";
        const options = {
        method: 'POST',
        headers: {
            'authorization': "Bearer " + Cookies.get('token'),      
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            password: user.password,
            id: 1,
            email: user.email,
            username: user.username,

        }),
        };
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => {
                //const data = JSON.parse(json);
                console.log(json)
                alert(json.msg);
            })
            .catch(err => { console.log(err) 
        });
            
        
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="register">
                    {console.log("User", user)}
                    <h1>Create user</h1>
                    <input type="text" name="username" value={user.username} onChange={handleChange} placeholder="Username"></input>
                    <input type="text" name="email" value={user.email} placeholder="Email" onChange={ handleChange }></input>
                    <input type="password" name="password" value={user.password} placeholder="Password" onChange={ handleChange }></input>
                <div className="button" onClick={createUser} >Create user</div>
                <Deleteuser />
                <Logout />
                </div>
            </div>
        </div>
        
    )
}

export default Dashboard