import { useState } from "react";
import Table from "react-bootstrap/Table";

import Textbox from "./components/textbox/textbox";
import Dropdown from "./components/dropdown/dropdown";
import CustomButton from "./components/button/button";

import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [txtName, setTxtName] = useState("");
  const [textPrice, setTextPrice] = useState("");
  const [textQuantity, setTextQuantity] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [editIndex, setEditIndex] = useState(null); // to track if we are editing an item

  function onChange(e) {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "txtName") setTxtName(value);
    if (id === "txtPrice") setTextPrice(value);
    if (id === "txtQuantity") setTextQuantity(value);
    if (id === "drpTown") setSelectedTown(value);
    if (id === "drpPayment") setSelectedPaymentMethod(value);
  }

  function addToChart() {
    if (txtName && textPrice && textQuantity) {
      const item = {
        name: txtName,
        price: parseFloat(textPrice),
        quantity: parseInt(textQuantity),
        town: selectedTown,
        paymentMethod: selectedPaymentMethod,
      };

      if (editIndex !== null) {
        const updatedItems = [...cartItems];
        updatedItems[editIndex] = item;
        setCartItems(updatedItems);
        setEditIndex(null);
      } else {
        setCartItems([...cartItems, item]);
      }

      setTxtName("");
      setTextPrice("");
      setTextQuantity("");
      setSelectedTown("");
      setSelectedPaymentMethod("");
    }
  }

  function deleteItem(itemIndex) {
    const confirmDelete = window.confirm("Confirm deletion?");
    if (confirmDelete) {
      const newItems = cartItems.filter((_, index) => index !== itemIndex);
      setCartItems(newItems);
    }
  }

  function editItem(itemIndex) {
    const confirmEdit = window.confirm("Confirm Edit?");
    if (confirmEdit) {
      const item = cartItems[itemIndex];
      setTxtName(item.name);
      setTextPrice(item.price.toString());
      setTextQuantity(item.quantity.toString());
      setSelectedTown(item.town);
      setSelectedPaymentMethod(item.paymentMethod);
      setEditIndex(itemIndex);
    }
  }

  return (
    <div>
      <div className="main-container">
        <div className="sub-container">
          <Textbox
            id="txtName"
            type="text"
            label="Item Name"
            value={txtName}
            containerClass="p-3"
            onTextChange={onChange}
          />
          <Textbox
            id="txtPrice"
            type="number"
            label="Item Price"
            value={textPrice}
            containerClass="p-3"
            onTextChange={onChange}
          />
          <Textbox
            id="txtQuantity"
            type="number"
            label="Quantity"
            value={textQuantity}
            containerClass="p-3"
            onTextChange={onChange}
          />
          <Dropdown
            id="drpTown"
            label="Town"
            options={["Tubigon", "Calape"]}
            value={selectedTown}
            containerClass="p-3"
            onSelectChange={onChange}
          />
          <Dropdown
            id="drpPayment"
            label="Payment Method"
            options={["GCash", "Credit Card"]}
            value={selectedPaymentMethod}
            containerClass="p-3"
            onSelectChange={onChange}
          />
          <div className="d-flex justify-content-center py-2">
            <CustomButton
              label={editIndex !== null ? "Update Item" : "Add to Cart"}
              onClick={addToChart}
              variant="primary"
            />
          </div>
        </div>
        {cartItems.length > 0 && (
          <div className="item-container my-5">
            <h3 className="text-center py-3">CART ITEMS</h3>
            <Table striped bordered>
              <thead>
                <tr className="text-capitalize">
                  <th>Item #</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                    <td className="text-center" width={200}>
                      <CustomButton
                        label="Edit"
                        variant="success"
                        innerClass="m-1"
                        onClick={() => editItem(index)}
                      />
                      <CustomButton
                        label="Delete"
                        variant="danger"
                        innerClass="m-1"
                        onClick={() => deleteItem(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;