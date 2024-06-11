import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
  RawAxiosResponseHeaders,
  ResponseType,
} from 'axios';

import qs from 'qs';
import { BaseQueryFn } from '@reduxjs/toolkit/query';

import { apiBaseUrl, apiPrefix } from '../constants';
import eventEmitter from '../helpers/eventEmmiter';

export interface IAxiosParams {
  method: AxiosRequestConfig['method'];
  url: string;
  params?: AxiosRequestConfig['params'];
  data?: AxiosRequestConfig['data'];
  headers?: AxiosRequestConfig['headers'];
  responseType?: ResponseType | undefined;
  notCauseError?: boolean;
}

export interface IQueryErrorResponse {
  error: { status: unknown; data: unknown; headers?: RawAxiosResponseHeaders | AxiosResponseHeaders; notCauseError?: boolean };
}

export interface GenericIdentityFn<Type> {
  data: Type;
  headers?: RawAxiosResponseHeaders | AxiosResponseHeaders;
}

export type BaseQueryFnType = BaseQueryFn<IAxiosParams, unknown, unknown>;

/**
 * Инстанс аксиоса
 */
export const instance = axios.create({
  baseURL: apiBaseUrl ? `${apiBaseUrl}` : '',
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
});

/**
 * Интерцептор на запрос
 */
const requestInterceptors = (req: InternalAxiosRequestConfig) => {
  const access = true;
  if (access) {
    req.headers.set('Authorization', `Bearer ${access}`);
  } else {
    delete req.headers.Authorization;
  }
  return req;
};

/**
 * Интерцептор на успешный ответ сервера
 */
const successInterceptors = (response: AxiosResponse) => response;

instance.interceptors.request.use(requestInterceptors);
instance.interceptors.response.use(successInterceptors);

const emitError = (error: AxiosError) => {
  switch (error.response?.status) {
    case 400:
      eventEmitter.emit('dataError', error.response?.data);
      break;
    case 401:
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      window.location.href = '/login';
      eventEmitter.emit('401Error');
      break;
    case 403:
      eventEmitter.emit('accessError');
      break;
    case 404:
      eventEmitter.emit('notFoundError');
      break;
    case 409:
      eventEmitter.emit('dataError', error.response?.data);
      break;
    case 500:
      eventEmitter.emit('serverError');
      break;
    case 503:
      eventEmitter.emit('serverNotAvailableError');
      break;
    case 504:
      eventEmitter.emit('timeoutError');
      break;
    default:
      eventEmitter.emit('unrecognizedError');
      break;
  }
};

/**
 * Фабрика для RTK query
 * @param baseUrl
 */
export const axiosBaseQuery =
  (baseUrl?: string): BaseQueryFn<IAxiosParams, unknown, unknown> =>
  async requestOptions =>
    query(requestOptions, baseUrl ?? apiPrefix);

/**
 * Клиент для запросов
 * @param url
 * @param notCauseError
 * @param requestOptions
 * @param baseUrl
 */
export const query = async <T>(
  { url, notCauseError, ...requestOptions }: IAxiosParams,
  baseUrl = apiPrefix
): Promise<GenericIdentityFn<T> | IQueryErrorResponse> => {
  try {
    const result = await instance({ url: `${baseUrl}${url}`, ...requestOptions /*, headers: { Authorization : `Bearer ${storedValue}` }*/ });
    return { data: result.data as T, headers: result.headers };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    if (!notCauseError) {
      emitError(err);
    }
    return {
      error: { status: err.response?.status, data: err.response?.data, headers: err.response?.headers },
    };
  }
};
