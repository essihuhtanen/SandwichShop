import React, { useState } from 'react';
import './Sandwiches.css';
import picture1 from '../pics/1.jpg'
import picture2 from '../pics/2.jpg'
import picture3 from '../pics/3.jpg'

const Sandwiches = ({ sandwiches, addOrder }) => {

    return (
        <div className="sandwiches">
            {sandwiches.map((sandwich) => (
                <div key={sandwich.id} className="card">
                    <div>
                        {sandwich.id === 1 &&
                            <img
                                className="sandwich-image"
                                src={picture1}
                                alt={sandwich.name}
                            />
                        }
                    </div>
                    <div>
                        {sandwich.id === 2 &&
                            <img
                                className="sandwich-image"
                                src={picture2}
                                alt={sandwich.name}
                            />
                        }
                    </div>
                    <div>
                        {sandwich.id === 3 &&
                            <img
                                className="sandwich-image"
                                src={picture3}
                                alt={sandwich.name}
                            />
                        }
                    </div>
                    <div>
                        <h2 className="sandwich-name">{sandwich.name}</h2>
                    </div>
                    <div className='toppings'>
                        <h3 className='toppings-header'>Toppings:</h3>
                        {sandwich.toppings.map((topping) => (
                            <p key={topping.id}
                                className="topping-name">
                                {topping.name}
                            </p>
                        ))}
                    </div>
                    <div className="breadType">
                        <h3 className="breadType-header">Bread:</h3>
                        <p>{sandwich.breadType}</p>
                    </div>
                    <div className='button'>
                        <button
                            className="order-button"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                addOrder(sandwich.id);
                            }}>Order
                        </button>
                    </div>
                </div>
            ))}
        </div >
    )
}

export default Sandwiches;
