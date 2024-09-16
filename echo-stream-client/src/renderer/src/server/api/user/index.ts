import { http } from '@renderer/server'
import { baseUrl } from '..'
import { UserInfo, UserInfoReq, UserLogin } from '@renderer/type/user'

const api = {
  login: `${baseUrl}/user/login`,
  register: `${baseUrl}/user/register`,
  info: `${baseUrl}/user/info`
}

export const userLoginRequest = (data: UserLogin) => http.post<{ data: number }>(api.login, data)

export const userInfoRequest = (data: UserInfoReq) => http.get<UserInfo>(api.info, { params: data })
