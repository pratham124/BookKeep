import React from "react";
import { Form } from "react-router-dom";
import FormRow from "../components/FormRow";

const AddBook = () => {
  return (
    <Form className="profile">
      <div className="file-container">
        <div className="drag-drop">
          <input type="file" />
          <p>Drag your file here or click in this area.</p>
        </div>
      </div>
      <div className="addbook-info">
        <h3>Add Book</h3>
        <FormRow
          name="title"
          type="text"
          defaultValue=""
          placeHolder=""
          labelText="Title"
        />
        <FormRow
          name="author"
          type="text"
          defaultValue=""
          placeHolder=""
          labelText="Author"
        />
        <button className="btn btn-secondary">Add</button>
      </div>
    </Form>
  );
};

export default AddBook;
