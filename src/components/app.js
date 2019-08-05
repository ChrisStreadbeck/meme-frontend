import React from "react";
import { navigate } from "hookrouter";

import Meme from "./meme";

const App = () => {
  const [memes, setMemes] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/memes")
      .then(response => response.json())
      .then(data => setMemes(data))
      .catch(error => console.log(error));
  }, []);

  const deleteMeme = id => {
    fetch(`http://localhost:5000/meme/${id}`, {
      method: "DELETE"
    })
      .then(setMemes(memes.filter(meme => meme.id !== id)))
      .catch(error => console.log("deletion error", error));
  };

  const editMeme = id => {
    navigate(`/form/${id}`);
  };

  const renderMemes = () => {
    return memes.map(meme => {
      return (
        <Meme
          key={meme.id}
          id={meme.id}
          text={meme.text}
          image={meme.image}
          favorite={meme.favorite}
          deleteMeme={deleteMeme}
          editMeme={editMeme}
        />
      );
    });
  };

  return <div className="app">{renderMemes()}</div>;
};

export default App;
