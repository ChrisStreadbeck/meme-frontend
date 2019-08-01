import React from "react";
import DropzoneComponent from "react-dropzone-component";

import "../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../node_modules/dropzone/dist/min/dropzone.min.css";

const MemeForm = () => {
  const [input, setInput] = React.useState("");
  const imageRef = React.useRef(null);

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
          .post("https://localhost:5000/add-meme")
          .field("upload_preset", "cloudy-images")
          .field("file", file);
        upload.end((error, response) => {
          if (error) {
            console.log(error);
          }
          if (response) {
            setImage(response.body.secure_url);
          }
        });
      }
    };
  };

  return (
    <div className="memeform">
      <h1>Add a Meme, plox</h1>
      <form>
        <input
          type="text"
          placeholder="Caption"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <div>
          <input type="checkbox" />
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
