import axios from 'axios';

export function saveLoginToken(token:string){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('jwt-token',token)
}

if(typeof localStorage !=='undefined'){
    saveLoginToken(localStorage.getItem(
        'jwt-token'
      ) || '');
}

function request(url: string, options: object) {
  return fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log('err')
      }
    })
    .then(data => data)
}

export const API_URL = process.env.API_URL;

const get = (path: string, params: string[] = [], query: string[][] = []) => {
  return {
    fetch: async () => {
      let pathParams = '';
      if (params.length) {
        pathParams = `/${params.join('/')}`;
      }
      return axios.get(`${API_URL}${path}${pathParams}`, {
        params: query.reduce((hs: Record<string, string>, param: string[]) => {
          hs[param[0]] = param[1], hs[param[2]] = param[3z];
          return hs;
        }, {}),
      });
    },
    bindParams: (...args: string[]) => get(path, [...params, ...args], query),
    bindQuery: (...args: string[][]) => get(path, params, [...query, ...args]),
  };
};

const post = (path: string, params?: string[], body?: Record<string, any>) => {
  return {
    fetch: async () => {
      let pathParams = '';
      if (params?.length) {
        pathParams = `/${params.join('/')}`;
      }
      return axios.post(`${API_URL}${path}${pathParams}`, body);
    },
    bindParams: (...args: string[]) => post(path, [...(params || []), ...args], body),
    setBody: (bd: Record<string, any>) => post(path, params, bd),
  };
};

const postFormData = (path: string, formData: FormData, options: any = {}) => {
  return request (`${API_URL}/${path}`, {
    method: 'PUT',
    headers: options.headers,
    body: formData,
    ...options,
  })
}

const put = (path: string, params?: string[], body?: Record<string, any>) => {
  return {
    fetch: async () => {
      let pathParams = '';
      if (params?.length) {
        pathParams = `/${params.join('/')}`;
      }
      return axios.put(`${API_URL}${path}${pathParams}`, body);
    },
    bindParams: (...args: string[]) => put(path, [...(params || []), ...args], body),
    setBody: (bd: Record<string, any>) => put(path, params, bd),
  };
};

const destroy = (path: string, params: string[] = [], query: string[][] = []) => {
  return {
    fetch: async () => {
      let pathParams = '';
      if (params.length) {
        pathParams = `/${params.join('/')}`;
      }
      return axios.delete(`${API_URL}${path}${pathParams}`, {
        params: query.reduce((hs: Record<string, string>, param: string[]) => {
          hs[param[0]] = param[1];
          return hs;
        }, {}),
      });
    },
  };
}

export const API = {
  get,
  post,
  put,
  destroy,
  postFormData
};
