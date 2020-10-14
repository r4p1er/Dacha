import axios from "axios";
import fileDownload from "js-file-download";
import { showAlert } from "./AlertMessages";
import {
  DELETE_DOCUMENT,
  FETCH_DOCUMENTS,
  FETCH_DOCUMENTS_LOADING,
  DOWNLOAD_DOCUMENT,
} from "./actionTypes";

const baseUrl = "http://localhost:5000/api/documents";

export const addDocument = (document) => {
  const data = document;
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(fetchAllDocumentsLoading(isLoading));
    }

    return await axios
      .post(baseUrl, data)
      .then((response) => {
        return axios
          .get(`${baseUrl}`)
          .then((response) => {
            isLoading = false;
            dispatch(fetchAllDocumentsLoading(isLoading));
            dispatch(fetchDocumentsSuccess(response.data));
          })
          .catch((error) => {
            isLoading = false;
            dispatch(fetchAllDocumentsLoading(isLoading));
            dispatch(showAlert("Упс, что-то пошло не так"));
          });
      })
      .catch((error) => {
        dispatch(showAlert("Упс, что-то пошло не так"));
      });
  };
};

export const deleteDocument = (id) => {
  return async (dispatch) => {
    return await axios
      .delete(`${baseUrl}/${id}`)
      .then(() => {
        dispatch(deleteDocumentSuccess(id));
      })
      .catch((error) => {
        dispatch(showAlert("Упс, что-то пошло не так"));
      });
  };
};

export const deleteDocumentSuccess = (id) => {
  return {
    type: DELETE_DOCUMENT,
    payload: {
      id: id,
    },
  };
};

export const fetchDocumentsSuccess = (documents) => {
  return {
    type: FETCH_DOCUMENTS,
    payload: documents,
  };
};

const fetchAllDocumentsLoading = (isLoading) => {
  return {
    type: FETCH_DOCUMENTS_LOADING,
    payload: isLoading,
  };
};

export const fetchAllDocuments = () => {
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(fetchAllDocumentsLoading(isLoading));
    }

    return await axios
      .get(baseUrl)
      .then((response) => {
        isLoading = false;
        dispatch(fetchAllDocumentsLoading(isLoading));
        const data = response.data;
        dispatch(fetchDocumentsSuccess(data));
      })
      .catch((error) => {
        isLoading = false;
        dispatch(fetchAllDocumentsLoading(isLoading));
        dispatch(showAlert("Упс, что-то пошло не так"));
      });
  };
};

const documentDownloadSuccess = () => {
  return {
    type: DOWNLOAD_DOCUMENT,
  };
};

export const downloadDocument = (id, name) => {
  const token = localStorage.jwtToken;
  const AuthStr = "Bearer ".concat(token);
  return async (dispatch) => {
    dispatch(documentDownloadSuccess());
    await axios
      .get(`http://localhost:5000/api/documents/${id}`, {
        responseType: "blob",
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        fileDownload(response.data, `${name}`);
      });
  };
};
