
// src/services/auth.js
export const auth = {
  isAuth: () => !!localStorage.getItem('user'),
  setUser: (u) => localStorage.setItem('user', JSON.stringify(u)),
  logout: () => localStorage.removeItem('user'),
}
