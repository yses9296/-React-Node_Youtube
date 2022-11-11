import React, { useState } from 'react';
import Axios from 'axios'
// Dropzone import
import Dropzone from 'react-dropzone'
// CSS import
import { Typography, Button, Form, message, Input, Icon } from 'antd';


const { Title } = Typography;
const { TextArea } = Input;

const PrivateOptions = [
  {value: 0, label: "Private"},
  {value: 1, label: "Public"}
]
const CategoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 0, label: "Autos & Vehicles" },
  { value: 0, label: "Music" },
  { value: 0, label: "Pets & Animals" },
  { value: 0, label: "Sports" },
]

const VideoUploadPage = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [_private, setPrivate] = useState(0);
  const [category, setCategory] = useState("File & Animation");

  // onChangeHandler
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const onChangeDesc = (e) => {
    setDesc(e.target.value)
  }
  const onPrivateChange = (e) => {
    setPrivate(e.target.value)
  }
  const onCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  //onDropHandler
  const onDrop = (files) => {
    let formData = new FormData;
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append('file', files[0])

    console.log(files)

    Axios.post('/api/video/uploadfiles', formData, config).then(response => {
      if(response.data.success){
        console.log(response.data)
      }else{
        alert("Upload video failed")
      }
    });
  }
  // onClickHandler
  const onClick = () => {}
  // onSubmitHandler
  const onSubmit = () => {}

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={2} >Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div>
          {/* Drop zone */}
          <Dropzone
              onDrop={onDrop}
              multiple={false}
              maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                  <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      {...getRootProps()}
                  >
                      <input {...getInputProps()} />
                      <Icon type="plus" style={{ fontSize: '3rem' }} />

                  </div>
              )}
          </Dropzone>
          {/* Thumbnail */}
          <div>
            <img></img>
          </div>

          <p>
            <label>Title</label>
            <Input onChange={onChangeTitle} value={title}></Input>
          </p>

          <p>
            <label>Description</label>
            <TextArea onChange={onChangeDesc} value={desc}>

            </TextArea>
          </p>

          <p>
            <select onChange={onPrivateChange}>
              {/* <option key="" value=""></option> */}
              {PrivateOptions.map( (item,idx) => (<option key={idx} value={item.value}>{item.label}</option>))}
            </select>
          </p>
          <p>
            <select onChange={onCategoryChange}>
            {/* <option key="" value=""></option> */}
            {CategoryOptions.map( (item,idx) => (<option key={idx} value={item.value}>{item.label}</option>))}
            </select>
          </p>

          <Button type="primary" size="large" onClick={onClick}>Submit</Button>

        </div>
      </Form>
    </div>
  )
}

export default VideoUploadPage