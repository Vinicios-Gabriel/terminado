import axios from 'axios';

export default axios.create({
  baseURL: 'https://back-integral-m05-desafio-individual-t09-qm1gisyb3.vercel.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
