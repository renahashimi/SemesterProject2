export function isAuthenticated() {
    const token = localStorage.getItem('token');
    const profile = localStorage.getItem('profile');
    return !!token && !!profile;
  }