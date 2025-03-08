import React, { useState } from "react";
import "../styles/Item.css";

const Item = ({ items, removeItem, editItem, toggleItem }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [newValue, setNewValue] = useState("");

  const handleEdit = (index, item) => {
    setEditIndex(index);
    setNewValue(item.text);
  };

  const handleSave = (index) => {
    editItem(index, newValue);
    setEditIndex(null);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} className={item.completed ? "completed" : ""}>
          {editIndex === index ? (
            <>
              <input
                className="edit-input"
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <div className="button-container">
                <button className="edit-btn" onClick={() => handleSave(index)}>
                  Save
                </button>
                <button
                  className="delete-btn"
                  onClick={() => setEditIndex(null)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <span onClick={() => toggleItem(index)} className="item-text">
                {item.text}
              </span>
              <div className="button-container">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(index, item)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => removeItem(index)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Item;
