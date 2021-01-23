import {
  FETCH_DOCUMENTS,
  DOCUMENTS_LOADING,
  DELETE_DOCUMENT,
  DOWNLOAD_DOCUMENT,
} from "../actions/actionTypes";
const initialState = {
  documents: [],
  isLoading: true,
};

export function docsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return { ...state, documents: action.payload };
    case DOWNLOAD_DOCUMENT:
      return state;
    case DELETE_DOCUMENT:
      const filteredDocuments = state.documents.filter(
        (document) => document.id !== action.payload.id
      );
      return { ...state, documents: filteredDocuments };
    case DOCUMENTS_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}
