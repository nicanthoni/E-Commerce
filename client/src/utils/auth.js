import { jwtDecode } from 'jwt-decode'

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken())
  }
  loggedIn() {
    const token = this.getToken()

    // If there is a token and it's not expired, return `true`
    if (token && !this.isTokenExpired(token)) {
      return true
    }
    const currentPage = window.location.pathname
    if (
      currentPage !== '/signup' &&
      currentPage !== '/signup/buyer' &&
      currentPage !== '/signup/vendor' &&
      currentPage !== '/signin' &&
      currentPage !== '/signin/buyer' &&
      currentPage !== '/signin/vendor' &&
      currentPage !== '/'
    ) {
      return (window.location.href = '/') // send to home page
    }
  }
  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = jwtDecode(token)

    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token')
      return true
    }
    // If token hasn't passed its expiration time, return `false`
    return false
  }
  getToken() {
    return localStorage.getItem('id_token')
  }
  login(idToken) {
    localStorage.setItem('id_token', idToken)
    // window.location.assign('/'); -> Causing SIGN UP completion to send back to home
  }
  logout() {
    localStorage.removeItem('id_token')
  }
}
export default new AuthService()