import React, { useState, useEffect } from 'react';
import { 
  getData,
  craete, 
  remove
} from '../functions/product';

const FormProduct = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getData()
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
    craete(form)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  }

  const handleRemove = async (id) => {
    remove(id)
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