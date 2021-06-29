import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

class Api {
  async get(path, params) {
    let url = API + path;
    const response = await axios.get(url, { params });
    return response.data;
  }

  async post(path, data, params) {
    let url = API + path;
    const response = await axios.post(url, data, { params });
    return response.data;
  }
}

export default Api;
