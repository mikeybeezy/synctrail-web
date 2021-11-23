import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import fileUpload from '../../../images/file-upload.png'

function ChatComposer(props) {
  const hiddenFileInput = React.useRef(null);
  const [inputValue, setInputValue] = useState("");
  const handleClick = event => { hiddenFileInput.current.click()}
  const [inputFile, setInputFile] = useState();
  
  const handleSubmit = event => {
    event.preventDefault();
    props.submitted(inputValue);
    setInputValue("")
  };

  const handleCompose = event => {
    let typedValue = event.target.value;
    if (typedValue != "" && typedValue != " ") {
      setInputValue(event.target.value)
    }
  };

  const setUploadFile = e => {
    console.log(e.target.files)
    setInputFile(URL.createObjectURL(e.target.files[0]))
    console.log(URL.createObjectURL(e.target.files[0]))
    console.log(URL.createObjectURL(e.target.files[0]))
    props.submitted(inputFile);
  }

  return (
     <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center">
        <div onClick={handleClick} className="cursor-pointer">
          <img src={fileUpload} alt="upload pic" style={{maxHeight: '30px', marginRight: '10px'}}/>
        </div>
        <input
          placeholder="Please type & hit enter"
          onChange={handleCompose}
          value={inputValue}
          className="search_history"
        />
        <input type="file" onChange={setUploadFile} ref={hiddenFileInput} style={{display: 'none'}}/>
      </div>
    </form>
  );
}

export default ChatComposer;