import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Sandwiches from './components/Sandwiches';
import Orders from './components/Orders';
import Footer from './components/Footer';
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import './App.css'
//import ReactJsAlert from 'reactjs-alert';

function App() {
  const [sandwiches, setSandwiches] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderedItems, setOrderedItems] = useState([]);
  const [orderId, setOrderId] = useState(1);
  const [status, setStatus] = useState("ordered");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [selectedSandwich, setSelectedSandwich] = useState([]);
  // const [alertStatus, setAlertStatus] = useState(false);
  // const [alertType, setAlertType] = useState("");
  // const [alertTitle, setAlertTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/v1/sandwich", {
      method: "GET",
      headers: { 'Accept': 'application/json' }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
          throw Error('Request rejected')
        }
      })
      .then(json => {
        setSandwiches(json);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  function addOrder(sandwichId) {
    setOrderId(orderId + 1);

    console.log("addOrder function order id: " + orderId);
    console.log("addOrder function sandwich id: " + sandwichId);
    console.log("addOrder function status: " + status);

    fetch("http://localhost:3000/v1/order", {
      method: "POST",
      headers: {
        'Accept': "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: orderId,
        sandwichId: sandwichId,
        status: status,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        else {
          throw new Error(`Oops, something went wrong`)
        }
      })
      .then(json => {
        setOrderedItems(orderedItems.concat(json));
      })
      .catch(err => {
        setStatus("failed");
        console.log(status);
      })
  };

  function getOrderById(id) {
    console.log("getOrderById function, id: " + id)

    fetch("http://localhost:3000/v1/order/" + id, {
      method: "GET",
      headers: { 'Accept': 'application/json' }
    })
      .then(res => res.json())
      .then(data => { setSelectedOrder(data) })
      .catch(err => { console.log("An error has occurred") })
  };

  function getSandwichById(sandwichId) {
    console.log("getSandwichById function, sandwichId: " + sandwichId)
    
    fetch("http://localhost:3000/v1/sandwich/" + sandwichId, {
      method: "GET",
      headers: { 'Accept': 'application/json' }
    })
      .then(res => res.json())
      .then(data => { setSelectedSandwich(data) })
      .catch(err => { console.log("An error has occurred when fetching a sandwich by id") })
  };

  return (
    <div>
      <BrowserRouter>
        <h2 className='logo'>BestSandwich</h2>
        <Navbar />
        <Routes>
          <Route
            exact path='/v1/dashboard'
            element={<Dashboard />}
          />
          <Route
            exact path='/v1/user/login'
            element={<Login />}
          />
          <Route
            exact path='/'
            element={<Home />}
          />
          <Route
            exact path='/v1/sandwiches'
            element={<Sandwiches
              sandwiches={sandwiches}
              addOrder={addOrder} />}
          />
          <Route
            exact path='/v1/order'
            element={<Orders
              getOrderById={getOrderById}
              selectedOrder={selectedOrder}
              getSandwichById={getSandwichById}
              selectedSandwich={selectedSandwich}
            />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
