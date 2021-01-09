import axios from 'axios';
const environment = process.env.ENV || 'development';

const ApiUrl =
  environment !== 'development'
    ? process.env.REACT_APP_API_URI
    : 'http://localhost:8000/';

export const axiosWithAuth = () => {
  const token = JSON.parse(localStorage.getItem('okta-token-storage'))?.idToken
    ?.value;
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: 'http://localhost:8000',
  });
};
