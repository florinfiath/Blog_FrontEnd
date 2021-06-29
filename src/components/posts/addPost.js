import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "../css/style.css";
const axios = require("axios").default;

const AddPost = (props) => {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState("");
  const [body, setBody] = useState("");

  const titleRef = useRef();
  const contentRef = useRef();
  let history = useHistory();

  const handleBody = (e) => {
    console.log(e);
    contentRef.current.value = e;
  };

  const setPost = async (postTitle, postContent) => {
    try {
      const response = await axios.post("https://florinsblog.herokuapp.com/post", {
        title: postTitle,
        content: postContent,
      });
      await props.sendGetRequest({ title });
      console.log("response is :" + JSON.stringify(response));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const setPostOnClick = async () => {
    try {
      await setPost(titleRef.current.value, contentRef.current.value);
      setBody("");
      setTitle("");
      props.sendGetRequest();
      history.push("/");
    } catch (error) {
      setErrors(error.response);
      console.log(error.response);
    }
  };

  return (
    <div className="blog-form">
      <div className="blog-form">
        {errors && (
          <div className="errors">
            <h1>There are some errors below:</h1> <br />
            {/* <pre> {JSON.stringify(errors, null, 2)}</pre> */}
            <ul>
              {errors["errors"]
                .map((error) => Object.entries(error))
                .map((element) => (
                  <li>
                    {element[0][0]} - {element[0][1]}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <form>
        <div class="form-group">
          <h3>Add a New Post</h3>
          <p>Title:</p>
          <input
            type="text"
            class="form-control"
            id="addTitlePost"
            placeholder="Enter post title"
            ref={titleRef}
          />
        </div>
        <div class="form-group">
          <p>Content:</p>
          <ReactQuill
            className="border border-dark"
            placeholder="write something amazing..."
            modules={AddPost.modules}
            formats={AddPost.formats}
            onChange={handleBody}
            ref={contentRef}
            id="inputContent"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            setPostOnClick();
          }}
          className="btn btn-primary mt-5"
        >
          Save
        </button>
      </form>
    </div>
  );
};

AddPost.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
AddPost.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default AddPost;
