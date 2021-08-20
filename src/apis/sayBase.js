import axios from 'axios';
import i18next from 'i18next';
import apiUrl from '../env';

export const publicApi = axios.create({
  baseURL: apiUrl,
});

export const api = axios.create({
  baseURL: apiUrl,
});

const getLanguage = () => i18next.language || window.localStorage.i18nextLng;

publicApi.interceptors.request.use(function (configuration) {
  // To pass language to backend
  const config = {
    ...configuration,
    params: {
      _lang: getLanguage(),
      ...configuration.params,
    },
  };
  return config;
});
