import { create } from "zustand";
import axios from "axios"
import Cookies from "js-cookie"

export interface IUser {
  _id: string
  email: string
  password: string
  createdAt: string
  isAdmin: boolean
}

export interface IUserState {
  email: string
  isAdmin: boolean
}

export interface ITokens {
  accessToken: string
  refreshToken: string
}
export interface IInitialState {
  user: IUserState | null
  isLoading: boolean
}
interface ITelegram{
  first_name:string
  hash:string
  id:number
  last_name:string
  photo_url:string
  username:string
}
export interface IAuthResponse extends ITokens {
  user: IUser & {
    isAdmin: boolean
  }
}
export const saveTokensStorage = (data: ITokens) => {
  Cookies.set("accessToken", data.accessToken)
  Cookies.set("refreshToken", data.refreshToken)
}

export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data)
  localStorage.setItem("user", JSON.stringify(data.user))
}

export const removeTokensStorage = () => {
  Cookies.remove("accessToken")
  Cookies.remove("refreshToken")
}

export const errorCatch = (error: any): string => {
  return error.response && error.response.data
    ? typeof error.response.data.message == "object"
      ? error.response.data.message[0]
      : error.response.data.message
    : error.message
}


export const userStore = create(
  set => ({
    Login:async (data:ITelegram) => {
      try{
        const response = await axios.post(
          `http://localhost:5000/api/auth/telegram`,
            data
        )
        console.log(response)
        saveToStorage(response.data)
        return response.data
      }catch (e:any){
        set({error:e.response.data.message})
      }
    },
    CheckAuth:async ()=> {
      try {
        const refreshToken = Cookies.get("refreshToken")
        const response = await axios.post<IAuthResponse>(
          `http://localhost:5000/api/auth/login/access-token`,
          {
            refreshToken
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )

        if (response.data.accessToken) {
          saveToStorage(response.data)
        }
        return response.data
      } catch (e) {
        if (errorCatch(e) == "jwt expired") {
          removeTokensStorage()
          localStorage.removeItem("user")
        }
      }
}
  })
)