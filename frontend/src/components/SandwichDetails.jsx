import "./Orders.css";

const SandwichDetails = ({ selectedSandwich }) => {
    console.log("SandwichDetails.jsx Selected sandwich: " + JSON.stringify(selectedSandwich.toppings));

    return (
        <div>
            <h4 className="selected-sandwich-header">Selected sandwich</h4>
            <div>{selectedSandwich.name}</div>
        </div>
    )
}

export default SandwichDetails;
