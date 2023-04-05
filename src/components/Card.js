import React from "react";
import { useState } from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";
import { supabase } from "../client";

const Card = ({ id, title, author, description, bet }) => {
  const [count, setCount] = useState(bet);

  const updateCount = async () => {
    await supabase
      .from("Posts")
      .update({ bet_count: count + 1 })
      .eq("id", id);
    setCount((count) => count + 1);
  };

  return (
    <div className="Card">
      <Link to={"edit/" + id}>
        <img className="moreButton" alt="edit button" src={more} />
      </Link>
      <h2 className="title">{title}</h2>
      <h3 className="author">{"by " + author}</h3>
      <p className="description">{description}</p>
      <button className="betButton" onClick={updateCount}>
        👍 Bet Count: {count}
      </button>
    </div>
  );
};

export default Card;
