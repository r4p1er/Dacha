import { createSlice } from '@reduxjs/toolkit'

const documentsReducer = createSlice({
  name: 'documents',
  initialState: {
    documents: [],
    isLoading: false,
  },
  reducers: {
    fetchDocuments(state, action) {
      state.documents = action.payload
    },
    downloadDocument(state) {
      return state
    },
    deleteDocument(state, action) {
      const filteredDocuments = state.documents.filter(
        (document) => document.id !== action.payload
      )
      state.documents = filteredDocuments
    },
    loadingDocuments(state, action) {
      state.isLoading = action.payload
    },
  },
})

export const {
  fetchDocuments,
  deleteDocument,
  downloadDocument,
  loadingDocuments,
} = documentsReducer.actions
export default documentsReducer.reducer
