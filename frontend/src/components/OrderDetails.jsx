import "./Orders.css";
import SandwichDetails from './SandwichDetails';

const OrderDetails = ({ selectedOrder, getSandwichById, selectedSandwich }) => {
    return (
        <div>
            <h3 className="order-details-header">The details of selected order</h3>
            <p>Order id: {selectedOrder.id}</p>
            <a href={"http://localhost:3000/v1/sandwich/"+ selectedOrder.sandwichId}
                onClick={(e) => {
                    e.preventDefault();
                    getSandwichById(selectedOrder.sandwichId);
                }}>Sandwich id: {selectedOrder.sandwichId}</a>
            <p>Order status: {selectedOrder.status}</p>
            <br></br>
            <SandwichDetails selectedSandwich={selectedSandwich} />
        </div>
    )
}

export default OrderDetails;
