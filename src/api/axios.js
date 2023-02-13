import axios from 'axios';

const baseURL = 'http://localhost:3500'

export default axios.create({
  baseURL: baseURL
})
// need to attach the JWT refresh tokens to the pvt route with interceptors
// happens in the background to refresh the tokens
export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' }
})