export type AdvertType = {
  id: number
  title: string
  body: string
  contact: string
  place: number
  date: number
  accountId: number
}
export type AccountType = {
  id: number
  login: string
  password: string
  lastName: string
  name: string
  middleName: string
  place: number
  role: {
    id: number
    name: string
  }
}
export type UserType = {
  id: null | number
  login: string
  name: string
  lastName: string
  middleName: string
  placeNum: null | number
  role: {
    id: null | number
    name: string
  }
}
export type NewsType = {
  id: number
  title: string
  body: string
  date: string
}

export type DocumentType = {
  id: number
  name: string
}

export type AlertType = {
  alert: null | string
}
