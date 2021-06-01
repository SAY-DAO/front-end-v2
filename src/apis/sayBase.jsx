import axios from 'axios';
import apiUrl from '../env';

export default axios.create({
  baseURL: apiUrl,
});
