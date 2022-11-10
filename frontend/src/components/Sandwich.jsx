const Sandwich = ({ selectedSandwich, getSandwichById }) => {
    return (
        <div id={"sandwich-" + selectedSandwich.id}>
            <a href="http://localhost:3000/v1/sandwich"
                onClick={(e) => {
                    e.preventDefault();
                    getSandwichById(selectedSandwich.id);
                }}>Sandwich id: {selectedSandwich.sandwichId}</a>
        </div>
    )
}

export default Sandwich;

/*<a href="http://localhost:3000/v1/sandwich"
                onClick={(e) => {
                    e.preventDefault();
                    getSandwichById(selectedSandwich.id);
                }}>Sandwich id: {selectedOrder.sandwichId}</a>*/