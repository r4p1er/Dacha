import React from 'react'
import axios from 'axios'
import icon_doc from '../images/icon_doc.svg'
import icon_jpg from '../images/icon_jpg.svg'
import icon_pdf from '../images/icon_pdf.svg'
import icon_png from '../images/icon_png.svg'
import icon_txt from '../images/icon_txt.svg'
import icon_xls from '../images/icon_xls.svg'

export const apiUrl = `http://${window.location.hostname}:5000/api`

export function setAuthorizationToken(token: string | boolean) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function urlify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a key={index} href={part} rel="noopener noreferrer" target="_blank">
          {part}
        </a>
      )
    }
    return part
  })
}

export const dateFormater = (date: number | string) => {
  const newDate = new Date(date)

  const dateString = newDate.toLocaleDateString()
  const dateHour =
    newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours()
  const dateMinutes =
    newDate.getMinutes() < 10
      ? `0${newDate.getMinutes()}`
      : newDate.getMinutes()
  const formatedDate = `${dateString}, ${dateHour}:${dateMinutes}`

  return formatedDate
}

export const fileExtentionRead = (name: string) => {
  const allowedExtention = name.match(
    /(\.doc|\.docx|\.jpg|\.jpeg|\.png|\.xls|\.xlsx|\.pdf|\.txt)$/i
  )
  let fileExtention = ''
  !allowedExtention
    ? (fileExtention = '')
    : (fileExtention = allowedExtention[0])

  switch (fileExtention) {
    case '.doc':
      return icon_doc
    case '.docx':
      return icon_doc
    case '.jpg':
      return icon_jpg
    case '.jpeg':
      return icon_jpg
    case '.png':
      return icon_png
    case '.xls':
      return icon_xls
    case '.xlsx':
      return icon_xls
    case '.pdf':
      return icon_pdf
    case '.txt':
      return icon_txt
    default:
      return icon_doc
  }
}
