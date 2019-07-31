import React from "react";

const Meme = props => {
  return (
    <div className="meme">
      <div className="img-wrapper">
        <img src={props.image} className="meme-img" alt="meme image" />
      </div>
      <p>{props.text}</p>
      {props.favorite ? (
        <img
          src="https://upload.wikimedia.org/wikipedia/en/e/e5/Yellow_Star.png"
          alt="Gold Star"
        />
      ) : null}
    </div>
  );
};

export default Meme;
