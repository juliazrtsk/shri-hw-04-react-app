import axios from 'axios';
import queryString from 'query-string';

const API = process.env.REACT_APP_API_URL;

class Api {
  async get(path, params) {
    let url = API + path;
    const search = queryString.parse(location.search);
    const response = await axios.get(url, { params: { ...search, ...params } });
    return response.data;
  }

  async post(path, data, params) {
    let url = API + path;
    const search = queryString.parse(location.search);
    const response = await axios.post(url, data, {
      params: { ...search, ...params },
    });
    return response.data;
  }
}

export default Api;
