import React from "react";
import { useEffect, useState } from 'react';
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import "./Orders.css";

const Orders = ({ getOrderById, selectedOrder, getSandwichById, selectedSandwich }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/v1/order", {
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
        setOrders(json);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div className="ordered-items">
      <h1 className="ordered-items-header">
        Ordered items
      </h1>
      {
        orders.length === 0 &&
        <p className="no-orders">No orders</p>

      }
      <ol className="ordered-items-list">
        {orders.map((order) => (
          <Order key={order.id} id={order.id} getOrderById={getOrderById} />
        ))}
      </ol>
      <OrderDetails
        selectedOrder={selectedOrder}
        getSandwichById={getSandwichById}
        selectedSandwich={selectedSandwich} />
    </div>
  )
}

export default Orders;
