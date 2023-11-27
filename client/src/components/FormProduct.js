import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FormProduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await axios.get(process.env.REACT_APP_API + '/product')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(process.env.REACT_APP_API + '/product', form)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  }

  const handleRemove = async (id) => {
    await axios.delete(process.env.REACT_APP_API + '/product/' + id)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      Form product
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          name='name'
          onChange={e => handleChange(e)}
          placeholder='name'
        /> <br/>
        <input 
          type='text'
          name='description'
          onChange={e => handleChange(e)}
          placeholder='description'
        /> <br/>
        <input 
          type='number'
          name='price'
          onChange={e => handleChange(e)}
          placeholder='price'
        /> <br/>
        <input type='submit'></input>
      </form>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data ? data.map((item, index) => 
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td onClick={() => handleRemove(item._id)}>Remove</td>
              </tr>
            ) : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default FormProduct