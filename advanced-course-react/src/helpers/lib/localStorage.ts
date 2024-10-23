import { IEvent } from "../../types/eventTypes"
import { IUser } from "../../types/usersTypes"

export enum LOCAL_STORAGE_KEYS {
  AUTH = 'auth',
  USERNAME = 'username',
  USERS = 'users',
  EVENTS = 'events'
}

export const saveUserAuthToLocalStorage = (username: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH, 'true')
  localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, username)
}

export const removeUserAuthFromLocalStorage = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH)
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USERNAME)
  localStorage.removeItem(LOCAL_STORAGE_KEYS.EVENTS)
}

export const saveArrayToLocalStorage = (key: LOCAL_STORAGE_KEYS, array: IUser[] | IEvent[]) => {
  const jsonString = JSON.stringify(array)
  localStorage.setItem(key, jsonString)
}

export const getArrayFromLocalStorage = (key: LOCAL_STORAGE_KEYS) => {
  const jsonString = localStorage.getItem(key)
  return jsonString ? JSON.parse(jsonString) : null
}