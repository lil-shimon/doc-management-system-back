import { User } from '../redux/slicers/user';

export function saveLoginData(data: User | null) {
  localStorage.setItem('login-data', data ? JSON.stringify(data) : '');
}

export function getLoginData() {
  const data = localStorage.getItem('login-data');
  return data ? JSON.parse(data) : null;
}
