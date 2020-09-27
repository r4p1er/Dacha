import axios from "axios";
import { setDocs } from "../reducers/documets";

export const getDocuments = () => {
  return async (dispatch) => {
    const docs = await axios.get("http://localhost:5000/api/documents")
    dispatch(setDocs(docs.data))
  }
}

export const downloadDocuments = (id) => {
  return async (dispatch) => {
    const docs = await axios.get(`http://localhost:5000/api/documents/${id}`)
    dispatch(setDocs(docs.data))
  }
}