import React, { useCallback, useState } from "react";
import { Form } from "react-router-dom";
import FormRow from "../components/FormRow";
import { useDropzone } from "react-dropzone";

const options = ["Currently Reading", "Will Read", "Have Read"];

const Book = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);

    // Create a URL for the file
    const fileUrl = URL.createObjectURL(acceptedFiles[0]);
    setPreviewUrl(fileUrl);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  console.log(file);

  const handleRemove = (e) => {
    e.preventDefault();
    setFile(null);
    setPreviewUrl("");
  };

  return (
    <Form className="add-book">
      <div className="file-container">
        <div className="drag-drop" {...getRootProps()}>
          <input {...getInputProps()} />
          {!previewUrl && <p>Drag 'n' drop some files here</p>}
          {previewUrl && <img src={previewUrl} alt="Preview" />}
        </div>
        {previewUrl && (
          <button
            className="btn btn-secondary"
            onClick={(e) => handleRemove(e)}
          >
            Remove
          </button>
        )}
      </div>
      <div className="addbook-info">
        <h3>Book</h3>
        <FormRow
          name="title"
          type="text"
          defaultValue="Test"
          placeHolder=""
          labelText="Title"
        />
        <FormRow
          name="author"
          type="text"
          defaultValue="John"
          placeHolder=""
          labelText="Author"
        />
        <select className="form-select" aria-label="Default select example">
          <option defaultValue="0">Select a List</option>
          {options.map((option, i) => (
            <option key={i} value={i + 1}>
              {option}
            </option>
          ))}
        </select>
        <div className="nav-btns">
          <button className="btn btn-secondary">Update</button>
          <button className="btn btn-primary">Delete</button>
        </div>
      </div>
    </Form>
  );
};

export default Book;
