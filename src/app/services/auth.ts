const TOKEN_KEY = 'admin_token'
const ADMIN_KEY = 'admin_user'

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

export const getAdmin = (): any | null => {
  const admin = localStorage.getItem(ADMIN_KEY)
  return admin ? JSON.parse(admin) : null
}

export const setAdmin = (admin: any): void => {
  localStorage.setItem(ADMIN_KEY, JSON.stringify(admin))
}

export const removeAdmin = (): void => {
  localStorage.removeItem(ADMIN_KEY)
}

export const isAdminLoggedIn = (): boolean => {
  return !!getToken()
}

export const logout = (): void => {
  removeToken()
  removeAdmin()
}
