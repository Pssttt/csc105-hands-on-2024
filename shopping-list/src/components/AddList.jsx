import React, { useState } from "react";
import "../styles/AddList.css";

const AddList = ({ addItem }) => {
  const [value, setValue] = useState("");

  const submitHandler = () => {
    if (value.trim()) {
      addItem(value);
      setValue("");
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Add a new item"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="add-btn" type="submit" onClick={submitHandler}>
        Add
      </button>
    </div>
  );
};

export default AddList;
