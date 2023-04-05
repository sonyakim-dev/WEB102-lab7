import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./EditPost.css";
import { supabase } from "../client";
import { useEffect } from "react";

const EditPost = ({ data }) => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  const updatePost = async (e) => {
    e.preventDefault();

    await supabase
      .from("Posts")
      .update({
        title: post.title,
        author: post.author,
        description: post.description,
      })
      .eq("id", id);

    window.location = "/";
  };
	
  const deletePost = async (e) => {
		e.preventDefault();
    await supabase.from("Posts").delete().eq("id", id);
		window.location = "/";
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setPost((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .eq("id", id);
      // console.log(data);
      setPost(data[0]);
    };
    fetchPost();
  }, []);

  return (
    <div>
      <form>
        <label for="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label for="author">Author</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleChange}
        />
        <br />
        <br />
        <label for="description">Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          value={post.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <input type="submit" value="Submit" onClick={updatePost} />
        <button className="deleteButton" onClick={deletePost}>Delete</button>
      </form>
    </div>
  );
};

export default EditPost;
