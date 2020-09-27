import axios from "axios";
import { CREATE_DOCUMENTS } from "../reducers/actionTypes";
import { setDocuments } from "../reducers/documets";

export const getDocumentss = () => {
  return async (dispatch) => {
    const documents = await axios.get("http://localhost:5000/api/documents")
    dispatch(setDocuments(documents.data))
  }
}

export function createDocument(document) {
  return {
    type: CREATE_DOCUMENTS,
    payload: document
  }
}