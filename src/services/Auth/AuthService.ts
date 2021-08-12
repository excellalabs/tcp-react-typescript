import { AxiosResponse, AxiosRequestConfig } from 'axios'
import ApiService, { DecodedJWT } from '../interfaces/ApiService.interface'
import { Role } from '../../models/UserRole.enum'
import { axiosInstance } from '../axios-instance'
const jwtDecode = require('jwt-decode')

export default class AuthService implements ApiService {
  static key = 'tcp-react'
  loginEndpoint = '/api/v1/users/signin'
  authorizationEndpoint = '/oauth/authorization'

  config: AxiosRequestConfig

  constructor() {
    this.config = {
      baseURL: process.env.REACT_APP_API,
      headers: {
        Accept: 'application/json',
      },
    }
  }

  login(username: string, password: string): Promise<AxiosResponse> {
    return axiosInstance.post(
      this.loginEndpoint,
      { user: { username: username, password: password } },
      this.config
    )
  }

  logout(): void {
    localStorage.removeItem(AuthService.key)
  }

  saveToken(token: string) {
    localStorage.setItem(AuthService.key, token)
  }

  getEmail() {
    const token = AuthService.decodedToken()
    return token?.email ? token.email : ''
  }

  getRoles() {
    const token = AuthService.decodedToken()
    return token?.authorities ? token.authorities : [Role.user]
  }

  isLoggedIn() {
    return !!AuthService.retrieveToken()
  }

  isAdmin() {
    return this.getRoles().includes(Role.admin)
  }

  static retrieveToken(): string {
    const token = localStorage.getItem(AuthService.key)
    return token ? token : ''
  }

  static decodedToken(): DecodedJWT | null {
    const token = this.retrieveToken()
    return token === '' ? null : jwtDecode(token)
  }

  static tokenHasLifeLeft() {
    return true
    // const token = localStorage.getItem(AuthService.key);
    // const decodedToken = jwtDecode(token) as DecodedJWT;
    // const tokenLifeLeft = decodedToken.exp - new Date().getTime() / 1000;
    // return tokenLifeLeft > 0;
  }
}
