import axios from 'axios';
import qs from 'qs';

export const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/v1`;
export const ACCESS_TOKEN = 'accessToken';

export const sendRequest = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const sendRequestBlob = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/octet-stream',
  },
});

sendRequest.interceptors.request.use(
  config => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  error => {
    if (
      (window.location.pathname.includes('login') ||
        window.location.pathname.includes('signup')) &&
      error?.response?.status === 401
    ) {
      return;
    }
    if (error?.response?.status === 401) {
      window.location.href = '/login';
      return;
    }

    console.log(error?.response.data);
    throw error;
  }
);

sendRequestBlob.interceptors.request.use(
  config => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    config.responseType = 'blob';
    return config;
  },
  error => {
    if (
      (window.location.pathname.includes('login') ||
        window.location.pathname.includes('signup')) &&
      error?.response?.status === 401
    ) {
      return;
    }
    if (error?.response?.status === 401) {
      window.location.href = '/login';
      return;
    }

    console.log(error?.response.data);
    throw error;
  }
);

// 401 -> Nie zalogowany
// 403 -> Brak permisji

export const api = {
  login: body => sendRequest.post('/auth/login', body),
  signup: body => sendRequest.post('/auth/register', body),
  me: () => sendRequest.get('/auth/me'),
  remindPassword: body => sendRequest.post('/auth/remind', body),
  postContactForm: body => sendRequest.post('/contact', body),
  sendToken: token => sendRequest.get(`/auth/verify-email?token=${token}`),

  getTableResults({ name, category, suffix, ...paramsObj }) {
    const params = qs.stringify(paramsObj, { arrayFormat: 'repeat' });
    return sendRequest.get(`/${category}${name}${suffix}?${params}`);
  },

  putAccountDetails: body => sendRequest.put('/user/personal', body),
  putAccountPassword: body => sendRequest.put('/user/password', body),

  deleteUser: uId => sendRequest.delete(`/admin/user/${uId}/remove`),
  putActivate: uId => sendRequest.put(`/admin/user/${uId}/activate`),
  putResetPassword: uId => sendRequest.put(`/admin/user/${uId}/reset/password`),
  putChangePassword: (uId, body) => sendRequest.put(`/admin/user/${uId}/change/password`, body),
  putChangeEmail: (uId, body) => sendRequest.put(`/admin/user/${uId}/change/email`, body),
  putChangeRole: (uId, body) => sendRequest.put(`/admin/user/${uId}/change/role`, body),
  postCreateUser: (userType, body) => sendRequest.post(`/admin/register/${userType}`, body),

  requestScrap: domain => sendRequest.get(`/admin/offer/${domain}`),
  addReaction: (id, body) => sendRequest.put(`user/offer/${id}/reaction`, body),
  changeFavourite: id => sendRequest.put(`user/offer/${id}/favourite`),
  offerDetails: id => sendRequest.get(`user/offer/${id}/details`),
  addFilter: (body) => sendRequest.post('offer/filter', body),
  getFilterList: () => sendRequest.get('offer/filter/list'),
  getFilterDetails: id => sendRequest.get(`offer/filter/${id}`),
  deleteFilter : id => sendRequest.delete(`offer/filter/${id}`)
};
