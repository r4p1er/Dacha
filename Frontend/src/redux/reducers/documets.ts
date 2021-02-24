import { DocumentType } from '../../common/types/types';
import { createSlice } from '@reduxjs/toolkit'

const documentsReducer = createSlice({
  name: 'documents',
  initialState: {
    documents: [] as Array<DocumentType>,
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
  },
})

export const {
  fetchDocuments,
  deleteDocument,
  downloadDocument,
} = documentsReducer.actions
export default documentsReducer.reducer
