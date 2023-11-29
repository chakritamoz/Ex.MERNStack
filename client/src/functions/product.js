import axios from "axios";

export const listData = async () => {
  return await axios.get(process.env.REACT_APP_API + '/product');
}

export const readData = async (id) => {
  return await axios.get(process.env.REACT_APP_API + '/product/' + id);
}

export const craete = async (data) => {
  return await axios.post(process.env.REACT_APP_API + '/product', data);
}

export const remove = async (id) => {
  return await axios.delete(process.env.REACT_APP_API + '/product/' + id);
}

export const update = async (id, data) => {
  return await axios.put(process.env.REACT_APP_API + '/product/' + id, data);
}
