import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import {  useParams } from "react-router-dom";

const axios = require("axios").default;

const EditPost = (props) => {
  const { id } = useParams();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  

  useEffect(() => {
    const foundPostToEdit = props.edit.find((post) => post._id === id);

    if (foundPostToEdit && id) {
      console.log(foundPostToEdit);
      setTitle(foundPostToEdit.title);
      setContent(foundPostToEdit.content);
    }
  }, [id, props.edit]);

  const handleBody = (data) => {
    setContent(data);
  };

  const updateBlogs = async (title, content) => {
 
    var data = {title, content };
    try {
      axios
        .put(`https://florinsblog.herokuapp.com/post/${id}`, data)
        .then((res) => {
          props.sendGetRequest();
          window.location.replace("/");
        });
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };


  return (
    <section className="section-1 addPost">
      <div className="main-container">
      
        <div className="blog-form">
          <form>
            <div className="form-group">
              <h3>Title</h3>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="form-control border border-dark"
                id="inputTitle"
                border
                border-dark
              />
            </div>
            <div className="form-group">
              <h3>Content</h3>
              <ReactQuill
                value={content}
                className="border border-dark"
                placeholder="write something amazing..."
                modules={EditPost.modules}
                formats={EditPost.formats}
                onChange={handleBody}
                id="inputContent"
              />
            </div>

            <button
              onClick={() => {
                updateBlogs(title, content);
              }}
              type="button"
              className="btn btn-primary mt-5"
            >
              <h3>Save</h3>
            </button>
          </form>
    
        </div>
        
      </div>
    </section>
  );
};

EditPost.modules = {
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
EditPost.formats = [
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

/*
 * PropType validation
 */

export default EditPost;

