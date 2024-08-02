import { http } from '@renderer/server'
import { baseUrl } from '..'
import { UserLogin } from '@renderer/type/user'

const api = {
  login: `${baseUrl}/users/login`,
  register: `${baseUrl}/users/register`
}

export const userLoginRequest = (data: UserLogin) => http.post(api.login, data)
