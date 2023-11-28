import axios from "axios";

export const getData = async () => {
  return await axios.get(process.env.REACT_APP_API + '/product');
}

export const craete = async (data) => {
  return await axios.post(process.env.REACT_APP_API + '/product', data);
}

export const remove = async (id) => {
  return await axios.delete(process.env.REACT_APP_API + '/product/' + id);
}