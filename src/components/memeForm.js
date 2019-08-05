import React from "react";
import DropzoneComponent from "react-dropzone-component";
import request from "superagent";
import { navigate } from "hookrouter";

import "../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../node_modules/dropzone/dist/min/dropzone.min.css";

const MemeForm = props => {
  const [input, setInput] = React.useState("");
  const [favorite, setFavorite] = React.useState(false);
  const [image, setImage] = React.useState("");
  const imageRef = React.useRef(null);

  React.useEffect(() => {
    if (props.id && props.editMode) {
      fetch(`http://localhost:5000/meme/${props.id}`)
        .then(response => response.json())
        .then(data => {
          setInput(data.text);
          setFavorite(data.favorite);
        });
    }
  }, []);

  const componentConfig = () => {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  };

  const djsConfig = () => {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  };

  const handleDrop = () => {
    return {
      addedfile: file => {
        let upload = request
          .post("https://api.cloudinary.com/v1_1/cstread/image/upload")
          .field("upload_preset", "meme-images")
          .field("file", file);
        upload.end((error, response) => {
          if (error) {
            console.log("Cloudinary error", error);
          }
          if (response.body.secure_url !== "") {
            setImage(response.body.secure_url);
          }
        });
      }
    };
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (props.editMode) {
      await fetch(`http://localhost:5000/meme/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          text: input,
          image: image,
          favorite: favorite
        })
      })
        .then(imageRef.current.dropzone.removeAllFiles())
        .catch(error => console.log("put error", error));

      navigate("/");
    } else {
      await fetch("http://localhost:5000/add-meme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          text: input,
          image: image,
          favorite: favorite
        })
      })
        .then(result => result.json())
        .then(setInput(""))
        .then(setImage(""))
        .then(setFavorite(false))
        .then(imageRef.current.dropzone.removeAllFiles())
        .then(navigate("/"))
        .catch(error => console.log("form submit", error));
    }
  };

  return (
    <div className="memeform">
      <h1>Add a Meme, plox</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Caption"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            checked={favorite}
            onChange={() => setFavorite(!favorite)}
          />
          <span>Favorite?</span>
        </div>
        <button type="submit">Post Meme</button>
        <DropzoneComponent
          className="dz-image"
          ref={imageRef}
          config={componentConfig()}
          djsConfig={djsConfig()}
          eventHandlers={handleDrop()}
        >
          <div className="dz-message">Drop Your Meme</div>
        </DropzoneComponent>
      </form>
    </div>
  );
};

export default MemeForm;
