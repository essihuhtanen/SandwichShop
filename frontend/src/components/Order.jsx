const Order = ({ id, getOrderById }) => {
    return (
        <li id={"order-" + id}>
            <a href="http://localhost:3000/v1/order"
                onClick={(e) => {
                    e.preventDefault();
                    getOrderById(id);
                }}>Order id: {id}</a>
        </li>
    )
}

export default Order;