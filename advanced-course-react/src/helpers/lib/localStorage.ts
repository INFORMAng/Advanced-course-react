export enum LOCAL_STORAGE_KEYS {
  AUTH = 'auth',
  USERNAME = 'username'
}

export const saveUserAuthToLocalStorage = (username: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH, 'true')
  localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, username)
}

export const removeUserAuthFromLocalStorage = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH)
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USERNAME)
}