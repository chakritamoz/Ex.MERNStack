import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormProduct from './components/FormProduct';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await axios.get('http://localhost:8080/product')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }

  console.log(data);

  return (
    <div>
      <h1>CRUD</h1>
      <FormProduct />
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
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
              </tr>
            ) : null
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
