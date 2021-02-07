import createDeepEqualSelector from './deepEqualSelector'

const selectDocuments = (state) => state.documents

export const getDocuments = createDeepEqualSelector(
  [selectDocuments],
  (documents) => documents.documents
)
