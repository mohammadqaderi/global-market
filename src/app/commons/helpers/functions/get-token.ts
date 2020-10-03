export function getToken() {
  const auth = localStorage.getItem('auth');
  return auth ? `Bearer ${localStorage.getItem('auth.token').substring(1, localStorage.getItem('auth.token').length - 1)}` : null;
}
