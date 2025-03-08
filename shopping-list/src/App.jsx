import { useState } from "react";
import "./App.css";
import AddList from "./components/AddList";
import Item from "./components/Item";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (text) => {
    setItems([...items, { text, completed: false }]);
  };

  const editItem = (index, newValue) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, text: newValue } : item,
    );
    setItems(updatedItems);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const toggleItem = (index) => {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  return (
    <div className="container">
      <h1>Shopping List</h1>
      <AddList addItem={addItem} />
      <Item
        items={items}
        removeItem={removeItem}
        editItem={editItem}
        toggleItem={toggleItem}
      />
    </div>
  );
}

export default App;
