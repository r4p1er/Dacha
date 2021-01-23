import axios from "axios";
import { apiUrl } from "../../utils/api";
import {
  DELETE_DOCUMENT,
  FETCH_DOCUMENTS,
  DOWNLOAD_DOCUMENT,
  DOCUMENTS_LOADING,
} from "./actionTypes";

const baseUrl = `${apiUrl}/documents`;
const downloadUrl = `http://${window.location.hostname}:5000/StaticFiles`;

const documentsLoading = (isLoading) => {
  return {
    type: DOCUMENTS_LOADING,
    payload: isLoading,
  };
};

const documentDownloadSuccess = () => {
  return {
    type: DOWNLOAD_DOCUMENT,
  };
};

const deleteDocumentSuccess = (id) => {
  return {
    type: DELETE_DOCUMENT,
    payload: {
      id: id,
    },
  };
};

const fetchDocumentsSuccess = (documents) => {
  return {
    type: FETCH_DOCUMENTS,
    payload: documents,
  };
};

export const addDocument = (document) => {
  const data = document;
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(documentsLoading(isLoading));
    }

    return await axios
    .post(baseUrl, data)
    .then((response) => {
      return axios
      .get(`${baseUrl}`)
      .then((response) => {
        isLoading = false;
        dispatch(documentsLoading(isLoading));
        dispatch(fetchDocumentsSuccess(response.data));
      });
    });
  };
};

export const deleteDocument = (id) => {
  return async (dispatch) => {
    return await axios
    .delete(`${baseUrl}/${id}`)
    .then(() => {
      dispatch(deleteDocumentSuccess(id));
    });
  };
};

export const fetchAllDocuments = () => {
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(documentsLoading(isLoading));
    }

    return await axios
    .get(baseUrl)
    .then((response) => {
      isLoading = false;
      dispatch(documentsLoading(isLoading));
      const data = response.data;
      dispatch(fetchDocumentsSuccess(data));
    });
  };
};

export const downloadDocument = (id, name) => {
  const token = localStorage.jwtToken;
  const AuthStr = "Bearer ".concat(token);
  return async (dispatch) => {
    dispatch(documentDownloadSuccess());
    await axios
      .get(`${downloadUrl}/${name}`, {
        responseType: "blob",
        headers: { Authorization: AuthStr },
      })
      .then((response) => {
        if (name.substring(name.lastIndexOf(".") + 1, name.length) === "pdf") {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" })
          );
          const link = document.createElement("a");
          link.style = "display: none";
          document.body.appendChild(link);
          link.href = url;
          link.setAttribute("target", "_blank");
          link.click();
        } else {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/octet-stream" })
          );
          const link = document.createElement("a");
          link.style = "display: none";
          document.body.appendChild(link);
          link.href = url;
          link.setAttribute("download", `${name}`);
          link.click();
        }
      });
  };
};
