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
export interface IEmailPassword {
	email: string
	password: string
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
