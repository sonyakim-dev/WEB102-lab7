import React, { useState } from "react";
import "./CreatePost.css";
import { supabase } from "../client";

const CreatePost = () => {
  const [input, setInput] = useState({
    title: "",
    author: "",
    description: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    setInput((prev) => {
      return { ...prev, [name]: e.target.value };
    });
		console.log(input);
  };

  const createPost = async (event) => {
		// const {data, error} = await supabase.from("Posts").select();
		// console.log(data);
    event.preventDefault();

    await supabase
      .from("Posts")
      .insert({
        title: input.title,
        author: input.author,
        description: input.description,
      })
      .select();

    window.location = "/";

		setInput({
			title: "",
			author: "",
			description: "",
		})
  };

  return (
    <div>
      <form>
        <label for="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={input.title}
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
          value={input.author}
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
          value={input.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <input type="submit" value="Submit" onClick={createPost}/>
      </form>
    </div>
  );
};

export default CreatePost;
