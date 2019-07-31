import React from "react";

import Meme from "./meme";

const App = () => {
  const [memes, setMemes] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      let result = await fetch("http://localhost:5000/memes")
        .then(response => response.json())
        .then(data => setMemes(data))
        .catch(error => console.log(error));
    };
    fetchData();
  }, []);

  const renderMemes = () => {
    return memes.map(meme => {
      return (
        <Meme
          key={meme.id}
          id={meme.id}
          text={meme.text}
          image={meme.image}
          favorite={meme.favorite}
        />
      );
    });
  };

  return <div className="app">{renderMemes()}</div>;
};

export default App;
