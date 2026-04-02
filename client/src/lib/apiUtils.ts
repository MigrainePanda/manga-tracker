import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001',
  withCredentials: true,
});

interface responseType {
  data: unknown;
  status: number;
  error: boolean;
  message: string;
}

const getRequest = async (
  route: string,
  params?: Record<string, string | number | boolean>,
) => {
  return await axiosInstance.request({
    url: route,
    method: 'get',
    params: params,
  });
};

const postRequest = async (route: string, body?: unknown) => {
  return await axiosInstance.request({
    url: route,
    method: 'post',
    data: body,
  });
};

const putRequest = async (route: string, body?: unknown) => {
  return await axiosInstance.request({
    url: route,
    method: 'put',
    data: body,
  });
};

const deleteRequest = async (route: string) => {
  return await axiosInstance.request({
    url: route,
    method: 'delete',
  });
};

// this method makes calling the axios methods a little simpler and handles bad request types
const sendRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE', // | 'PATCH' | 'HEAD' | 'OPTIONS'
  route: string,
  body?: unknown,
  params?: Record<string, string | number | boolean>,
): Promise<AxiosResponse> => {
  switch (method) {
    case 'GET':
      return await getRequest(route, params);
    case 'POST':
      return await postRequest(route, body);
    case 'PUT':
      return await putRequest(route, body);
    case 'DELETE':
      return await deleteRequest(route);
    default:
      console.log('Invalid HTTP method');
      throw new Error('Invalid HTTP method');
  }
};

const handleRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE', // | 'PATCH' | 'HEAD' | 'OPTIONS'
  route: string,
  reactOpts?: AxiosRequestConfig,
  body?: unknown,
  params?: Record<string, string | number | boolean>,
): Promise<responseType> => {
  try {
    const response = await sendRequest(method, route, body, params);
    const responseBody: responseType = {
      data: response.data,
      status: response.status,
      error: false,
      message: '',
    };
    if (response.data.message != null) {
      responseBody.message = response.data.message;
    }
    return responseBody;
  } catch (e) {
    // defines global response behaviors for errors so our application's API calls can be coded with reduced repitition
    // if (e.response) {
    //   if (e.response.status === 401 && reactOpts.overrideRedirect !== true) {
    //     reactOpts.dispatch(logout());
    //     reactOpts.navigate(`/login?redirect=${location.pathname}`);
    //   } else if (e.response.status === 403) {
    //     reactOpts.navigate(`/`);
    //   }
    //   return {
    //     message: e.response.data.error,
    //     data: e.response.data,
    //     status: e.response.status,
    //     error: true,
    //   };
    // } else {
    return {
      data: {},
      status: 500,
      error: true,
      message: 'An unexpected error occurred. Please try again later.',
    };
    // }
  }
};

export default handleRequest;
