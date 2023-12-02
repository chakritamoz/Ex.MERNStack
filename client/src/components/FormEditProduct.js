import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { readData, update } from '../functions/product';

const FormEditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    description: '',
    price: 0
  });

  const [oldFile, setOldFile] = useState();

  useEffect(() => {
    loadData(params.id)
  }, []);

  const loadData = (id) => {
    readData(id)
      .then((res) => {
        setData(res.data);
        setOldFile(res.data.file);
      });
  }

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setData({
        ...data,
        [e.target.name]: e.target.files[0]
      });  
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formWithImageData = new FormData();

    for (const key in data) {
      formWithImageData.append(key, data[key]);
    }
    formWithImageData.append("oldFile", oldFile);
    console.log(formWithImageData);

    update(params.id, formWithImageData)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div>FormEditProduct</div>

      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input type='text'
          name='name'
          onChange={handleChange}
          placeholder='name'
          value={data.name}
        /> <br />

        <input type='text'
          name='description'
          onChange={handleChange}
          placeholder='description'
          value={data.description}
        /> <br />

        <input type='file'
          name='file'
          onChange={handleChange}
        /> <br />

        <input type='number'
          name='price'
          onChange={handleChange}
          placeholder='price'
          value={data.price}
        /> <br />

        <input type='submit' value='Submit'/>
      </form>

    </div>
  )
}

export default FormEditProduct