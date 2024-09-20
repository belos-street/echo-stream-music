import { UserInfo } from '@renderer/type/user'
import { create } from 'zustand'

export type UserStore = {
  user: UserInfo
  setUser: (user: UserInfo) => void
}

const initUserInfo: UserInfo = {
  id: 0,
  username: '',
  nickName: '',
  email: '',
  headPic: ''
}


export const useUserStore = create<UserStore>((set) => {
  user: {...initUserInfo},
setUser: (user: UserInfo) => set({ user })
})
