import { AxiosError } from 'axios';

export const errorInteceptor = (error: AxiosError) => {
  
  if (error.message === 'Network Error') {
    return Promise.reject('Erro de conexão com a API');
  }

  if (error.response?.status === 404) {
    return Promise.reject('Recurso não encontrado');
  }

  return Promise.reject(error);
};