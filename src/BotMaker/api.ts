import axios, { AxiosInstance } from 'axios';

class Api {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({ baseURL: 'https://go.botmaker.com' });
  }
}

export default new Api();
