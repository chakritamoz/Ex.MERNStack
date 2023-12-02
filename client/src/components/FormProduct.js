import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { 
  listData,
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
    listData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }

  const handleChange = (e) => {

    if (e.target.name === 'file') {
      setForm({
        ...form,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formWithImageData = new FormData();

    for (const key in form) {
      formWithImageData.append(key, form[key]);
    }

    craete(formWithImageData)
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
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <input type='text'
          name='name'
          onChange={e => handleChange(e)}
          placeholder='name'
        /> <br/>

        <input type='text'
          name='description'
          onChange={e => handleChange(e)}
          placeholder='description'
        /> <br/>

        <input type='file'
          name='file'
          onChange={e => handleChange(e)}
        /> <br />

        <input type='number'
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
            <th>File</th>
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
                <td>{item.file}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={'/edit/' + item._id}>
                    <button>Edit</button>
                  </Link>
                  &nbsp;|&nbsp;
                  <button onClick={() => handleRemove(item._id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ) : null
          }
        </tbody>
      </table>
    </div>
  )
}

export default FormProduct 