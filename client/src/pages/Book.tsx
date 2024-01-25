import React, { useCallback, useState } from "react";
import {
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "react-router-dom";
import FormRow from "../components/FormRow";
import { useDropzone } from "react-dropzone";
import { AuthContextType } from "../store/authStore";
import axios from "axios";

const options = ["Currently Reading", "Will Read", "Have Read"];

export const loader =
  (authContext: AuthContextType): LoaderFunction =>
  async ({ params }) => {
    const { token } = authContext;
    if (!token) {
      return redirect("/login");
    }
    const url =
      "https://9ahmtltyr1.execute-api.us-west-2.amazonaws.com/prod/books?id=" +
      params.id;
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      const { book } = res.data;

      return {
        book,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  };

const Book = () => {
  const { book } = useLoaderData();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(book?.photoUrl);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);

    const fileUrl = URL.createObjectURL(acceptedFiles[0]);
    setPreviewUrl(fileUrl);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    setFile(null);
    setPreviewUrl("");
  };

  return (
    <Form className="add-book">
      <div className="file-container">
        <div className="drag-drop" {...getRootProps()}>
          <input {...getInputProps()} />
          {!previewUrl && <p>Drag or upload book cover</p>}
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
          defaultValue={book?.title}
          placeHolder=""
          labelText="Title"
        />
        <FormRow
          name="author"
          type="text"
          defaultValue={book?.author}
          placeHolder=""
          labelText="Author"
        />
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={
            book?.type === "reading"
              ? "1"
              : book?.type === "will-read"
              ? "2"
              : book?.type === "read"
              ? "3"
              : "1"
          }
        >
          {/* <option defaultValue="0">Select a List</option> */}
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
