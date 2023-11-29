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

  useEffect(() => {
    loadData(params.id)
  }, []);

  const loadData = (id) => {
    readData(id)
      .then((res) => {
        setData(res.data);
      });
  }

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    update(params.id, data)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div>FormEditProduct</div>

      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='name'
          onChange={handleChange}
          placeholder='name'
          value={data.name}
        /> <br />

        <input
          type='text'
          name='description'
          onChange={handleChange}
          placeholder='description'
          value={data.description}
        /> <br />

        <input 
          type='number'
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