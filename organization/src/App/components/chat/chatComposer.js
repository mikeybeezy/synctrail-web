import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import fileUpload from '../../../images/file-upload.png'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function ChatComposer(props) {
  const hiddenFileInput = React.useRef(null);
  const [inputValue, setInputValue] = useState("");
  const handleClick = event => { hiddenFileInput.current.click()}
  const [inputFile, setInputFile] = useState();
  const [error, setError] = useState();

  const handleChange = (e, editor) => {
    const data = editor.getData()
    setInputValue(data)
  }

  const handleEditor = () => {
    if(inputValue != "") {
      props.submitted({content: inputValue, message_type: 'text'})
      setInputValue("")
      setError("")
    }else {
      setError("Pleaser write a message")
    }
  }

  const setUploadFile = e => {
    props.submitted({file: e.target.files[0], message_type: 'file'});
  }

  return (
     <form className={error ? "form-errors" : null}>
      <div className="d-flex align-items-center chat-composer">
        <div onClick={handleClick} className="cursor-pointer">
          <img src={fileUpload} alt="upload-pic" style={{maxHeight: '40px', marginRight: '10px'}}/>
          <input type="file" onChange={setUploadFile} ref={hiddenFileInput} style={{display: 'none'}}/>
        </div>
        <CKEditor
          editor={ ClassicEditor }
          config={{ removePlugins: ["EasyImage","ImageUpload","MediaEmbed", "resize"]}}
          data={inputValue}
          onChange={handleChange}
        />
        <Button variant="primary" size="sm" onClick={() => handleEditor()} style={{marginLeft: '10px'}}> Submit</Button>
      </div>
    </form>
  );
}

export default ChatComposer;
