import React from 'react'
import UnknownnImage from '../../images/noimage.png'
import { Button } from 'react-bootstrap';

const FileUpload = ({
  input: { name, value: omitValue, label, onChange, onBlur, ...inputProps },
  meta: omitMeta,touched, error,
  ...props
}) => {
  const hiddenFileInput = React.useRef(null);
  const [file, setFile] = React.useState(null)
  const handleChange = (e) => {
    onChange(e.target.files[0])
    setFile(e.target.files[0])
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const removeUpload = (e) => {
    e.target.value = null;
  }
  
  return (
    <div className="d-flex align-items-center mt-3">
      <div className="file-upload">
        <img src={file ? URL.createObjectURL(file) : omitValue && omitValue.url ? omitValue.url : UnknownnImage }  alt="img"/>
      </div>
      <div className="px-2" style={{paddingTop: '85px'}}>
        <div onClick={removeUpload}><i className="fa fa-trash" aria-hidden="true"></i></div>
        <Button  variant="default" onClick={handleClick}>
          Upload Photo
        </Button>
        <input
          onChange={handleChange}
          ref={hiddenFileInput}
          onBlur={handleChange}
          name={name}
          accept='.jpg, .png, .jpeg'
          type="file"
          {...props.input}
          {...props}
          style={{display:'none'}} 
        />
      </div>
    </div>
  )
}

export default FileUpload